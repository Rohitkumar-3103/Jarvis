# 🌐 J.A.R.V.I.S. AI OS v3.2.5 — Project Overview & Architecture Specification

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
  - Master PIN entry mode (`2710`) with explicit **BYPASS** button or Enter key execution (zero auto-advance delay).
- **Tactical Auth Terminal (`auth.html`)**:
  - Embedded inside `#auth-terminal-modal` and available standalone at `http://127.0.0.1:8080/auth.html`.
  - Features a fullscreen WebGL GLSL shader background, interactive pull-cord lamp theme controller, 5 dynamic color swatches, and 2FA OTP verification.

### 📊 6. System Diagnostics & Telemetry
- **Hardware Metrics**: Real-time polling of CPU load (%), RAM usage (%), CPU thermal temperatures (°C), and processor frequency (GHz) via `psutil`.
- **Native OS Automation**:
  - Launch applications: VS Code, Chrome, Notepad, Calculator, Spotify, Command Prompt.
  - System controls: Adjust Windows volume, take screenshots, lock workstation, system shutdown/restart.

### 🛰️ 7. Tactical Hologram Communications Subsystem
- **Direct Satellite Comms**: Direct voice or video calling link to external contacts via `POST /api/calls/call`.
- **Crystal Clear Video Stage**: Expanded `540px` width HUD card with `310px` height widescreen video container, providing full-frame face clarity free of dark vignetting or target reticles.
- **Top-Right HUD Timer Overlay**: Live ticking duration badge (`🕒 00:00`) neatly embedded directly in the top-right corner of the video stream.
- **Stark Tactical HUD Identity Banner**: Framed participant identity banner with dual cyan pillars, scanline borders, diamond HUD reticles (`◈`), and glowing Orbitron typography.
- **In-Call Pods**: Interactive Glassmorphic action buttons for Microphone Mute, Camera Video Suspend, and End Call termination.

---

## 🗂️ 3. Detailed File Tree & Responsibilities

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
│   ├── JARVIS_Project_Details.pdf  # Master PDF Documentation Specification
│   ├── LICENSE                     # MIT Open-Source License
│   ├── CHANGELOG.md                # Release History & Version Logs
│   ├── CONTRIBUTING.md             # Developer Contribution Guidelines
│   └── docs/                       # Technical Manuals & Subsystem Specifications
│       ├── API_Documentation.md    # Complete REST API Endpoint Reference
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
│   ├── css/                        # Modular Stylesheets (10 Files)
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
│   ├── js/                         # Frontend Execution Engines (13 Modules)
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
│   │   ├── system_monitoring.py    # Real-Time Telemetry & Hardware Diagnostics
│   │   ├── adb_controls.py         # Android Debug Bridge Device Controls
│   │   └── voice_commands.py       # Local Voice Command Dispatcher
│   │
│   ├── database/                   # Storage Layer
│   │   ├── db_manager.py           # SQLite & JSON Conversation Database Manager
│   │   ├── favorites.json          # Quick-Launch Favorite Applications
│   │   ├── reminders.json          # Scheduled Reminders & Events
│   │   └── settings.json           # Backend Runtime Configuration Cache
│   │
│   └── data/                       # User Records
│       ├── users.json              # Local Biometric & User Profile Store
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
│   │   ├── user_profile.json       # Active Profile Manifest
│   │   └── conversation.json       # Local Conversation Session Logs
│   └── config/
│       ├── api_keys.json.example   # Configuration Template
│       ├── environment.py          # Cross-Platform Resolver
│       └── jarvis.ico              # Native App Icon
│
└── 🧪 TESTS & VERIFICATION
    ├── tests/
    │   ├── test_actions.py         # Native Agent Tool Unit Tests
    │   ├── test_ai.py              # AI Provider & Fallback Tests
    │   ├── test_api.py             # Flask REST Routes Verification
    │   ├── test_auth.py            # Authentication & OTP Unit Tests
    │   ├── test_backend.py         # Hardware Diagnostics & OS Tests
    │   └── test_voice.py           # STT & TTS Configuration Tests
    ├── screenshots/                # High-Resolution HUD Interface Captures
    └── demo/                       # Video Previews & Animation Assets
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
