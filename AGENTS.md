# 🤖 AGENTS.md — AI Agent Context & System Blueprint

> **For AI Assistants & Autonomous Coding Agents (Antigravity, Gemini, Claude, GPT, Cursor, Copilot)**
> This document provides the complete mental model, architectural rules, execution flows, and technical invariants required to navigate, maintain, debug, and extend the **J.A.R.V.I.S. AI OS v3.2.5** codebase.

---

## 🎯 1. Executive Summary & Mental Model

**J.A.R.V.I.S. (Just A Rather Very Intelligent System)** is an automated full-stack AI assistant and tactical Sci-Fi Operating System inspired by the Stark Industries Mark XLVII interface.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           J.A.R.V.I.S. AI OS v3.2.5                         │
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

```text
Jarvis/
│
├── 🚀 ORCHESTRATION & PACKAGING
│   ├── run_dashboard.py            # Main Full-Stack Launcher (Backend Port 5000 + Web HUD Port 8080)
│   ├── main.py                     # Standalone PyQt6 Live Gemini Multimodal Audio Client
│   ├── ui.py                       # Sci-Fi PyQt6 Desktop Client GUI
│   ├── setup.py                    # Setuptools Packaging Specification
│   ├── package.json                # Project Metadata & NPM Scripts
│   ├── requirements.txt            # Python Dependencies Manifest
│   ├── requirements-docker.txt     # Minimal Containerized Dependencies
│   ├── Dockerfile                  # Container Deployment Blueprint
│   ├── docker-compose.yml          # Multi-Container Compose Configuration
│   ├── .env                        # Local Secret Variables (Ignored by Git)
│   ├── .env.example                # Sample Environment Configuration Template
│   └── .gitignore                  # Git Version Control Ignore Rules
│
├── 📚 DOCUMENTATION & BLUEPRINTS
│   ├── README.md                   # Primary GitHub Presentation & Quickstart Guide
│   ├── AGENTS.md                   # AI Assistant Mental Model, Architecture Rules & Invariants
│   ├── PROJECT_OVERVIEW.md         # Full Subsystem Architecture & Module Mapping
│   ├── JARVIS_TECHNICAL_PROJECT_REPORT.md  # Formal Technical & Academic System Report
│   ├── LICENSE                     # MIT Open-Source License
│   ├── CHANGELOG.md                # Release History & Version Logs
│   ├── CONTRIBUTING.md             # Developer Contribution Guidelines
│   └── docs/                       # Technical Manuals & Subsystem Specifications
│       ├── API_DOCUMENTATION.md    # Complete REST API Endpoint Reference
│       ├── ARCHITECTURE.md         # Multi-Tier System Topology & Sequence Diagrams
│       ├── DESIGN.md               # Mark XLVII HUD Design Specifications & Tokens
│       ├── DEVELOPER_GUIDE.md      # Developer Setup & Extension Handbook
│       ├── INSTALLATION.md         # Step-by-Step Installation Handbook
│       ├── PYTHON_TUTORIAL.md      # Python Codebase Tutorial & Scripting Guide
│       └── USER_GUIDE.md           # User Operation & Voice Commands Handbook
│
├── 🖥️ FRONTEND (TACTICAL HUD WEB CLIENT — PORT 8080)
│   ├── index.html                  # Main Glassmorphic Tactical HUD Dashboard
│   ├── auth.html                   # Biometric Auth Terminal (WebGL GLSL Shader)
│   ├── favicon.ico                 # App Favicon
│   │
│   ├── css/                        # Modular Stylesheets
│   │   ├── style.css               # Core Styles & Layout Tokens
│   │   ├── dashboard.css           # HUD Panels, Arc Reactor & Tactical Call Comms
│   │   ├── chat.css                # AI Chat Bubbles & Code Prism Viewers
│   │   ├── lockscreen.css          # Biometric Face Scan & Passcode Pad
│   │   ├── settings.css            # Tactical Slide-Out Settings Panel
│   │   ├── widgets.css             # Circular Gauges & Telemetry Blocks
│   │   ├── themes.css              # 360° Theme Engine & Color Swatches
│   │   ├── animations.css          # Keyframes, Radar Pulses, Glowing Effects
│   │   ├── responsive.css          # Mobile / Tablet Viewport Queries
│   │   └── all.min.css             # Local FontAwesome 6.5.2 Icon Suite
│   │
│   ├── js/                         # Frontend Execution Engines
│   │   ├── app.js                  # Master Controller, Comms & Audio Routing
│   │   ├── ai.js                   # Gemini LLM Bridge & Pollinations 4K Flux Engine
│   │   ├── voice.js                # Bilingual Web Speech Recognition & TTS
│   │   ├── commands.js             # Voice & Text Intent Classifier
│   │   ├── dashboard.js            # HUD Widgets, Drawer & Telemetry Streams
│   │   ├── chat.js                 # Message Stream, PDF Export & Code Zoom
│   │   ├── lockscreen.js           # Biometric Face Verification & Master PIN (2710)
│   │   ├── settings.js             # Profile Sync & Color Wheel Controller
│   │   ├── weather.js              # Live Radar & Atmospheric Resolver
│   │   ├── reactor3d.js            # 3D Arc Reactor State Machine
│   │   ├── storage.js              # LocalStorage Persistent Sync
│   │   ├── animations.js           # Micro-Interactions & Particle Dynamics
│   │   └── utils.js                # DOM Selectors, Audio Chimes & Helpers
│   │
│   └── assets/                     # Media & Static Assets
│       ├── images/                 # Avatars, Logos, App Icons
│       ├── icons/                  # HUD Vector Icons
│       └── sounds/                 # Tactical HUD Sound Effects
│
├── ⚙️ BACKEND (FLASK REST MICROSERVICES — PORT 5000)
│   ├── server.py                   # Primary Flask WSGI Application Entry Point
│   ├── server_config.py            # Server Ports, Host & Environment Flags
│   │
│   ├── api/                        # REST Blueprints
│   │   ├── __init__.py             # Blueprint Package Export
│   │   ├── ai.py                   # Google Gemini REST Relay
│   │   ├── auth.py                 # Face Verification, Hybrid Auth & OTP
│   │   ├── calls.py                # Direct Satellite Voice/Video Call Relay
│   │   ├── chat.py                 # Chat History Persistence & Flushes
│   │   ├── code.py                 # Python Code Interpreter Sandbox
│   │   ├── files.py                # Dataset Upload & Document Processing
│   │   ├── system.py               # Hardware Diagnostics & OS Automation
│   │   └── weather.py              # Atmospheric Open-Meteo Gateway
│   │
│   ├── automation/                 # Native OS Automation
│   │   ├── os_controls.py          # Windows Application & Master Controls
│   │   └── media_player.py         # Native Audio & Media Stream Dispatcher
│   │
│   ├── database/                   # Storage Layer
│   │   └── chat_db.py              # SQLite / JSON Conversation Store
│   │
│   └── data/                       # User Records
│       └── users.json.example      # Sample User Account Blueprint
│
├── 🧠 CORE (MULTIMODAL LIVE ENGINES)
│   ├── __init__.py                 # Engine Package Exports
│   ├── llm.py                      # Multi-Model LLM Orchestration
│   ├── stt.py                      # Offline Whisper & Vosk Speech-to-Text
│   ├── tts.py                      # EdgeTTS, Kokoro & ElevenLabs Voices
│   ├── prompt.txt                  # Master Persona & System Instructions
│   ├── installer.py                # Dynamic Dependency Installer
│   └── startup.py                  # Initialization & System Boot Sequence
│
├── ⚡ ACTIONS (NATIVE AGENT TOOL SUITE)
│   ├── __init__.py                 # Tool Exports
│   ├── browser_control.py          # Playwright Headless Web Automation
│   ├── code_helper.py              # Local Python Sandbox & CP Helper
│   ├── computer_control.py         # Process Supervisor & System Power
│   ├── computer_settings.py        # Windows Audio, Display & Network
│   ├── desktop.py                  # Window Placement & Desktop Automation
│   ├── dev_agent.py                # Autonomous Coding Workflow Agent
│   ├── file_controller.py          # Safe Filesystem Controller & Search
│   ├── file_processor.py           # Document Summarization & Parsing
│   ├── flight_finder.py            # Flight Schedules & Travel Lookups
│   ├── game_updater.py             # Game Supervisor & Launcher
│   ├── messaging.py                # Encrypted Comms & Email Dispatch
│   ├── music.py                    # Multi-Directory Music Scanner & Player
│   ├── open_app.py                 # Application & URI Dispatcher
│   ├── proactive.py                # Background Context Monitoring
│   ├── reminder.py                 # Task Scheduling & Event Reminders
│   ├── screen_processor.py         # .NET GDI Screen Capture & OCR
│   ├── system_monitor.py           # Real-Time CPU/RAM/Temp Telemetry
│   ├── weather.py                  # Meteorological Data Provider
│   ├── web_search.py               # Live News & Web Intelligence
│   └── youtube.py                  # YouTube Audio/Video Streaming
│
├── 💾 MEMORY & CONFIG
│   ├── memory/
│   │   ├── memory_manager.py       # Conversation Context Store
│   │   ├── config_manager.py       # Setting & API Key Resolver
│   │   └── user_profile.json       # Active Profile Manifest
│   └── config/
│       ├── api_keys.json.example   # Configuration Template
│       ├── environment.py          # Cross-Platform Resolver
│       └── jarvis.ico              # Native App Icon
│
└── 🧪 TESTS & VERIFICATION
    ├── tests/
    │   ├── test_actions.py         # Native Agent Tool Unit Tests
    │   ├── test_api.py             # Flask REST Routes Verification
    │   └── test_auth.py            # Authentication & OTP Unit Tests
    ├── screenshots/                # High-Resolution HUD Interface Captures
    └── demo/                       # Video Previews & Animation Assets
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
- **2D Only Rule**: All image generation requests MUST be formatted as **strictly 2D** (flat vector art, clean cel-shaded anime illustration, 2D graphic novel art, crisp linework). 
- Explicitly exclude 3D models, 3D CGI, octane renders, and photorealism in prompt engineering.

### 7. 🔒 Master PIN & Manual Bypass Protocol
- The emergency lockscreen bypass PIN is strictly **`2710`** (not 3000).
- **Manual Click Required**: The system must NOT automatically bypass on 4 digits; the user must explicitly click the **BYPASS** button or hit the **Enter** key.

### 8. 🛰️ Tactical Hologram Communications Module Rules
- **Widescreen Clear Video Stage**: Container width is `540px` and video height is `310px` (`border-radius: 14px`). The video face must remain crystal clear without intrusive reticles, dark vignettes, or scanlines.
- **Top-Right HUD Timer Overlay**: The call timer (`#call-timer-display`) MUST be embedded directly inside the top-right corner of the video container (`position: absolute; top: 12px; right: 14px`), avoiding dead empty space above the video feed.
- **Stark Tactical HUD Identity Banner**: The `.participant-name` element is framed with dual vertical cyan pillars, top/bottom scanlines, glowing diamond reticles (`◈`), and glowing Orbitron title typography.

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
