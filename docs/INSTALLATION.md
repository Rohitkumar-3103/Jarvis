# 🚀 J.A.R.V.I.S. AI OS — Installation & Deployment Guide

Welcome to the comprehensive installation handbook for **J.A.R.V.I.S. (Just A Rather Very Intelligent System)**.

---

## 💻 1. System Requirements

### Hardware Requirements
- **CPU**: Intel Core i5 / AMD Ryzen 5 or higher (multithreaded recommended)
- **RAM**: Minimum 8 GB (16 GB recommended for local voice/multimodal models)
- **Storage**: 2 GB free SSD storage
- **Peripherals**: Webcam (for biometric facial verification) & Microphone (for voice input)

### Software & Runtime Dependencies
- **Python**: Version `3.10`, `3.11`, or `3.12`
- **Node.js** (Optional): v18+ for script management
- **Operating System**: Windows 10/11 (fully supported), Linux (Ubuntu 22.04+), macOS (Apple Silicon / Intel)

---

## ⚡ 2. Quickstart Installation (Windows)

### Step 1: Clone Repository
```bash
git clone https://github.com/Rohitkumar-3103/Jarvis.git
cd Jarvis
```

### Step 2: Create & Activate Virtual Environment
```powershell
# Create virtual environment
python -m venv venv

# Activate on Windows PowerShell
.\venv\Scripts\Activate.ps1

# Activate on Command Prompt
.\venv\Scripts\activate.bat
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Configure API Credentials
Copy the sample configuration file and insert your API keys:
```powershell
Copy-Item config\api_keys.json.example config\api_keys.json
```
Edit `config/api_keys.json`:
```json
{
  "gemini_api_key": "AIzaSyYourGoogleGeminiApiKeyHere"
}
```
*(Optional: You can also configure the Gemini API key directly in the HUD interface under Settings ⚙️).*

### Step 5: Launch J.A.R.V.I.S.
```bash
python run_dashboard.py
```
This automatically boots:
- Flask REST API Server on `http://127.0.0.1:5000`
- Tactical Web HUD on `http://127.0.0.1:8080`
- Launches your default web browser to the HUD

---

## 🐳 3. Docker Container Deployment

J.A.R.V.I.S. includes container configurations for isolated deployment.

### Single-Container Build & Run
```bash
# Build Docker image
docker build -t jarvis-ai-os -f Dockerfile .

# Run container exposing Ports 5000 & 8080
docker run -d -p 5000:5000 -p 8080:8080 --name jarvis jarvis-ai-os
```

### Docker Compose
```bash
docker compose up -d --build
```
Access the tactical HUD at `http://localhost:8080`.

---

## 🎙️ 4. Optional Native Audio & Desktop Client

For real-time Gemini Live audio streaming via PyQt6:
```bash
pip install PyQt6 sounddevice
python main.py
```

---

## 🔍 5. Verification & Health Check

Verify your installation by running automated tests:
```bash
pytest
```
Expected output:
```text
tests/test_ai.py ..
tests/test_api.py ...
tests/test_auth.py ..
tests/test_backend.py ...
tests/test_voice.py .
===================== 11 passed in 4.5s =====================
```
