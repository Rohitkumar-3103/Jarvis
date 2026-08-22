# 🛠️ J.A.R.V.I.S. AI OS v3.2.0 — Developer & Contributor Guide

Welcome to the **J.A.R.V.I.S. Developer Guide**. This document outlines how to set up the development environment, run the dual-server architecture, extend existing modules, and troubleshoot common issues.

---

## 💻 1. Development Prerequisites

- **Operating System**: Windows 10/11 (Optimized for Windows PowerShell and OS automation).
- **Python**: Python 3.12 (Recommended).
- **Web Browser**: Google Chrome or Microsoft Edge (Required for Web Speech API and WebGL GLSL Shader support).
- **Microphone & Camera**: Required for voice STT and biometric face verification.

### Required Python Packages
Install all required dependencies:
```bash
pip install -r requirements.txt
```

Key dependencies:
- `flask`, `flask-cors` (REST API Web Framework)
- `psutil` (Hardware telemetry and diagnostic polling)
- `opencv-python` (Face detection with Haar Cascades)
- `requests` (Gemini API and external REST connectors)
- `pymongo` (Optional MongoDB authentication layer)

---

## 🚀 2. Launching J.A.R.V.I.S.

### Option A: Unified Launcher (Recommended)
Run the orchestrator script from the project root:
```bash
py -3.12 run_dashboard.py
```
*(Or `python run_dashboard.py`)*

This script automatically:
1. Starts the **Flask API Server** on `http://127.0.0.1:5000`.
2. Starts the **Frontend HTTP Web Server** on `http://127.0.0.1:8080`.
3. Opens your default web browser directly to `http://127.0.0.1:8080`.

### Option B: Manual Dual-Terminal Launch
**Terminal 1 (Backend):**
```bash
cd backend
python server.py
```

**Terminal 2 (Frontend):**
```bash
cd frontend
python -m http.server 8080
```

---

## 🧩 3. How to Extend the Codebase

### A. Adding a New Voice / Text Command
1. Open `frontend/js/commands.js`.
2. Locate the `takeCommand(message)` function.
3. Add a new pattern match block:
```javascript
else if (query.includes('activate protocol omega') || query.includes('omega protocol')) {
    appendChatBubble('JARVIS', "Protocol Omega engaged. Initializing maximum defense matrix.");
    speak("Protocol Omega engaged, Sir.");
    // Trigger custom animation or backend dispatch
    updateCoreState('IDLE');
    return;
}
```

### B. Adding a New REST API Endpoint
1. Create or open a blueprint file in `backend/api/` (e.g., `backend/api/system.py`).
2. Add the route handler:
```python
@system_api.route('/api/system/custom-action', methods=['POST'])
def custom_action():
    data = request.get_json() or {}
    # Perform automation logic
    return jsonify({"status": "success", "message": "Custom action executed."})
```
3. If creating a new blueprint file, register it in `backend/server.py`.

### C. Adding a New HUD Widget / Theme
1. Open `frontend/index.html` to add the HTML structure.
2. Open `frontend/css/dashboard.css` or `frontend/css/style.css` to add neon HUD styling using CSS variables (`var(--theme-primary)`, `var(--theme-glow)`).
3. Connect interactive logic in `frontend/js/dashboard.js`.

---

## 🧪 4. Testing & Verification

Run automated test suites using `pytest`:
```bash
pytest tests/
```

### Manual Verification Checklist:
- [ ] **Arc Reactor Core**: Click center core to verify voice recognition and audio waveform response.
- [ ] **Top-Right Menu `[👤≡]`**: Click to toggle the side menu drawer open/closed.
- [ ] **Top-Left Logo Badge**: Click to launch the 320px Arc Reactor zoom lightbox modal.
- [ ] **AI Image Generator**: Type `"make a naruto picture"` or `"draw an Iron Man suit"` to verify 1024x1024 rendering and 1-click download button.
- [ ] **Code Interpreter**: Type `"write code for binary search"` to verify code block syntax highlighting.
- [ ] **Settings Modal**: Open Settings (`⚙️`) and test 360° Color Wheel and API key configuration.
- [ ] **Tactical Auth Portal**: Open `http://127.0.0.1:8080/auth.html` to verify GLSL shader and pull-cord lamp switch.
