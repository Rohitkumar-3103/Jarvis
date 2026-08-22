from flask import Blueprint, request, jsonify
import json
import os
import re
import requests

backend_ai_api = Blueprint('backend_ai_api', __name__)

CONFIG_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "config", "api_keys.json")

ACRONYMS = {
    "NDA": "The full form of **NDA** has three primary meanings, Sir:\n1. **National Defence Academy** — Premier joint training academy for the Indian Armed Forces.\n2. **Non-Disclosure Agreement** — Legally binding confidentiality contract.\n3. **National Democratic Alliance** — Political coalition in India.",
    "ISRO": "The full form of **ISRO** is **Indian Space Research Organisation**, India's national space exploration agency headquartered in Bengaluru, Sir.",
    "DRDO": "The full form of **DRDO** is **Defence Research and Development Organisation**, India's military research agency, Sir.",
    "NASA": "The full form of **NASA** is **National Aeronautics and Space Administration**, the US space exploration agency, Sir.",
    "UPSC": "The full form of **UPSC** is **Union Public Service Commission**, India's premier recruiting agency for civil services (IAS, IPS, IFS), Sir.",
    "IAS": "The full form of **IAS** is **Indian Administrative Service**, premier administrative civil service of India, Sir.",
    "IPS": "The full form of **IPS** is **Indian Police Service**, senior police civil service of India, Sir.",
    "IIT": "The full form of **IIT** is **Indian Institute of Technology**, premier public technical universities in India, Sir.",
    "CPU": "The full form of **CPU** is **Central Processing Unit**, the principal processor and core of a computer system, Sir.",
    "GPU": "The full form of **GPU** is **Graphics Processing Unit**, processor designed for parallel computation and graphical rendering, Sir.",
    "RAM": "The full form of **RAM** is **Random Access Memory**, high-speed volatile memory for active computer tasks, Sir.",
    "ROM": "The full form of **ROM** is **Read-Only Memory**, permanent storage for system firmware like BIOS, Sir.",
    "OTP": "The full form of **OTP** is **One-Time Password**, dynamic security passcode valid for a single session, Sir.",
    "ATM": "The full form of **ATM** is **Automated Teller Machine**, electronic banking outlet for automated financial transactions, Sir.",
    "UPI": "The full form of **UPI** is **Unified Payments Interface**, real-time payment system developed by NPCI, Sir.",
    "PDF": "The full form of **PDF** is **Portable Document Format**, Adobe format for documents independent of OS or hardware, Sir.",
    "API": "The full form of **API** is **Application Programming Interface**, set of protocols for building application software, Sir.",
    "AI": "The full form of **AI** is **Artificial Intelligence**, the simulation of human intelligence by machines, Sir.",
    "ML": "The full form of **ML** is **Machine Learning**, subset of AI enabling software to learn from data, Sir.",
    "HTML": "The full form of **HTML** is **Hypertext Markup Language**, standard language for web documents, Sir.",
    "CSS": "The full form of **CSS** is **Cascading Style Sheets**, stylesheet language used for describing document presentations, Sir.",
    "SQL": "The full form of **SQL** is **Structured Query Language**, domain-specific language for managing relational databases, Sir."
}

def _get_api_key():
    try:
        with open(CONFIG_PATH, "r", encoding="utf-8") as f:
            return json.load(f).get("gemini_api_key", "")
    except Exception:
        return ""

def _evaluate_acronym(prompt: str):
    p_lower = prompt.lower()
    if any(k in p_lower for k in ["full form", "ful form", "fullform", "stands for", "meaning of", "matlab"]):
        clean = re.sub(r'\b(koi|kya|hai|he|batao|bataiye|ka|ki|ke|ful|full|form|fullform|of|the|what|is|mean|meaning|stands|stand|for|in|hindi|english|matlab|bhai|sir|please|plz)\b', '', prompt, flags=re.IGNORECASE)
        clean = re.sub(r'[^a-zA-Z0-9]', ' ', clean).strip()
        for w in clean.split():
            up = w.upper()
            if up in ACRONYMS:
                return ACRONYMS[up]
    return None

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
            val = eval(sanitized, {"__builtins__": None}, {})
            if isinstance(val, (int, float)):
                formatted = f"{val:,}" if isinstance(val, int) else f"{val:.4f}".rstrip('0').rstrip('.')
                return f"The result of {clean} is {formatted}, Sir."
        except Exception:
            pass
    return None

def _clean_hinglish(query: str):
    s = re.sub(r'\b(koi|bhai|sir|please|plz)\b', '', query, flags=re.I)
    s = re.sub(r'\b(kya hai|kya hota hai|kya he|kisko bolte hai|kisko kehte hain|kise kehte hai)\b', '', s, flags=re.I)
    s = re.sub(r'\b(batao|bataiye|samjhao|samjha do|bataye|batao na)\b', '', s, flags=re.I)
    s = re.sub(r'\b(ke bare me|ke bare mein|ke baare me|ke baare mein|ka matlab|ki paribhasha)\b', '', s, flags=re.I)
    s = re.sub(r'\b(what is the formula of|what is the formula for|what is the definition of|what is the meaning of|what is the|what is an?|what are|explain|tell me about|define|who is|who was)\b', '', s, flags=re.I)
    s = re.sub(r'\?+', '', s).strip()
    return re.sub(r'\s+', ' ', s).strip()

def _web_intelligence(prompt: str):
    clean_topic = _clean_hinglish(prompt)
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
            
        # 1. Math solver
        math_res = _evaluate_math(prompt)
        if math_res:
            return jsonify({"status": "success", "response": math_res})

        # 2. Acronym / Full Form solver
        acronym_res = _evaluate_acronym(prompt)
        if acronym_res:
            return jsonify({"status": "success", "response": acronym_res})

        key = client_key or _get_api_key()
        
        # 3. If Gemini API Key exists, query Google Gemini REST endpoints
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

        # 4. Live Web Intelligence Fallback
        web_res = _web_intelligence(prompt)
        if web_res:
            return jsonify({"status": "success", "response": web_res})

        # 5. Graceful Fallback
        clean_topic = _clean_hinglish(prompt)
        topic_title = (clean_topic or prompt).title()
        return jsonify({
            "status": "success", 
            "response": f"I have processed your query regarding {topic_title}, Sir. For real-time conversational reasoning across any topic, you can configure your free Gemini API key in Settings (⚙️)."
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500