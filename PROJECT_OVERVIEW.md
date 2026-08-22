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
├── backend/
│   ├── api/
│   │   ├── ai.py           # Backend Gemini REST API connector
│   │   ├── auth.py         # OpenCV face scan, user accounts, OTP dispatch
│   │   ├── calls.py        # Secure comms and mail dispatch endpoints
│   │   ├── chat.py         # Chat history database persistence
│   │   ├── code.py         # Competitive programming & Code Interpreter router
│   │   ├── files.py        # Disk upload and dataset file management
│   │   ├── system.py       # Hardware diagnostics and shell execution
│   │   └── weather.py      # Weather lookup router
│   ├── automation/
│   │   └── os_controls.py  # Native Windows process automation
│   ├── data/
│   │   └── users.json      # Local user database
│   └── server.py           # Flask app entry point (Port 5000)
│
├── frontend/
│   ├── index.html          # Main HUD Dashboard & Side Drawer
│   ├── auth.html           # Tactical Biometric Auth Terminal (GLSL Shader)
│   ├── css/                # Modular styles (HUD, chat, lockscreen, etc.)
│   └── js/
│       ├── ai.js           # Gemini API, Pollinations AI generator, knowledge engine
│       ├── animations.js   # Canvas particle mesh & ripple physics
│       ├── app.js          # Startup boot loader
│       ├── chat.js         # Chat bubbles, code blocks, 4K artwork bubbles, PDF export
│       ├── commands.js     # Natural voice & text intent router
│       ├── dashboard.js    # Hardware telemetry polling & widgets
│       ├── lockscreen.js   # Face scanner overlay & PIN fallback
│       ├── settings.js     # 360° color wheel, theme presets, API key sync
│       ├── storage.js      # LocalStorage helpers
│       ├── utils.js        # Global UI modal handlers & sound effects
│       └── voice.js        # Web Speech STT/TTS engine
│
├── config/
│   └── api_keys.json       # Backend API configuration
├── actions/
│   └── code_helper.py      # Local code execution sandbox
├── docs/
│   ├── API_DOCUMENTATION.md # Complete REST API reference
│   ├── DEVELOPER_GUIDE.md  # Developer handbook
│   └── DESIGN.md           # Visual design specifications
├── AGENTS.md               # AI Agent primary context document
├── PROJECT_OVERVIEW.md     # THIS FILE (System Architecture)
└── run_dashboard.py        # Dual-server startup orchestrator
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
