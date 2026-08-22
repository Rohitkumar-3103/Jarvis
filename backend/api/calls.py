# ==========================================================================
# J.A.R.V.I.S. 3.0 - Satellite Comms API Blueprint
# ==========================================================================
from flask import Blueprint, request, jsonify
import time

calls_api = Blueprint('calls_api', __name__)

@calls_api.route('/api/calls/call', methods=['POST'])
def initiate_call():
    try:
        data = request.get_json()
        contact = data.get('contact', 'Tony Stark')
        is_video = data.get('video', False)
        
        vector = "SATELLITE_VIDEO_LINK" if is_video else "SATELLITE_UPLINK"
        return jsonify({
            "status": "success",
            "relay_time": time.strftime("%H:%M:%S"),
            "connection_vector": vector,
            "message": f"Establishing synapse connection vector with {contact}."
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400
