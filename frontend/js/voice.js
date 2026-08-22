// ==========================================================================
// J.A.R.V.I.S. 3.0 - Speech Synthesis (TTS) & Recognition (STT)
// ==========================================================================

function initSpeechSynthesis() {
    if (!window.speechSynthesis) {
        if (ttsStatus) {
            ttsStatus.textContent = "UNSUPPORTED";
            ttsStatus.className = "status-card-value text-red";
        }
        return;
    }

    const loadVoices = () => {
        speechVoices = window.speechSynthesis.getVoices();
        
        if (modalVoiceSelect) modalVoiceSelect.innerHTML = '<option value="default">System Default</option>';

        speechVoices.forEach(voice => {
            const option = document.createElement('option');
            option.value = voice.name;
            option.textContent = `${voice.name} (${voice.lang})`;
            if (voice.name === selectedVoiceName) {
                option.selected = true;
            }
            if (modalVoiceSelect) modalVoiceSelect.appendChild(option);
        });

        if (ttsStatus) {
            ttsStatus.textContent = "ONLINE";
            ttsStatus.className = "status-card-value text-green";
        }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }
}

function speak(text) {
    if (!window.speechSynthesis || !autoSpeak) {
        return;
    }

    window.speechSynthesis.cancel();

    const cleanSpeechText = text.replace(/[*_`#\-]/g, '').trim();
    if (!cleanSpeechText) return;

    // Detect if text contains Hindi characters (Devanagari script) or Hinglish vocabulary
    const hinglishRegex = /\b(namaste|kaise|sahayata|sawaal|hoon|aapka|apka|main|kaun|kya|hai|kardo|kijiye|sunte|boliye)\b/i;
    const isHindi = /[\u0900-\u097F]/.test(cleanSpeechText) || hinglishRegex.test(cleanSpeechText);
    if (isHindi) {
        const hindiVoice = speechVoices.find(v => v.lang.startsWith('hi') || v.lang.includes('hi') || v.lang.includes('HI'));
        if (hindiVoice) {
            const utterance = new SpeechSynthesisUtterance(cleanSpeechText);
            utterance.lang = 'hi-IN';
            utterance.voice = hindiVoice;
            utterance.volume = voiceVolume;
            utterance.pitch = voicePitch;
            utterance.rate = voiceRate;
            utterance.onstart = () => updateCoreState('SPEAKING');
            utterance.onend = () => {
                if (currentCoreState === 'SPEAKING') updateCoreState('IDLE');
            };
            utterance.onerror = () => {
                if (currentCoreState === 'SPEAKING') updateCoreState('IDLE');
            };
            window.speechSynthesis.speak(utterance);
        } else {
            // Google Translate TTS Cloud Fallback for Hindi (highly reliable, no system voice required)
            updateCoreState('SPEAKING');
            const audio = document.createElement('audio');
            audio.referrerPolicy = "no-referrer";
            audio.volume = voiceVolume;
            audio.src = `https://translate.google.com/translate_tts?ie=UTF-8&tl=hi&client=tw-ob&q=${encodeURIComponent(cleanSpeechText)}`;
            audio.play().catch(err => {
                console.warn("Cloud TTS play failed, falling back to basic utterance:", err);
                const utterance = new SpeechSynthesisUtterance(cleanSpeechText);
                utterance.lang = 'hi-IN';
                utterance.volume = voiceVolume;
                window.speechSynthesis.speak(utterance);
            });
            audio.onended = () => {
                if (currentCoreState === 'SPEAKING') updateCoreState('IDLE');
            };
        }
        return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanSpeechText);
    if (selectedVoiceName && selectedVoiceName !== 'default') {
        const matchingVoice = speechVoices.find(v => v.name === selectedVoiceName);
        if (matchingVoice) utterance.voice = matchingVoice;
    }
    
    utterance.volume = voiceVolume;
    utterance.pitch = voicePitch;
    utterance.rate = voiceRate;

    utterance.onstart = () => {
        updateCoreState('SPEAKING');
    };

    utterance.onend = () => {
        if (currentCoreState === 'SPEAKING') {
            updateCoreState('IDLE');
        }
    };

    utterance.onerror = (e) => {
        console.error("Speech Synthesis Error:", e);
        if (currentCoreState === 'SPEAKING') {
            updateCoreState('IDLE');
        }
    };

    window.speechSynthesis.speak(utterance);
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;

if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
        updateCoreState('LISTENING');
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (textInputField) textInputField.value = '';
        appendChatBubble('USER', transcript);
        updateCoreState('THINKING');
        takeCommand(transcript);
    };

    recognition.onerror = (e) => {
        console.error("Speech Recognition Error:", e.error);
        updateCoreState('IDLE');
        if (e.error === 'not-allowed') {
            appendChatBubble('JARVIS', "Microphone permissions blocked. Please check browser settings.");
            speak("System alert. Microphone access has been blocked.");
        }
    };

    recognition.onend = () => {
        if (currentCoreState === 'LISTENING') {
            updateCoreState('IDLE');
        }
    };
}

function toggleVoiceListen() {
    if (typeof playClickSound === 'function') playClickSound();

    if (currentCoreState === 'LISTENING') {
        if (recognition) {
            try { recognition.stop(); } catch (e) {}
        }
        updateCoreState('IDLE');
    } else {
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        
        updateCoreState('LISTENING');
        if (typeof playVoiceBeep === 'function') playVoiceBeep();

        if (recognition) {
            if (selectedVoiceName && selectedVoiceName !== 'default') {
                const matchingVoice = speechVoices.find(v => v.name === selectedVoiceName);
                if (matchingVoice) {
                    recognition.lang = matchingVoice.lang;
                }
            } else {
                // Default to en-IN / hi-IN bilingual speech recognition
                recognition.lang = (navigator.language && navigator.language.includes('hi')) ? 'hi-IN' : 'en-IN';
            }
            try {
                recognition.start();
            } catch (err) {
                try { recognition.stop(); } catch (e) {}
                setTimeout(() => {
                    try { recognition.start(); } catch (e) {}
                }, 50);
            }
        } else {
            addNotificationLog("[VOICE] SpeechRecognition unavailable. Simulating active voice link.");
            setTimeout(() => {
                if (currentCoreState === 'LISTENING') {
                    updateCoreState('IDLE');
                }
            }, 6000);
        }
    }
}
// Expose functions globally for app.js app.js
window.initSpeechSynthesis = initSpeechSynthesis;
window.speak = speak;
window.toggleVoiceListen = toggleVoiceListen;
