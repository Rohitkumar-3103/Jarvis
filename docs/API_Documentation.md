# 🔌 J.A.R.V.I.S. REST API Specifications

The J.A.R.V.I.S. backend runs as a modular Flask microservice node on `http://127.0.0.1:5000` with Cross-Origin Resource Sharing (`CORS`) enabled for all routes.

---

## 📑 Summary of Endpoints

| Category | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **System** | `GET` | `/` | Health check & API version status |
| **System** | `POST` | `/api/system/command` | Execute OS actions, apps, and hardware diagnostics |
| **System** | `POST` | `/api/system/shell` | Execute raw shell commands with 10s timeout |
| **System** | `POST` | `/api/system/config` | Sync and persist Gemini API key to `config/api_keys.json` |
| **AI** | `POST` | `/api/ai/generate` | Server-side Google Gemini multi-model routing |
| **Code** | `POST` | `/api/code/helper` | Competitive programming & Code Interpreter execution |
| **Auth** | `POST` | `/api/auth/face` | OpenCV Haar Cascade facial biometric verification |
| **Auth** | `POST` | `/api/auth/login` | Credentials authentication & 2FA OTP generation |
| **Auth** | `POST` | `/api/auth/register` | New user account creation & 2FA OTP generation |
| **Auth** | `POST` | `/api/auth/verify-otp` | Verify 6-digit OTP and complete login/registration |
| **Chat** | `GET` | `/api/chat/history` | Retrieve persisted conversation log records |
| **Chat** | `POST` | `/api/chat/history` | Append a new message to conversation history |
| **Chat** | `DELETE` | `/api/chat/history` | Flush/clear conversation history registers |
| **Files** | `POST` | `/api/files/upload` | Upload dataset / document file to `uploads/` directory |
| **Files** | `GET` | `/api/files/list` | List all uploaded dataset files |
| **Weather** | `GET` | `/api/weather` | Resolve live temperature & atmospheric conditions |
| **Calls** | `POST` | `/api/calls/dispatch` | Dispatch encrypted mail / comms payload |

---

## 🔍 Detailed Endpoint Reference

### 1. System Telemetry & Commands (`/api/system/*`)

#### `POST /api/system/command`
Executes hardware diagnostics or native OS commands (launching apps, changing volume, screenshot).

**Request Body:**
```json
{
  "command": "diagnostics"
}
```

**Response (Diagnostics):**
```json
{
  "status": "success",
  "cpu": 18.5,
  "ram": 54.2,
  "temp": 38.4,
  "speed_ghz": 4.1,
  "speed_percent": 82.0,
  "message": "Diagnostics: CPU 18.5%, RAM 54.2%, Temp 38.4C, Speed 4.1GHz."
}
```

**OS Action Commands:**
- `open vscode` / `open notepad` / `open chrome` / `open calculator` / `open spotify` / `open cmd`
- `volume up` / `volume down` / `volume mute`
- `screenshot`
- `lock` / `restart` / `shutdown`

---

### 2. AI Cognition Bridge (`/api/ai/generate`)

#### `POST /api/ai/generate`
Routes queries to Google Gemini API with automatic model failover (`gemini-2.5-flash` ➔ `gemini-2.0-flash` ➔ `gemini-2.0-flash-lite` ➔ `gemini-1.5-flash`).

**Request Body:**
```json
{
  "prompt": "What is the speed of light?"
}
```

**Response:**
```json
{
  "status": "success",
  "response": "The speed of light in a vacuum is exactly 299,792,458 meters per second (approximately 300,000 km/s or 186,282 miles per second), Sir."
}
```

---

### 3. Code Interpreter & Competitive Programming (`/api/code/helper`)

#### `POST /api/code/helper`
Builds, explains, reviews, or executes code inside a localized Python execution sandbox.

**Request Body:**
```json
{
  "action": "build",
  "description": "Write code for binary search algorithm",
  "language": "python",
  "timeout": 10
}
```

**Response:**
```json
{
  "status": "success",
  "result": "def binary_search(arr, target):\n    low = 0\n    high = len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1",
  "logs": ["System: Code built and validated successfully."]
}
```

---

### 4. Biometric Authentication (`/api/auth/face`)

#### `POST /api/auth/face`
Performs facial detection on a base64-encoded webcam frame using OpenCV Haar Cascades.

**Request Body:**
```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

**Response (Success):**
```json
{
  "status": "success",
  "authorized": true,
  "faces_detected": 1,
  "message": "Retinal profile verified. Access granted, Sir.",
  "user": {
    "username": "ironman",
    "fullname": "Tony Stark",
    "role": "Primary User // Administrator",
    "avatar": "assets/images/avatar.png"
  }
}
```

---

### 5. Chat History API (`/api/chat/history`)

#### `GET /api/chat/history`
Returns stored message bubbles.

**Response:**
```json
{
  "status": "success",
  "history": [
    { "sender": "JARVIS", "text": "All systems online.", "time": "10:00 AM" },
    { "sender": "USER", "text": "System diagnostics", "time": "10:01 AM" }
  ]
}
```

#### `POST /api/chat/history`
Appends a message to persistent storage.

**Request Body:**
```json
{
  "sender": "USER",
  "text": "Hello J.A.R.V.I.S.",
  "time": "10:02 AM"
}
```