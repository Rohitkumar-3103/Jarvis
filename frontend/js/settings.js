// ==========================================================================
// J.A.R.V.I.S. 3.0 - Settings & Theme Configuration Panel
// ==========================================================================

function initSettingsForm() {
    if (apiKeyInput) apiKeyInput.value = geminiApiKey;
    if (faceLockToggle) faceLockToggle.checked = faceLockEnabled;
    
    const volSlider = document.getElementById('settings-voice-volume');
    const volDisplay = document.getElementById('voice-volume-val-display');
    if (volSlider) volSlider.value = voiceVolume;
    if (volDisplay) volDisplay.textContent = `${Math.round(voiceVolume * 100)}%`;
    
    const savedCustomColor = localStorage.getItem('jarvis_custom_theme_color');
    const savedTheme = localStorage.getItem('jarvis_hud_theme') || 'cyan';
    
    if (savedTheme === 'custom' && savedCustomColor) {
        applyCustomColor(savedCustomColor);
        if (modalThemeSelect) modalThemeSelect.value = 'custom';
        const hsl = hexToHSL(savedCustomColor);
        if (hsl) {
            const rad = ((hsl.h - 90) * Math.PI) / 180;
            setTimeout(() => updateHandlePosition(rad), 150);
        }
    } else {
        if (modalThemeSelect) modalThemeSelect.value = savedTheme;
        document.documentElement.setAttribute('data-theme', savedTheme);
        document.documentElement.style.removeProperty('--theme-primary');
        document.documentElement.style.removeProperty('--theme-glow');
    }

    updateCognitionStatus();
}

function updateCognitionStatus() {
    if (!llmStatus) return;
    if (geminiApiKey) {
        llmStatus.textContent = "GEMINI CORE";
        llmStatus.className = "status-card-value text-purple";
    } else {
        llmStatus.textContent = "LOCAL_ROUTER";
        llmStatus.className = "status-card-value text-cyan";
    }
}

// Open/Close settings actions
if (settingsTriggerBtn) {
    settingsTriggerBtn.addEventListener('click', () => {
        if (apiKeyInput) apiKeyInput.value = geminiApiKey;
        if (settingsOverlay) settingsOverlay.style.display = 'flex';
        playClickSound();
    });
}

if (closeSettingsBtn) {
    closeSettingsBtn.addEventListener('click', () => {
        if (settingsOverlay) settingsOverlay.style.display = 'none';
        playClickSound();
    });
}

// Click outside modal closes it
window.addEventListener('click', (e) => {
    if (e.target === settingsOverlay) {
        settingsOverlay.style.display = 'none';
    }
});

if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener('click', () => {
        geminiApiKey = apiKeyInput ? apiKeyInput.value.trim() : '';
        localStorage.setItem('jarvis_gemini_api_key', geminiApiKey);

        if (geminiApiKey) {
            fetch(`${BACKEND_URL}/api/system/config`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ gemini_api_key: geminiApiKey })
            }).catch(err => console.warn("Failed to sync key to backend config:", err));
        }

        if (modalVoiceSelect) {
            selectedVoiceName = modalVoiceSelect.value;
            localStorage.setItem('jarvis_selected_voice', selectedVoiceName);
        }

        if (faceLockToggle) {
            faceLockEnabled = faceLockToggle.checked;
            localStorage.setItem('jarvis_face_lock', faceLockEnabled);
        }

        if (modalThemeSelect) {
            const selectedTheme = modalThemeSelect.value;
            localStorage.setItem('jarvis_hud_theme', selectedTheme);
            if (selectedTheme === 'custom') {
                const customHex = localStorage.getItem('jarvis_custom_theme_color') || '#00f0ff';
                applyCustomColor(customHex);
            } else {
                localStorage.removeItem('jarvis_custom_theme_color');
                document.documentElement.setAttribute('data-theme', selectedTheme);
                document.documentElement.style.removeProperty('--theme-primary');
                document.documentElement.style.removeProperty('--theme-glow');
            }
        }

        updateCognitionStatus();
        if (settingsOverlay) settingsOverlay.style.display = 'none';

        appendChatBubble('JARVIS', "Settings applied. Core matrix synchronized.");
        speak("System configuration committed, Sir.");
        playInterfaceBeep();
    });
}

// Export Configurations
if (exportSettingsBtn) {
    exportSettingsBtn.addEventListener('click', () => {
        const configData = {
            gemini_api_key: geminiApiKey,
            face_lock: faceLockEnabled,
            hud_theme: localStorage.getItem('jarvis_hud_theme') || 'cyan',
            selected_voice: selectedVoiceName,
            voice_rate: voiceRate,
            voice_pitch: voicePitch
        };
        
        const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'jarvis_config_v3.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        speak("Configuration profile exported successfully, Sir.");
    });
}

// Import Configurations
if (importSettingsBtn) {
    importSettingsBtn.addEventListener('click', () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.json';
        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const config = JSON.parse(event.target.result);
                    if (config.gemini_api_key !== undefined) {
                        geminiApiKey = config.gemini_api_key;
                        localStorage.setItem('jarvis_gemini_api_key', geminiApiKey);
                    }
                    if (config.face_lock !== undefined) {
                        faceLockEnabled = config.face_lock;
                        localStorage.setItem('jarvis_face_lock', faceLockEnabled);
                    }
                    if (config.hud_theme !== undefined) {
                        localStorage.setItem('jarvis_hud_theme', config.hud_theme);
                        document.documentElement.setAttribute('data-theme', config.hud_theme);
                    }
                    if (config.selected_voice !== undefined) {
                        selectedVoiceName = config.selected_voice;
                        localStorage.setItem('jarvis_selected_voice', selectedVoiceName);
                    }
                    
                    initSettingsForm();
                    speak("Configuration profile imported successfully, Sir.");
                    appendChatBubble('JARVIS', "External settings applied. Grid synchronization complete.");
                } catch (err) {
                    speak("Failed to parse configuration profile.");
                }
            };
            reader.readAsText(file);
        };
        fileInput.click();
    });
}

// ==========================================================================
// Circular Color Wheel Picker Module
// ==========================================================================

const colorWheelWrapper = document.getElementById('color-wheel-wrapper');
const colorWheelHandle = document.getElementById('color-wheel-handle');
const colorWheelPreview = document.getElementById('color-wheel-preview');
const colorHexInput = document.getElementById('color-picker-hex-input');
const colorDefaultBtn = document.getElementById('color-picker-default-btn');

let isDraggingColor = false;

function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToHSL(hex) {
    if (!hex.startsWith('#') || hex.length !== 7) return null;
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function updateHandlePosition(angle) {
    if (!colorWheelHandle) return;
    const radius = 60; 
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    colorWheelHandle.style.transform = `translate(${x}px, ${y}px)`;
}

function applyCustomColor(hex) {
    document.documentElement.style.setProperty('--theme-primary', hex);
    document.documentElement.style.setProperty('--theme-glow', hex + '4d'); 
    
    if (colorHexInput) colorHexInput.value = hex;
    if (colorWheelPreview) {
        colorWheelPreview.style.background = hex;
        colorWheelPreview.style.boxShadow = `0 0 15px ${hex}`;
    }
    
    localStorage.setItem('jarvis_custom_theme_color', hex);
    localStorage.setItem('jarvis_hud_theme', 'custom');
    if (modalThemeSelect) modalThemeSelect.value = 'custom';
}

const colorAutoBtn = document.getElementById('color-picker-auto-btn');
let autoColorInterval = null;
window.isAutoColorCycling = false;

function startAutoColorCycling() {
    if (autoColorInterval) return;
    window.isAutoColorCycling = true;
    
    if (colorAutoBtn) {
        colorAutoBtn.style.background = 'rgba(0, 240, 255, 0.2)';
        colorAutoBtn.style.borderColor = 'var(--theme-primary)';
        colorAutoBtn.style.boxShadow = '0 0 10px var(--theme-primary)';
    }

    let currentHue = 0;
    const currentHex = localStorage.getItem('jarvis_custom_theme_color') || '#00d4ff';
    const hsl = hexToHSL(currentHex);
    if (hsl) currentHue = hsl.h;

    autoColorInterval = setInterval(() => {
        currentHue = (currentHue + 1) % 360;
        const rad = ((currentHue - 90) * Math.PI) / 180;
        updateHandlePosition(rad);
        
        const hex = hslToHex(currentHue, 100, 50);
        document.documentElement.style.setProperty('--theme-primary', hex);
        document.documentElement.style.setProperty('--theme-glow', hex + '4d'); 
        
        if (colorHexInput) colorHexInput.value = hex;
        if (colorWheelPreview) {
            colorWheelPreview.style.background = hex;
            colorWheelPreview.style.boxShadow = `0 0 15px ${hex}`;
        }
    }, 45); 
}

function stopAutoColorCycling() {
    if (!autoColorInterval) return;
    clearInterval(autoColorInterval);
    autoColorInterval = null;
    window.isAutoColorCycling = false;
    
    if (colorAutoBtn) {
        colorAutoBtn.style.background = 'rgba(0, 240, 255, 0.05)';
        colorAutoBtn.style.borderColor = 'rgba(0, 240, 255, 0.25)';
        colorAutoBtn.style.boxShadow = '0 0 5px rgba(0, 240, 255, 0.05)';
    }
    
    const finalHex = colorHexInput ? colorHexInput.value : '#00d4ff';
    localStorage.setItem('jarvis_custom_theme_color', finalHex);
    localStorage.setItem('jarvis_hud_theme', 'custom');
}

function handleColorDrag(e) {
    if (window.isAutoColorCycling) {
        stopAutoColorCycling();
    }
    if (!colorWheelWrapper) return;
    const rect = colorWheelWrapper.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - centerX;
    const y = clientY - centerY;
    
    const angle = Math.atan2(y, x);
    updateHandlePosition(angle);
    
    let deg = Math.round((angle * 180 / Math.PI) + 90);
    deg = (deg + 360) % 360;
    
    const hex = hslToHex(deg, 100, 50);
    applyCustomColor(hex);
}

if (colorWheelWrapper) {
    colorWheelWrapper.addEventListener('mousedown', (e) => {
        isDraggingColor = true;
        handleColorDrag(e);
    });
    
    window.addEventListener('mousemove', (e) => {
        if (isDraggingColor) handleColorDrag(e);
    });
    
    window.addEventListener('mouseup', () => {
        isDraggingColor = false;
    });
    
    colorWheelWrapper.addEventListener('touchstart', (e) => {
        isDraggingColor = true;
        handleColorDrag(e);
    });
    
    window.addEventListener('touchmove', (e) => {
        if (isDraggingColor) {
            e.preventDefault();
            handleColorDrag(e);
        }
    });
    
    window.addEventListener('touchend', () => {
        isDraggingColor = false;
    });
}

if (colorDefaultBtn) {
    colorDefaultBtn.addEventListener('click', () => {
        if (window.isAutoColorCycling) stopAutoColorCycling();
        applyCustomColor('#00d4ff');
        updateHandlePosition(((180 - 90) * Math.PI) / 180); 
        if (typeof playClickSound === 'function') playClickSound();
    });
}

if (colorAutoBtn) {
    colorAutoBtn.addEventListener('click', () => {
        if (window.isAutoColorCycling) {
            stopAutoColorCycling();
        } else {
            startAutoColorCycling();
        }
        if (typeof playClickSound === 'function') playClickSound();
    });
}

if (colorHexInput) {
    colorHexInput.addEventListener('input', (e) => {
        if (window.isAutoColorCycling) stopAutoColorCycling();
        const hex = e.target.value;
        if (/^#[0-9A-F]{6}$/i.test(hex)) {
            applyCustomColor(hex);
            const hsl = hexToHSL(hex);
            if (hsl) {
                const rad = ((hsl.h - 90) * Math.PI) / 180;
                updateHandlePosition(rad);
            }
        }
    });
}

window.applyCustomColor = applyCustomColor;
window.hexToHSL = hexToHSL;
window.updateHandlePosition = updateHandlePosition;
window.startAutoColorCycling = startAutoColorCycling;
window.stopAutoColorCycling = stopAutoColorCycling;
