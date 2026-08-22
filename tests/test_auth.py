import pytest
import sys
import os
import shutil

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.server import app
from backend.api.auth import DB_PATH, pending_sessions

@pytest.fixture
def client():
    app.config['TESTING'] = True
    
    # Clean up test users from MongoDB if active
    from backend.api.auth import get_mongo_collection
    mongo_col = get_mongo_collection()
    if mongo_col is not None:
        mongo_col.delete_many({"username": {"$in": ["spiderman", "ironman_test"]}})

    # Back up existing database if it exists
    backup_path = DB_PATH + ".bak"
    if os.path.exists(DB_PATH):
        os.makedirs(os.path.dirname(backup_path), exist_ok=True)
        shutil.copyfile(DB_PATH, backup_path)
        os.remove(DB_PATH)
    
    with app.test_client() as client:
        yield client
        
    # Clean up and restore backup
    if os.path.exists(DB_PATH):
        os.remove(DB_PATH)
    if os.path.exists(backup_path):
        shutil.move(backup_path, DB_PATH)
    
    # Clear pending sessions and MongoDB test users
    pending_sessions.clear()
    if mongo_col is not None:
        mongo_col.delete_many({"username": {"$in": ["spiderman", "ironman_test"]}})

def test_auth_default_admin(client):
    """Test login with default admin credentials and OTP verification."""
    payload = {
        "username": "ironman",
        "password": "3000"
    }
    # Step 1: Initiate login
    rv = client.post('/api/auth/login', json=payload)
    assert rv.status_code == 200
    json_data = rv.get_json()
    assert json_data['status'] == 'otp_required'
    
    # Step 2: Extract code and verify OTP
    username = "ironman"
    assert username in pending_sessions
    otp = pending_sessions[username]['otp']
    
    verify_payload = {
        "username": username,
        "otp": otp
    }
    rv_verify = client.post('/api/auth/verify-otp', json=verify_payload)
    assert rv_verify.status_code == 200
    verify_data = rv_verify.get_json()
    assert verify_data['authorized'] is True
    assert verify_data['user']['fullname'] == 'Tony Stark'

def test_auth_registration_and_login(client):
    """Test user registration, duplicate checks, login, and verification flows."""
    reg_payload = {
        "username": "spiderman",
        "password": "webspider",
        "fullname": "Peter Parker",
        "email": "peter@parker.org",
        "phone": "+15550199"
    }
    # Step 1: Register new user (initiates OTP)
    rv_reg = client.post('/api/auth/register', json=reg_payload)
    assert rv_reg.status_code == 200
    reg_data = rv_reg.get_json()
    assert reg_data['status'] == 'otp_required'
    
    # Step 2: Verify OTP registration code
    username = "spiderman"
    assert username in pending_sessions
    otp = pending_sessions[username]['otp']
    
    verify_payload = {
        "username": username,
        "otp": otp
    }
    rv_verify = client.post('/api/auth/verify-otp', json=verify_payload)
    assert rv_verify.status_code == 200
    verify_data = rv_verify.get_json()
    assert verify_data['status'] == 'success'
    assert verify_data['user']['username'] == 'spiderman'

    # Register duplicate user (should fail instantly before OTP)
    rv_dup = client.post('/api/auth/register', json=reg_payload)
    assert rv_dup.status_code == 400

    # Step 3: Login with new credentials (initiates 2FA OTP)
    login_payload = {
        "username": "spiderman",
        "password": "webspider"
    }
    rv_login = client.post('/api/auth/login', json=login_payload)
    assert rv_login.status_code == 200
    login_data = rv_login.get_json()
    assert login_data['status'] == 'otp_required'
    
    # Step 4: Verify login OTP code
    assert username in pending_sessions
    login_otp = pending_sessions[username]['otp']
    
    rv_verify_login = client.post('/api/auth/verify-otp', json={
        "username": username,
        "otp": login_otp
    })
    assert rv_verify_login.status_code == 200
    verify_login_data = rv_verify_login.get_json()
    assert verify_login_data['authorized'] is True
    assert verify_login_data['user']['fullname'] == 'Peter Parker'

    # Login with bad password
    bad_login_payload = {
        "username": "spiderman",
        "password": "wrongpassword"
    }
    rv_bad = client.post('/api/auth/login', json=bad_login_payload)
    assert rv_bad.status_code == 401
