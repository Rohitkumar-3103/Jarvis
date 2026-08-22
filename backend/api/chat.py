# ==========================================================================
# J.A.R.V.I.S. 3.0 - Chat Database History API Blueprint
# ==========================================================================
from flask import Blueprint, request, jsonify
from backend.database.db_manager import load_history, append_history, clear_history

chat_api = Blueprint('chat_api', __name__)

@chat_api.route('/api/chat/history', methods=['GET', 'POST', 'DELETE'])
def manage_chat_history():
    if request.method == 'GET':
        logs = load_history()
        return jsonify(logs)

    elif request.method == 'POST':
        try:
            msg_data = request.get_json()
            sender = msg_data.get('sender', 'USER')
            text = msg_data.get('text', '')
            timestamp = msg_data.get('timestamp', '')
            
            success = append_history(sender, text, timestamp)
            if success:
                return jsonify({"status": "success", "message": "Message saved to server."})
            return jsonify({"status": "error", "message": "Failed to save message."}), 500
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 400

    elif request.method == 'DELETE':
        success = clear_history()
        if success:
            return jsonify({"status": "success", "message": "Database records flushed."})
        return jsonify({"status": "error", "message": "Failed to clear records."}), 500
