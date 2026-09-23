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

    // Biometric, Lock & Unlocking Commands (Voice Recognition overrides)
    // =========================================================================
    // Project Details & Technical Blueprint PDF Download Trigger
    if (query.includes('download project details') || query.includes('project details') || query.includes('download pdf') || query.includes('project details pdf') || query.includes('download blueprint') || query.includes('system blueprint') || query.includes('download documentation') || query.includes('project blueprint')) {
        const link = document.createElement('a');
        link.href = 'JARVIS_Project_Details.pdf';
        link.download = 'JARVIS_Project_Details.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        const summaryText = `========================================================
    J.A.R.V.I.S. AI OS v3.2.0 — TECHNICAL BLUEPRINT & SPECS
========================================================
📄 DOCUMENT    : JARVIS_Project_Details.pdf
⚡ ARCHITECTURE: Tactical Glassmorphic Web HUD + Flask REST Node
🤖 COGNITION   : Dual-Layer Gemini 2.5/2.0 Flash + Local Knowledge
🎙️ SPEECH      : Bilingual STT (en-IN/hi-IN) & Devanagari TTS
🔑 BIOMETRICS  : OpenCV Haar Cascade Optical Face Scanner
📊 TELEMETRY   : Real-time CPU, RAM, Temp & Clock Frequency (psutil)
========================================================
[+] Status: PDF Generated & Download Initiated.`;

        appendChatBubble('JARVIS', summaryText, {
            list: [
                {
                    text: '⬇️ Download PDF',
                    action: () => {
                        const a = document.createElement('a');
                        a.href = 'JARVIS_Project_Details.pdf';
                        a.download = 'JARVIS_Project_Details.pdf';
                        a.click();
                    }
                },
                {
                    text: '👁️ View in Browser',
                    action: () => {
                        window.open('JARVIS_Project_Details.pdf', '_blank');
                    }
                }
            ]
        });
        speak("Initiating download for the J.A.R.V.I.S. OS Technical Blueprint & Project Details PDF, Sir.");
        updateCoreState('IDLE');
        return;
    }
    else if (query.includes('initiate face scan') || query.includes('retinal check') || query.includes('biometric check') || query.includes('face scan') || query.includes('start scan')) {
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
    else if (query.includes("open linkedin") || query.includes("developer linkedin") || query.includes("author linkedin")) {
        appendChatBubble('JARVIS', "Opening workspace: Rohit Kumar Gupta's LinkedIn profile.");
        speak("Opening LinkedIn profile, Sir.");
        setTimeout(() => window.open("https://www.linkedin.com/in/rohit-kumar-gupta-a96b8428a/", "_blank"), 1000);
        updateCoreState('IDLE');
    }
    else if (query.includes("open gemini") || query.includes("gemini")) {
        appendChatBubble('JARVIS', "Opening interface: Gemini AI portal.");
        speak("Opening Google Gemini, Sir.");
        setTimeout(() => window.open("https://gemini.google.com/app", "_blank"), 1000);
        updateCoreState('IDLE');
    }
    else if (query.includes("open whatsapp") || query.includes("launch whatsapp") || query === "whatsapp") {
        appendChatBubble('JARVIS', "Opening interface: WhatsApp Web.");
        speak("Opening WhatsApp, Sir.");
        sendLocalCommand('whatsapp');
        setTimeout(() => window.open("https://web.whatsapp.com", "_blank"), 1000);
        updateCoreState('IDLE');
    }
    // Incomplete Open Prompt Detection (e.g. voice cut-off like "Open", "Open not", "Open a", "Open the")
    else if (query === 'open' || query === 'open not' || query === 'open a' || query === 'open an' || query === 'open the' || query === 'launch' || query === 'start') {
        appendChatBubble('JARVIS', "Which application would you like me to open, Sir? (e.g. Notepad, Chrome, VS Code, Calculator)");
        speak("Which application would you like me to open, Sir?");
        updateCoreState('IDLE');
        return;
    }
    // 4. Local OS applications commands
    else if (query.includes('calculator') || query.includes('open calculator') || query === 'calc' || query === 'open calc') {
        appendChatBubble('JARVIS', "Initializing application: Calculator.");
        speak("Launching calculator, Sir.");
        sendLocalCommand('calculator');
        setTimeout(() => {
            window.open("file:///D:/code/html/Project/Calculator/calculator.html", "_blank");
        }, 1000);
        updateCoreState('IDLE');
        return;
    }
    else if (query.includes('open chrome') || query === 'chrome' || query === 'open browser' || query === 'browser' || query.includes('google chrome') || query.includes('open edge')) {
        appendChatBubble('JARVIS', "Initializing application: Web Browser.");
        speak("Opening web browser, Sir.");
        sendLocalCommand('chrome');
        updateCoreState('IDLE');
        return;
    }
    else if (query.includes('open explorer') || query.includes('file explorer') || query.includes('open files') || query.includes('open folder')) {
        appendChatBubble('JARVIS', "Accessing laptop files: File Explorer.");
        speak("Accessing storage system, Sir.");
        sendLocalCommand('file');
        updateCoreState('IDLE');
        return;
    }
    else if (query.includes('open code') || query.includes('vs code') || query.includes('vscode') || query === 'code') {
        appendChatBubble('JARVIS', "Initializing application: Visual Studio Code.");
        speak("Launching VS Code workspace, Sir.");
        sendLocalCommand('code');
        updateCoreState('IDLE');
        return;
    }
    else if (query.includes('open notepad') || query.includes('notepad') || query === 'open note' || query === 'open notes' || query === 'open notebook' || query === 'open notpad' || query === 'open note pad' || query.includes('text editor') || query === 'note' || query === 'notes') {
        appendChatBubble('JARVIS', "Initializing application: Notepad.");
        speak("Opening Notepad text editor, Sir.");
        sendLocalCommand('notepad');
        updateCoreState('IDLE');
        return;
    }
    else if (query.includes('open terminal') || query.includes('launch terminal') || query === 'terminal' || query.includes('open powershell') || query.includes('open cmd') || query.includes('open command prompt') || query.includes('open console') || query === 'cmd' || query === 'powershell') {
        appendChatBubble('JARVIS', "Initializing application: System Terminal Console.");
        speak("Launching terminal console, Sir.");
        sendLocalCommand('terminal');
        updateCoreState('IDLE');
        return;
    }
    else if (query.includes('paint') || query.includes('mspaint')) {
        appendChatBubble('JARVIS', "Initializing application: Paint.");
        speak("Launching Paint, Sir.");
        sendLocalCommand('paint');
        updateCoreState('IDLE');
        return;
    }
    else if (query.includes('task manager') || query.includes('taskmanager')) {
        appendChatBubble('JARVIS', "Initializing application: Task Manager.");
        speak("Opening Task Manager, Sir.");
        sendLocalCommand('task manager');
        updateCoreState('IDLE');
        return;
    }
    else if (query === 'open settings' || query === 'system settings' || query === 'windows settings') {
        appendChatBubble('JARVIS', "Opening Windows System Settings.");
        speak("Opening settings, Sir.");
        sendLocalCommand('settings');
        updateCoreState('IDLE');
        return;
    }
    else if (query.startsWith('open ') || query.startsWith('launch ')) {
        const appTarget = rawQuery.replace(/^(open|launch)\s+/i, '').trim();
        if (appTarget && appTarget.length >= 2 && !appTarget.includes(' ') && !['the', 'a', 'an', 'file', 'image', 'picture', 'photo'].includes(appTarget.toLowerCase())) {
            appendChatBubble('JARVIS', `Attempting to launch application: ${appTarget}...`);
            speak(`Launching ${appTarget}, Sir.`);
            sendLocalCommand(`open ${appTarget}`);
            updateCoreState('IDLE');
            return;
        }
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
    else if (query.includes('play music') || query.startsWith('play song') || (query.startsWith('play ') && !query.includes('video') && !query.includes('game') && !query.includes('youtube') && !query.includes('code'))) {
        updateCoreState('THINKING');
        const res = await sendLocalCommand(rawQuery);
        if (res && res.status === 'success') {
            appendChatBubble('JARVIS', `🎵 **Audio Playback Active**\n${res.message}`);
            speak(res.message);
        } else {
            appendChatBubble('JARVIS', "🎵 Initializing local media playback...");
            speak("Playing music, Sir.");
        }
        updateCoreState('IDLE');
    }
    else if (query.includes('open music') || query.includes('music open') || query === 'music') {
        appendChatBubble('JARVIS', "📂 Opening local music and video storage...");
        speak("Accessing local media storage, Sir.");
        sendLocalCommand('music');
        updateCoreState('IDLE');
    }
    else if (query.includes('stop music') || query.includes('mute music') || query.includes('pause music')) {
        appendChatBubble('JARVIS', "Pausing local audio playback...");
        speak("Music paused, Sir.");
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
    // 13. Atmospheric & Weather Intelligence
    else if (query.includes('weather') || query.includes('temperature') || query.includes('atmospheric') || query.includes('forecast')) {
        let city = rawQuery
            .replace(/what is the weather like in/i, "")
            .replace(/what's the weather in/i, "")
            .replace(/what is the weather in/i, "")
            .replace(/tell me the weather in/i, "")
            .replace(/weather report for/i, "")
            .replace(/weather in/i, "")
            .replace(/weather/i, "")
            .replace(/temperature in/i, "")
            .replace(/temperature of/i, "")
            .replace(/temperature/i, "")
            .replace(/forecast for/i, "")
            .replace(/forecast/i, "")
            .replace(/[.?]$/, "")
            .trim();
        if (!city) city = typeof currentWeatherCity !== 'undefined' ? currentWeatherCity : "Delhi";
        
        appendChatBubble('JARVIS', `Scanning atmospheric vectors and satellite telemetry for: ${city.toUpperCase()}...`);
        speak(`Scanning atmospheric telemetry for ${city}, Sir.`);
        
        if (typeof fetchLiveWeather === 'function') {
            const wdata = await fetchLiveWeather(city);
            if (wdata && typeof buildWeatherChatCard === 'function') {
                appendChatBubble('JARVIS', buildWeatherChatCard(wdata), {
                    list: [
                        {
                            text: '🔄 Refresh Weather',
                            action: () => fetchLiveWeather(wdata.city)
                        },
                        {
                            text: '📍 Change City',
                            action: () => promptChangeWeatherCity()
                        }
                    ]
                });
                speak(`Atmospheric scan for ${wdata.city} is complete. Temperature is ${wdata.temp} degrees Celsius with ${wdata.condition}, and humidity is ${wdata.humidity}.`);
            }
        }
        updateCoreState('IDLE');
        return;
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


