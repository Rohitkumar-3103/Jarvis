// ==========================================================================
// J.A.R.V.I.S. 3.0 - System Commands Parsing & Automation Routing
// ==========================================================================

async function sendLocalCommand(commandText) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/system/command`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ command: commandText })
        });
        if (response.ok) {
            return await response.json();
        }
    } catch (err) {
        console.warn(`Failed to execute local command '${commandText}':`, err);
    }
    return null;
}

async function takeCommand(message) {
    const rawQuery = message.trim();
    const query = rawQuery.toLowerCase();

    // =========================================================================
    // 0. Biometric, Lock & Unlocking Commands (Voice Recognition overrides)
    // =========================================================================
    if (query.includes('initiate face scan') || query.includes('retinal check') || query.includes('biometric check') || query.includes('face scan') || query.includes('start scan')) {
        appendChatBubble('JARVIS', "Initiating optical scan arrays... Confirming biometric profile.");
        speak("Initiating biometric retinal check.");
        if (typeof startFacialScan === 'function') {
            startFacialScan();
        }
        return;
    }
    else if (query.includes('bypass lock screen') || query.includes('unlock system') || query.includes('unlock console') || query.includes('unlock workstation') || query.includes('bypass lock')) {
        appendChatBubble('JARVIS', "Access clearance confirmed. Bypassing lock screen overlay.");
        speak("Bypassing lock screen.");
        if (typeof bypassLockScreen === 'function') {
            bypassLockScreen();
        }
        return;
    }
    else if (query.includes('pin entry bypass') || query.includes('pin entry') || query.includes('passcode fallback') || query.includes('enter pin')) {
        appendChatBubble('JARVIS', "Access vector: Switching to secure PIN entry.");
        speak("Passcode entry requested.");
        if (typeof showPasscodeFallback === 'function') {
            showPasscodeFallback();
        }
        return;
    }
    // File & Dataset Disk Upload Trigger
    else if (query === 'open file' || query.includes('open file') || query.includes('upload file') || query.includes('browse file') || query.includes('dataset upload')) {
        appendChatBubble('JARVIS', "📂 Opening Dataset Disk File Uploader Portal...");
        speak("Opening dataset file uploader array, Sir.");
        const fileOverlay = document.getElementById('file-overlay');
        if (fileOverlay) fileOverlay.style.display = 'flex';
        updateCoreState('IDLE');
        return;
    }
    // Mail & Communication Link Trigger
    else if (query.includes('send a mail') || query.includes('send mail') || query.includes('compose mail') || query.includes('send email') || query.includes('mail dispatch')) {
        appendChatBubble('JARVIS', "✉️ Initializing Secure Mail & Encrypted Communications Dispatch Link...");
        speak("Initializing secure mail transmission link, Sir.");
        if (typeof initiateSystemCall === 'function') {
            initiateSystemCall('SECURE MAIL DISPATCH', false);
        }
        updateCoreState('IDLE');
        return;
    }
    else if (query.includes('credential login') || query.includes('login form') || query.includes('show login')) {
        appendChatBubble('JARVIS', "Access vector: Displaying username and password entry box.");
        speak("Displaying credentials input portal.");
        if (typeof showCredentialsBox === 'function') {
            showCredentialsBox();
        }
        return;
    }
    else if (query.includes('system diagnostics') || query.includes('diagnostics') || query.includes('system status') || query.includes('status diagnostics')) {
        appendChatBubble('JARVIS', "🧠 Accessing system status arrays... Initializing diagnostic check.");
        speak("Accessing diagnostics telemetry database, Sir.");
        try {
            const res = await sendLocalCommand('diagnostics');
            if (res && res.status === 'success') {
                const report = `========================================================
    J.A.R.V.I.S. SYSTEM TELEMETRY DIAGNOSTIC REPORT
========================================================
🟢 NEURAL PROCESSING (CPU)  : ${res.cpu}%
🟣 COGNITIVE MEMORY (RAM)    : ${res.ram}%
🔴 CORE THERMAL LEVEL        : ${res.temp}°C
🔵 CLOCK FREQUENCY          : ${res.speed_ghz} GHz
========================================================
[+] Clock cycle utilisation: ${res.speed_percent}%
[+] Synapse API status: ONLINE
========================================================`;
                appendChatBubble('JARVIS', report);
                speak(`Diagnostics complete, Sir. CPU load is at ${res.cpu} percent, memory usage is ${res.ram} percent, and the core temperature is running at ${res.temp} degrees Celsius.`);
            } else {
                appendChatBubble('JARVIS', "System Error: Telemetry diagnostics returned empty data.");
                speak("I was unable to load current diagnostics data, Sir.");
            }
        } catch (e) {
            appendChatBubble('JARVIS', "System Error: Local api diagnostics offline.");
            speak("Diagnostics database is unreachable.");
        }
        updateCoreState('IDLE');
        return;
    }
    // Voice Output Volume Control
    else if (query.includes('voice volume') || query.includes('set volume') || query.includes('volume to') || query.includes('mute voice')) {
        let newVol = 1.0;
        if (query.includes('mute') || query.includes('0%') || query.includes('off')) {
            newVol = 0.0;
        } else if (query.includes('max') || query.includes('100%') || query.includes('full')) {
            newVol = 1.0;
        } else {
            const match = query.match(/(\d+)/);
            if (match) {
                const parsedVal = parseInt(match[1]);
                if (parsedVal >= 0 && parsedVal <= 100) {
                    newVol = parsedVal / 100.0;
                }
            }
        }
        voiceVolume = newVol;
        localStorage.setItem('jarvis_voice_volume', newVol.toString());
        const volPercent = Math.round(newVol * 100);
        appendChatBubble('JARVIS', `🔊 Voice volume set to ${volPercent}%.`);
        speak(`Voice volume adjusted to ${volPercent} percent, Sir.`);
        updateCoreState('IDLE');
        return;
    }
    // Terminal Shell Execution
    else if (query.startsWith('run command ') || query.startsWith('terminal ') || query.startsWith('shell ') || query.startsWith('execute command ')) {
        let cmdToRun = "";
        if (query.startsWith('run command ')) cmdToRun = rawQuery.substring(12).trim();
        else if (query.startsWith('terminal ')) cmdToRun = rawQuery.substring(9).trim();
        else if (query.startsWith('shell ')) cmdToRun = rawQuery.substring(6).trim();
        else if (query.startsWith('execute command ')) cmdToRun = rawQuery.substring(16).trim();

        if (!cmdToRun) {
            appendChatBubble('JARVIS', "Terminal Command Warning: Instruction payload is empty.");
            speak("Sir, what command would you like me to execute?");
            updateCoreState('IDLE');
            return;
        }

        appendChatBubble('JARVIS', `Executing terminal vector: \`${cmdToRun}\`...\nDispatched to local system shell.`);
        speak(`Executing instruction payload, Sir.`);
        try {
            const response = await fetch(`${BACKEND_URL}/api/system/shell`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ command: cmdToRun })
            });

            if (response.ok) {
                const data = await response.json();
                let outputLog = "";
                if (data.stdout) outputLog += data.stdout;
                if (data.stderr) outputLog += (outputLog ? "\n" : "") + "ERROR FEED:\n" + data.stderr;
                if (!outputLog) outputLog = "[Console completed with no output returns]";
                
                appendChatBubble('JARVIS', `💻 **Terminal Output (Return Code: ${data.returncode})**\n\`\`\`powershell\n${outputLog}\n\`\`\``);
                speak("Terminal execution complete, Sir.");
            } else {
                const errData = await response.json().catch(() => ({ message: "Unknown socket error" }));
                appendChatBubble('JARVIS', `❌ **Terminal Error**: ${errData.message}`);
                speak("Console execution failed, Sir.");
            }
        } catch (err) {
            appendChatBubble('JARVIS', "❌ **Terminal Connection Failure**: Local terminal endpoint is unreachable.");
            speak("Unable to connect to console execution API.");
        }
        updateCoreState('IDLE');
        return;
    }
    // Theme colors control
    else if (query.includes('change theme to ') || query.startsWith('set theme to ')) {
        let themeName = query.replace('change theme to ', '').replace('set theme to ', '').trim();
        const availableThemes = ['cyan', 'green', 'red', 'gold', 'purple'];
        if (availableThemes.includes(themeName)) {
            document.documentElement.setAttribute('data-theme', themeName);
            localStorage.setItem('jarvis_hud_theme', themeName);
            document.documentElement.style.removeProperty('--theme-primary');
            document.documentElement.style.removeProperty('--theme-glow');
            
            appendChatBubble('JARVIS', `System theme coordinates updated to: ${themeName.toUpperCase()}.`);
            speak(`Changing theme to ${themeName}, Sir.`);
        } else {
            appendChatBubble('JARVIS', `Theme Warning: "${themeName}" is not an optimized HUD matrix vector. Available options: Cyan, Green, Red, Gold, Purple.`);
            speak("Sir, please select one of the authorized HUD themes.");
        }
        updateCoreState('IDLE');
        return;
    }

    // =========================================================================
    // 1. Calling System Commands
    // =========================================================================
    if (query.includes('video call') || query.startsWith('video call')) {
        let contact = rawQuery.replace(/video call/i, "").trim();
        contact = contact.replace(/[.?]$/, "").trim();
        if (!contact) contact = "Tony Stark";
        initiateSystemCall(contact, true);
    }
    else if (query.includes('call') || query.startsWith('call')) {
        let contact = rawQuery.replace(/call/i, "").trim();
        contact = contact.replace(/[.?]$/, "").trim();
        if (!contact) contact = "Tony Stark";
        initiateSystemCall(contact, false);
    }
    else if (query.includes('end call') || query.includes('hang up') || query.includes('terminate call')) {
        terminateSystemCall();
        updateCoreState('IDLE');
    }
    // 2. Messaging Commands
    else if (query.includes('send message to') || query.startsWith('message')) {
        handleSendMessageCommand(rawQuery);
        updateCoreState('IDLE');
    }
    // 3. Web Navigation commands
    else if (query.includes('open google')) {
        appendChatBubble('JARVIS', "Opening interface: Google.");
        speak("Opening Google search node, Sir.");
        setTimeout(() => window.open("https://google.com", "_blank"), 1000);
        updateCoreState('IDLE');
    } 
    else if (query.includes("open youtube")) {
        appendChatBubble('JARVIS', "Opening interface: YouTube.");
        speak("Opening video database, YouTube.");
        setTimeout(() => window.open("https://youtube.com", "_blank"), 1000);
        updateCoreState('IDLE');
    } 
    else if (query.includes("open github")) {
        appendChatBubble('JARVIS', "Opening workspace: GitHub.");
        speak("Opening your GitHub workspace, Sir.");
        setTimeout(() => window.open("https://github.com", "_blank"), 1000);
        updateCoreState('IDLE');
    }
    else if (query.includes("open linkedin")) {
        appendChatBubble('JARVIS', "Opening workspace: LinkedIn.");
        speak("Opening LinkedIn, Sir.");
        setTimeout(() => window.open("https://linkedin.com", "_blank"), 1000);
        updateCoreState('IDLE');
    }
    else if (query.includes("open gemini") || query.includes("gemini")) {
        appendChatBubble('JARVIS', "Opening interface: Gemini AI portal.");
        speak("Opening Google Gemini, Sir.");
        setTimeout(() => window.open("https://gemini.google.com/app", "_blank"), 1000);
        updateCoreState('IDLE');
    }
    else if (query.includes("open edclub") || query.includes("edclub")) {
        appendChatBubble('JARVIS', "Opening interface: EdClub typing portal.");
        speak("Opening EdClub typing practice portal, Sir.");
        setTimeout(() => window.open("https://www.edclub.com/sportal/", "_blank"), 1000);
        updateCoreState('IDLE');
    }
    // 4. Local OS applications commands
    else if (query.includes('calculator') || query.includes('open calculator')) {
        appendChatBubble('JARVIS', "Initializing application: Custom HTML Calculator.");
        speak("Launching custom calculator, Sir.");
        sendLocalCommand('calculator');
        setTimeout(() => {
            window.open("file:///D:/code/html/Project/Calculator/calculator.html", "_blank");
        }, 1000);
        updateCoreState('IDLE');
    }
    else if (query.includes('open explorer') || query.includes('file explorer') || query.includes('open files')) {
        appendChatBubble('JARVIS', "Accessing laptop files: File Explorer.");
        speak("Accessing storage system, Sir.");
        sendLocalCommand('file');
        updateCoreState('IDLE');
    }
    else if (query.includes('open code') || query.includes('vs code')) {
        appendChatBubble('JARVIS', "Initializing application: Visual Studio Code.");
        speak("Launching VS Code workspace, Sir.");
        sendLocalCommand('code');
        updateCoreState('IDLE');
    }
    else if (query.includes('open notepad') || query.includes('notepad')) {
        appendChatBubble('JARVIS', "Initializing application: Notepad.");
        speak("Opening notepad text editor.");
        sendLocalCommand('notepad');
        updateCoreState('IDLE');
    }
    // 5. System volume and screenshot commands
    else if (query.includes('camera screenshot') || query.includes('take camera screenshot') || query.includes('camera snap') || query.includes('face photo') || query.includes('take photo')) {
        appendChatBubble('JARVIS', "Activating optical sensors... Capturing camera feed.");
        speak("Activating camera sensors, Sir.");
        sendLocalCommand('camera').then(res => {
            if (res && res.status === 'success') {
                setTimeout(() => {
                    const timeStr = getFormattedTime();
                    appendChatBubbleImageDOM('JARVIS', 'assets/images/camera.png?t=' + Date.now(), timeStr);
                }, 800);
            } else {
                appendChatBubble('JARVIS', "System error: " + (res ? res.message : "Camera module offline."));
                speak("I was unable to establish a camera link, Sir.");
            }
        });
        updateCoreState('IDLE');
    }
    else if (query.includes('screenshot') || query.includes('take screenshot')) {
        appendChatBubble('JARVIS', "Capturing current HUD state...");
        speak("Capturing screenshot, Sir.");
        sendLocalCommand('screenshot').then(res => {
            if (res && res.status === 'success') {
                setTimeout(() => {
                    const timeStr = getFormattedTime();
                    appendChatBubbleImageDOM('JARVIS', 'assets/images/screenshot.png?t=' + Date.now(), timeStr);
                }, 800);
            }
        });
        updateCoreState('IDLE');
    }
    else if (query.includes('volume up') || query.includes('increase volume')) {
        appendChatBubble('JARVIS', "Increasing audio master volume level...");
        speak("Volume increased, Sir.");
        sendLocalCommand('volume up');
        updateCoreState('IDLE');
    }
    else if (query.includes('volume down') || query.includes('decrease volume')) {
        appendChatBubble('JARVIS', "Decreasing audio master volume level...");
        speak("Volume decreased, Sir.");
        sendLocalCommand('volume down');
        updateCoreState('IDLE');
    }
    // 6. Wikipedia search
    else if (query.includes('wikipedia') || query.startsWith('search wikipedia for')) {
        let keyword = rawQuery.replace(/search wikipedia for/i, "").replace(/wikipedia/i, "").trim();
        keyword = keyword.replace(/[.?]$/, "").trim();
        if (keyword) {
            appendChatBubble('JARVIS', `Searching Wikipedia databases for: ${keyword}`);
            speak(`Searching Wikipedia for ${keyword}, Sir.`);
            setTimeout(() => window.open(`https://en.wikipedia.org/wiki/${encodeURIComponent(keyword)}`, "_blank"), 1000);
        } else {
            appendChatBubble('JARVIS', "Wikipedia search warning: No query specified.");
            speak("What would you like to search Wikipedia for, Sir?");
        }
        updateCoreState('IDLE');
    }
    // 7. News search
    else if (query.includes('news') || query.includes('headlines')) {
        appendChatBubble('JARVIS', "Querying local global news sources...");
        speak("Fetching latest headlines, Sir.");
        setTimeout(() => window.open("https://news.google.com", "_blank"), 1000);
        updateCoreState('IDLE');
    }
    // 8. Shutdown & Restart commands
    else if (query.includes('shutdown workstation') || query.includes('shutdown system') || query.includes('shutdown laptop')) {
        appendChatBubble('JARVIS', "WARNING: Power down sequence initiated. Execution in 60 seconds.");
        speak("System shutdown sequence initiated. Workstation will power off in 60 seconds, Sir.");
        sendLocalCommand('shutdown');
        updateCoreState('IDLE');
    }
    else if (query.includes('restart workstation') || query.includes('restart system') || query.includes('restart laptop')) {
        appendChatBubble('JARVIS', "WARNING: Power cycle sequence initiated. Restart in 60 seconds.");
        speak("System restart sequence initiated. Workstation will reboot in 60 seconds, Sir.");
        sendLocalCommand('restart');
        updateCoreState('IDLE');
    }
    else if (query.includes('cancel shutdown') || query.includes('abort shutdown') || query.includes('cancel restart')) {
        appendChatBubble('JARVIS', "System protocol: Power cycle sequence aborted.");
        speak("Power cycle aborted, Sir.");
        sendLocalCommand('abort shutdown');
        updateCoreState('IDLE');
    }
    // 9. Workstation Locking
    else if (query.includes('lock workstation') || query.includes('lock system') || query.includes('lock computer')) {
        appendChatBubble('JARVIS', "Locking workstation secure nodes.");
        speak("Locking console now, Sir.");
        sendLocalCommand('lock');
        if (typeof logoutUser === 'function') {
            logoutUser();
        } else {
            initializeLockScreen();
        }
        updateCoreState('IDLE');
    }
    // 10. Date and Time
    else if (query.includes('time') || query.includes('current time')) {
        const timeStr = new Date().toLocaleString(undefined, { hour: 'numeric', minute: 'numeric' });
        appendChatBubble('JARVIS', `Current chronological register is: ${timeStr}`);
        speak(`It is currently ${timeStr}, Sir.`);
        updateCoreState('IDLE');
    }
    else if (query.includes('date') || query.includes('current date')) {
        const dateStr = new Date().toLocaleString(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
        appendChatBubble('JARVIS', `Current calendar vector: ${dateStr}`);
        speak(`Today is ${dateStr}, Sir.`);
        updateCoreState('IDLE');
    }
    // 11. Music Controls
    else if (query.includes('play music')) {
        appendChatBubble('JARVIS', "Initializing local audio playback...");
        speak("Playing music, Sir.");
        sendLocalCommand('play music');
        updateCoreState('IDLE');
    }
    else if (query.includes('open music') || query.includes('music open') || query === 'music') {
        appendChatBubble('JARVIS', "Opening local music/video directory...");
        speak("Accessing local music and video storage, Sir.");
        sendLocalCommand('music');
        updateCoreState('IDLE');
    }
    else if (query.includes('stop music') || query.includes('mute music') || query.includes('pause music')) {
        appendChatBubble('JARVIS', "Pausing local audio playback...");
        speak("Music stopped, Sir.");
        sendLocalCommand('stop music');
        updateCoreState('IDLE');
    }
    // 12. Local files search fallback
    else if (query.includes('search files') || query.includes('find file')) {
        let fName = rawQuery.replace(/search files for/i, "").replace(/search files/i, "").trim();
        fName = fName.replace(/[.?]$/, "").trim();
        appendChatBubble('JARVIS', `Searching laptop directories for: "${fName}"`);
        speak(`Searching file databases for ${fName || 'recent documents'}, Sir.`);
        sendLocalCommand(`file search ${fName}`);
        updateCoreState('IDLE');
    }
    // 13. Weather fallback
    else if (query.includes('weather') || query.includes('temperature')) {
        let city = rawQuery.replace(/weather in/i, "").replace(/weather/i, "").trim();
        city = city.replace(/[.?]$/, "").trim();
        if (!city) city = "New York";
        appendChatBubble('JARVIS', `Querying atmospheric vectors for: ${city}`);
        speak(`Checking weather update for ${city}, Sir.`);
        checkWeather(city);
        updateCoreState('IDLE');
    }
    // 14. Conversational & Cognitive engine (AI Image, Code Automation & Knowledge Base)
    else {
        queryGeminiAPI(rawQuery);
    }
}

function queryLocalHeuristics(query) {
    if (typeof queryGeminiAPI === 'function') {
        queryGeminiAPI(query);
    }
}

function handleSendMessageCommand(query) {
    const sendMsgPattern = /send\s+message\s+to\s+([\w\s]+)\s+containing\s+(.+)/i;
    const match = query.match(sendMsgPattern);
    
    if (match) {
        const contact = match[1].trim();
        const text = match[2].trim();
        
        appendChatBubble('JARVIS', `Relaying secure message to ${contact} containing: "${text}"`);
        speak(`Sending message to ${contact}, Sir.`);
        
        fetch(`${BACKEND_URL}/api/system/command`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ command: `phone whatsapp ${contact} ${text}` })
        }).catch(() => {});
    } else {
        appendChatBubble('JARVIS', "Message command warning: Format must be 'send message to [name] containing [content]'");
        speak("I could not parse the message structure, Sir.");
    }
}

appButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const app = btn.getAttribute('data-app');
        takeCommand(`open ${app}`);
        playClickSound();
    });
});


