# ==========================================================================
# J.A.R.V.I.S. 3.0 - Automated Flask Backend Server Entry Point
# ==========================================================================
from flask import Flask, jsonify
from flask_cors import CORS
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.api.auth import auth_api
from backend.api.chat import chat_api
from backend.api.calls import calls_api
from backend.api.system import system_api
from backend.api.weather import weather_api
from backend.api.ai import backend_ai_api
from backend.api.files import files_api
from backend.api.code import code_api

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_api)
app.register_blueprint(chat_api)
app.register_blueprint(calls_api)
app.register_blueprint(system_api)
app.register_blueprint(weather_api)
app.register_blueprint(backend_ai_api)
app.register_blueprint(files_api)
app.register_blueprint(code_api)

@app.route('/')
def home():
    return jsonify({
        "status": "success",
        "service": "J.A.R.V.I.S. Cognitive Automation API Node",
        "version": "3.2.0"
    })

def main():
    print("==================================================================")
    print(" J.A.R.V.I.S. AUTOMATED COGNITIVE BACKEND SERVER v3.2.0             ")
    print("==================================================================")
    
    host = os.getenv("FLASK_HOST", "0.0.0.0")
    port = int(os.getenv("FLASK_PORT", 5000))
    app.run(host=host, port=port, debug=True, use_reloader=False)

if __name__ == '__main__':
    main()
