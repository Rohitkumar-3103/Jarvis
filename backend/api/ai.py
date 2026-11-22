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

SCIENCE_FORMULAS = {
    "force": "The formula for Force is **F = m × a** (Force = Mass × Acceleration), where mass is in kilograms (kg) and acceleration is in m/s², measured in Newtons (N), Sir.",
    "speed": "The formula for Speed is **v = d / t** (Speed = Distance ÷ Time), measured in meters per second (m/s), Sir.",
    "velocity": "The formula for Velocity is **v = Δx / Δt** (Velocity = Displacement ÷ Change in Time), measured in m/s, Sir.",
    "energy": "Einstein's mass-energy equivalence formula is **E = mc²**, where E is Energy, m is Mass, and c is the Speed of Light in vacuum (~3 × 10⁸ m/s), Sir.",
    "kinetic energy": "The formula for Kinetic Energy is **KE = ½ m v²**, measured in Joules (J), Sir.",
    "potential energy": "The formula for Gravitational Potential Energy is **PE = m × g × h**, measured in Joules (J), Sir.",
    "work": "The formula for Work is **W = F × d × cos(θ)** (Work = Force × Displacement × cosine of angle), measured in Joules (J), Sir.",
    "power": "The formula for Power is **P = W / t** (Power = Work ÷ Time), measured in Watts (W), Sir.",
    "pressure": "The formula for Pressure is **P = F / A** (Pressure = Force ÷ Area), measured in Pascals (Pa), Sir.",
    "density": "The formula for Density is **ρ = m / V** (Density = Mass ÷ Volume), measured in kg/m³, Sir.",
    "momentum": "The formula for Linear Momentum is **p = m × v** (Momentum = Mass × Velocity), measured in kg·m/s, Sir.",
    "acceleration": "The formula for Acceleration is **a = (v - u) / t** (Acceleration = Change in Velocity ÷ Time), measured in m/s², Sir.",
    "ohm": "Ohm's Law states **V = I × R** (Voltage = Current × Resistance), measured in Volts (V), Sir.",
    "voltage": "The formula for Voltage is **V = I × R** (Ohm's Law) or **V = W / Q**, Sir.",
    "current": "The formula for Electric Current is **I = Q / t** (Current = Charge ÷ Time) or **I = V / R**, measured in Amperes (A), Sir.",
    "resistance": "The formula for Electrical Resistance is **R = V / I** (Resistance = Voltage ÷ Current), measured in Ohms (Ω), Sir.",
    "frequency": "The formula for Frequency is **f = 1 / T** (Frequency = 1 ÷ Time Period) or **f = v / λ**, measured in Hertz (Hz), Sir.",
    "wavelength": "The formula for Wavelength is **λ = v / f** (Wavelength = Velocity ÷ Frequency), measured in meters (m), Sir.",
    "gravity": "Newton's Law of Universal Gravitation is **F = G × (m₁ × m₂) / r²**, where G is the gravitational constant, Sir."
}

def _evaluate_science_formula(prompt: str):
    p_lower = prompt.lower().strip()
    if any(k in p_lower for k in ["formula", "paribhasha", "definition", "equation", "law"]):
        for key, text in SCIENCE_FORMULAS.items():
            if key in p_lower:
                return text
    # Also check direct names like "force formula", "speed formula", "ohms law"
    for key, text in SCIENCE_FORMULAS.items():
        if f"{key} formula" in p_lower or f"formula of {key}" in p_lower or f"formula for {key}" in p_lower:
            return text
    return None

def _evaluate_conversational(prompt: str):
    p_lower = prompt.lower().strip()
    # User introduces themselves
    name_m = re.search(r'\b(i am|my name is|mera naam|this is)\s+([a-zA-Z\s]+)', p_lower)
    if name_m and not any(w in p_lower for w in ["what", "who", "definition", "meaning", "how", "why"]):
        raw_name = name_m.group(2).strip().title()
        if raw_name:
            return f"Pleasure to assist you, Sir {raw_name}! All core subsystems and cognitive matrices are online and ready for your command."

    # Conversational greetings
    if p_lower in ["hello", "hi", "hey", "hello jarvis", "hi jarvis", "hey jarvis", "greetings"]:
        return "Hello Sir! Systems are running at peak efficiency and fully operational. How may I assist you today?"
    if any(q in p_lower for q in ["how are you", "how r u", "kya haal", "kaise ho"]):
        return "All systems are operating at optimal parameters, Sir. Ready to execute your commands."
    if any(q in p_lower for q in ["who are you", "tum kaun ho", "introduce yourself"]):
        return "I am J.A.R.V.I.S., your Just A Rather Very Intelligent System. Standing by to assist across engineering, automation, and cognitive operations, Sir."
    return None

def _get_gemini_key():
    gemini_key = os.getenv("GEMINI_API_KEY", "").strip()
    try:
        if os.path.exists(CONFIG_PATH):
            with open(CONFIG_PATH, "r", encoding="utf-8") as f:
                d = json.load(f)
                val = d.get("gemini_api_key", "").strip()
                # Ignore OpenAI sk- keys accidentally saved into gemini_api_key
                if val and not val.startswith("sk-"):
                    gemini_key = val
    except Exception:
        pass
    return gemini_key

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
    p_lower = prompt.lower().strip()
    # Guard: Do not search encyclopedia for conversational greetings or intros
    if any(g in p_lower for g in ["how are you", "hello", "hi jarvis", "who are you", "i am", "my name is", "kaise ho", "kya haal"]):
        return None
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

        # 2.5 Science Formula solver
        science_res = _evaluate_science_formula(prompt)
        if science_res:
            return jsonify({"status": "success", "response": science_res})

        # 2.8 Conversational & Identity solver
        conv_res = _evaluate_conversational(prompt)
        if conv_res:
            return jsonify({"status": "success", "response": conv_res})

        # Build prompt instructions
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

        # 3. Google Gemini API (Primary Cognitive Engine)
        active_gemini_key = client_key.strip() if (client_key and len(client_key.strip()) > 10) else _get_gemini_key()
        if active_gemini_key:
            # Gemini 3.8 Flash primary with resilient failover to 3.1 Flash Lite and 2.5 Flash
            models_config = [
                ('gemini-3.8-flash', 4),
                ('gemini-3.1-flash-lite', 10),
                ('gemini-2.5-flash', 10)
            ]
            for m, t_out in models_config:
                url = f"https://generativelanguage.googleapis.com/v1beta/models/{m}:generateContent?key={active_gemini_key}"
                payload = {
                    "contents": [{"parts": [{"text": prompt}]}],
                    "systemInstruction": {
                        "parts": [{"text": system_instruction}]
                    }
                }
                try:
                    res = requests.post(url, json=payload, timeout=t_out)
                    if res.status_code == 200:
                        candidates = res.json().get("candidates", [])
                        if candidates:
                            text = candidates[0].get("content", {}).get("parts", [{}])[0].get("text", "")
                            if text:
                                return jsonify({"status": "success", "response": badge + text.strip()})
                    else:
                        print(f"[Gemini API Notice] Model {m} returned {res.status_code}")
                except Exception as e:
                    print(f"[Gemini API Exception] Model {m} failed: {e}")

        # 4. Live Web Intelligence Fallback
        web_res = _web_intelligence(prompt)
        if web_res:
            return jsonify({"status": "success", "response": web_res})

        # 5. Graceful Fallback
        clean_topic = _clean_hinglish(prompt)
        topic_title = (clean_topic or prompt).title()
        return jsonify({
            "status": "success", 
            "response": f"I have received your inquiry regarding {topic_title}, Sir. Core systems are standing by — please specify what details or analysis you would like me to provide."
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500