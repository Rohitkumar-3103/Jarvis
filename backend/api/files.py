from flask import Blueprint, request, jsonify
import os
from werkzeug.utils import secure_filename

files_api = Blueprint('files_api', __name__)

# Directory where uploaded files are stored
UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@files_api.route('/api/files', methods=['GET', 'POST'])
def handle_files():
    if request.method == 'GET':
        # List files in the upload directory
        files_list = []
        try:
            for f in os.listdir(UPLOAD_DIR):
                full_path = os.path.join(UPLOAD_DIR, f)
                if os.path.isfile(full_path):
                    files_list.append({
                        "name": f,
                        "size_kb": round(os.path.getsize(full_path) / 1024.0, 1)
                    })
            return jsonify({"status": "success", "files": files_list})
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500
            
    elif request.method == 'POST':
        try:
            if 'file' not in request.files:
                return jsonify({"status": "error", "message": "No file stream in request."}), 400
                
            file = request.files['file']
            if file.filename == '':
                return jsonify({"status": "error", "message": "Empty file name."}), 400
                
            filename = secure_filename(file.filename)
            save_path = os.path.join(UPLOAD_DIR, filename)
            file.save(save_path)
            
            return jsonify({
                "status": "success",
                "message": f"File {filename} uploaded successfully.",
                "file": {
                    "name": filename,
                    "size_kb": round(os.path.getsize(save_path) / 1024.0, 1)
                }
            })
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500
