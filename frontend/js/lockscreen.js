// ==========================================================================
// J.A.R.V.I.S. 3.2.0 - Security, Biometrics & Credentials Lockscreen
// ==========================================================================

// Global elements for Credentials forms
const authFormsBox = document.getElementById('auth-forms-box');
const loginFormSection = document.getElementById('login-form-section');
const registerFormSection = document.getElementById('register-form-section');
const authFormToggleBtn = document.getElementById('auth-form-toggle-btn');

const linkShowRegister = document.getElementById('link-show-register');
const linkShowLogin = document.getElementById('link-show-login');

const btnSubmitLogin = document.getElementById('btn-submit-login');
const btnSubmitRegister = document.getElementById('btn-submit-register');

const authLoginUserField = document.getElementById('auth-login-username');
const authLoginPassField = document.getElementById('auth-login-password');
const authRegUserField = document.getElementById('auth-reg-username');
const authRegPassField = document.getElementById('auth-reg-password');
const authRegNameField = document.getElementById('auth-reg-fullname');
const authRegEmailField = document.getElementById('auth-reg-email');
const authRegPhoneField = document.getElementById('auth-reg-phone');
const otpVerificationBox = document.getElementById('otp-verification-box');
const authOtpCodeField = document.getElementById('auth-otp-code');
const btnSubmitOtp = document.getElementById('btn-submit-otp');
let activeOtpUsername = '';

// Profile Widget DOM elements
const profileWidget = document.getElementById('profile-widget');
const profileFullName = document.getElementById('profile-full-name');
const profileUsername = document.getElementById('profile-username');
const profileClearance = document.getElementById('profile-clearance');
const profileAvatarImg = document.getElementById('profile-avatar-img');
const profileLogoutBtn = document.getElementById('profile-logout-btn');

// Switch between Biometric Face ID and Security PIN Matrix tabs
window.switchLockTab = function(tabName) {
    const btnFace = document.getElementById('tab-btn-face');
    const btnPin = document.getElementById('tab-btn-pin');
    const tabFace = document.getElementById('tab-content-face');
    const tabPin = document.getElementById('tab-content-pin');
    
    if (typeof playClickSound === 'function') {
        playClickSound();
    }
    
    if (tabName === 'face') {
        if (btnFace) btnFace.classList.add('active');
        if (btnPin) btnPin.classList.remove('active');
        if (tabFace) tabFace.style.display = 'flex';
        if (tabPin) tabPin.style.display = 'none';
        
        if (lockStatusDisplay) {
            lockStatusDisplay.textContent = "BIOMETRIC NEURAL SCANNER ACTIVE // ALIGN RETINA";
        }
        startFacialScan();
    } else {
        if (btnFace) btnFace.classList.remove('active');
        if (btnPin) btnPin.classList.add('active');
        if (tabFace) tabFace.style.display = 'none';
        if (tabPin) tabPin.style.display = 'flex';
        
        stopLockWebcam();
        if (lockStatusDisplay) {
            lockStatusDisplay.textContent = "SECURITY PIN MATRIX ACTIVE // ENTER 4-DIGIT PASSCODE";
        }
    }
};

function initializeLockScreen() {
    if (lockScreenOverlay) lockScreenOverlay.style.display = 'flex';
    if (authFormsBox) authFormsBox.style.display = 'none';
    if (otpVerificationBox) otpVerificationBox.style.display = 'none';
    
    // Default to Biometric Face ID tab
    const btnFace = document.getElementById('tab-btn-face');
    const btnPin = document.getElementById('tab-btn-pin');
    const tabFace = document.getElementById('tab-content-face');
    const tabPin = document.getElementById('tab-content-pin');
    if (btnFace) btnFace.classList.add('active');
    if (btnPin) btnPin.classList.remove('active');
    if (tabFace) tabFace.style.display = 'flex';
    if (tabPin) tabPin.style.display = 'none';
    if (passcodeFallbackBox) passcodeFallbackBox.style.display = 'flex';
    
    // Reset PIN dots
    clearPin();

    // Check if there is an active session
    const savedUser = localStorage.getItem('jarvis_user');
    if (savedUser) {
        loadUserProfile(JSON.parse(savedUser));
    } else {
        if (profileWidget) profileWidget.style.display = 'none';
    }

    if (lockStatusDisplay) lockStatusDisplay.textContent = "INITIALIZING BIOMETRIC RETINAL SCAN & PIN SYNAPSE...";
    speak("App access locked. Secure biometric authentication is required.");
    
    setTimeout(() => {
        if (lockScreenOverlay && lockScreenOverlay.style.display === 'flex') {
            const currentTabFace = document.getElementById('tab-content-face');
            if (currentTabFace && currentTabFace.style.display !== 'none') {
                startFacialScan();
            }
        }
    }, 1200);
}

function loadUserProfile(user) {
    if (!user) return;
    if (profileWidget) profileWidget.style.display = 'block';
    if (profileFullName) profileFullName.textContent = (user.fullname || user.username || '').toUpperCase();
    if (profileUsername) profileUsername.textContent = `@${user.username || ''}`;
    if (profileClearance) profileClearance.textContent = (user.role || 'TERMINAL USER').toUpperCase();
    if (profileAvatarImg && user.avatar) {
        let cleanAvatar = user.avatar;
        if (!cleanAvatar.startsWith('data:') && cleanAvatar.startsWith('frontend/')) {
            cleanAvatar = cleanAvatar.replace(/^frontend\//, '');
        }
        profileAvatarImg.src = cleanAvatar;
    }
}

function logoutUser() {
    localStorage.removeItem('jarvis_user');
    if (profileWidget) profileWidget.style.display = 'none';
    
    // Stop any active streams
    stopLockWebcam();
    
    // Lock the screen overlay
    initializeLockScreen();
}

function bypassLockScreen() {
    stopLockWebcam();
    if (lockScreenOverlay) lockScreenOverlay.style.display = 'none';
    updateCoreState('IDLE');
    
    if (ambientSounds) {
        playInterfaceBeep();
    }
    
    // Load active profile into HUD if bypass is called
    const savedUser = localStorage.getItem('jarvis_user');
    if (savedUser) {
        loadUserProfile(JSON.parse(savedUser));
        const user = JSON.parse(savedUser);
        setTimeout(() => {
            speak(`Initializing J.A.R.V.I.S. Core systems... Welcome back, ${user.fullname.split(' ')[0]}.`);
        }, 600);
    } else {
        // Log in as default admin guest
        const guestUser = {
            username: "ironman",
            fullname: "Tony Stark",
            role: "Primary User // Administrator",
            avatar: "assets/images/avatar.png"
        };
        localStorage.setItem('jarvis_user', JSON.stringify(guestUser));
        loadUserProfile(guestUser);
        setTimeout(() => {
            speak("Initializing J.A.R.V.I.S. Core systems... Welcome back, Sir.");
        }, 600);
    }
}

async function startFacialScan() {
    if (lockStream) {
        stopLockWebcam();
    }

    const matchValDisplay = document.getElementById('match-val-display');
    if (matchValDisplay) matchValDisplay.textContent = '00%';

    lockStatusDisplay.textContent = "ACCESSING INTERNAL CAMERA FEED...";
    if (passcodeFallbackBox) passcodeFallbackBox.style.display = 'flex';
    if (authFormsBox) authFormsBox.style.display = 'none';
    if (otpVerificationBox) otpVerificationBox.style.display = 'none';
    
    try {
        lockStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (lockWebcamVideo) {
            lockWebcamVideo.style.display = 'block';
            lockWebcamVideo.srcObject = lockStream;
        }
        
        lockStatusDisplay.textContent = "SCANNING RETINAL PROFILE SYNAPSES...";
        speak("Initiating biometric retinal check.");

        let matchPercent = 0;
        const matchInterval = setInterval(() => {
            if (!lockStream) {
                clearInterval(matchInterval);
                return;
            }
            matchPercent += Math.floor(Math.random() * 4) + 3;
            if (matchPercent >= 99) {
                matchPercent = 99;
                clearInterval(matchInterval);
            }
            if (matchValDisplay) matchValDisplay.textContent = `${String(matchPercent).padStart(2, '0')}%`;
        }, 450);

        const canvas = document.createElement('canvas');
        setTimeout(async () => {
            if (!lockStream) return;

            if (lockWebcamVideo) {
                canvas.width = lockWebcamVideo.videoWidth || 640;
                canvas.height = lockWebcamVideo.videoHeight || 480;
                const ctx = canvas.getContext('2d');
                try {
                    ctx.drawImage(lockWebcamVideo, 0, 0, canvas.width, canvas.height);
                    const frameBase64 = canvas.toDataURL('image/jpeg');

                    const response = await fetch(`${BACKEND_URL}/api/auth/face`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ image: frameBase64 })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        if (data.authorized) {
                            clearInterval(matchInterval);
                            if (matchValDisplay) matchValDisplay.textContent = '100%';
                            
                            // Save detected administrator session
                            localStorage.setItem('jarvis_user', JSON.stringify(data.user));
                            loadUserProfile(data.user);

                            lockStatusDisplay.textContent = "BIOMETRIC IDENTITY CONFIRMED. PROCESSING CRITICAL VECTORS...";
                            speak(`Retinal match confirmed. Welcome back, ${data.user.fullname.split(' ')[0]}.`);
                            
                            setTimeout(() => {
                                stopLockWebcam();
                                bypassLockScreen();
                            }, 1000);
                        } else {
                            clearInterval(matchInterval);
                            lockStatusDisplay.textContent = "BIOMETRIC MISMATCH // SECURE PIN ENTRY REQUIRED";
                            speak("Face not recognized. Please enter security passcode.");
                            showPasscodeFallback();
                        }
                    } else {
                        clearInterval(matchInterval);
                        lockStatusDisplay.textContent = "BIOMETRIC SYSTEM FAULT // SECURE PIN ENTRY REQUIRED";
                        speak("System fault. Please enter security passcode.");
                        showPasscodeFallback();
                    }
                } catch (err) {
                    clearInterval(matchInterval);
                    lockStatusDisplay.textContent = "BACKEND OFFLINE // SECURE PIN ENTRY REQUIRED";
                    speak("Security database offline. Please enter passcode.");
                    showPasscodeFallback();
                }
            }
        }, 2000);

    } catch (err) {
        console.warn("Facial recognition camera access:", err);
        if (lockStatusDisplay) {
            lockStatusDisplay.textContent = "BIOMETRIC FEED STANDBY // PIN MATRIX AVAILABLE";
        }
    }
}

async function showPasscodeFallback() {
    stopLockWebcam();
    const btnFace = document.getElementById('tab-btn-face');
    const btnPin = document.getElementById('tab-btn-pin');
    const tabFace = document.getElementById('tab-content-face');
    const tabPin = document.getElementById('tab-content-pin');
    if (btnFace) btnFace.classList.remove('active');
    if (btnPin) btnPin.classList.add('active');
    if (tabFace) tabFace.style.display = 'none';
    if (tabPin) tabPin.style.display = 'flex';
    if (passcodeFallbackBox) passcodeFallbackBox.style.display = 'flex';
    if (authFormsBox) authFormsBox.style.display = 'none';
    if (otpVerificationBox) otpVerificationBox.style.display = 'none';
    if (lockStatusDisplay) lockStatusDisplay.textContent = "BIOMETRIC LOCKOUT // ENTER PIN SECURITY VECTOR";
}

function showCredentialsBox() {
    if (lockScreenOverlay) lockScreenOverlay.style.display = 'flex';
    stopLockWebcam();
    if (passcodeFallbackBox) passcodeFallbackBox.style.display = 'none';
    if (authFormsBox) authFormsBox.style.display = 'flex';
    if (loginFormSection) loginFormSection.style.display = 'flex';
    if (registerFormSection) registerFormSection.style.display = 'none';
    if (otpVerificationBox) otpVerificationBox.style.display = 'none';
    if (lockStatusDisplay) lockStatusDisplay.textContent = "TERMINAL SECURE NODE // ENTER USERNAME AND PASSWORD";
}

function stopLockWebcam() {
    if (lockStream) {
        lockStream.getTracks().forEach(track => track.stop());
        lockStream = null;
    }
    if (lockWebcamVideo) {
        lockWebcamVideo.srcObject = null;
        lockWebcamVideo.style.display = 'none';
    }
}

function handlePinKeyPress(digit) {
    if (enteredPin.length < 4) {
        enteredPin += digit;
        updatePinDisplay();
        if (typeof playClickSound === 'function') playClickSound();
    }

    // Ready indicator on the green bypass button - NO AUTO-BYPASS (user must click manually)
    if (enteredPin.length === 4) {
        if (pinBypassBtn) {
            pinBypassBtn.classList.add('active');
            pinBypassBtn.style.transform = 'scale(1.06)';
            pinBypassBtn.style.boxShadow = '0 0 22px #00ff88, inset 0 0 10px #00ff88';
        }
        if (lockStatusDisplay) {
            lockStatusDisplay.textContent = "PIN ENTERED // CLICK BYPASS TO AUTHORIZE";
        }
    } else {
        if (pinBypassBtn) {
            pinBypassBtn.classList.remove('active');
            pinBypassBtn.style.transform = '';
            pinBypassBtn.style.boxShadow = '';
        }
    }
}

function handlePinBypassSubmit() {
    if (typeof playClickSound === 'function') playClickSound();
    
    const expectedPin = (typeof correctPin !== 'undefined') ? correctPin : '2710';
    
    if (enteredPin === expectedPin) {
        if (lockStatusDisplay) lockStatusDisplay.textContent = "PIN 2710 VERIFIED // ACCESS GRANTED";
        if (typeof speak === 'function') speak("Passcode 2710 verified. Welcome back, Sir.");
        
        // Ensure user session on valid PIN bypass
        const savedUser = localStorage.getItem('jarvis_user');
        if (!savedUser) {
            const defaultUser = {
                username: "ironman",
                fullname: "Tony Stark",
                role: "Primary User // Administrator",
                avatar: "assets/images/avatar.png"
            };
            localStorage.setItem('jarvis_user', JSON.stringify(defaultUser));
            loadUserProfile(defaultUser);
        }
        
        if (pinBypassBtn) {
            pinBypassBtn.classList.remove('active');
            pinBypassBtn.style.transform = '';
            pinBypassBtn.style.boxShadow = '';
        }
        
        bypassLockScreen();
        clearPin();
    } else if (enteredPin.length > 0) {
        if (lockStatusDisplay) lockStatusDisplay.textContent = "ACCESS DENIED // INVALID PIN VECTOR";
        if (typeof speak === 'function') speak("Access denied. Invalid PIN.");
        
        // Visual alert feedback on PIN dots
        pinDots.forEach(dot => {
            dot.style.background = '#ff003c';
            dot.style.borderColor = '#ff003c';
            dot.style.boxShadow = '0 0 14px #ff003c';
        });
        
        setTimeout(() => {
            pinDots.forEach(dot => {
                dot.style.background = '';
                dot.style.borderColor = '';
                dot.style.boxShadow = '';
            });
            clearPin();
            if (lockStatusDisplay) lockStatusDisplay.textContent = "ENTER PIN SECURITY VECTOR (2710)";
        }, 750);
    } else {
        if (lockStatusDisplay) lockStatusDisplay.textContent = "PLEASE INPUT PIN 2710 BEFORE BYPASS";
        if (typeof speak === 'function') speak("Please enter PIN 2710 to bypass.");
    }
}

function clearPin() {
    enteredPin = '';
    updatePinDisplay();
    if (pinBypassBtn) {
        pinBypassBtn.classList.remove('active');
        pinBypassBtn.style.transform = '';
        pinBypassBtn.style.boxShadow = '';
    }
}

function updatePinDisplay() {
    pinDots.forEach((dot, index) => {
        if (index < enteredPin.length) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Credentials Form Handlers
async function handleLogin() {
    const username = authLoginUserField.value.trim();
    const password = authLoginPassField.value;

    if (!username || !password) {
        lockStatusDisplay.textContent = "ERROR: ALL SECURITY FIELDS MUST BE FILLED.";
        speak("Missing fields.");
        return;
    }

    lockStatusDisplay.textContent = "VALIDATING SECURITY VECTOR PAYLOAD...";
    try {
        const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (response.ok && data.authorized) {
            lockStatusDisplay.textContent = "ACCESS GRANTED. INITIALIZING COGNITIVE HUD...";
            speak(`Access granted. Welcome back, ${data.user.fullname.split(' ')[0]}.`);
            
            localStorage.setItem('jarvis_user', JSON.stringify(data.user));
            loadUserProfile(data.user);

            authLoginUserField.value = '';
            authLoginPassField.value = '';

            setTimeout(() => {
                bypassLockScreen();
            }, 800);
        } else if (response.ok && data.status === 'otp_required') {
            activeOtpUsername = username;
            if (authFormsBox) authFormsBox.style.display = 'none';
            if (otpVerificationBox) otpVerificationBox.style.display = 'flex';
            if (data.otp_code) {
                lockStatusDisplay.textContent = `SECURITY OTP [${data.otp_code}] DISPATCHED. ENTER CODE.`;
                speak(`Security verification code is ${data.otp_code.split('').join(' ')}.`);
            } else {
                lockStatusDisplay.textContent = "TWO-FACTOR SECURITY OTP DISPATCHED. ENTER CODE.";
                speak("Verification code sent to registered communications vectors.");
            }
        } else {
            lockStatusDisplay.textContent = `ACCESS DENIED // ${(data.message || '').toUpperCase()}`;
            speak("Access denied. Credentials mismatch.");
        }
    } catch (err) {
        lockStatusDisplay.textContent = "CONNECTION FAULT // SECURE DATABASE UNREACHABLE";
        speak("Authentication network error.");
    }
}

async function handleRegister() {
    const username = authRegUserField.value.trim().toLowerCase();
    const password = authRegPassField.value;
    const fullname = authRegNameField.value.trim();
    const email = authRegEmailField.value.trim();
    const phone = authRegPhoneField.value.trim();

    if (!username || !password || !fullname || !email || !phone) {
        lockStatusDisplay.textContent = "ERROR: ALL REGISTRATION FIELDS MUST BE FILLED.";
        speak("Please fill in all registration parameters.");
        return;
    }

    if (username.length < 3 || password.length < 4) {
        lockStatusDisplay.textContent = "ERROR: USERNAME MIN 3 CHARS, PASSWORD MIN 4 CHARS.";
        speak("Registration criteria not met.");
        return;
    }

    lockStatusDisplay.textContent = "COMMITTING NEW IDENTITY VECTOR...";
    try {
        const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, fullname, email, phone })
        });

        const data = await response.json();
        if (response.ok && data.status === 'success') {
            lockStatusDisplay.textContent = "PROFILE CREATED. SECURING ENCRYPTED NODE...";
            speak("Identity registered successfully.");
            
            // Automatically log in
            localStorage.setItem('jarvis_user', JSON.stringify(data.user));
            loadUserProfile(data.user);

            authRegUserField.value = '';
            authRegPassField.value = '';
            authRegNameField.value = '';
            authRegEmailField.value = '';
            authRegPhoneField.value = '';

            setTimeout(() => {
                bypassLockScreen();
            }, 800);
        } else if (response.ok && data.status === 'otp_required') {
            activeOtpUsername = username;
            if (authFormsBox) authFormsBox.style.display = 'none';
            if (otpVerificationBox) otpVerificationBox.style.display = 'flex';
            if (data.otp_code) {
                lockStatusDisplay.textContent = `SECURITY OTP [${data.otp_code}] DISPATCHED.`;
                speak(`Registration code is ${data.otp_code.split('').join(' ')}.`);
            } else {
                lockStatusDisplay.textContent = "SECURITY AUTHENTICATION OTP DISPATCHED.";
                speak("One Time Password verification dispatched.");
            }
        } else {
            lockStatusDisplay.textContent = `REGISTRATION REFUSED // ${(data.message || '').toUpperCase()}`;
            speak("Registration failed.");
        }
    } catch (err) {
        lockStatusDisplay.textContent = "CONNECTION FAULT // REGISTRATION SYSTEM OFFLINE";
        speak("Registration network error.");
    }
}

// Bind Lock screen actions
if (scanTriggerBtn) scanTriggerBtn.addEventListener('click', () => {
    if (passcodeFallbackBox) passcodeFallbackBox.style.display = 'flex';
    if (authFormsBox) authFormsBox.style.display = 'none';
    startFacialScan();
});
if (passcodeToggleBtn) passcodeToggleBtn.addEventListener('click', showPasscodeFallback);
if (authFormToggleBtn) authFormToggleBtn.addEventListener('click', showCredentialsBox);

if (linkShowRegister) {
    linkShowRegister.addEventListener('click', (e) => {
        e.preventDefault();
        if (loginFormSection) loginFormSection.style.display = 'none';
        if (registerFormSection) registerFormSection.style.display = 'flex';
        lockStatusDisplay.textContent = "REGISTER NEW USER IDENTIFICATION KEY";
        playClickSound();
    });
}

if (linkShowLogin) {
    linkShowLogin.addEventListener('click', (e) => {
        e.preventDefault();
        if (loginFormSection) loginFormSection.style.display = 'flex';
        if (registerFormSection) registerFormSection.style.display = 'none';
        lockStatusDisplay.textContent = "ENTER ACCOUNT SECURITY PARAMETERS";
        playClickSound();
    });
}

if (btnSubmitLogin) btnSubmitLogin.addEventListener('click', handleLogin);
if (btnSubmitRegister) btnSubmitRegister.addEventListener('click', handleRegister);

async function handleOtpVerification() {
    const otp = authOtpCodeField.value.trim();
    if (!otp || otp.length !== 6) {
        lockStatusDisplay.textContent = "ERROR: AUTHENTICATION KEY MUST BE 6 DIGITS.";
        speak("Invalid code length.");
        return;
    }

    lockStatusDisplay.textContent = "VALIDATING SECURITY ACCESS CODE VECTOR...";
    try {
        const response = await fetch(`${BACKEND_URL}/api/auth/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: activeOtpUsername, otp })
        });

        const data = await response.json();
        if (response.ok && data.status === 'success') {
            lockStatusDisplay.textContent = "CLEARANCE VECTOR CONFIRMED. ACCESS GRANTED.";
            speak(`Access authorized. Welcome back, ${data.user.fullname.split(' ')[0]}.`);
            
            localStorage.setItem('jarvis_user', JSON.stringify(data.user));
            loadUserProfile(data.user);

            authOtpCodeField.value = '';
            activeOtpUsername = '';
            
            if (otpVerificationBox) otpVerificationBox.style.display = 'none';

            setTimeout(() => {
                bypassLockScreen();
            }, 800);
        } else {
            lockStatusDisplay.textContent = `VERIFICATION REFUSED // ${data.message.toUpperCase()}`;
            speak("Verification failed. Incorrect code.");
        }
    } catch (err) {
        lockStatusDisplay.textContent = "CONNECTION FAULT // SECURE SYSTEM LINK OFFLINE";
        speak("Authentication network error.");
    }
}

if (btnSubmitOtp) btnSubmitOtp.addEventListener('click', handleOtpVerification);

// Bind profile widget actions
if (profileLogoutBtn) profileLogoutBtn.addEventListener('click', logoutUser);

if (pinClearBtn) pinClearBtn.addEventListener('click', clearPin);
if (pinBypassBtn) {
    pinBypassBtn.addEventListener('click', handlePinBypassSubmit);
}

// Bind numeric pad keys
pinKeys.forEach(btn => {
    btn.addEventListener('click', () => {
        const digit = btn.getAttribute('data-key');
        handlePinKeyPress(digit);
    });
});

// Physical Keyboard Support for PIN Entry
window.addEventListener('keydown', (e) => {
    if (!lockScreenOverlay || lockScreenOverlay.style.display === 'none') return;
    
    // Ignore keystrokes if the user is typing into input fields
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
    
    if (e.key >= '0' && e.key <= '9') {
        handlePinKeyPress(e.key);
    } else if (e.key === 'Backspace') {
        if (enteredPin.length > 0) {
            enteredPin = enteredPin.slice(0, -1);
            updatePinDisplay();
            if (typeof playClickSound === 'function') playClickSound();
            if (pinBypassBtn) {
                pinBypassBtn.classList.remove('active');
                pinBypassBtn.style.transform = '';
                pinBypassBtn.style.boxShadow = '';
            }
        }
    } else if (e.key === 'Delete') {
        clearPin();
        if (typeof playClickSound === 'function') playClickSound();
    } else if (e.key === 'Escape') {
        clearPin();
    } else if (e.key === 'Enter') {
        handlePinBypassSubmit();
    }
});
