# 🌐 J.A.R.V.I.S. AI OS v3.2.0

Welcome to **J.A.R.V.I.S. (Just A Rather Very Intelligent System)**—an advanced automated full-stack AI assistant and tactical desktop operating system inspired by the Stark Industries Mark XLVII interface.

> 📚 **Context & Architecture Documentation for AI Agents & Developers:**
> - 🤖 **[AGENTS.md](AGENTS.md)** — Core Mental Model, System Invariants & AI Agent Context
> - 🏗️ **[PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)** — Full Subsystem Architecture & Module Mapping
> - 🔌 **[API Documentation](docs/API_DOCUMENTATION.md)** — Complete REST API Reference
> - 🛠️ **[Developer Guide](docs/DEVELOPER_GUIDE.md)** — Setup, Extension & Testing Handbook
> - 🎨 **[Design Specifications](docs/DESIGN.md)** — UI/UX, Typography & Color Wheel System

---

## 🚀 Key Features

*   **Holographic Glassmorphic UI**: A desktop dashboard featuring neon glowing accents, diagnostic status logs, a digital clock, battery metrics, and animated HUD scanning lines.
*   **Dual Input Modes**: Interact via voice commands (Web Speech Recognition) or direct text commands in the terminal bar.
*   **Interactive Arc Reactor Core**: A central reactor orb that reacts visually to different states:
    *   🔵 `STANDBY` (Pulsing Cyan)
    *   🔴 `LISTENING` (Active Ring Pulsing Red)
    *   🟣 `SYNAPSING` (Fast Rotating Purple)
    *   🟢 `VOCALIZING` (Speech-synced Green)
*   **Speech Synthesis (TTS)**: J.A.R.V.I.S. speaks back to you with custom speed (synaptic rate) and pitch controls, using your device's built-in system voices.
*   **Gemini Cognitive Integration**: Paste your Gemini API key inside the settings modal to unlock true generative AI conversation capabilities.
*   **Local Action Routing**: Command J.A.R.V.I.S. to perform local machine operations like opening Google, YouTube, Calculator, setting/navigating to a favorite website, or reading out the current date and time.
*   **Persistent Configuration**: Settings (voice models, rate, API keys, favorite URLs) are saved directly in your browser's local storage.

---

## 🛠️ Technology Stack

*   **Structure**: HTML5 (Semantic modules, modal dialogues)
*   **Styling**: CSS3 (Custom properties, CSS Grid/Flexbox layouts, Backdrop blur filters, Keyframe animations)
*   **Logic**: JavaScript (ES6+, asynchronous fetch API, Web Speech API integration)
*   **AI Engine**: Google Gemini API (`gemini-1.5-flash` model)

---

## 📦 Getting Started

### 1. Download the Project
Clone or download the project files into your local directory. The final project structure consists of:
```text
JARVIS-AI/
│
├── README.md
├── LICENSE
├── CHANGELOG.md
├── CONTRIBUTING.md
├── requirements.txt
├── package.json
├── .gitignore
├── setup.py
├── main.py
├── run_dashboard.py
│
├── frontend/
│   ├── index.html
│   ├── favicon.ico
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   ├── sounds/
│   │   ├── videos/
│   │   └── fonts/
│   │
│   ├── css/
│   │   ├── style.css
│   │   ├── dashboard.css
│   │   ├── animations.css
│   │   ├── chat.css
│   │   ├── lockscreen.css
│   │   ├── settings.css
│   │   ├── widgets.css
│   │   ├── themes.css
│   │   └── responsive.css
│   │
│   └── js/
│       ├── app.js
│       ├── voice.js
│       ├── ai.js
│       ├── chat.js
│       ├── commands.js
│       ├── dashboard.js
│       ├── weather.js
│       ├── lockscreen.js
│       ├── settings.js
│       ├── storage.js
│       ├── animations.js
│       └── utils.js
│
├── backend/
│   ├── server.py
│   ├── config.py
│   │
│   ├── api/
│   │   ├── auth.py
│   │   ├── chat.py
│   │   ├── system.py
│   │   ├── weather.py
│   │   ├── calls.py
│   │   ├── files.py
│   │   └── ai.py
│   │
│   ├── automation/
│   │   ├── browser.py
│   │   ├── calculator.py
│   │   ├── desktop.py
│   │   ├── media.py
│   │   ├── screenshot.py
│   │   └── system_control.py
│   │
│   ├── database/
│   │   ├── chat_history.json
│   │   ├── settings.json
│   │   ├── favorites.json
│   │   └── reminders.json
│   │
│   └── models/
│       ├── face_auth.py
│       ├── diagnostics.py
│       └── ai_engine.py
│
├── core/
│   ├── llm.py
│   ├── speech_to_text.py
│   ├── text_to_speech.py
│   ├── memory_manager.py
│   ├── installer.py
│   └── startup.py
│
├── actions/
│   ├── browser_control.py
│   ├── desktop_control.py
│   ├── weather.py
│   ├── reminder.py
│   ├── youtube.py
│   ├── file_search.py
│   ├── screen_capture.py
│   ├── messaging.py
│   └── music.py
│
├── memory/
│   ├── conversation.json
│   ├── user_profile.json
│   ├── settings.json
│   └── cache/
│
├── config/
│   ├── api_keys.json
│   ├── certificates/
│   ├── prompts/
│   └── environment.py
│
├── docs/
│   ├── Project_Report.pdf
│   ├── User_Guide.md
│   ├── API_Documentation.md
│   ├── Installation.md
│   ├── Architecture.png
│   └── Screenshots/
│
├── screenshots/
│   ├── boot-screen.png
│   ├── login.png
│   ├── dashboard.png
│   ├── weather.png
│   ├── automation.png
│   ├── chat.png
│   ├── voice.png
│   └── settings.png
│
├── demo/
│   ├── demo.mp4
│   └── demo.gif
│
├── tests/
│   ├── test_api.py
│   ├── test_voice.py
│   ├── test_ai.py
│   └── test_backend.py
```

### 2. Run a Local Server
Due to browser security protocols, the **Web Speech Recognition API** requires hosting on a secure origin or `localhost` to allow microphone permissions.

Run a lightweight static server using Node.js:
```bash
# Start a quick local web server using npx
npx http-server -p 8080
```
Alternatively, if you use VS Code, you can click **Go Live** using the *Live Server* extension.

### 3. Access J.A.R.V.I.S.
Open your browser and navigate to:
```url
http://localhost:8080
```

---

## 🗣️ Voice Commands Guide

| Command | Action / Response |
| :--- | :--- |
| `"Hey J.A.R.V.I.S."` / `"Hello"` | Greets you and checks system diagnostic logs. |
| `"What time is it?"` | Reads out and prints the current system time. |
| `"What is the date?"` | Reads out and prints today's date. |
| `"Open Google"` | Opens Google in a new browser tab. |
| `"Open YouTube"` | Opens YouTube in a new browser tab. |
| `"Open WhatsApp"` | Opens WhatsApp Web and calls backend launch. |
| `"Open GitHub"` | Opens GitHub in a new browser tab. |
| `"Open File Explorer"` / `"Open File"` | Launches native Windows File Explorer. |
| `"Open VS Code"` / `"Open code file"` | Opens VS Code editor in the current project workspace. |
| `"Open Calculator"` | Launches your operating system's native calculator application. |
| `"Play Music"` / `"Music"` | Opens YouTube Music and executes backend play. |
| `"Send Email"` / `"Email"` | Opens Gmail composer and launches local mail. |
| `"Open Notepad"` / `"Notepad"` | Opens native Windows Notepad application. |
| `"Take Screenshot"` / `"Screenshot"` | Captures full screen and saves to `Assets/screenshot.png`. |
| `"Shutdown System"` / `"Shutdown"` | Initiates a 60-second host computer shutdown countdown. |
| `"Abort Shutdown"` / `"Cancel Shutdown"` | Cancels the active system shutdown timer. |
| `"Set favorite website to [URL]"` | Registers a target URL in localStorage (e.g. `set favorite website to github.com`). |
| `"Open favorite website"` | Opens your registered favorite URL. |
| *[Any general query]* | If a Gemini API key is configured, queries the LLM. If offline, launches a Google search scan. |

---

## ⚙️ Connecting the Gemini AI Layer

1.  Obtain a free **Google Gemini API Key** from [Google AI Studio](https://aistudio.google.com/).
2.  Open the settings slider panel in the bottom-right corner of the J.A.R.V.I.S. dashboard.
3.  Paste your API key into the **Gemini Intelligence Link** field.
4.  Click **Apply Configuration**.
5.  *J.A.R.V.I.S.* is now fully sentient! Ask him complex questions, write code, or have general conversations.

---

## 🔍 How It Works (Code Architecture)

### Speech Recognition (Speech-to-Text)
Browser audio is processed via the `webkitSpeechRecognition` constructor. J.A.R.V.I.S. listens, outputs text to the chat bubble, and forwards it to the command processor:
```javascript
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    takeCommand(transcript);
};
```

### Cognitive API Routing
If an API key exists, J.A.R.V.I.S. sends a payload containing a system role instruction to ensure the AI speaks under the J.A.R.V.I.S. persona:
```javascript
const requestPayload = {
    contents: [{ parts: [{ text: promptText }] }],
    systemInstruction: {
        parts: [{ 
            text: "You are J.A.R.V.I.S., the legendary advanced AI system. Speak politely, use terms like 'Sir', and keep responses extremely crisp, informative, and to-the-point (under 3-4 sentences max) so they translate perfectly to voice feedback." 
        }]
    }
};
```

### Speech Synthesis (Text-to-Speech)
Responses are spoken back using custom voice options populated from `window.speechSynthesis.getVoices()`:
```javascript
const utterance = new SpeechSynthesisUtterance(cleanSpeechText);
utterance.voice = selectedVoiceProfile;
utterance.pitch = voicePitch;
utterance.rate = voiceRate;
window.speechSynthesis.speak(utterance);
```

---

## 🔄 Recent Updates (Version 3.2.0)

*   **Holographic Fullscreen Code Modal**: Integrated a dedicated expand/zoom icon (`fa-expand`) next to code block copy buttons. Clicking it opens a beautiful, full-screen holographic modal viewer (`#code-zoom-overlay`) with backdrop-blur, custom copy shortcuts, and responsive syntax highlighting.
*   **Return Code Compiler Validation**: Refactored the code interpreter engine (`code_helper.py`) to validate executions using the child process's exit status (`result.returncode == 0`) rather than simple keyword string scans. This completely eliminates false-positive error detections on successful script runs that output status logs.
*   **Brand Shortcuts & SVG Vectors**: Replaced Instagram shortcuts with **Google Gemini** and **EdClub** (typing portal links) on the dashboard app grid and commands list. All app cards now render with their authentic, high-fidelity brand colors using crisp SVG vectors and transparent cropped assets (such as the EdClub orange bird).
*   **Jumping Hover Animations**: Added CSS translation support for SVG elements and images within the quick launch dashboard grid so they animate and bounce up in unison on hover.
*   **Double Header Removal**: Fixed output duplicate print bugs by removing redundant duplicate `Output:` headers from the backend interpreter string formatting blocks.
*   **Streamlined Startup (Mark XLVII Removal)**: Simplified [run_dashboard.py](file:///d:/code/html/Project/AI%20chat/Jarvis/run_dashboard.py) to remove selection menu choices and references to the Mark XLVII Desktop Voice Assistant GUI (`main.py`), enabling direct one-click execution of the Web HUD Dashboard.
*   **WebBrowser Calculator Open**: Swapped shell subshell execution (`os.system`) for Python's standard `webbrowser.open()` library method when launching the custom HTML calculator. This bypasses permissions restrictions and opens the calculator reliably in the default browser.
*   **Robust .NET GDI Screen Capture**: Replaced the clipboard PrintScreen keypress fallback (which returned Access Denied and Null Pointer errors on background runs, re-saving the same old image) with a dynamic PowerShell `.ps1` execution script that calls the native Windows `.NET` GDI `CopyFromScreen` API directly, enabling real-time correct screen captures.
*   **Dynamic Python Interpreter Detection**: Programmed the primary launcher script to automatically scan all available Python executables (`sys.executable`, `py -3.12`, `py -3.10`, `python3`, `python`) to identify which one contains the required system dependencies (like `Flask`), preventing crash loops when a new/empty Python version (like Python 3.14.6) is set as the default `py` handler.
*   **Direct AI Image Generation Engine**: Added a native client intent parser inside the chat engine (`ai.js`) to capture graphics creation commands (e.g. `"make naruto picture"`, `"create image of a futuristic city"`). This dynamically extracts the visual description, streams a request to the free, fast Pollinations AI generator endpoint, and directly appends the generated image to your HUD chat log bubble.
*   **Interactive Inline Image Download Button**: Integrated a styled download button directly underneath all image chat bubbles. This fetches the generated image payload as a blob and triggers a native download file stream, allowing the user to save the image directly to their computer's `Downloads` folder, bypassing default browser cross-origin download restrictions.
*   **Explicit IPv4 Loopback Routing**: Configured the frontend client to send API requests explicitly to `http://127.0.0.1:5000` instead of using `window.location.hostname` (which translates to `localhost` and causes Windows to block connections by routing them to the inactive IPv6 `[::1]` interface). Binds the Flask server to `0.0.0.0` by default to listen on all interfaces.

## 🔄 Recent Updates (Version 3.0)

*   **Holographic Prompt Overlay Modals**: Completely replaced old generic browser `prompt()` and `confirm()` dialogs with custom-designed holographic overlay modals matching the dark sci-fi HUD theme. Includes Chrome autofill overrides to preserve the dark theme styling.
*   **Copy-to-Clipboard Chat Bubble Actions**: Added hover copy buttons with a success checkmark animation to all chat bubbles (including dynamic messages and startup greetings) for ease of extracting responses.
*   **Spinning Arc Reactor Logo**: Scaled up and styled the top-left logo with a layered, animated Arc Reactor (slow-spinning atom ring and a bright glowing white core dot).
*   **Multi-Model Quota Failover**: Programmed a connection loop that automatically cycles through fallback models (`gemini-2.0-flash`, `gemini-flash-latest`) when hitting 429 quota rate limit errors, maintaining continuous conversation in the free tier.
*   **Alternating Core Rings**: Configured all three surrounding status rings of the central core dashboard to rotate in opposite directions at different speeds, creating a 3D holographic diagnostic effect behind the main GIPHY core GIF.
*   **Telemetry Ordering & Spacing**: Reordered top metrics bar to `[WEATHER] [CLOCK] [BATTERY]` with native browser telemetry bindings and improved main title version label margins.
*   **Biometric Camera Frame Grabber**: Intercepts `"camera screenshot"` or `"take photo"` to snap real-time webcam frames via OpenCV (`cv2`) and display them inside secure chat bubbles.
*   **Responsive Application Cards**: Populated the workspace launcher deck with new grid cards for **Instagram** and **Music** shortcuts.
*   **Unified Brand Theme Sheets**: Re-routed theme styling variables to `themes.css` and added modular circular gauge canvas classes to `widgets.css`.
*   **Media Playback Controls**: Programmed a local directory track scanner under `actions/music.py` with support for keyboard media event hooks (Play/Pause, Next Track).
*   **Automated Testing Suite**: Implemented 9 working test cases covering Flask server endpoints, LLM model providers, and system monitoring telemetry.
*   **Optimized Console Streams**: Removed local file logging (`logs/` directory) and configured standard output console streams.
