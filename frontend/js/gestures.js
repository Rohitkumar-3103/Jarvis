// ==========================================================================
// J.A.R.V.I.S. 3.0 — Touchless Air Gesture Sensory Controller (MediaPipe Vision)
// ==========================================================================

let gestureControlActive = false;
let gestureVideo = null;
let gestureCanvas = null;
let gestureCtx = null;
let gestureStream = null;
let handLandmarker = null;
let isGestureModelLoading = false;
let gestureAnimFrameId = null;

let lastActionTimestamp = 0;
let currentGestureState = 'NONE';
let gestureConfidenceCount = 0;
let candidateGesture = 'NONE';
const GESTURE_HYSTERESIS_THRESHOLD = 3; // Must be stable for 3 consecutive frames

// Rolling coordinate history for swipe detection
const palmHistory = [];
const MAX_HISTORY = 12;

// Finger connections for hand skeleton rendering (21 landmarks)
const HAND_CONNECTIONS = [
    [0, 1], [1, 2], [2, 3], [3, 4],       // Thumb
    [0, 5], [5, 6], [6, 7], [7, 8],       // Index
    [5, 9], [9, 10], [10, 11], [11, 12],  // Middle
    [9, 13], [13, 14], [14, 15], [15, 16],// Ring
    [13, 17], [17, 18], [18, 19], [19, 20],// Pinky
    [0, 17]                               // Palm base
];

// Initialize on DOM load
window.addEventListener('DOMContentLoaded', () => {
    initGestureElements();
    
    // Check if previously enabled
    const savedGestureState = localStorage.getItem('jarvis_gesture_control') === 'true';
    if (savedGestureState) {
        // Delay slightly for main dashboard startup
        setTimeout(() => {
            toggleGestureControl(true);
        }, 1500);
    }
});

function initGestureElements() {
    gestureCanvas = document.getElementById('gesture-canvas');
    if (gestureCanvas) {
        gestureCtx = gestureCanvas.getContext('2d');
    }
}

/**
 * Toggle Gesture Control on/off
 */
async function toggleGestureControl(forceState) {
    const targetState = forceState !== undefined ? forceState : !gestureControlActive;
    
    if (targetState === gestureControlActive) return;

    if (targetState) {
        await startGestureTracking();
    } else {
        stopGestureTracking();
    }
}

/**
 * Start Webcam & MediaPipe Tracking
 */
async function startGestureTracking() {
    if (gestureControlActive) return;

    const widget = document.getElementById('gesture-hud-widget');
    const headerBtn = document.getElementById('btn-gesture-toggle');
    const dockBtn = document.getElementById('dock-gesture');
    const drawerToggle = document.getElementById('drawer-gesture-toggle');
    const badge = document.getElementById('gesture-status-badge');
    const actionText = document.getElementById('gesture-action-text');

    if (widget) widget.classList.add('active');
    if (headerBtn) headerBtn.classList.add('active');
    if (dockBtn) dockBtn.classList.add('active');
    if (drawerToggle) drawerToggle.checked = true;
    if (badge) {
        badge.textContent = "INITIALIZING";
        badge.className = "gesture-badge";
    }
    if (actionText) actionText.textContent = "Connecting optical sensor...";

    try {
        // Request webcam video stream
        gestureStream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 640 },
                height: { ideal: 480 },
                frameRate: { ideal: 30 }
            },
            audio: false
        });

        // Create or reuse hidden video element
        if (!gestureVideo) {
            gestureVideo = document.createElement('video');
            gestureVideo.autoplay = true;
            gestureVideo.playsInline = true;
            gestureVideo.muted = true;
            gestureVideo.style.display = 'none';
            document.body.appendChild(gestureVideo);
        }

        gestureVideo.srcObject = gestureStream;
        await gestureVideo.play();

        gestureControlActive = true;
        localStorage.setItem('jarvis_gesture_control', 'true');

        if (badge) {
            badge.textContent = "LOADING AI";
            badge.className = "gesture-badge";
        }
        if (actionText) actionText.textContent = "Loading Hand Landmarker model...";

        // Load MediaPipe Hand Landmarker if not yet loaded
        if (!handLandmarker && !isGestureModelLoading) {
            await loadMediaPipeHandLandmarker();
        }

        if (badge) {
            badge.textContent = "ONLINE";
            badge.className = "gesture-badge";
        }
        if (actionText) actionText.textContent = "Air Gestures active. Show hand to control.";

        showGestureFlash('🖐️ SENSORY READY', 'AIR GESTURE TRACKING ONLINE');
        if (typeof playChime === 'function') playChime('activate');

        // Start animation/detection loop
        startDetectionLoop();

    } catch (err) {
        console.error('[Gesture Engine] Camera or MediaPipe initialization failed:', err);
        if (badge) {
            badge.textContent = "OFFLINE";
            badge.className = "gesture-badge";
        }
        if (actionText) actionText.textContent = "Camera access denied or unavailable.";
        stopGestureTracking();
        alert("Could not access camera for Air Gestures: " + (err.message || err));
    }
}

/**
 * Stop Webcam & Tracking
 */
function stopGestureTracking() {
    gestureControlActive = false;
    localStorage.setItem('jarvis_gesture_control', 'false');

    if (gestureAnimFrameId) {
        cancelAnimationFrame(gestureAnimFrameId);
        gestureAnimFrameId = null;
    }

    if (gestureStream) {
        gestureStream.getTracks().forEach(track => track.stop());
        gestureStream = null;
    }

    if (gestureVideo) {
        gestureVideo.srcObject = null;
    }

    const widget = document.getElementById('gesture-hud-widget');
    const headerBtn = document.getElementById('btn-gesture-toggle');
    const dockBtn = document.getElementById('dock-gesture');
    const drawerToggle = document.getElementById('drawer-gesture-toggle');
    const reticle = document.getElementById('gesture-air-reticle');

    if (widget) widget.classList.remove('active');
    if (headerBtn) headerBtn.classList.remove('active');
    if (dockBtn) dockBtn.classList.remove('active');
    if (drawerToggle) drawerToggle.checked = false;
    if (reticle) reticle.classList.remove('active');

    // Clear canvas
    if (gestureCtx && gestureCanvas) {
        gestureCtx.clearRect(0, 0, gestureCanvas.width, gestureCanvas.height);
    }

    showGestureFlash('⏹ SENSORY OFFLINE', 'AIR GESTURE CONTROL DISABLED');
}

/**
 * Dynamically load MediaPipe Tasks Vision
 */
async function loadMediaPipeHandLandmarker() {
    isGestureModelLoading = true;
    try {
        // Dynamically import from CDN
        const visionModule = await import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35');
        const { FilesetResolver, HandLandmarker } = visionModule;

        const fileset = await FilesetResolver.forVisionTasks(
            'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm'
        );

        handLandmarker = await HandLandmarker.createFromOptions(fileset, {
            baseOptions: {
                modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
                delegate: 'GPU'
            },
            runningMode: 'VIDEO',
            numHands: 1,
            minHandDetectionConfidence: 0.55,
            minHandPresenceConfidence: 0.55,
            minTrackingConfidence: 0.55
        });

        isGestureModelLoading = false;
        console.log('[Gesture Engine] MediaPipe HandLandmarker loaded successfully.');
    } catch (error) {
        console.warn('[Gesture Engine] Failed to load MediaPipe from CDN, attempting CPU fallback:', error);
        try {
            const visionModule = await import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35');
            const { FilesetResolver, HandLandmarker } = visionModule;
            const fileset = await FilesetResolver.forVisionTasks(
                'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm'
            );
            handLandmarker = await HandLandmarker.createFromOptions(fileset, {
                baseOptions: {
                    modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
                    delegate: 'CPU'
                },
                runningMode: 'VIDEO',
                numHands: 1
            });
            isGestureModelLoading = false;
        } catch (cpuError) {
            console.error('[Gesture Engine] Fallback also failed:', cpuError);
            isGestureModelLoading = false;
            throw cpuError;
        }
    }
}

/**
 * Continuous Detection Loop
 */
function startDetectionLoop() {
    let lastVideoTime = -1;

    function detectFrame() {
        if (!gestureControlActive) return;

        if (gestureVideo && gestureVideo.readyState >= 2 && handLandmarker) {
            const currentTime = gestureVideo.currentTime;
            if (currentTime !== lastVideoTime) {
                lastVideoTime = currentTime;
                try {
                    const result = handLandmarker.detectForVideo(gestureVideo, performance.now());
                    if (result && result.landmarks && result.landmarks.length > 0) {
                        const landmarks = result.landmarks[0];
                        processHandLandmarks(landmarks);
                        drawHandSkeleton(landmarks);
                    } else {
                        onNoHandDetected();
                    }
                } catch (e) {
                    console.warn('[Gesture Engine] Frame detection warning:', e);
                }
            }
        }

        gestureAnimFrameId = requestAnimationFrame(detectFrame);
    }

    gestureAnimFrameId = requestAnimationFrame(detectFrame);
}

function onNoHandDetected() {
    if (gestureCtx && gestureCanvas) {
        gestureCtx.clearRect(0, 0, gestureCanvas.width, gestureCanvas.height);
    }
    const reticle = document.getElementById('gesture-air-reticle');
    if (reticle) reticle.classList.remove('active');

    const badge = document.getElementById('gesture-status-badge');
    const actionText = document.getElementById('gesture-action-text');
    if (badge && currentGestureState !== 'NONE') {
        badge.textContent = "ONLINE";
        badge.className = "gesture-badge";
    }
    if (actionText && currentGestureState !== 'NONE') {
        actionText.textContent = "Waiting for hand gesture...";
    }
    currentGestureState = 'NONE';
    candidateGesture = 'NONE';
    gestureConfidenceCount = 0;
}

/**
 * Classify hand landmarks into robust gestures
 */
function processHandLandmarks(landmarks) {
    if (!landmarks || landmarks.length < 21) return;

    const wrist = landmarks[0];
    const thumbTip = landmarks[4];
    const thumbMcp = landmarks[2];
    const indexTip = landmarks[8];
    const indexPip = landmarks[6];
    const middleTip = landmarks[12];
    const middlePip = landmarks[10];
    const ringTip = landmarks[16];
    const ringPip = landmarks[14];
    const pinkyTip = landmarks[20];
    const pinkyPip = landmarks[18];

    // Hand scale reference (wrist to middle knuckle)
    const handScale = Math.hypot(landmarks[9].x - wrist.x, landmarks[9].y - wrist.y) || 0.2;

    // Distance helper
    const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

    // Extension check (scale-invariant)
    const indexExtended = dist(indexTip, wrist) > dist(indexPip, wrist) * 1.15;
    const middleExtended = dist(middleTip, wrist) > dist(middlePip, wrist) * 1.15;
    const ringExtended = dist(ringTip, wrist) > dist(ringPip, wrist) * 1.15;
    const pinkyExtended = dist(pinkyTip, wrist) > dist(pinkyPip, wrist) * 1.15;
    const thumbExtended = dist(thumbTip, thumbMcp) > handScale * 0.45;

    const extendedCount = (indexExtended ? 1 : 0) + (middleExtended ? 1 : 0) + (ringExtended ? 1 : 0) + (pinkyExtended ? 1 : 0);

    // Pinch distance
    const pinchDist = dist(thumbTip, indexTip);
    const isPinching = pinchDist < (handScale * 0.32);

    // Swipe detection via palm center (landmark 9)
    const palmCenter = landmarks[9];
    const now = performance.now();
    palmHistory.push({ x: palmCenter.x, y: palmCenter.y, time: now });
    if (palmHistory.length > MAX_HISTORY) palmHistory.shift();

    let detectedSwipe = null;
    if (palmHistory.length >= 6) {
        const oldest = palmHistory[0];
        const newest = palmHistory[palmHistory.length - 1];
        const dt = newest.time - oldest.time;
        const dx = newest.x - oldest.x;
        // Inverted because video is mirrored
        if (dt < 400 && Math.abs(dx) > 0.22) {
            detectedSwipe = dx < 0 ? 'SWIPE_RIGHT' : 'SWIPE_LEFT';
            palmHistory.length = 0; // Reset history after swipe
        }
    }

    // Determine current raw gesture
    let rawGesture = 'TRACKING';

    if (detectedSwipe) {
        rawGesture = detectedSwipe;
    } else if (isPinching) {
        rawGesture = 'PINCH';
    } else if (extendedCount >= 4) {
        rawGesture = 'OPEN_PALM';
    } else if (extendedCount === 0 && !thumbExtended) {
        rawGesture = 'FIST';
    } else if (indexExtended && middleExtended && !ringExtended && !pinkyExtended) {
        rawGesture = 'PEACE';
    } else if (indexExtended && !middleExtended && !ringExtended && !pinkyExtended) {
        rawGesture = 'POINT';
    }

    // Apply Hysteresis smoothing
    if (rawGesture === candidateGesture) {
        gestureConfidenceCount++;
    } else {
        candidateGesture = rawGesture;
        gestureConfidenceCount = 1;
    }

    if (gestureConfidenceCount >= GESTURE_HYSTERESIS_THRESHOLD) {
        if (candidateGesture !== currentGestureState) {
            currentGestureState = candidateGesture;
            handleGestureTrigger(currentGestureState, landmarks);
        }
    }

    // Continuous pointing reticle
    const reticle = document.getElementById('gesture-air-reticle');
    if (indexExtended && reticle) {
        reticle.classList.add('active');
        // Mirrored X coordinates
        const screenX = (1 - indexTip.x) * window.innerWidth;
        const screenY = indexTip.y * window.innerHeight;
        reticle.style.left = `${screenX}px`;
        reticle.style.top = `${screenY}px`;
    } else if (reticle) {
        reticle.classList.remove('active');
    }
}

/**
 * Handle and dispatch tactical actions in J.A.R.V.I.S.
 */
function handleGestureTrigger(gesture, landmarks) {
    const badge = document.getElementById('gesture-status-badge');
    const actionText = document.getElementById('gesture-action-text');
    const now = Date.now();

    switch (gesture) {
        case 'OPEN_PALM':
            if (badge) {
                badge.textContent = "🖐️ OPEN PALM";
                badge.className = "gesture-badge listening";
            }
            if (actionText) actionText.textContent = "Voice receptor online. Listening...";

            // Debounce action dispatch
            if (now - lastActionTimestamp > 1400) {
                lastActionTimestamp = now;
                showGestureFlash('🖐️ OPEN PALM', 'VOICE RECEPTOR ACTIVE');
                if (typeof startListening === 'function') {
                    startListening();
                } else if (typeof toggleChatVoice === 'function') {
                    toggleChatVoice();
                }
                if (typeof updateCoreState === 'function') {
                    updateCoreState('LISTENING');
                }
                if (typeof playChime === 'function') playChime('activate');
            }
            break;

        case 'FIST':
            if (badge) {
                badge.textContent = "✊ CLOSED FIST";
                badge.className = "gesture-badge silent";
            }
            if (actionText) actionText.textContent = "Silencing voice & aborting overlays";

            if (now - lastActionTimestamp > 900) {
                lastActionTimestamp = now;
                showGestureFlash('✊ CLOSED FIST', 'SILENCE SPEECH // CLOSE MODALS');
                
                // Cancel active speech
                if (window.speechSynthesis) {
                    try { window.speechSynthesis.cancel(); } catch (e) {}
                }
                if (typeof currentCloudAudio !== 'undefined' && currentCloudAudio) {
                    try { currentCloudAudio.pause(); } catch (e) {}
                }
                if (typeof updateCoreState === 'function') {
                    updateCoreState('IDLE');
                }

                // Close active modals and side drawer
                if (typeof closeDashboardSideMenu === 'function') closeDashboardSideMenu();
                if (typeof closeBrahmastraModal === 'function') closeBrahmastraModal();
                if (typeof closeLogoZoomModal === 'function') closeLogoZoomModal();
                if (typeof closeAuthTerminalModal === 'function') closeAuthTerminalModal();
                if (typeof closeAddSiteModal === 'function') closeAddSiteModal();
                if (typeof playClickSound === 'function') playClickSound();
            }
            break;

        case 'PEACE':
            if (badge) {
                badge.textContent = "✌️ TWO FINGERS";
                badge.className = "gesture-badge";
            }
            if (actionText) actionText.textContent = "Dispatching system diagnostics";

            if (now - lastActionTimestamp > 2500) {
                lastActionTimestamp = now;
                showGestureFlash('✌️ TWO FINGERS', 'RUNNING SYSTEM DIAGNOSTICS');
                if (typeof takeCommand === 'function') {
                    takeCommand('diagnostics');
                } else if (typeof speak === 'function') {
                    speak("Running system diagnostics. All subsystems nominal, Sir.");
                }
                if (typeof playInterfaceBeep === 'function') playInterfaceBeep();
            }
            break;

        case 'PINCH':
            if (badge) {
                badge.textContent = "🤏 PINCH";
                badge.className = "gesture-badge";
            }
            if (actionText) actionText.textContent = "Arc Reactor overdrive toggle";

            if (now - lastActionTimestamp > 1400) {
                lastActionTimestamp = now;
                showGestureFlash('🤏 PINCH', 'REACTOR OVERDRIVE TOGGLED');
                if (typeof toggleReactorOverdrive === 'function') {
                    toggleReactorOverdrive();
                }
                if (typeof playClickSound === 'function') playClickSound();
            }
            break;

        case 'SWIPE_LEFT':
        case 'SWIPE_RIGHT':
            const direction = gesture === 'SWIPE_RIGHT' ? 1 : -1;
            if (badge) {
                badge.textContent = gesture === 'SWIPE_RIGHT' ? "👉 SWIPE RIGHT" : "👈 SWIPE LEFT";
                badge.className = "gesture-badge";
            }
            if (actionText) actionText.textContent = "Cycling HUD visual theme";

            if (now - lastActionTimestamp > 1200) {
                lastActionTimestamp = now;
                cycleHUDTheme(direction);
                showGestureFlash(gesture === 'SWIPE_RIGHT' ? '👉 SWIPE RIGHT' : '👈 SWIPE LEFT', 'HUD COLOR MATRIX CYCLED');
                if (typeof playInterfaceBeep === 'function') playInterfaceBeep();
            }
            break;

        case 'POINT':
            if (badge) {
                badge.textContent = "👉 POINTING";
                badge.className = "gesture-badge";
            }
            if (actionText) actionText.textContent = "Holographic air reticle active";
            break;

        default:
            if (badge) {
                badge.textContent = "TRACKING";
                badge.className = "gesture-badge";
            }
            if (actionText) actionText.textContent = "Hand locked in optical array.";
            break;
    }
}

/**
 * Render Holographic Hand Skeleton on Canvas
 */
function drawHandSkeleton(landmarks) {
    if (!gestureCtx || !gestureCanvas) return;

    const width = gestureCanvas.width = gestureCanvas.offsetWidth || 250;
    const height = gestureCanvas.height = gestureCanvas.offsetHeight || 140;

    gestureCtx.clearRect(0, 0, width, height);

    const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--theme-primary').trim() || '#00f0ff';

    // Draw connection lines
    gestureCtx.strokeStyle = themeColor;
    gestureCtx.lineWidth = 1.8;
    gestureCtx.shadowColor = themeColor;
    gestureCtx.shadowBlur = 6;
    gestureCtx.beginPath();

    HAND_CONNECTIONS.forEach(([i, j]) => {
        const p1 = landmarks[i];
        const p2 = landmarks[j];
        if (p1 && p2) {
            gestureCtx.moveTo(p1.x * width, p1.y * height);
            gestureCtx.lineTo(p2.x * width, p2.y * height);
        }
    });
    gestureCtx.stroke();

    // Draw joints and fingertip nodes
    landmarks.forEach((pt, index) => {
        const x = pt.x * width;
        const y = pt.y * height;
        const isFingertip = [4, 8, 12, 16, 20].includes(index);

        gestureCtx.beginPath();
        gestureCtx.arc(x, y, isFingertip ? 3.5 : 2, 0, Math.PI * 2);
        gestureCtx.fillStyle = isFingertip ? '#ffffff' : themeColor;
        gestureCtx.shadowBlur = isFingertip ? 10 : 4;
        gestureCtx.fill();
    });
}

/**
 * Helper to cycle HUD Theme
 */
function cycleHUDTheme(step = 1) {
    const themes = ['cyan', 'green', 'gold', 'red', 'purple'];
    const current = localStorage.getItem('jarvis_hud_theme') || 'cyan';
    let idx = themes.indexOf(current);
    if (idx === -1) idx = 0;
    idx = (idx + step + themes.length) % themes.length;
    const nextTheme = themes[idx];

    localStorage.setItem('jarvis_hud_theme', nextTheme);
    localStorage.removeItem('jarvis_custom_theme_color');

    document.documentElement.setAttribute('data-theme', nextTheme);
    document.documentElement.style.removeProperty('--theme-primary');
    document.documentElement.style.removeProperty('--theme-glow');

    const themeSelect = document.getElementById('settings-theme-select');
    if (themeSelect) themeSelect.value = nextTheme;
}

/**
 * Display glowing HUD Toast Flash
 */
let flashTimeout = null;
function showGestureFlash(title, desc) {
    let flash = document.getElementById('gesture-hud-flash');
    if (!flash) {
        flash = document.createElement('div');
        flash.id = 'gesture-hud-flash';
        flash.className = 'gesture-hud-flash';
        flash.innerHTML = `
            <div class="gesture-flash-icon"><i class="fa-solid fa-hand-sparkles"></i></div>
            <div class="gesture-flash-text">
                <span class="gesture-flash-title" id="gesture-flash-title">AIR GESTURE</span>
                <span class="gesture-flash-desc" id="gesture-flash-desc">ACTION DISPATCHED</span>
            </div>
        `;
        document.body.appendChild(flash);
    }

    const titleEl = document.getElementById('gesture-flash-title');
    const descEl = document.getElementById('gesture-flash-desc');
    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;

    flash.classList.add('show');
    if (flashTimeout) clearTimeout(flashTimeout);
    flashTimeout = setTimeout(() => {
        flash.classList.remove('show');
    }, 2200);
}

/**
 * Minimize / restore the gesture widget
 */
function toggleGestureWidgetMinimize() {
    const widget = document.getElementById('gesture-hud-widget');
    if (widget) {
        widget.classList.toggle('minimized');
        const icon = document.getElementById('gesture-min-icon');
        if (icon) {
            icon.className = widget.classList.contains('minimized') ? 'fa-solid fa-up-right-and-down-left-from-center' : 'fa-solid fa-minus';
        }
    }
}
