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
├── backend/                       # Python Flask API Microservices (Port 5000)
│   ├── api/                       # REST Blueprints (ai, auth, calls, chat, code, files, system, weather)
│   ├── automation/                # Native OS controls, media playback, hardware telemetry
│   ├── data/                      # Local user records (users.json.example)
│   ├── database/                  # SQLite/JSON chat history & database manager
│   ├── config.py                  # Backend server configuration
│   └── server.py                  # Primary Flask backend server entry point
│
├── frontend/                      # Web HUD & Tactical Interface (Port 8080)
│   ├── index.html                 # Main HUD Dashboard (Arc Reactor, Chat Feed, Side Drawer, Modals)
│   ├── auth.html                  # Standalone Tactical Intelligence Biometric Auth Terminal
│   ├── favicon.ico                # App Favicon
│   ├── css/                       # Modular CSS stylesheets (HUD, Glassmorphism, animations, lockscreen)
│   ├── js/                        # Frontend modules (ai, voice, commands, dashboard, lockscreen, settings)
│   └── assets/                    # HUD icons, Arc Reactor animations, avatar images, sounds
│
├── core/                          # Multimodal Live Engines (STT, TTS, LLM Orchestration)
│   ├── __init__.py                # Package exports
│   ├── llm.py                     # LLM orchestration client (Gemini, Ollama, OpenAI)
│   ├── prompt.txt                 # Master system prompt definitions
│   ├── stt.py                     # Offline Whisper & Vosk Speech-to-Text
│   ├── tts.py                     # EdgeTTS, Kokoro, ElevenLabs Text-to-Speech
│   ├── installer.py               # Dynamic dependency installer
│   └── startup.py                 # Core startup sequence
│
├── actions/                       # Native Agent Tool Execution Handlers
│   ├── __init__.py                # Canonical tool exports
│   ├── browser_control.py         # Playwright browser automation
│   ├── code_helper.py             # Python sandbox & competitive programming
│   ├── computer_control.py        # System control & process supervisor
│   ├── computer_settings.py       # Windows settings & audio controls
│   ├── desktop.py                 # Desktop file & window management
│   ├── dev_agent.py               # Autonomous developer workflow agent
│   ├── file_controller.py         # Safe filesystem controller & search
│   ├── flight_finder.py           # Flight & travel lookups
│   ├── game_updater.py            # Game launcher & patch supervisor
│   ├── messaging.py               # Secure message & mail dispatch
│   ├── music.py                   # Media playback with dynamic fallback
│   ├── open_app.py                # Application & URI launcher
│   ├── proactive.py               # Proactive background monitoring engine
│   ├── reminder.py                # Task scheduler & reminder notifications
│   ├── screen_processor.py        # Camera & screen capture OCR/vision
│   ├── system_monitor.py          # Real-time hardware telemetry
│   ├── weather.py                 # Weather data provider
│   ├── web_search.py              # Web search & news intelligence
│   └── youtube.py                 # YouTube streaming & transcript extractor
│
├── memory/                        # Context & Configuration Management
│   ├── __init__.py
│   ├── config_manager.py          # Configuration & API key loader
│   ├── memory_manager.py          # Conversation memory persistence
│   └── user_profile.json          # Default user state
│
├── config/                        # Shared Configuration & Icons
│   ├── __init__.py
│   ├── api_keys.json.example      # Sample configuration blueprint
│   ├── environment.py             # Cross-platform environment resolution
│   └── jarvis.ico                 # App Icon
│
├── docs/                          # Comprehensive Technical Documentation
│   ├── API_DOCUMENTATION.md       # Complete REST API reference
│   ├── ARCHITECTURE.md            # System Architecture & diagrams
│   ├── DESIGN.md                  # HUD Design Specifications & Color Palettes
│   ├── DEVELOPER_GUIDE.md         # Developer setup & extension handbook
│   ├── INSTALLATION.md            # Step-by-step installation & deployment
│   ├── PYTHON_TUTORIAL.md         # Codebase tutorial & scripting guide
│   └── USER_GUIDE.md              # User operation & voice command handbook
│
├── tests/                         # Automated Unit & Integration Tests
│   ├── __init__.py
│   ├── test_ai.py                 # AI & LLM provider tests
│   ├── test_api.py                # Flask API routes tests
│   ├── test_auth.py               # Authentication & OTP tests
│   ├── test_backend.py            # Backend OS controls & diagnostics tests
│   └── test_voice.py              # STT / TTS configuration tests
│
├── screenshots/                   # High-resolution HUD interface captures
├── demo/                          # Demos & animated previews
├── run_dashboard.py               # 🚀 Main Full-Stack Launcher (Port 5000 + Port 8080)
├── main.py                        # 🎙️ Live Gemini Multimodal Audio Desktop Client
├── ui.py                          # 🖥️ PyQt6 Sci-Fi Desktop Client UI
├── setup.py                       # Standard Setuptools packaging
├── PROJECT_OVERVIEW.md            # Complete architectural overview
├── README.md                      # GitHub repository presentation
└── package.json                   # Project metadata & npm scripts
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
