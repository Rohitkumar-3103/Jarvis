// ==========================================================================
// J.A.R.V.I.S. 3.0 - Utilities & Global State
// ==========================================================================

// Global state variables
const BACKEND_URL = 'http://127.0.0.1:5000';
// Purge any stale OpenAI / ChatGPT keys
try {
    localStorage.removeItem('jarvis_openai_key');
    localStorage.removeItem('jarvis_chatgpt_key');
} catch (e) {}

let rawApiKey = localStorage.getItem('jarvis_gemini_key') || localStorage.getItem('jarvis_gemini_api_key') || '';
let geminiApiKey = rawApiKey.trim();

// Automatically sync Gemini API key from backend (.env / config) if not present locally
async function syncGeminiKeyFromBackend() {
    try {
        const res = await fetch(`${BACKEND_URL}/api/system/config`);
        if (res.ok) {
            const data = await res.json();
            if (data && data.gemini_api_key) {
                if (!geminiApiKey || geminiApiKey.length < 10) {
                    geminiApiKey = data.gemini_api_key.trim();
                    localStorage.setItem('jarvis_gemini_key', geminiApiKey);
                    localStorage.setItem('jarvis_gemini_api_key', geminiApiKey);
                }
                const keyInput = document.getElementById('settings-api-key');
                if (keyInput && !keyInput.value) keyInput.value = geminiApiKey;
                if (typeof updateCognitionStatus === 'function') updateCognitionStatus();
            }
        }
    } catch (e) {}
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncGeminiKeyFromBackend);
} else {
    syncGeminiKeyFromBackend();
}
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
const correctPin = '2710'; // Stark Master Access PIN

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
let reactorTelemetryInterval = null;
let isReactorOverdrive = false;

function openLogoZoomModal() {
    const modal = document.getElementById('logo-zoom-modal');
    if (!modal) return;
    modal.style.display = 'flex';
    
    // Start live telemetry fluctuation
    startReactorTelemetryStream();
}

function closeLogoZoomModal() {
    const modal = document.getElementById('logo-zoom-modal');
    if (!modal) return;
    modal.style.display = 'none';

    // Clear live telemetry interval
    if (reactorTelemetryInterval) {
        clearInterval(reactorTelemetryInterval);
        reactorTelemetryInterval = null;
    }

    // Reset overdrive if enabled
    if (isReactorOverdrive) {
        toggleReactorOverdrive(false);
    }
}

function startReactorTelemetryStream() {
    if (reactorTelemetryInterval) clearInterval(reactorTelemetryInterval);

    reactorTelemetryInterval = setInterval(() => {
        const pwrEl = document.getElementById('reactor-val-power');
        const tmpEl = document.getElementById('reactor-val-temp');
        const flxEl = document.getElementById('reactor-val-flux');
        const frqEl = document.getElementById('reactor-val-freq');

        if (!pwrEl) return;

        if (isReactorOverdrive) {
            // Overdrive jitter around 4.78 - 4.88 GW
            const jitterPwr = (4.78 + Math.random() * 0.10).toFixed(2);
            const jitterTmp = (45.2 + Math.random() * 0.8).toFixed(1);
            pwrEl.textContent = `${jitterPwr} GW`;
            if (tmpEl) tmpEl.textContent = `${jitterTmp} °C`;
        } else {
            // Nominal jitter around 3.20 - 3.28 GW
            const jitterPwr = (3.20 + Math.random() * 0.08).toFixed(2);
            const jitterTmp = (38.2 + Math.random() * 0.5).toFixed(1);
            const jitterFlx = (99.95 + Math.random() * 0.04).toFixed(2);
            pwrEl.textContent = `${jitterPwr} GW`;
            if (tmpEl) tmpEl.textContent = `${jitterTmp} °C`;
            if (flxEl) flxEl.textContent = `${jitterFlx} %`;
            if (frqEl) frqEl.textContent = `${(99.98 + Math.random() * 0.04).toFixed(2)} Hz`;
        }
    }, 1400);
}

function toggleReactorOverdrive(forceState) {
    const dialog = document.getElementById('reactor-modal-dialog');
    const btnText = document.getElementById('btn-overdrive-text');
    const badge = document.getElementById('reactor-power-badge');
    const pwrEl = document.getElementById('reactor-val-power');
    const bars = document.querySelectorAll('#reactor-power-bars .telemetry-bar-segment');

    if (forceState !== undefined) {
        isReactorOverdrive = forceState;
    } else {
        isReactorOverdrive = !isReactorOverdrive;
    }

    if (isReactorOverdrive) {
        if (dialog) dialog.classList.add('overdrive');
        if (btnText) btnText.textContent = 'DISENGAGE OVERDRIVE';
        if (badge) {
            badge.textContent = 'OVERDRIVE // 150%';
            badge.style.color = '#ffaa00';
            badge.style.borderColor = 'rgba(255, 170, 0, 0.5)';
            badge.style.background = 'rgba(255, 170, 0, 0.12)';
        }
        if (pwrEl) {
            pwrEl.textContent = '4.82 GW';
            pwrEl.style.color = '#ffaa00';
        }
        bars.forEach(bar => {
            bar.classList.add('active', 'warn');
        });
        if (typeof speak === 'function') {
            speak("Arc Reactor overdrive engaged. Power output at maximum threshold.");
        }
    } else {
        if (dialog) dialog.classList.remove('overdrive');
        if (btnText) btnText.textContent = 'OVERDRIVE BOOST';
        if (badge) {
            badge.textContent = 'NOMINAL';
            badge.style.color = '#00ff66';
            badge.style.borderColor = 'rgba(0, 255, 102, 0.3)';
            badge.style.background = 'rgba(0, 255, 102, 0.08)';
        }
        if (pwrEl) {
            pwrEl.textContent = '3.24 GW';
            pwrEl.style.color = '';
        }
        bars.forEach((bar, idx) => {
            bar.classList.remove('warn');
            if (idx < 8) bar.classList.add('active');
            else bar.classList.remove('active');
        });
        if (typeof speak === 'function') {
            speak("Overdrive disengaged. Core returning to stable synapse.");
        }
    }
}

function triggerReactorCalibration() {
    const statusText = document.getElementById('reactor-status-text');
    if (statusText) statusText.textContent = 'CALIBRATING...';

    const coreImg = document.querySelector('.reactor-core-img-box img');
    if (coreImg) {
        coreImg.style.transform = 'scale(1.1)';
        coreImg.style.filter = 'drop-shadow(0 0 45px #00f0ff) drop-shadow(0 0 70px #ffffff)';
    }

    setTimeout(() => {
        if (statusText) statusText.textContent = 'HARMONIC LOCKED';
        if (coreImg) {
            coreImg.style.transform = '';
            coreImg.style.filter = '';
        }
        if (typeof speak === 'function') {
            speak("Arc Reactor calibration sequence complete. Core resonance at 100 percent.");
        }
    }, 1200);
}

function openDashboardSideMenu() {
    const drawer = document.getElementById('dash-side-drawer');
    const backdrop = document.getElementById('dash-side-backdrop');
    if (!drawer) return;
    const isCurrentlyOpen = drawer.classList.contains('open') || (window.getComputedStyle(drawer).display === 'flex' && drawer.style.display !== 'none');
    if (isCurrentlyOpen) {
        closeDashboardSideMenu();
    } else {
        drawer.classList.add('open');
        drawer.style.setProperty('display', 'flex', 'important');
        if (backdrop) {
            backdrop.classList.add('open');
            backdrop.style.setProperty('display', 'block', 'important');
        }
        const voiceIcon = document.getElementById('side-menu-voice-icon');
        if (voiceIcon) {
            const isVoiceOn = localStorage.getItem('jarvis_auto_speak') !== 'false';
            voiceIcon.className = isVoiceOn ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
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

function toggleSideMenuVoice() {
    let isAutoSpeak = localStorage.getItem('jarvis_auto_speak') !== 'false';
    isAutoSpeak = !isAutoSpeak;
    localStorage.setItem('jarvis_auto_speak', isAutoSpeak);
    if (typeof autoSpeak !== 'undefined') {
        autoSpeak = isAutoSpeak;
    }
    const icon = document.getElementById('side-menu-voice-icon');
    if (icon) {
        icon.className = isAutoSpeak ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
    }
    if (typeof speak === 'function') {
        speak(isAutoSpeak ? "Voice output initialized, Sir." : "Voice synthesis muted.");
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

// ==========================================================================
// Quick Applications Custom Site Management Engine
// ==========================================================================

function getStoredCustomSites() {
    try {
        const stored = localStorage.getItem('jarvis_custom_sites');
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.warn("Failed to parse custom sites:", e);
        return [];
    }
}

function saveStoredCustomSites(sites) {
    try {
        localStorage.setItem('jarvis_custom_sites', JSON.stringify(sites));
    } catch (e) {
        console.warn("Failed to save custom sites:", e);
    }
}

function openAddSiteModal() {
    const modal = document.getElementById('add-site-modal');
    if (!modal) return;
    const nameInput = document.getElementById('custom-site-name');
    const urlInput = document.getElementById('custom-site-url');
    const preview = document.getElementById('custom-site-preview-icon');
    
    if (nameInput) nameInput.value = '';
    if (urlInput) urlInput.value = '';
    if (preview) {
        preview.innerHTML = '<i class="fa-solid fa-globe" style="color: var(--theme-primary); font-size: 0.95rem;"></i>';
    }
    modal.style.display = 'flex';
    setTimeout(() => {
        if (nameInput) nameInput.focus();
    }, 100);
}

function closeAddSiteModal() {
    const modal = document.getElementById('add-site-modal');
    if (modal) modal.style.display = 'none';
}

function fillSitePreset(name, url) {
    const nameInput = document.getElementById('custom-site-name');
    const urlInput = document.getElementById('custom-site-url');
    if (nameInput) nameInput.value = name;
    if (urlInput) urlInput.value = url;
    updateSiteIconPreview(url);
}

function updateSiteIconPreview(url) {
    const preview = document.getElementById('custom-site-preview-icon');
    if (!preview) return;
    if (!url || url.trim().length < 3) {
        preview.innerHTML = '<i class="fa-solid fa-globe" style="color: var(--theme-primary); font-size: 0.95rem;"></i>';
        return;
    }
    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
        formattedUrl = 'https://' + formattedUrl;
    }
    try {
        const parsed = new URL(formattedUrl);
        const faviconUrl = `https://www.google.com/s2/favicons?domain=${parsed.hostname}&sz=64`;
        preview.innerHTML = `<img src="${faviconUrl}" alt="icon" style="width: 22px; height: 22px; border-radius: 4px; object-fit: contain;" onerror="this.onerror=null; this.parentElement.innerHTML='<i class=\\'fa-solid fa-globe\\' style=\\'color: var(--theme-primary); font-size: 0.95rem;\\'></i>'">`;
    } catch (e) {
        preview.innerHTML = '<i class="fa-solid fa-globe" style="color: var(--theme-primary); font-size: 0.95rem;"></i>';
    }
}

function submitNewCustomSite() {
    const nameInput = document.getElementById('custom-site-name');
    const urlInput = document.getElementById('custom-site-url');
    if (!nameInput || !urlInput) return;

    const name = nameInput.value.trim();
    let url = urlInput.value.trim();

    if (!name || !url) {
        alert("Please provide both site name and URL.");
        return;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }

    let hostname = '';
    try {
        hostname = new URL(url).hostname;
    } catch (e) {
        alert("Please enter a valid website URL (e.g. https://chatgpt.com)");
        return;
    }

    const sites = getStoredCustomSites();
    const newSite = {
        id: 'site_' + Date.now(),
        name: name,
        url: url,
        hostname: hostname,
        favicon: `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`
    };

    sites.push(newSite);
    saveStoredCustomSites(sites);
    renderCustomSites();
    closeAddSiteModal();

    if (typeof speak === 'function') {
        speak(`Application shortcut for ${name} added to console, Sir.`);
    }
}

function deleteCustomSite(id, event) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    let sites = getStoredCustomSites();
    const targetSite = sites.find(s => s.id === id);
    sites = sites.filter(s => s.id !== id);
    saveStoredCustomSites(sites);
    renderCustomSites();

    if (targetSite && typeof speak === 'function') {
        speak(`Application shortcut for ${targetSite.name} removed, Sir.`);
    }
}

function launchCustomSite(url, name) {
    if (typeof speak === 'function') {
        speak(`Launching ${name}, Sir.`);
    }
    window.open(url, '_blank');
}

function renderCustomSites() {
    const appsGrid = document.querySelector('.apps-grid');
    if (!appsGrid) return;

    // Remove existing custom site buttons
    const existingCustomCards = appsGrid.querySelectorAll('.custom-site-card');
    existingCustomCards.forEach(c => c.remove());

    const addBtn = document.getElementById('btn-add-quick-site');
    const sites = getStoredCustomSites();

    sites.forEach(site => {
        const btn = document.createElement('button');
        btn.className = 'app-card-btn custom-site-card';
        btn.setAttribute('data-app', site.name);
        btn.setAttribute('title', `Launch ${site.name}`);
        btn.onclick = () => launchCustomSite(site.url, site.name);

        const deleteBtn = document.createElement('span');
        deleteBtn.className = 'custom-site-delete-btn';
        deleteBtn.setAttribute('title', `Remove ${site.name}`);
        deleteBtn.innerHTML = '&times;';
        deleteBtn.onclick = (e) => deleteCustomSite(site.id, e);

        const img = document.createElement('img');
        img.className = 'app-icon-img';
        img.src = site.favicon || `https://www.google.com/s2/favicons?domain=${site.hostname || 'google.com'}&sz=64`;
        img.alt = site.name;
        img.style.cssText = 'width: 24px; height: 24px; margin-bottom: 8px; border-radius: 4px; object-fit: contain; filter: drop-shadow(0 0 4px rgba(0, 240, 255, 0.4));';
        img.onerror = function() {
            this.onerror = null;
            this.src = 'https://www.google.com/s2/favicons?domain=google.com&sz=64';
        };

        const label = document.createElement('span');
        label.textContent = site.name;

        btn.appendChild(deleteBtn);
        btn.appendChild(img);
        btn.appendChild(label);

        if (addBtn && addBtn.parentNode === appsGrid) {
            appsGrid.insertBefore(btn, addBtn);
        } else {
            appsGrid.appendChild(btn);
        }
    });
}

function matchCustomSiteCommand(query) {
    if (!query) return null;
    const cleanQuery = query.toLowerCase().trim();
    const sites = getStoredCustomSites();
    for (const site of sites) {
        const name = site.name.toLowerCase();
        if (
            cleanQuery === name ||
            cleanQuery === `open ${name}` ||
            cleanQuery === `launch ${name}` ||
            cleanQuery.includes(`open ${name}`) ||
            cleanQuery.includes(`launch ${name}`)
        ) {
            return site;
        }
    }
    return null;
}

// Auto-mount custom sites on page initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderCustomSites);
} else {
    renderCustomSites();
}

