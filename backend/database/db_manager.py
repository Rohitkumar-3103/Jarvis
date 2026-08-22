# ==========================================================================
# J.A.R.V.I.S. 3.0 - Chat Database manager
# ==========================================================================
import os
import json

CHAT_DB = os.path.join(os.path.dirname(os.path.abspath(__file__)), "chat_history.json")

def load_history():
    if os.path.exists(CHAT_DB):
        try:
            with open(CHAT_DB, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return []
    return []

def append_history(sender, text, timestamp):
    history = load_history()
    history.append({
        "sender": sender,
        "text": text,
        "timestamp": timestamp
    })
    
    if len(history) > 100:
        history.pop(0)
        
    try:
        with open(CHAT_DB, "w", encoding="utf-8") as f:
            json.dump(history, f, indent=2)
        return True
    except Exception as e:
        print(f"Failed to write chat history: {e}")
        return False

def clear_history():
    if os.path.exists(CHAT_DB):
        try:
            os.remove(CHAT_DB)
            return True
        except Exception:
            return False
    return True
