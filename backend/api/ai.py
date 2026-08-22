from flask import Blueprint, request, jsonify
import json
import os
import requests

backend_ai_api = Blueprint('backend_ai_api', __name__)

CONFIG_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "config", "api_keys.json")

def _get_api_key():
    try:
        with open(CONFIG_PATH, "r", encoding="utf-8") as f:
            return json.load(f).get("gemini_api_key", "")
    except Exception:
        return ""

@backend_ai_api.route('/api/ai/generate', methods=['POST'])
def gen_response():
    try:
        data = request.get_json() or {}
        prompt = data.get('prompt', '').strip()
        if not prompt:
            return jsonify({"status": "error", "message": "No prompt query provided."}), 400
            
        key = _get_api_key()
        if not key:
            return jsonify({"status": "error", "message": "Gemini API Key is not configured."}), 401
            
        # Call Gemini REST endpoints directly
        cp_keywords = ["problem", "codeforces", "codechef", "leetcode", "atcoder", "hackerrank", "uva", "spoj", "sample input", "constraints", "write c++", "solve"]
        coding_keywords = ["code", "python", "javascript", "c++", "java", "html", "css", "function", "programming", "compile", "debug", "script", "regex"]
        
        system_instruction = "You are J.A.R.V.I.S., the legendary advanced AI system. You fluently understand and respond in both English and Hindi (Hinglish). Speak politely, use terms like 'Sir', and keep responses extremely crisp, informative, and to-the-point (under 3-4 sentences max)."
        badge = ""
        
        prompt_lower = prompt.lower()
        if any(k in prompt_lower for k in cp_keywords):
            system_instruction = "You are J.A.R.V.I.S. Coding Assistant, specializing in Competitive Programming. When the user mentions a competitive programming problem name/ID (e.g., Maximum Factors Problem, Two Sum, Codeforces 210A): 1. NEVER assume the problem statement. 2. If the full problem statement is provided, solve exactly that problem. 3. If only the problem title/ID is provided, politely ask for the complete statement or contest link. Never invent a different problem. 4. Output: Algorithm, Complexity, C++17 Code, Explanation. Use Markdown, speak politely using 'Sir', and do not invent code for unknown statements."
            badge = "🧠 Mode Detected: Competitive Programming\n\n"
        elif any(k in prompt_lower for k in coding_keywords):
            system_instruction = "You are J.A.R.V.I.S. Coding Assistant. Write clean, modular, and well-commented code. Address edge cases and follow language best practices. Keep the explanation crisp and speak politely using 'Sir'."
            badge = "🧠 Mode Detected: General Coding\n\n"

        models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.0-flash-lite', 'gemini-1.5-flash']
        last_error = ""
        
        for m in models:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{m}:generateContent?key={key}"
            payload = {
                "contents": [{"parts": [{"text": prompt}]}],
                "systemInstruction": {
                    "parts": [{"text": system_instruction}]
                }
            }
            try:
                res = requests.post(url, json=payload, timeout=10)
                if res.status_code == 200:
                    candidates = res.json().get("candidates", [])
                    if candidates:
                        text = candidates[0]["content"]["parts"][0]["text"]
                        return jsonify({"status": "success", "response": badge + text})
                else:
                    err_json = res.json() if res.headers.get('content-type', '').startswith('application/json') else {}
                    last_error = err_json.get('error', {}).get('message', f"HTTP {res.status_code}")
            except Exception as ex:
                last_error = str(ex)

        return jsonify({"status": "error", "message": f"Gemini API Link failed: {last_error}"}), 500
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500