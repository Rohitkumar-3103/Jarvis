# 🌐 J.A.R.V.I.S. AI OS v3.2.0 — Project Overview & Architecture Specification

## 🌟 1. System Vision & Purpose
**J.A.R.V.I.S. (Just A Rather Very Intelligent System)** is an automated full-stack AI assistant and tactical desktop operating system. It merges cutting-edge Large Language Models (Google Gemini), high-resolution AI image generation (Pollinations Flux 4K), biometric facial verification (OpenCV Haar Cascades), real-time system diagnostic telemetry, and bilingual voice synthesis into a Glassmorphic Sci-Fi HUD inspired by the Stark Industries Mark XLVII interface.

---

## 🛠️ 2. Core Subsystems

### ⚛️ 1. Arc Reactor & Central Cognitive Synapse
- **Visualizer**: Multi-ring concentric SVG/Canvas core animating based on system states:
  - `IDLE`: Subtle cyan pulsing animation.
  - `LISTENING`: Radiant emerald/cyan wave audio frequency oscillations.
  - `THINKING`: Rapid violet/magenta concentric matrix rotations.
  - `SPEAKING`: Kinetic soundwave ripple animations synchronized with audio output.
- **Microphone Core Interaction**: Click the center Arc Reactor or floating dock microphone to start bilingual voice listening.

### 🎙️ 2. Bilingual Voice Engine (STT & TTS)
- **Speech Recognition (STT)**:
  - Powered by HTML5 Web Speech API (`webkitSpeechRecognition`).
  - Automatically configured for bilingual recognition (`en-IN` / `hi-IN` / `en-US`), allowing seamless input in English, Hindi, or Hinglish.
- **Speech Synthesis (TTS)**:
  - **English Output**: Utilizes native OS speech synthesis voices (`en-US`, `en-IN`, `en-GB`).
  - **Hindi Output**: Detects Devanagari script `[\u0900-\u097F]` and Hinglish vocabulary (`namaste`, `kaise`, `main`, `aapka`, `sahayata`, `sawaal`) and routes to Hindi TTS voices or high-fidelity Google Cloud Hindi audio.
  - **Global Volume State**: Controlled via HUD volume slider (`0%` to `100%`) or voice commands (*"set volume to 80%"*, *"mute voice"*).

### 🤖 3. Dual-Layer AI Cognition & Code Interpreter
- **Cloud LLM (Google Gemini)**:
  - Multi-model resilient pipeline: attempts `gemini-2.5-flash` ➔ `gemini-2.0-flash` ➔ `gemini-2.0-flash-lite` ➔ `gemini-1.5-flash`.
  - Configurable via HUD Settings modal (`⚙️`) or direct command (`set api key AIzaSy...`).
- **Offline Knowledge Synthesis Engine (Fallback)**:
  - Provides instant, intelligent responses when offline or when no API key is configured.
  - Built-in subject coverage: Science, Mathematics, Physics, Chemistry, Biology, History, Computer Science, Economics, Indian & Global Cities (Delhi, Mumbai, London, Tokyo with live weather triggers).
- **Automated Code Interpreter & Competitive Programming**:
  - Automatically classifies programming problems (LeetCode, Codeforces, algorithms) and executes code inside a localized Python sandbox via `POST /api/code/helper`.
  - Renders syntax-highlighted code blocks with 1-click **Copy** and **Fullscreen Zoom** buttons.

### 🎨 4. AI Image Generation (4K Flux Engine)
- **Engine**: Integrated with Pollinations AI **1024x1024 Flux & Flux-Anime** neural models.
- **Zero API Key Requirement**: Generates ultra-HD artwork directly without requiring third-party accounts or subscriptions.
- **Natural Intent Triggers**: Triggers on *"make a naruto picture"*, *"generate image of Iron Man"*, *"draw a cyberpunk city"*, *"create wallpaper"*.
- **Interactive UI**:
  - Displays generated artwork inside neon glowing chat bubbles.
  - Includes a 1-click **`SAVE ULTRA-HD 4K ARTWORK`** button to download PNG images locally.

### 🔑 5. Tactical Biometric Lockscreen & Auth Portal
- **Optical Face Verification**:
  - Captures real-time webcam frames and analyzes them using OpenCV Haar Cascade models (`haarcascade_frontalface_default.xml`) via `POST /api/auth/face`.
- **Passcode Fallback**:
  - PIN entry mode with default emergency bypass code (`3000`).
- **Tactical Auth Terminal (`auth.html`)**:
  - Embedded inside `#auth-terminal-modal` and available standalone at `http://127.0.0.1:8080/auth.html`.
  - Features a fullscreen WebGL GLSL shader background, interactive pull-cord lamp theme controller, 5 dynamic color swatches, and 2FA OTP verification.

### 📊 6. System Diagnostics & Telemetry
- **Hardware Metrics**: Real-time polling of CPU load (%), RAM usage (%), CPU thermal temperatures (°C), and processor frequency (GHz) via `psutil`.
- **Native OS Automation**:
  - Launch applications: VS Code, Chrome, Notepad, Calculator, Spotify, Command Prompt.
  - System controls: Adjust Windows volume, take screenshots, lock workstation, system shutdown/restart.

---

## 🗂️ 3. Detailed File Tree & Responsibilities

```text
Jarvis/
├── backend/                       # Python Flask API Microservices (Port 5000)
│   ├── api/                       # REST Blueprints (ai, auth, calls, chat, code, files, system, weather)
│   ├── automation/                # Native OS automation & hardware diagnostics
│   ├── data/                      # Local user database
│   ├── database/                  # SQLite/JSON database manager
│   ├── config.py                  # Backend server configuration
│   └── server.py                  # Primary Flask backend server entry point
│
├── frontend/                      # Web HUD & Tactical Interface (Port 8080)
│   ├── index.html                 # Main HUD Dashboard & Side Drawer
│   ├── auth.html                  # Standalone Tactical Intelligence Biometric Auth Terminal
│   ├── favicon.ico                # App Favicon
│   ├── css/                       # Modular styles (HUD, chat, lockscreen, etc.)
│   ├── js/                        # Frontend JavaScript engines (ai, voice, commands, etc.)
│   └── assets/                    # HUD icons, Arc Reactor animations, avatar images, sounds
│
├── core/                          # Multimodal Live Audio Engines
│   ├── __init__.py                # Package exports
│   ├── llm.py                     # LLM provider orchestration (Gemini, Ollama, OpenAI)
│   ├── prompt.txt                 # Master system prompt definitions
│   ├── stt.py                     # Offline Whisper & Vosk Speech-to-Text
│   ├── tts.py                     # EdgeTTS, Kokoro, ElevenLabs Text-to-Speech
│   ├── installer.py               # Dynamic dependency installer
│   └── startup.py                 # Core startup sequence
│
├── actions/                       # Native Tool Execution Handlers
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
├── screenshots/                   # High-resolution HUD interface captures
├── demo/                          # Demos & animated previews
├── run_dashboard.py               # 🚀 Unified Full-Stack Launcher (Port 5000 + Port 8080)
├── main.py                        # 🎙️ Live Gemini Multimodal Audio Desktop Client
├── ui.py                          # 🖥️ PyQt6 Sci-Fi Desktop Client UI
├── setup.py                       # Standard Setuptools packaging
├── README.md                      # GitHub repository presentation
├── AGENTS.md                      # AI Assistant primary context document
├── PROJECT_OVERVIEW.md            # THIS FILE (System Architecture)
└── package.json                   # Project metadata & npm scripts
```

---

## 🎨 4. Theme & Customization Matrix

The HUD supports 5 predefined theme swatches and a continuous 360° Color Wheel:

| Theme Name | Primary Color | Glow RGBA | Key CSS Variable |
| :--- | :--- | :--- | :--- |
| **Cyan Matrix (Default)** | `#00f0ff` | `rgba(0, 240, 255, 0.4)` | `[data-theme="cyan"]` |
| **Green Diagnostics** | `#00ff66` | `rgba(0, 255, 102, 0.4)` | `[data-theme="green"]` |
| **Red Combat Mode** | `#ff3333` | `rgba(255, 51, 51, 0.4)` | `[data-theme="red"]` |
| **Gold Centurion** | `#ffb700` | `rgba(255, 183, 0, 0.4)` | `[data-theme="gold"]` |
| **Purple Quantum** | `#a855f7` | `rgba(168, 85, 247, 0.4)` | `[data-theme="purple"]` |
| **Custom 360° Wheel** | User Defined | Dynamic RGBA | `--theme-primary` dynamic |
