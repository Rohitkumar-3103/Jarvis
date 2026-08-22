# 🤖 AGENTS.md — AI Agent Context & System Blueprint

> **For AI Assistants & Autonomous Coding Agents (Antigravity, Gemini, Claude, GPT, Cursor, Copilot)**
> This document provides the complete mental model, architectural rules, execution flows, and technical invariants required to navigate, maintain, debug, and extend the **J.A.R.V.I.S. AI OS v3.2.0** codebase.

---

## 🎯 1. Executive Summary & Mental Model

**J.A.R.V.I.S. (Just A Rather Very Intelligent System)** is an automated full-stack AI assistant and tactical Sci-Fi Operating System inspired by the Stark Industries Mark XLVII interface.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           J.A.R.V.I.S. AI OS v3.2.0                         │
├──────────────────────────────────────┬──────────────────────────────────────┤
│       FRONTEND HUD (Port 8080)       │       BACKEND API (Port 5000)        │
│  - Glassmorphic Neon HUD Dashboard  │  - Python 3.12 / Flask REST Node     │
│  - Web Speech STT / TTS (Bilingual)  │  - OpenCV Biometric Haar Cascades    │
│  - Pollinations 4K Flux AI Generator │  - PSUtil Live Diagnostic Telemetry  │
│  - Tactical Auth Portal (auth.html)  │  - Code Interpreter Sandbox          │
│  - Dynamic 360° Theme Engine         │  - MongoDB & users.json Hybrid Auth  │
└──────────────────────────────────────┴──────────────────────────────────────┘
```

### 🧠 Core Mental Model
1. **Frontend-Driven Orchestration**: The frontend (`frontend/index.html` + `frontend/js/*.js`) acts as the central UI hub, coordinating user inputs (voice, text, clicks) and routing them through appropriate channels.
2. **Dual-Mode AI Cognition**:
   - **Cloud AI (Primary)**: Queries Google Gemini API (`gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-2.0-flash-lite`, `gemini-1.5-flash`) when a valid `AIzaSy...` key is configured.
   - **Local Knowledge Engine (Fallback)**: When offline or unconfigured, an internal knowledge base instantly answers queries without crashing or throwing error popups.
3. **Dedicated AI Image Generation**: Integrated with **Pollinations AI Flux & Flux-Anime Engine (1024x1024)**, operating completely autonomously without requiring external API keys.
4. **Local Code Automation Sandbox**: Automatically detects competitive programming / code execution requests and builds/runs them inside a localized Python sandbox via backend APIs.

---

## 📁 2. Repository Layout & Component Responsibilities

```
D:\code\html\Project\AI chat\Jarvis\
├── backend/                       # Python Flask API Microservices
│   ├── api/
│   │   ├── ai.py                  # Gemini API routing & backend fallback bridge
│   │   ├── auth.py                # Biometric face detection, OTP (Email/SMS), MongoDB & JSON auth
│   │   ├── calls.py               # Encrypted communications & mail dispatch routes
│   │   ├── chat.py                # Chat log persistence & SQLite/JSON database routes
│   │   ├── code.py                # Competitive programming & Code Interpreter execution router
│   │   ├── files.py               # Disk upload and dataset file management
│   │   ├── system.py              # CPU/RAM/Thermal telemetry, shell command executor, config sync
│   │   └── weather.py             # Global atmospheric weather data resolver
│   ├── automation/
│   │   └── os_controls.py         # Native Windows OS subprocess automation (apps, audio, power)
│   ├── data/
│   │   └── users.json             # Persistent local user account records
│   ├── database/
│   │   └── db_manager.py          # Chat history database manager
│   └── server.py                  # Primary Flask backend server entry point (Port 5000)
│
├── frontend/                      # Web HUD & Tactical Interface
│   ├── index.html                 # Main HUD Dashboard (Arc Reactor, Chat Feed, Side Drawer, Modals)
│   ├── auth.html                  # Standalone Tactical Intelligence Biometric Auth Terminal
│   ├── css/                       # Modular CSS stylesheets (HUD, Glassmorphism, animations, lockscreen)
│   ├── js/
│   │   ├── ai.js                  # Gemini AI connector, Pollinations 4K Flux generator, knowledge fallback
│   │   ├── animations.js          # Interactive particle mesh canvas & click ripple physics
│   │   ├── app.js                 # Boot loader sequencer & global DOM event bindings
│   │   ├── chat.js                # Message bubbles, Prism code blocks, 4K artwork bubbles, PDF export
│   │   ├── commands.js            # Natural language & voice command parser / intent router
│   │   ├── dashboard.js           # Live diagnostic polling (/api/system/command), telemetry widgets
│   │   ├── lockscreen.js          # Optical face scan overlay, webcam stream, PIN fallback (3000)
│   │   ├── settings.js            # 360° Color Wheel, theme presets, API key sync, voice volume slider
│   │   ├── storage.js             # LocalStorage wrapper utilities
│   │   ├── utils.js               # Global UI modal handlers, Web Audio tone synthesizers, state vars
│   │   ├── voice.js               # Web Speech STT (SpeechRecognition) & TTS (SpeechSynthesis / Cloud TTS)
│   │   └── weather.js             # Weather widget synchronization
│   └── assets/                    # HUD icons, Arc Reactor animations, avatar images
│
├── config/
│   └── api_keys.json              # Backend API keys and assistant configuration
├── actions/
│   └── code_helper.py             # Automated code execution sandbox
├── docs/                          # Comprehensive technical documentation
│   ├── API_DOCUMENTATION.md       # Complete REST API reference
│   ├── DEVELOPER_GUIDE.md         # Developer onboarding & extension handbook
│   └── DESIGN.md                  # Interface visual & UI/UX design specifications
├── AGENTS.md                      # THIS FILE (AI Agent primary context)
├── PROJECT_OVERVIEW.md            # Complete architectural overview
└── run_dashboard.py               # Unified dual-server launcher (Flask + HTTP Server)
```

---

## ⚡ 3. End-to-End Execution Workflows

### 🎙️ A. Voice / Chat Input Pipeline
```
[User Input] (Voice in EN/HI or Text)
     │
     ▼
[voice.js / SpeechRecognition] (Captures en-IN / hi-IN)
     │
     ▼
[commands.js / takeCommand(query)]
     │
     ├── 1. System Action (Apps, Volume, Power, Diagnostics)
     │       └── POST http://127.0.0.1:5000/api/system/command ──► System Response ──► speak(result)
     │
     ├── 2. Weather Query ("weather in Delhi")
     │       └── weather.js ──► Weather Widget Update & Speech Feedback
     │
     ├── 3. AI Image Generation ("make a naruto picture", "draw Iron Man suit")
     │       └── ai.js ──► Pollinations Flux 1024x1024 URL ──► Chat Bubble with 1-Click 4K Download
     │
     ├── 4. Code Automation / Competitive Programming ("write code for binary search")
     │       └── ai.js ──► POST /api/code/helper ──► Local Code Interpreter Sandbox ──► Prism Code Bubble
     │
     └── 5. General Conversational / Knowledge Query ("what is photosynthesis")
             └── ai.js / queryGeminiAPI(query)
                   │
                   ├── [Valid Gemini API Key] ──► Google Gemini REST API (gemini-2.5-flash / gemini-2.0-flash)
                   │                                  │
                   │                                  └── Success ──► Chat Response Bubble + Bilingual TTS
                   │
                   └── [Key Missing / Offline] ──► generateFallbackKnowledge() ──► Instant Clean Response + Bilingual TTS
```

---

## 🛡️ 4. Invariants & Rules for AI Agents (Critical Gotchas)

When modifying this repository, you **MUST** adhere to the following rules:

### 1. 🛑 Prevent Duplicate Click Handlers
- **Do NOT** attach an `addEventListener('click')` in `app.js` to an element that already has an inline `onclick="..."` in `index.html` (e.g., `#btn-dash-menu-toggle`, `.hud-logo`).
- Double-binding causes the handler to fire twice in 0ms, toggling modals open and immediately closed!

### 2. 🔑 Gemini API Key Validation
- Valid Gemini API keys start with `AIzaSy...`.
- In `frontend/js/utils.js` and `frontend/js/settings.js`, always validate keys before sending direct REST requests to Google's endpoints to prevent raw HTTP 400/404 errors.

### 3. 🔄 Browser Cache Invalidation
- When modifying frontend scripts (`ai.js`, `voice.js`, `commands.js`, `utils.js`, `settings.js`), update the script version query parameter in `frontend/index.html` (e.g., `<script src="js/ai.js?v=5.0.0" defer></script>`).
- This guarantees the user's browser loads the latest code on refresh.

### 4. 🌐 Dual-Server Port Invariants
- **Backend Flask Server**: Always runs on `http://127.0.0.1:5000`.
- **Frontend HTTP Server**: Served from `frontend/` on `http://127.0.0.1:8080`.
- Both servers are launched simultaneously via `python run_dashboard.py` (or `py -3.12 run_dashboard.py`).

### 5. 🗣️ Bilingual Voice & Text Protocol
- Speech Synthesis (`speak(text)`) must automatically detect Devanagari script `[\u0900-\u097F]` or Hinglish vocabulary (`namaste`, `kaise`, `main`, `aapka`, etc.) and route to `hi-IN` TTS or Google Cloud Hindi audio.
- English responses must use crisp `en-US` / `en-IN` voice engines.

### 6. 🎨 AI Image Generation Parameters
- Image generation is handled by Pollinations AI (`https://image.pollinations.ai/prompt/...`).
- Standard prompts use `&width=1024&height=1024&seed=${randomSeed}&nologo=true&enhance=true`.
- Anime character requests (`naruto`, `goku`, `anime`) use 2D studio cell-shaded prompt formatting with clear linework.

---

## 🔍 5. Global State & LocalStorage Schema

| Key | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `jarvis_gemini_key` | `string` | `""` | User's Google Gemini API Key (`AIzaSy...`) |
| `jarvis_user` | `JSON string` | Tony Stark Object | Active user profile (`{username, fullname, role, avatar}`) |
| `jarvis_hud_theme` | `string` | `"cyan"` | Active theme preset (`cyan`, `green`, `red`, `gold`, `purple`, `custom`) |
| `jarvis_custom_theme_color` | `hex string` | `"#00f0ff"` | Custom 360° color wheel hex value |
| `jarvis_voice_volume` | `float` | `1.0` | Global voice synthesis volume (`0.0` to `1.0`) |
| `jarvis_voice_pitch` | `float` | `1.0` | Voice pitch multiplier |
| `jarvis_voice_rate` | `float` | `1.0` | Voice playback speed rate |
| `jarvis_selected_voice` | `string` | `""` | User-selected speech voice name |
| `jarvis_auto_speak` | `boolean` | `true` | Auto-speak AI responses toggle |
| `jarvis_face_lock` | `boolean` | `false` | Biometric face lockscreen requirement |
| `jarvis_chat_logs` | `JSON array` | `[]` | Persisted conversation message history |

---

## 🚀 6. Launch & Verification Commands

```bash
# Recommended single-command Windows launcher (Python 3.12)
py -3.12 run_dashboard.py

# Standard launcher
python run_dashboard.py

# Direct Backend Server only
cd backend && python server.py

# Direct Frontend HTTP Server only
cd frontend && python -m http.server 8080
```

### 🧪 API Diagnostic Check
```bash
# Verify backend is running
curl -s http://127.0.0.1:5000/

# Verify system diagnostics endpoint
curl -s -X POST http://127.0.0.1:5000/api/system/command -H "Content-Type: application/json" -d "{\"command\":\"diagnostics\"}"
```
