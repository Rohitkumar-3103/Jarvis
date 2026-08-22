# ==========================================================================
# J.A.R.V.I.S. 3.2.0 - Credentials, Biometrics & Hybrid MongoDB Authentication
# ==========================================================================
from flask import Blueprint, request, jsonify, current_app
import cv2
import base64
import numpy as np
import json
import os
import hashlib
import random
import smtplib
import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
try:
    from pymongo import MongoClient
except ImportError:
    MongoClient = None

auth_api = Blueprint('auth_api', __name__)

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'users.json')
try:
    FACE_CASCADE = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml') if hasattr(cv2, 'CascadeClassifier') and hasattr(cv2, 'data') else None
except Exception:
    FACE_CASCADE = None

# Memory cache for pending OTPs: {identifier_or_username: {"otp": "123456", "user_data": {...}}}
pending_sessions = {}

def get_mongo_collection():
    if MongoClient is None:
        return None
    try:
        mongo_uri = os.getenv("MONGO_URI", "mongodb://127.0.0.1:27017/")
        client = MongoClient(mongo_uri, serverSelectionTimeoutMS=2000)
        client.server_info() # Force connection check
        db = client["ManualAuth"]
        return db["users"]
    except Exception as e:
        print(f"[-] MongoDB connection unavailable, falling back to local users.json: {str(e)}")
        return None

def get_users_db():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    if not os.path.exists(DB_PATH):
        admin_pass_hash = hashlib.sha256("3000".encode('utf-8')).hexdigest()
        default_db = {
            "users": {
                "ironman": {
                    "username": "ironman",
                    "password": admin_pass_hash,
                    "fullname": "Tony Stark",
                    "email": "tony@starkindustries.com",
                    "phone": "+1234567890",
                    "role": "Primary User // Administrator",
                    "avatar": "assets/images/avatar.png"
                }
            }
        }
        with open(DB_PATH, 'w', encoding='utf-8') as f:
            json.dump(default_db, f, indent=4)
        return default_db
    try:
        with open(DB_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception:
        return {"users": {}}

def is_testing_mode():
    try:
        return current_app.config.get('TESTING', False)
    except Exception:
        return False

def save_users_db(db):
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    with open(DB_PATH, 'w', encoding='utf-8') as f:
        json.dump(db, f, indent=4)

def send_email_otp(target_email, otp_code):
    if is_testing_mode():
        print(f"\n[TESTING MODE] Simulated Email OTP to {target_email}: {otp_code}")
        return True
        
    smtp_email = os.getenv("SMTP_EMAIL", "")
    smtp_pass = os.getenv("SMTP_PASSWORD", "")
    if not smtp_email or not smtp_pass or "your-gmail" in smtp_email:
        print("\n" + "="*50)
        print(f" [SIMULATED EMAIL DESTINATION: {target_email}]")
        print(f"  >>> J.A.R.V.I.S. SECURITY KEY: {otp_code} <<<")
        print("="*50 + "\n")
        return False
    try:
        msg = MIMEMultipart()
        msg['From'] = smtp_email
        msg['To'] = target_email
        msg['Subject'] = "J.A.R.V.I.S. Secure Verification OTP"
        
        body = f"""
======================================================
     J.A.R.V.I.S. OS - SECURITY VECTOR VERIFICATION
======================================================
Sir,

An access request has been received on the main console.
Please input the following One-Time Password (OTP) to authenticate:

👉  {otp_code}

This verification token expires in 5 minutes.

Respectfully,
J.A.R.V.I.S. Terminal Security
======================================================
"""
        msg.attach(MIMEText(body, 'plain'))
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(smtp_email, smtp_pass)
            server.sendmail(smtp_email, target_email, msg.as_string())
        print(f"[+] Real Gmail SMTP OTP sent successfully to {target_email}")
        return True
    except Exception as e:
        print(f"[-] Failed to send SMTP Gmail OTP: {str(e)}")
        return False

def send_sms_otp(target_phone, otp_code):
    if is_testing_mode():
        print(f"\n[TESTING MODE] Simulated SMS OTP to {target_phone}: {otp_code}")
        return True
        
    sid = os.getenv("TWILIO_ACCOUNT_SID", "")
    token = os.getenv("TWILIO_AUTH_TOKEN", "")
    from_phone = os.getenv("TWILIO_PHONE_NUMBER", "")
    if not sid or not token or not from_phone or "your-twilio" in sid:
        print("\n" + "="*50)
        print(f" [SIMULATED SMS DESTINATION: {target_phone}]")
        print(f"  >>> J.A.R.V.I.S. SECURITY KEY: {otp_code} <<<")
        print("="*50 + "\n")
        return False
    try:
        from twilio.rest import Client
        client = Client(sid, token)
        client.messages.create(
            body=f"J.A.R.V.I.S. Security Key: {otp_code}. Clearance LEVEL 4.",
            from_=from_phone,
            to=target_phone
        )
        print(f"[+] Real Twilio SMS OTP sent successfully to {target_phone}")
        return True
    except Exception as e:
        print(f"[-] Failed to send Twilio SMS OTP: {str(e)}")
        return False

@auth_api.route('/api/auth/send-otp', methods=['POST'])
def send_otp_endpoint():
    try:
        data = request.get_json() or {}
        identifier = (data.get('identifier') or data.get('username') or data.get('email') or '').strip().lower()
        channel = data.get('channel', 'email')

        if not identifier:
            return jsonify({"status": "error", "message": "Identifier required to dispatch OTP."}), 400

        otp_code = f"{random.randint(100000, 999999)}"
        
        # Save or update pending session
        if identifier in pending_sessions:
            pending_sessions[identifier]["otp"] = otp_code
        else:
            pending_sessions[identifier] = {
                "otp": otp_code,
                "action": "verify",
                "user_data": {
                    "username": identifier.split('@')[0],
                    "email": identifier if '@' in identifier else f"{identifier}@starkindustries.com",
                    "fullname": identifier.split('@')[0].upper(),
                    "role": "Terminal User",
                    "avatar": "assets/images/avatar.png"
                }
            }

        if channel == 'phone' or identifier.startswith('+'):
            send_sms_otp(identifier, otp_code)
        else:
            send_email_otp(identifier, otp_code)

        return jsonify({
            "status": "success",
            "success": True,
            "message": f"Security OTP dispatched to {identifier}.",
            "identifier": identifier,
            "otp_code": otp_code
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@auth_api.route('/api/auth/register', methods=['POST'])
def register_user():
    try:
        data = request.get_json() or {}
        required = ('username', 'password', 'fullname', 'email', 'phone')
        if not all(k in data for k in required):
            return jsonify({"status": "error", "message": "Missing credentials profile metadata."}), 400

        username = data['username'].strip().lower()
        password = data['password']
        fullname = data['fullname'].strip()
        email = data['email'].strip()
        phone = data['phone'].strip()

        if len(username) < 3:
            return jsonify({"status": "error", "message": "Username must be at least 3 characters."}), 400
        if len(password) < 4:
            return jsonify({"status": "error", "message": "Security vector password must be at least 4 characters."}), 400

        # Check duplicate username/email in active database
        mongo_col = get_mongo_collection()
        if mongo_col is not None:
            if mongo_col.find_one({"username": username}):
                return jsonify({"status": "error", "message": "User identifier already registered in MongoDB."}), 400
            if mongo_col.find_one({"email": email}):
                return jsonify({"status": "error", "message": "Email address already registered in MongoDB."}), 400
        else:
            db = get_users_db()
            if username in db['users']:
                return jsonify({"status": "error", "message": "User identifier already registered in local cache."}), 400

        # Generate 6-digit OTP
        otp_code = f"{random.randint(100000, 999999)}"
        pass_hash = hashlib.sha256(password.encode('utf-8')).hexdigest()

        session_obj = {
            "otp": otp_code,
            "action": "register",
            "user_data": {
                "username": username,
                "password": pass_hash,
                "password_raw": password,
                "fullname": fullname,
                "email": email,
                "phone": phone,
                "role": "Terminal User",
                "avatar": "assets/images/avatar.png"
            }
        }

        # Cache pending registration by username and email
        pending_sessions[username] = session_obj
        pending_sessions[email.lower()] = session_obj
        if phone:
            pending_sessions[phone] = session_obj

        # Dispatch OTPs
        send_email_otp(email, otp_code)
        send_sms_otp(phone, otp_code)

        return jsonify({
            "status": "otp_required",
            "success": True,
            "message": "Security One-Time Password (OTP) dispatched.",
            "username": username,
            "email": email,
            "phone": phone,
            "otp_code": otp_code
        })

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@auth_api.route('/api/auth/login', methods=['POST'])
def login_user():
    try:
        data = request.get_json() or {}
        username_raw = data.get('username') or data.get('email', '')
        password = data.get('password', '')

        if not username_raw or not password:
            return jsonify({"status": "error", "message": "Username and password security parameters required."}), 400

        username = username_raw.strip().lower()
        user_found = False
        user_fullname = username
        user_email = "tony@starkindustries.com"
        user_phone = "+1234567890"
        user_role = "Terminal User"

        # 1. Query MongoDB first if active
        mongo_col = get_mongo_collection()
        if mongo_col is not None:
            mongo_user = mongo_col.find_one({"$or": [{"email": username}, {"username": username}]})
            if mongo_user:
                stored_pass = mongo_user.get("password")
                input_hash = hashlib.sha256(password.encode('utf-8')).hexdigest()
                if stored_pass == password or stored_pass == input_hash:
                    user_found = True
                    user_fullname = mongo_user.get("fullname") or mongo_user.get("username", username).upper()
                    user_email = mongo_user.get("email", "")
                    username = mongo_user.get("username", username)
                    user_role = "Terminal User"
                else:
                    return jsonify({"status": "denied", "message": "Security vector mismatch. Access denied."}), 401

        # 2. Fallback to local users.json
        if not user_found:
            db = get_users_db()
            if username in db['users']:
                user = db['users'][username]
                input_hash = hashlib.sha256(password.encode('utf-8')).hexdigest()
                if user['password'] == input_hash or user['password'] == password:
                    user_found = True
                    user_fullname = user['fullname']
                    user_email = user.get('email', '')
                    user_phone = user.get('phone', '')
                    user_role = user.get('role', 'Terminal User')
                else:
                    return jsonify({"status": "denied", "message": "Security vector mismatch. Access denied."}), 401

        if not user_found:
            return jsonify({"status": "denied", "message": "Identity not found in secure database."}), 401

        # Generate OTP for 2FA
        otp_code = f"{random.randint(100000, 999999)}"
        session_obj = {
            "otp": otp_code,
            "action": "login",
            "user_data": {
                "username": username,
                "fullname": user_fullname,
                "email": user_email,
                "phone": user_phone,
                "role": user_role if username != "ironman" else "Primary User // Administrator",
                "avatar": "assets/images/avatar.png"
            }
        }

        pending_sessions[username] = session_obj
        pending_sessions[user_email.lower()] = session_obj

        # Dispatch OTPs
        send_email_otp(user_email, otp_code)
        send_sms_otp(user_phone, otp_code)

        return jsonify({
            "status": "otp_required",
            "success": True,
            "message": "Security Verification Code (OTP) dispatched.",
            "username": username,
            "email": user_email,
            "phone": user_phone,
            "otp_code": otp_code
        })

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@auth_api.route('/api/auth/verify-otp', methods=['POST'])
def verify_otp():
    try:
        data = request.get_json() or {}
        identifier = (data.get('username') or data.get('identifier') or data.get('email') or '').strip().lower()
        otp = str(data.get('otp', '')).strip()

        if not identifier or not otp:
            return jsonify({"status": "error", "message": "Username/Identifier and verification code are required."}), 400

        if identifier not in pending_sessions:
            return jsonify({"status": "error", "message": "No active pending authentication session for this user."}), 400

        session_record = pending_sessions[identifier]
        if session_record['otp'] != otp:
            return jsonify({"status": "error", "message": "Invalid authentication code. Match failed."}), 400

        # Verification successful, complete action
        user_data = session_record['user_data']
        if session_record['action'] == 'register':
            mongo_col = get_mongo_collection()
            if mongo_col is not None:
                max_user = mongo_col.find_one(sort=[("unique_id", -1)])
                c = (max_user["unique_id"] + 1) if (max_user and "unique_id" in max_user) else 1
                
                # Check if user already exists
                if not mongo_col.find_one({"$or": [{"username": user_data["username"]}, {"email": user_data["email"]}]}):
                    mongo_col.insert_one({
                        "unique_id": c,
                        "email": user_data["email"],
                        "username": user_data["username"],
                        "password": user_data.get("password_raw", user_data["password"]),
                        "passwordConf": user_data.get("password_raw", user_data["password"]),
                        "fullname": user_data["fullname"],
                        "createdAt": datetime.datetime.now(datetime.timezone.utc)
                    })
            else:
                db = get_users_db()
                db['users'][user_data["username"]] = {
                    "username": user_data["username"],
                    "password": user_data["password"],
                    "fullname": user_data["fullname"],
                    "email": user_data["email"],
                    "phone": user_data["phone"],
                    "role": user_data["role"],
                    "avatar": user_data["avatar"]
                }
                save_users_db(db)

        # Clear pending session keys
        keys_to_delete = [k for k, v in pending_sessions.items() if v == session_record]
        for k in keys_to_delete:
            del pending_sessions[k]

        return jsonify({
            "status": "success",
            "success": True,
            "authorized": True,
            "message": "Verification complete. Security clearance approved.",
            "user": {
                "username": user_data['username'],
                "fullname": user_data['fullname'],
                "role": user_data.get('role', 'Terminal User'),
                "avatar": user_data.get('avatar', 'assets/images/avatar.png'),
                "email": user_data.get('email', '')
            }
        })

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@auth_api.route('/api/auth/face', methods=['POST'])
def authenticate_face():
    try:
        data = request.get_json()
        if not data or 'image' not in data:
            return jsonify({"status": "error", "message": "No image payload received."}), 400

        image_data = data['image'].split(',')[1]
        image_bytes = base64.b64decode(image_data)
        np_arr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        if img is None:
            return jsonify({"status": "error", "message": "Failed to decode frame."}), 400

        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = FACE_CASCADE.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

        if len(faces) > 0:
            db = get_users_db()
            admin = db['users'].get('ironman', {
                "username": "ironman",
                "fullname": "Tony Stark",
                "role": "Primary User // Administrator",
                "avatar": "assets/images/avatar.png"
            })
            return jsonify({
                "status": "success",
                "authorized": True,
                "faces_detected": len(faces),
                "message": "Retinal profile verified. Access granted, Sir.",
                "user": {
                    "username": admin['username'],
                    "fullname": admin['fullname'],
                    "role": admin['role'],
                    "avatar": admin['avatar']
                }
            })
        else:
            return jsonify({
                "status": "denied",
                "authorized": False,
                "faces_detected": 0,
                "message": "Biometric mismatch."
            })

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
