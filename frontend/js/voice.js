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

let currentCloudAudio = null;

function speak(text) {
    if (!window.speechSynthesis || !autoSpeak) {
        return;
    }

    // Cancel any previous speech synthesis or cloud audio
    try { window.speechSynthesis.cancel(); } catch (e) {}
    if (currentCloudAudio) {
        try {
            currentCloudAudio.pause();
            currentCloudAudio.currentTime = 0;
            currentCloudAudio = null;
        } catch (e) {}
    }

    // Thoroughly clean text for crystal-clear natural speech output
    let cleanSpeechText = (text || "")
        .replace(/```[\s\S]*?```/g, 'Code block generated.')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/https?:\/\/\S+/g, '')
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
        .replace(/[*_#$~<>|]/g, '')
        .replace(/\\u[0-9a-fA-F]{4}/g, '')
        .replace(/\{[^\}]*\}/g, '')
        .replace(/\s+/g, ' ')
        .trim();

    if (!cleanSpeechText) return;

    // For very long text responses, speak the primary concise insight (first 2-3 sentences)
    const sentences = cleanSpeechText.split(/(?<=[.!?])\s+/);
    if (sentences.length > 3) {
        cleanSpeechText = sentences.slice(0, 3).join(" ");
    }

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
            // Google Translate TTS Cloud Fallback for Hindi
            updateCoreState('SPEAKING');
            const audio = document.createElement('audio');
            currentCloudAudio = audio;
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
                currentCloudAudio = null;
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
let speechFinalTimeout = null;

if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
        updateCoreState('LISTENING');
    };

    recognition.onresult = (event) => {
        let interimText = '';
        let finalText = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalText += event.results[i][0].transcript;
            } else {
                interimText += event.results[i][0].transcript;
            }
        }

        // Live visual indicator in input field
        if (textInputField && (interimText || finalText)) {
            textInputField.value = finalText || interimText;
        }

        if (finalText) {
            const cleanFinal = finalText.trim();
            if (cleanFinal) {
                if (textInputField) textInputField.value = '';
                appendChatBubble('USER', cleanFinal);
                updateCoreState('THINKING');
                takeCommand(cleanFinal);
            }
        }
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
