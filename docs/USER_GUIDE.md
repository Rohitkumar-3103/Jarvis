# 📖 J.A.R.V.I.S. AI OS — User Handbook & Command Reference

Welcome to the **J.A.R.V.I.S. Mark XLVII User Handbook**. This guide covers interface interactions, voice controls, 4K image generation, biometric security, and tactical HUD features.

---

## 🖥️ 1. HUD Navigation & Core Features

```
┌────────────────────────────────────────────────────────────────────────────┐
│ [≡] J.A.R.V.I.S. TACTICAL HUD               [🛡️ AUTH] [🎨 THEME] [⚙️ SETTINGS] │
├───────────────────────────────┬────────────────────────────────────────────┤
│ ⚛️ ARC REACTOR SYNAPSE        │ 💬 LIVE TACTICAL CHAT FEED                │
│  - Multi-ring animated core   │  - User & AI message bubbles               │
│  - Click to activate Voice STT│  - Syntax-highlighted code blocks          │
│  - Status: IDLE/LISTENING/    │  - 4K Pollinations artwork cards           │
│           THINKING/SPEAKING   │  - PDF Export & Clear History              │
├───────────────────────────────┼────────────────────────────────────────────┤
│ 📊 SYSTEM DIAGNOSTICS         │ ⚡ FLOATING TACTICAL DOCK                  │
│  - Real-time CPU, RAM, Temp   │  - 🎙️ Mic Toggle  |  📁 File Attachment    │
│  - Weather Widget & Radar     │  - 🔒 Lockscreen  |  ⚙️ Settings Modal     │
└───────────────────────────────┴────────────────────────────────────────────┘
```

---

## 🎙️ 2. Voice & Natural Language Commands

J.A.R.V.I.S. features bilingual understanding (English & Hindi / Hinglish). You can speak directly by clicking the **Arc Reactor** or floating **Microphone button**.

### 💻 System & OS Automation
| Voice Command | Action Executed |
| :--- | :--- |
| *"Open Chrome"* / *"Open VS Code"* | Launches the application instantly |
| *"Volume up"* / *"Volume down"* / *"Mute audio"* | Adjusts Windows system master volume |
| *"Take screenshot"* | Captures screenshot and saves to `temp/` |
| *"Lock computer"* / *"Lock workstation"* | Engages Windows Workstation Lock |
| *"System diagnostics"* / *"Check CPU"* | Returns live CPU load, RAM usage, and temperature |
| *"Shutdown system"* / *"Restart system"* | Initiates controlled OS shutdown/restart |

### 🎨 4K AI Image Generation (Zero-Key Flux Engine)
| Voice / Chat Command | Result |
| :--- | :--- |
| *"Generate image of Iron Man in cosmic space"* | Ultra-HD 1024x1024 artwork rendered in chat bubble |
| *"Make a naruto picture with rasengan"* | 2D cell-shaded anime art generated via Flux-Anime |
| *"Draw a cyberpunk futuristic Tokyo at night"* | 4K neon futuristic visual rendering |
| *Click `SAVE ULTRA-HD 4K ARTWORK`* | Downloads full-resolution PNG file to disk |

### 🧠 Knowledge, Coding & Math Queries
| Query | Response Flow |
| :--- | :--- |
| *"Write code for Quick Sort in Python"* | Generates Prism-highlighted Python code with 1-click copy |
| *"What is the theory of general relativity?"* | Provides concise, high-level scientific explanation |
| *"Weather in London"* / *"Delhi ka mausam kaisa hai"* | Live weather fetch & bilingual voice response |

---

## 🔑 3. Biometric Facial Lockscreen & Auth Portal

1. **Optical Facial Scan**:
   - Engage lockscreen via floating lock button or voice command.
   - Look at the webcam frame; OpenCV Haar Cascades automatically scan and unlock upon detection.
2. **Emergency Passcode Fallback**:
   - Click **Enter Passcode Mode** on the lockscreen overlay.
   - Enter default emergency PIN: **`3000`** (*"I love you 3000"*).
3. **Tactical Auth Terminal (`auth.html`)**:
   - Access the standalone biometric terminal at `http://127.0.0.1:8080/auth.html`.
   - Features dynamic GLSL shader canvas, pull-cord theme switcher, and 2FA OTP verification.

---

## 🎨 4. Customization & Theme Engine

- **Theme Presets**: Cyan (Stark Original), Emerald Green, Crimson Red, Arc Gold, Amethyst Purple.
- **360° Custom Color Wheel**: Pick any color hex code via HUD Settings (`⚙️`).
- **Voice Customization**: Adjust speech synthesis pitch, speed rate, and master volume from 0% to 100%.
