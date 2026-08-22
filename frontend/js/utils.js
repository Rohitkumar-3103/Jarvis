// ==========================================================================
// J.A.R.V.I.S. 3.0 - Utilities & Global State
// ==========================================================================

// Global state variables
const BACKEND_URL = 'http://127.0.0.1:5000';
let rawApiKey = localStorage.getItem('jarvis_gemini_key') || localStorage.getItem('jarvis_gemini_api_key') || '';
let geminiApiKey = rawApiKey.trim();
let selectedVoiceName = localStorage.getItem('jarvis_selected_voice') || '';
let voicePitch = parseFloat(localStorage.getItem('jarvis_voice_pitch') || '1.0');
let voiceRate = parseFloat(localStorage.getItem('jarvis_voice_rate') || '1.0');
let voiceVolume = parseFloat(localStorage.getItem('jarvis_voice_volume') || '1.0');
let autoSpeak = localStorage.getItem('jarvis_auto_speak') !== 'false'; // default true
let ambientSounds = localStorage.getItem('jarvis_ambient_sounds') === 'true'; // default false
let faceLockEnabled = localStorage.getItem('jarvis_face_lock') === 'true'; // default false

let currentCoreState = 'IDLE'; // IDLE, LISTENING, THINKING, SPEAKING
let speechVoices = [];

// App Access (Lock Screen) variables
let lockStream = null;
let enteredPin = '';
const correctPin = '3000'; // "I love you 3000"

// Call system variables
let callStream = null;
let callTimerInterval = null;
let callDuration = 0;
let isCallMuted = false;
let isCallVideoActive = true;
let currentCallContact = '';

// DOM References
const bodyEl = document.body;
const micTriggerBtn = document.getElementById('dock-mic');
const textInputField = document.getElementById('text-input-field');
const commandMicBtn = document.getElementById('command-mic-trigger');
const sendTriggerBtn = document.getElementById('send-trigger');
const settingsTriggerBtn = document.getElementById('dock-settings');
const clearLogsBtn = document.getElementById('clear-logs-btn');
const chatLogsContainer = document.getElementById('chat-logs-container');
const callShortcutTriggerBtn = document.getElementById('dock-chat');

// Settings Modal DOM References
const settingsOverlay = document.getElementById('settings-overlay');
const closeSettingsBtn = document.getElementById('close-settings-btn');
const saveSettingsBtn = document.getElementById('btn-save-settings');
const importSettingsBtn = document.getElementById('btn-import-settings');
const exportSettingsBtn = document.getElementById('btn-export-settings');
const apiKeyInput = document.getElementById('settings-api-key');
const modalThemeSelect = document.getElementById('settings-theme-select');
const modalVoiceSelect = document.getElementById('settings-voice-select');
const faceLockToggle = document.getElementById('settings-facelock-toggle');

// Core Display DOM References
const reactorCoreBtn = document.getElementById('reactor-core-btn');
const coreContainer = document.querySelector('.core-container');
const coreStateLed = document.getElementById('core-state-led');
const coreStateText = document.getElementById('core-state-text');
const coreAssistantDesc = document.getElementById('core-assistant-desc');
const cpuPercentText = document.getElementById('cpu-percent');
const cpuBar = document.getElementById('cpu-bar');
const ramPercentText = document.getElementById('ram-percent');
const ramBar = document.getElementById('ram-bar');
const tempValText = document.getElementById('temp-val');
const tempBar = document.getElementById('temp-bar');
const speedValText = document.getElementById('speed-val');
const speedBar = document.getElementById('speed-bar');
const headerBatteryDisplay = document.getElementById('header-battery-display');
const hudClock = document.getElementById('hud-clock');
const llmStatus = document.getElementById('llm-status');
const ttsStatus = document.getElementById('tts-status');

// App Access DOM References
const lockScreenOverlay = document.getElementById('lock-screen');
const lockWebcamVideo = document.getElementById('lock-webcam');
const lockStatusDisplay = document.getElementById('lock-status');
const passcodeFallbackBox = document.getElementById('passcode-fallback');
const scanTriggerBtn = document.getElementById('scan-trigger-btn');
const passcodeToggleBtn = document.getElementById('passcode-toggle-btn');
const pinDots = document.querySelectorAll('.pin-dot');
const pinKeys = document.querySelectorAll('.pin-key');
const pinClearBtn = document.getElementById('pin-clear');
const pinBypassBtn = document.getElementById('pin-bypass');

// Call System DOM References
const callOverlay = document.getElementById('call-overlay');
const callModeText = document.getElementById('call-mode-text');
const callTimerDisplay = document.getElementById('call-timer-display');
const callVideoUserVideo = document.getElementById('call-video-user');
const videoFeedsBox = document.getElementById('video-feeds-box');
const avatarFrameBox = document.getElementById('avatar-frame-box');
const callParticipantNameText = document.getElementById('call-target-name');
const callConnectionStateText = document.getElementById('call-status-text');
const callMuteToggleBtn = document.getElementById('btn-call-mute');
const callVideoToggleBtn = document.getElementById('btn-call-video');
const callEndTriggerBtn = document.getElementById('btn-call-end');

// Quick Apps DOM Buttons
const appButtons = document.querySelectorAll('.app-card-btn');

// File Upload DOM References
const dockFilesBtn = document.getElementById('dock-files');
const fileOverlay = document.getElementById('file-overlay');
const closeFileBtn = document.getElementById('close-file-btn');
const fileDropZone = document.getElementById('file-drop-zone');
const fileUploaderInput = document.getElementById('file-uploader');
const uploadedFilesList = document.getElementById('uploaded-files');

// ==========================================================================
// AUDIO CHIMES & INTERACTIVE BEEP ACTIONS
// ==========================================================================

function playInterfaceBeep() {
    if (!ambientSounds) return;
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
        // Tone 1
        const osc1 = audioCtx.createOscillator();
        const gain1 = audioCtx.createGain();
        osc1.connect(gain1);
        gain1.connect(audioCtx.destination);
        
        osc1.frequency.value = 880; // High A
        gain1.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
        
        osc1.start();
        osc1.stop(audioCtx.currentTime + 0.2);

        // Tone 2 slightly delayed
        setTimeout(() => {
            const osc2 = audioCtx.createOscillator();
            const gain2 = audioCtx.createGain();
            osc2.connect(gain2);
            gain2.connect(audioCtx.destination);
            
            osc2.frequency.value = 1320; // High E
            gain2.gain.setValueAtTime(0.03, audioCtx.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
            
            osc2.start();
            osc2.stop(audioCtx.currentTime + 0.3);
        }, 80);
    } catch (e) {
        console.warn("Audio Context blocked or uninitialized.");
    }
}

// Simple Click Chime
function playClickSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.value = 1600;
        gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.06);
    } catch(e) {}
}

function playCallRingSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
        const ringInterval = setInterval(() => {
            if (!callOverlay.classList.contains('active') || callOverlay.classList.contains('talking')) {
                clearInterval(ringInterval);
                return;
            }
            
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.type = 'sine';
            osc.frequency.value = 440;
            gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.0);
            osc.start();
            osc.stop(audioCtx.currentTime + 1.2);
        }, 2000);
    } catch(e) {}
}

// Clock updates
function updateClock() {
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    if (hudClock) hudClock.textContent = `${hrs}:${mins}:${secs}`;
}

function getFormattedTime() {
    const now = new Date();
    return now.toLocaleString(undefined, { hour: 'numeric', minute: 'numeric', hour12: false });
}

function showSystemPrompt(message, placeholder = "") {
    return new Promise((resolve) => {
        const overlay = document.getElementById('custom-prompt-overlay');
        const titleEl = document.getElementById('custom-prompt-title');
        const msgEl = document.getElementById('custom-prompt-message');
        const inputContainer = document.getElementById('custom-prompt-input-container');
        const inputEl = document.getElementById('custom-prompt-input');
        const btnOk = document.getElementById('custom-prompt-btn-ok');
        const btnCancel = document.getElementById('custom-prompt-btn-cancel');

        if (!overlay || !msgEl || !inputEl || !btnOk || !btnCancel) {
            resolve(prompt(message, placeholder));
            return;
        }

        titleEl.textContent = "SYSTEM INQUIRY";
        msgEl.textContent = message;
        inputContainer.style.display = 'block';
        inputEl.value = placeholder;
        overlay.style.display = 'flex';
        inputEl.focus();
        inputEl.select();

        const cleanUp = () => {
            overlay.style.display = 'none';
            btnOk.onclick = null;
            btnCancel.onclick = null;
            inputEl.onkeypress = null;
        };

        btnOk.onclick = () => {
            const val = inputEl.value;
            cleanUp();
            resolve(val);
        };

        btnCancel.onclick = () => {
            cleanUp();
            resolve(null);
        };

        inputEl.onkeypress = (e) => {
            if (e.key === 'Enter') {
                const val = inputEl.value;
                cleanUp();
                resolve(val);
            }
        };
    });
}

function showSystemConfirm(message) {
    return new Promise((resolve) => {
        const overlay = document.getElementById('custom-prompt-overlay');
        const titleEl = document.getElementById('custom-prompt-title');
        const msgEl = document.getElementById('custom-prompt-message');
        const inputContainer = document.getElementById('custom-prompt-input-container');
        const btnOk = document.getElementById('custom-prompt-btn-ok');
        const btnCancel = document.getElementById('custom-prompt-btn-cancel');

        if (!overlay || !msgEl || !btnOk || !btnCancel) {
            resolve(confirm(message));
            return;
        }

        titleEl.textContent = "CORE PROTOCOL CONFIRMATION";
        msgEl.textContent = message;
        inputContainer.style.display = 'none';
        overlay.style.display = 'flex';

        const cleanUp = () => {
            overlay.style.display = 'none';
            btnOk.onclick = null;
            btnCancel.onclick = null;
        };

        btnOk.onclick = () => {
            cleanUp();
            resolve(true);
        };

        btnCancel.onclick = () => {
            cleanUp();
            resolve(false);
        };
    });
}

// Global UI Modal & Side Drawer Control Functions
function openLogoZoomModal() {
    const modal = document.getElementById('logo-zoom-modal');
    if (modal) modal.style.display = 'flex';
}

function closeLogoZoomModal() {
    const modal = document.getElementById('logo-zoom-modal');
    if (modal) modal.style.display = 'none';
}

function openDashboardSideMenu() {
    const drawer = document.getElementById('dash-side-drawer');
    const backdrop = document.getElementById('dash-side-backdrop');
    if (!drawer) return;
    const isCurrentlyOpen = drawer.classList.contains('open') || window.getComputedStyle(drawer).display === 'flex';
    if (isCurrentlyOpen) {
        closeDashboardSideMenu();
    } else {
        drawer.classList.add('open');
        drawer.style.setProperty('display', 'flex', 'important');
        if (backdrop) {
            backdrop.classList.add('open');
            backdrop.style.setProperty('display', 'block', 'important');
        }
    }
}

function closeDashboardSideMenu() {
    const drawer = document.getElementById('dash-side-drawer');
    const backdrop = document.getElementById('dash-side-backdrop');
    if (drawer) {
        drawer.classList.remove('open');
        drawer.style.setProperty('display', 'none', 'important');
    }
    if (backdrop) {
        backdrop.classList.remove('open');
        backdrop.style.setProperty('display', 'none', 'important');
    }
}

function openAuthTerminalModal() {
    const modal = document.getElementById('auth-terminal-modal');
    if (modal) modal.style.display = 'flex';
}

function closeAuthTerminalModal() {
    const modal = document.getElementById('auth-terminal-modal');
    if (modal) modal.style.display = 'none';
}
