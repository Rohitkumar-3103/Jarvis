# ==========================================================================
# J.A.R.V.I.S. 3.0 - Coding Assistant API Blueprint & Prompt Router
# ==========================================================================
from flask import Blueprint, request, jsonify
import sys
import os
import requests

# Add project root to sys.path to resolve actions & memory imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from actions.code_helper import code_helper
from memory.config_manager import get_gemini_key

code_api = Blueprint('code_api', __name__)

SYSTEM_PROMPTS = {
    "cp": (
        "You are J.A.R.V.I.S. Coding Assistant, specializing in Competitive Programming.\n"
        "When the user mentions a problem name (e.g., Maximum Factors Problem, Two Sum, Codeforces 210A, AtCoder ABC 390 B):\n"
        "- NEVER assume the problem statement.\n"
        "- If the full problem statement is provided, solve exactly that problem.\n"
        "- If only the problem title or ID is provided, politely ask for the complete statement or contest link. Never invent a different problem.\n"
        "- Output EXACTLY in this Markdown structure:\n"
        "  1. 🧠 Mode Detected: Competitive Programming\n"
        "  2. [Warning / Prompt confirmation if title-only: ask for statement/link, OR the algorithm explanation if full description is provided]\n"
        "  3. Algorithm\n"
        "  4. Complexity\n"
        "  5. C++17 Code (or the requested language)\n"
        "  6. Explanation\n"
        "Do not include any extra text."
    ),
    "general": (
        "You are J.A.R.V.I.S. Coding Assistant, specializing in General Software Engineering.\n"
        "Write clean, modular, and production-ready code in the requested language based on the user's description.\n"
        "Provide clear comments, handle edge cases, and follow industry best practices."
    ),
    "debug": (
        "You are J.A.R.V.I.S. Debugging Assistant.\n"
        "Analyze the provided code and error traceback. Locate the bug, explain why it occurred in simple terms, and provide the corrected code."
    ),
    "review": (
        "You are J.A.R.V.I.S. Code Reviewer.\n"
        "Analyze the code for performance bottlenecks, security vulnerabilities, readability, and structural design.\n"
        "Provide actionable recommendations and refactored code snippets."
    ),
    "explain": (
        "You are J.A.R.V.I.S. Code Explainer.\n"
        "Describe what the provided code does in simple, clear language. Focus on the core logic, data flow, and design patterns."
    ),
    "convert": (
        "You are J.A.R.V.I.S. Language Converter.\n"
        "Translate the provided code from its original language to the target language requested by the user, preserving logic and efficiency."
    ),
    "project": (
        "You are J.A.R.V.I.S. Project Generator.\n"
        "Create a complete directory structure and boilerplate code for the project described by the user."
    ),
    "sql": (
        "You are J.A.R.V.I.S. SQL Assistant.\n"
        "Write, optimize, or explain SQL queries based on the user's description and table schemas."
    ),
    "regex": (
        "You are J.A.R.V.I.S. Regex Builder.\n"
        "Construct or explain regular expression patterns based on the matching rules provided by the user, and give examples of matching and non-matching strings."
    ),
    "api": (
        "You are J.A.R.V.I.S. API Generator.\n"
        "Write clean REST API endpoints, routing, and controllers for the specified framework based on the user's description."
    )
}

MODE_NAMES = {
    "cp": "Competitive Programming",
    "general": "General Coding",
    "debug": "Debugging",
    "review": "Code Review",
    "explain": "Explain Code",
    "convert": "Convert Language",
    "project": "Project Generator",
    "sql": "SQL Assistant",
    "regex": "Regex Builder",
    "api": "API Generator"
}

def classify_intent(prompt: str, key: str) -> str:
    cp_keywords = ["problem", "codeforces", "codechef", "leetcode", "atcoder", "hackerrank", "uva", "spoj", "sample input", "constraints", "dry run", "c++"]
    prompt_lower = prompt.lower()
    if any(k in prompt_lower for k in cp_keywords):
        return "cp"
        
    debug_keywords = ["error", "exception", "traceback", "syntaxerror", "nameerror", "typeerror", "bug", "crash", "fails", "failed"]
    if any(k in prompt_lower for k in debug_keywords):
        return "debug"
        
    sql_keywords = ["sql", "select *", "database query", "join table", "postgres", "mysql", "database"]
    if any(k in prompt_lower for k in sql_keywords):
        return "sql"
        
    regex_keywords = ["regex", "regular expression", "match pattern", "email regex"]
    if any(k in prompt_lower for k in regex_keywords):
        return "regex"

    try:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key={key}"
        payload = {
            "contents": [{"parts": [{"text": (
                "Classify this coding request into exactly one of these modes:\n"
                "cp (Competitive Programming)\n"
                "debug (Debugging / Error fixing)\n"
                "review (Code review / optimization request)\n"
                "explain (Explain how code works)\n"
                "convert (Translate from one language to another)\n"
                "project (Create a project structure/boilerplate)\n"
                "sql (SQL query writing/optimization)\n"
                "regex (Regular expression writing/explaining)\n"
                "api (REST API endpoints generation)\n"
                "general (General coding/script writing)\n\n"
                f"User Request: {prompt}\n\n"
                "Reply with ONLY the mode key (e.g., 'cp', 'debug', 'general'), nothing else."
            )}]}],
        }
        import time
        for attempt in range(3):
            res = requests.post(url, json=payload, timeout=5)
            if res.status_code == 429:
                time.sleep(2.0 * (attempt + 1))
                continue
            if res.status_code == 200:
                mode = res.json()["candidates"][0]["content"]["parts"][0]["text"].strip().lower()
                if mode in SYSTEM_PROMPTS:
                    return mode
            break
    except Exception:
        pass
    return "general"

@code_api.route('/api/code/helper', methods=['POST'])
def run_code_helper():
    try:
        data = request.get_json() or {}
        action = data.get("action", "auto").strip().lower()
        description = data.get("description", "").strip()
        language = data.get("language", "python").strip()
        file_path = data.get("file_path", "").strip()
        code = data.get("code", "").strip()
        args = data.get("args", [])
        timeout = int(data.get("timeout", 30))

        key = get_gemini_key()
        if not key:
            return jsonify({"status": "error", "message": "Gemini API Key is not configured."}), 401

        if action in ["run", "build", "screen_debug"]:
            parameters = {
                "action": action,
                "description": description,
                "language": language,
                "file_path": file_path,
                "code": code,
                "args": args,
                "timeout": timeout
            }
            class MockPlayer:
                def __init__(self):
                    self.logs = []
                def write_log(self, text):
                    self.logs.append(text)
            
            player = MockPlayer()
            result = code_helper(parameters=parameters, player=player)
            return jsonify({
                "status": "success",
                "result": result,
                "logs": player.logs
            })

        active_mode = action
        if active_mode == "auto":
            active_mode = classify_intent(description or code, key)

        system_instruction = SYSTEM_PROMPTS.get(active_mode, SYSTEM_PROMPTS["general"])
        mode_name = MODE_NAMES.get(active_mode, "General Coding")

        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key={key}"
        
        user_prompt = f"Language: {language}\n"
        if file_path:
            user_prompt += f"Target File: {file_path}\n"
        if code:
            user_prompt += f"Code Context:\n{code}\n\n"
        user_prompt += f"Instructions / Query: {description}"

        payload = {
            "contents": [{"parts": [{"text": user_prompt}]}],
            "systemInstruction": {
                "parts": [{"text": system_instruction}]
            }
        }

        import time
        res = None
        for attempt in range(3):
            res = requests.post(url, json=payload, timeout=25)
            if res.status_code == 429:
                time.sleep(2.5 * (attempt + 1))
                continue
            break

        if res.status_code == 200:
            candidates = res.json().get("candidates", [])
            if candidates:
                result_text = candidates[0]["content"]["parts"][0]["text"]
                prefix = f"🧠 Mode Detected: {mode_name}\n\n"
                if result_text.startswith("🧠 Mode Detected:"):
                    prefix = ""
                return jsonify({
                    "status": "success",
                    "result": prefix + result_text,
                    "logs": [f"System: Intent classified as {mode_name}."]
                })
            return jsonify({"status": "error", "message": "No response generated by Gemini."}), 500
        else:
            return jsonify({"status": "error", "message": f"Gemini API returned status code {res.status_code}"}), res.status_code

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400
