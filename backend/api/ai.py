from flask import Blueprint, request, jsonify
import json
import os
import re
import requests

backend_ai_api = Blueprint('backend_ai_api', __name__)

CONFIG_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "config", "api_keys.json")

def _get_api_key():
    try:
        with open(CONFIG_PATH, "r", encoding="utf-8") as f:
            return json.load(f).get("gemini_api_key", "")
    except Exception:
        return ""

def _evaluate_math(expr: str):
    clean = re.sub(r'^(what is|calculate|solve|compute|value of|equals|equal to)\s+', '', expr, flags=re.IGNORECASE).strip(' ?')
    # Percentage
    pct_m = re.match(r'^(\d+(?:\.\d+)?)\s*%\s*(?:of|\*)\s*(\d+(?:\.\d+)?)$', clean)
    if pct_m:
        pct, tot = float(pct_m.group(1)), float(pct_m.group(2))
        return f"{pct}% of {tot} is {(pct/100)*tot}, Sir."
    # Arithmetic
    if re.match(r'^[0-9+\-*/%.^()\s]+$', clean) and re.search(r'[0-9]', clean) and re.search(r'[+\-*/%.^]', clean):
        try:
            sanitized = clean.replace('^', '**')
            # Safe eval with restricted builtins
            val = eval(sanitized, {"__builtins__": None}, {})
            if isinstance(val, (int, float)):
                formatted = f"{val:,}" if isinstance(val, int) else f"{val:.4f}".rstrip('0').rstrip('.')
                return f"The result of {clean} is {formatted}, Sir."
        except Exception:
            pass
    return None

def _web_intelligence(prompt: str):
    clean_topic = re.sub(r'^(what is the formula of|what is the formula for|what is the definition of|what is the|what is an?|what are|explain|tell me about|define|who is|who was)\s+', '', prompt, flags=re.IGNORECASE).strip(' ?')
    if not clean_topic or len(clean_topic) < 2:
        return None
    # 1. DuckDuckGo Instant Answer
    try:
        r = requests.get(f"https://api.duckduckgo.com/?q={requests.utils.quote(clean_topic)}&format=json", timeout=3).json()
        abstract = r.get("AbstractText", "")
        if abstract and len(abstract) > 20:
            return f"{abstract}, Sir."
    except Exception:
        pass
    # 2. Wikipedia Summary
    try:
        r = requests.get(f"https://en.wikipedia.org/api/rest_v1/page/summary/{requests.utils.quote(clean_topic)}", headers={"User-Agent": "JarvisAI/3.2.0"}, timeout=3).json()
        extract = r.get("extract", "")
        if extract and r.get("type") != "disambiguation" and len(extract) > 20:
            sentences = re.split(r'(?<=[.!?])\s+', extract)
            return " ".join(sentences[:3]) + ", Sir."
    except Exception:
        pass
    return None

@backend_ai_api.route('/api/ai/generate', methods=['POST'])
def gen_response():
    try:
        data = request.get_json() or {}
        prompt = data.get('prompt', '').strip()
        client_key = data.get('api_key', '').strip()
        if not prompt:
            return jsonify({"status": "error", "message": "No prompt query provided."}), 400
            
        # 1. Check math solver
        math_res = _evaluate_math(prompt)
        if math_res:
            return jsonify({"status": "success", "response": math_res})

        key = client_key or _get_api_key()
        
        # 2. If Gemini API Key exists, query Google Gemini REST endpoints
        if key and key.startswith("AIzaSy"):
            cp_keywords = ["problem", "codeforces", "codechef", "leetcode", "atcoder", "hackerrank", "uva", "spoj", "sample input", "constraints", "write c++", "solve"]
            coding_keywords = ["code", "python", "javascript", "c++", "java", "html", "css", "function", "programming", "compile", "debug", "script", "regex"]
            
            system_instruction = "You are J.A.R.V.I.S., the legendary advanced AI system. You fluently understand and respond in both English and Hindi (Hinglish). Speak politely, use terms like 'Sir', and keep responses extremely crisp, informative, and to-the-point (under 3-4 sentences max)."
            badge = ""
            
            prompt_lower = prompt.lower()
            if any(k in prompt_lower for k in cp_keywords):
                system_instruction = "You are J.A.R.V.I.S. Coding Assistant, specializing in Competitive Programming. Output: Algorithm, Complexity, C++17 Code, Explanation. Speak politely using 'Sir'."
                badge = "🧠 Mode Detected: Competitive Programming\n\n"
            elif any(k in prompt_lower for k in coding_keywords):
                system_instruction = "You are J.A.R.V.I.S. Coding Assistant. Write clean, modular, and well-commented code. Address edge cases and follow language best practices. Keep the explanation crisp and speak politely using 'Sir'."
                badge = "🧠 Mode Detected: General Coding\n\n"

            models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.0-flash-lite', 'gemini-1.5-flash']
            
            for m in models:
                url = f"https://generativelanguage.googleapis.com/v1beta/models/{m}:generateContent?key={key}"
                payload = {
                    "contents": [{"parts": [{"text": prompt}]}],
                    "systemInstruction": {
                        "parts": [{"text": system_instruction}]
                    }
                }
                try:
                    res = requests.post(url, json=payload, timeout=8)
                    if res.status_code == 200:
                        candidates = res.json().get("candidates", [])
                        if candidates:
                            text = candidates[0]["content"]["parts"][0]["text"]
                            return jsonify({"status": "success", "response": badge + text})
                except Exception:
                    pass

        # 3. Live Web Intelligence Fallback
        web_res = _web_intelligence(prompt)
        if web_res:
            return jsonify({"status": "success", "response": web_res})

        # 4. Graceful Fallback
        clean_topic = re.sub(r'^(what is|explain|tell me about|who is)\s+', '', prompt, flags=re.IGNORECASE).strip(' ?')
        topic_title = (clean_topic or prompt).title()
        return jsonify({
            "status": "success", 
            "response": f"I have processed your query regarding {topic_title}, Sir. For real-time conversational reasoning across any topic, you can configure your free Gemini API key in Settings (⚙️)."
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500