// ==========================================================================
// J.A.R.V.I.S. 3.0 - Primary Application Entry & Startup Sequencer
// ==========================================================================

// Startup sequencer initialized in window load event

window.addEventListener('load', () => {
    updateClock();
    setInterval(updateClock, 1000);
    runStartupSequence();
});

function runStartupSequence() {
    const startupOverlay = document.getElementById('startup-overlay');
    const dashboardContainer = document.getElementById('dashboard-container');
    const logsBox = document.getElementById('startup-logs');
    
    if (!startupOverlay) {
        bypassLockScreen();
        return;
    }

    const logLines = [
        "Loading Neural Engine...",
        "Loading AI Modules...",
        "Voice Engine .......... OK",
        "Security .............. OK",
        "Diagnostics ........... OK",
        "Welcome Back, Sir."
    ];

    let delay = 600;
    logLines.forEach((line, index) => {
        setTimeout(() => {
            const p = document.createElement('p');
            p.className = 'log-line';
            p.textContent = `> ${line}`;
            logsBox.appendChild(p);
            
            playClickSound();

            if (index === logLines.length - 1) {
                setTimeout(() => {
                    startupOverlay.style.opacity = '0';
                    setTimeout(() => {
                        startupOverlay.style.display = 'none';
                        dashboardContainer.style.display = 'block';
                        
                        initSpeechSynthesis();
                        initBatteryInfo();
                        initSettingsForm();
                        loadChatLogsFromStorage();
                        checkWeather("New York");
                        if (typeof updateMetrics === 'function') updateMetrics();
                        setInterval(updateMetrics, 4000);

                        const savedUser = localStorage.getItem('jarvis_user');
                        if (!savedUser || faceLockEnabled) {
                            initializeLockScreen();
                        } else {
                            bypassLockScreen();
                        }
                    }, 500);
                }, 1000);
            }
        }, delay);
        delay += (index === 2 || index === 3) ? 800 : 500;
    });
}

function updateCoreState(state) {
    currentCoreState = state;
    
    if (coreContainer) coreContainer.className = 'core-container';
    if (coreStateLed) coreStateLed.className = 'status-led';
    if (micTriggerBtn) micTriggerBtn.classList.remove('listening-active');
    if (commandMicBtn) commandMicBtn.classList.remove('listening-active');

    const led = document.getElementById('core-state-led');
    const text = document.getElementById('core-state-text');
    const desc = document.getElementById('core-assistant-desc');
    const wave = document.getElementById('voice-wave-box');

    if (wave) wave.style.display = 'none';

    switch(state) {
        case 'LISTENING':
            if (coreContainer) coreContainer.classList.add('listening');
            if (led) { led.className = 'status-led led-red'; }
            if (text) { text.textContent = "LISTENING"; text.className = "status-text font-mono text-red"; }
            if (desc) desc.textContent = "Voice receptor online. Speak now...";
            if (micTriggerBtn) micTriggerBtn.classList.add('listening-active');
            if (commandMicBtn) commandMicBtn.classList.add('listening-active');
            if (wave) wave.style.display = 'flex';
            break;
            
        case 'THINKING':
            if (coreContainer) coreContainer.classList.add('thinking');
            if (led) { led.className = 'status-led led-purple'; }
            if (text) { text.textContent = "SYNAPSING"; text.className = "status-text font-mono text-purple"; }
            if (desc) desc.textContent = "Routing query through cognitive network...";
            break;
            
        case 'SPEAKING':
            if (coreContainer) coreContainer.classList.add('speaking');
            if (led) { led.className = 'status-led led-green'; }
            if (text) { text.textContent = "VOCALIZING"; text.className = "status-text font-mono text-green"; }
            if (desc) desc.textContent = "Broadcasting vocal synthesis waves...";
            break;
            
        case 'IDLE':
        default:
            if (coreContainer) coreContainer.classList.add('idle');
            if (led) { led.className = 'status-led led-cyan'; }
            if (text) { text.textContent = "STANDBY"; text.className = "status-text font-mono text-cyan"; }
            if (desc) desc.textContent = "Core systems stable. Click Core or Dock Mic to speak.";
            break;
    }
}

if (sendTriggerBtn) {
    sendTriggerBtn.addEventListener('click', handleTextInputSubmit);
}
if (textInputField) {
    textInputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleTextInputSubmit();
        }
    });
}

function handleTextInputSubmit() {
    if (!textInputField) return;
    const textVal = textInputField.value.trim();
    if (!textVal) return;

    textInputField.value = '';
    if (window.speechSynthesis) window.speechSynthesis.cancel();

    appendChatBubble('USER', textVal);
    updateCoreState('THINKING');
    takeCommand(textVal);
}

// ==========================================================================
// Holographic Calling UI Module
// ==========================================================================
async function initiateSystemCall(contactName, isVideo = false) {
    if (callOverlay) callOverlay.style.display = 'flex';
    
    isCallMuted = false;
    isCallVideoActive = true;
    
    if (callMuteToggleBtn) {
        callMuteToggleBtn.classList.remove('muted');
        const icon = callMuteToggleBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-microphone';
    }
    if (callVideoToggleBtn) {
        callVideoToggleBtn.classList.remove('suspended');
        const icon = callVideoToggleBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-video';
    }
    
    if (callParticipantNameText) callParticipantNameText.textContent = contactName.toUpperCase();
    if (callConnectionStateText) {
        if (contactName.toUpperCase().includes("SYSTEM DIAL")) {
            callConnectionStateText.textContent = "ROUTING CALL TO NATIVE SYSTEM DIALER...";
        } else if (contactName.toUpperCase().includes("WHATSAPP")) {
            callConnectionStateText.textContent = "REDIRECTING VIA ENCRYPTED WHATSAPP LINK...";
        } else {
            callConnectionStateText.textContent = "DIALING SECURE LINK VIA SATELLITE...";
        }
    }
    if (callTimerDisplay) callTimerDisplay.textContent = "00:00";
    
    if (isVideo) {
        if (callModeText) callModeText.textContent = "SECURE VIDEO CONNECT";
        if (avatarFrameBox) avatarFrameBox.style.display = 'none';
        if (videoFeedsBox) videoFeedsBox.style.display = 'block';

        try {
            callStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            if (callVideoUserVideo) callVideoUserVideo.srcObject = callStream;
        } catch (err) {
            console.warn("Video Call Camera access blocked:", err);
            if (videoFeedsBox) videoFeedsBox.style.display = 'none';
            if (avatarFrameBox) avatarFrameBox.style.display = 'block';
            if (callModeText) callModeText.textContent = "SECURE VOICE CONNECT (VIDEO LINK FAIL)";
        }
    } else {
        if (callModeText) callModeText.textContent = "SECURE VOICE CONNECT";
        if (videoFeedsBox) videoFeedsBox.style.display = 'none';
        if (avatarFrameBox) avatarFrameBox.style.display = 'block';
    }

    fetch(`${BACKEND_URL}/api/calls/call`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact: contactName, video: isVideo })
    }).catch(() => {});

    speak(`Initiating call relay to ${contactName}. Establish link...`);
    playCallRingSound();

    setTimeout(() => {
        if (callOverlay && callOverlay.style.display === 'flex') {
            if (callConnectionStateText) callConnectionStateText.textContent = "ROUTING ENCRYPTED VECTORS...";
            
            setTimeout(() => {
                if (callOverlay && callOverlay.style.display === 'flex') {
                    if (callConnectionStateText) callConnectionStateText.textContent = "SECURE LINK STABLE";
                    speak(`Synapse link established with ${contactName}.`);
                    startCallTimer();
                }
            }, 2000);
        }
    }, 2000);
}

function startCallTimer() {
    callDuration = 0;
    clearInterval(callTimerInterval);
    
    callTimerInterval = setInterval(() => {
        callDuration++;
        const mins = String(Math.floor(callDuration / 60)).padStart(2, '0');
        const secs = String(callDuration % 60).padStart(2, '0');
        if (callTimerDisplay) callTimerDisplay.textContent = `${mins}:${secs}`;
    }, 1000);
}

function terminateSystemCall() {
    clearInterval(callTimerInterval);
    callDuration = 0;

    if (callStream) {
        callStream.getTracks().forEach(track => track.stop());
        callStream = null;
    }
    if (callVideoUserVideo) callVideoUserVideo.srcObject = null;

    if (callOverlay && callOverlay.style.display === 'flex') {
        speak("Communication link terminated.");
        callOverlay.style.display = 'none';
    }
}

if (callEndTriggerBtn) callEndTriggerBtn.addEventListener('click', terminateSystemCall);

// Mute and Video toggles
if (callMuteToggleBtn) {
    callMuteToggleBtn.addEventListener('click', () => {
        isCallMuted = !isCallMuted;
        const icon = callMuteToggleBtn.querySelector('i');
        if (isCallMuted) {
            callMuteToggleBtn.classList.add('muted');
            if (icon) icon.className = 'fa-solid fa-microphone-slash';
            if (callStream) callStream.getAudioTracks().forEach(t => t.enabled = false);
            speak("Microphone muted.");
        } else {
            callMuteToggleBtn.classList.remove('muted');
            if (icon) icon.className = 'fa-solid fa-microphone';
            if (callStream) callStream.getAudioTracks().forEach(t => t.enabled = true);
            speak("Microphone active.");
        }
    });
}

if (callVideoToggleBtn) {
    callVideoToggleBtn.addEventListener('click', () => {
        isCallVideoActive = !isCallVideoActive;
        const icon = callVideoToggleBtn.querySelector('i');
        if (!isCallVideoActive) {
            callVideoToggleBtn.classList.add('suspended');
            if (icon) icon.className = 'fa-solid fa-video-slash';
            if (callStream) callStream.getVideoTracks().forEach(t => t.enabled = false);
            speak("Video link suspended.");
        } else {
            callVideoToggleBtn.classList.remove('suspended');
            if (icon) icon.className = 'fa-solid fa-video';
            if (callStream) callStream.getVideoTracks().forEach(t => t.enabled = true);
            speak("Video link active.");
        }
    });
}

// ==========================================================================
// Bottom Control Dock Triggers & Bindings
// ==========================================================================
if (micTriggerBtn) micTriggerBtn.addEventListener('click', toggleVoiceListen);
if (commandMicBtn) commandMicBtn.addEventListener('click', toggleVoiceListen);
if (reactorCoreBtn) reactorCoreBtn.addEventListener('click', toggleVoiceListen);

const dockChatBtn = document.getElementById('dock-chat');
if (dockChatBtn) {
    dockChatBtn.addEventListener('click', async () => {
        const contact = await showSystemPrompt("Enter contact name or phone number:", "Tony Stark");
        if (contact) {
            const cleanPhone = contact.startsWith('+') 
                ? '+' + contact.replace(/\D/g, '') 
                : contact.replace(/\D/g, '');
            const isPhoneNumber = cleanPhone.replace(/\D/g, '').length >= 7; 
            
            if (isPhoneNumber) {
                const url = `https://api.whatsapp.com/send?phone=${cleanPhone}`;
                window.open(url, "_blank");
                initiateSystemCall(contact + " (WHATSAPP)", false);
            } else {
                const isVideo = await showSystemConfirm("Enable Video calling link?");
                initiateSystemCall(contact, isVideo);
            }
        }
    });
}

const dockWebBtn = document.getElementById('dock-web');
if (dockWebBtn) {
    dockWebBtn.addEventListener('click', async () => {
        const q = await showSystemPrompt("Input Google grounded search request:");
        if (q) {
            takeCommand(`open google`);
            window.open(`https://www.google.com/search?q=${encodeURIComponent(q)}`, "_blank");
        }
    });
}

if (dockFilesBtn) {
    dockFilesBtn.addEventListener('click', () => {
        if (fileOverlay) fileOverlay.style.display = 'flex';
        playClickSound();
    });
}

if (closeFileBtn) {
    closeFileBtn.addEventListener('click', () => {
        if (fileOverlay) fileOverlay.style.display = 'none';
        playClickSound();
    });
}

const dockScreenshotBtn = document.getElementById('dock-screenshot');
if (dockScreenshotBtn) {
    dockScreenshotBtn.addEventListener('click', () => {
        console.log("Screenshot button clicked!");
        if (typeof playClickSound === 'function') playClickSound();
        takeCommand("take screenshot");
    });
}

const dockCameraBtn = document.getElementById('dock-camera');
if (dockCameraBtn) {
    dockCameraBtn.addEventListener('click', () => {
        console.log("Webcam photo button clicked!");
        if (typeof playClickSound === 'function') playClickSound();
        takeCommand("take photo");
    });
}

const dockMusicBtn = document.getElementById('dock-music');
if (dockMusicBtn) {
    dockMusicBtn.addEventListener('click', () => {
        takeCommand("play music");
    });
}

const dockLockBtn = document.getElementById('dock-lock');
if (dockLockBtn) {
    dockLockBtn.addEventListener('click', () => {
        if (typeof logoutUser === 'function') {
            logoutUser();
        } else {
            takeCommand("lock system");
        }
    });
}

// ==========================================================================
// Drag & Drop File Upload Module
// ==========================================================================
if (fileDropZone) {
    fileDropZone.addEventListener('click', () => {
        if (fileUploaderInput) fileUploaderInput.click();
    });

    fileDropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileDropZone.style.backgroundColor = 'rgba(0, 240, 255, 0.1)';
        fileDropZone.style.borderColor = 'var(--theme-primary)';
    });

    fileDropZone.addEventListener('dragleave', () => {
        fileDropZone.style.backgroundColor = 'rgba(0, 240, 255, 0.02)';
        fileDropZone.style.borderColor = 'var(--border-color)';
    });

    fileDropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        fileDropZone.style.backgroundColor = 'rgba(0, 240, 255, 0.02)';
        fileDropZone.style.borderColor = 'var(--border-color)';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    });
}

if (fileUploaderInput) {
    fileUploaderInput.addEventListener('change', (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    });
}

function handleFileUpload(file) {
    if (!uploadedFilesList) return;
    
    const fileTag = document.createElement('div');
    fileTag.className = 'uploaded-file-tag';
    fileTag.style.display = 'flex';
    fileTag.style.justifyContent = 'space-between';
    fileTag.style.alignItems = 'center';
    fileTag.style.padding = '6px';
    fileTag.style.border = '1px solid var(--border-color)';
    fileTag.style.borderRadius = '4px';
    fileTag.style.fontFamily = 'var(--font-mono)';
    fileTag.style.fontSize = '0.65rem';
    fileTag.style.marginBottom = '6px';
    
    fileTag.innerHTML = `
        <span><i class="fa-solid fa-file-csv" style="margin-right:6px;"></i>${file.name.toUpperCase()} (${(file.size / 1024).toFixed(1)} KB)</span>
        <span class="text-green">[SECURE]</span>
    `;
    
    uploadedFilesList.appendChild(fileTag);
    speak("File dataset registered successfully.");
    appendChatBubble('JARVIS', `Uploaded file: ${file.name} successfully linked to system core.`);
}

// Expose core function globally for lockscreen lockscreen
window.updateCoreState = updateCoreState;
window.bypassLockScreen = bypassLockScreen;
window.initializeLockScreen = initializeLockScreen;
window.initiateSystemCall = initiateSystemCall;
window.terminateSystemCall = terminateSystemCall;
