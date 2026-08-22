// ==========================================================================
// J.A.R.V.I.S. 3.0 - Telemetry & HUD Diagnostics Dashboard
// ==========================================================================

async function updateMetrics() {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        
        const response = await fetch(`${BACKEND_URL}/api/system/command`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ command: 'diagnostics' }),
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (response.ok) {
            const data = await response.json();
            if (data.status === 'success') {
                const cpu = Math.round(data.cpu);
                const ram = Math.round(data.ram);
                const temp = data.temp ? Math.round(data.temp) : Math.floor(Math.random() * (41 - 36) + 36);
                const speedGhz = data.speed_ghz !== undefined ? data.speed_ghz : (Math.random() * (4.8 - 3.5) + 3.5).toFixed(1);
                const speedPercent = data.speed_percent !== undefined ? data.speed_percent : (speedGhz / 5.0) * 100;

                if (cpuPercentText) {
                    cpuPercentText.textContent = `${cpu}%`;
                    cpuBar.style.width = `${cpu}%`;
                }

                if (ramPercentText) {
                    ramPercentText.textContent = `${ram}%`;
                    ramBar.style.width = `${ram}%`;
                }

                if (tempValText) {
                    tempValText.textContent = `${temp}°C`;
                    tempBar.style.width = `${temp}%`;
                }

                if (speedValText) {
                    speedValText.textContent = `${speedGhz} GHz`;
                    speedBar.style.width = `${speedPercent}%`;
                }
                
                if (cpu > 85) addNotificationLog(`[SYS] ALERT: Neural Processing core load spike (${cpu}%)`);
                if (temp > 75) addNotificationLog(`[SYS] WARNING: Thermal core threshold exceeded (${temp}°C)`);
                return;
            }
        }
    } catch (err) {}

    const cpuVal = Math.floor(Math.random() * (24 - 8) + 8);
    const ramVal = Math.floor(Math.random() * (48 - 38) + 38);
    const tempVal = Math.floor(Math.random() * (41 - 36) + 36);
    const speedVal = (Math.random() * (4.8 - 3.5) + 3.5).toFixed(1);
    const speedPercent = (speedVal / 5.0) * 100;

    if (cpuPercentText) {
        cpuPercentText.textContent = `${cpuVal}%`;
        cpuBar.style.width = `${cpuVal}%`;
    }
    if (ramPercentText) {
        ramPercentText.textContent = `${ramVal}%`;
        ramBar.style.width = `${ramVal}%`;
    }
    if (tempValText) {
        tempValText.textContent = `${tempVal}°C`;
        tempBar.style.width = `${tempVal}%`;
    }
    if (speedValText) {
        speedValText.textContent = `${speedVal} GHz`;
        speedBar.style.width = `${speedPercent}%`;
    }
}

function initBatteryInfo() {
    const updateVerticalBattery = (level, charging) => {
        const svgEl = document.getElementById('vertical-battery-svg');
        const fillEl = document.getElementById('v-bat-fill');
        const capEl = document.getElementById('v-bat-cap');
        const borderEl = document.getElementById('v-bat-border');
        const boltEl = document.getElementById('v-bat-bolt');
        
        let color = '#00ff66';
        if (charging || level > 80) color = '#00ff66';
        else if (level > 55) color = '#00f0ff';
        else if (level > 30) color = '#ffaa00';
        else if (level > 15) color = '#ff6b00';
        else color = '#ff4b4b';

        // Calculate vertical fill height from bottom up (max height: 17.5px)
        const maxH = 17.5;
        const fillH = Math.max(1.5, (level / 100) * maxH);
        const fillY = 21.5 - fillH;

        if (fillEl) {
            fillEl.setAttribute('y', fillY.toFixed(1));
            fillEl.setAttribute('height', fillH.toFixed(1));
            fillEl.setAttribute('fill', color);
        }
        if (capEl) capEl.setAttribute('fill', color);
        if (borderEl) borderEl.setAttribute('stroke', color);
        if (svgEl) svgEl.style.filter = `drop-shadow(0 0 6px ${color})`;
        if (boltEl) boltEl.style.display = charging ? 'block' : 'none';

        if (headerBatteryDisplay) {
            headerBatteryDisplay.textContent = `${level}%`;
        }
    };

    if (navigator.getBattery) {
        navigator.getBattery().then(battery => {
            const updateDisplay = () => {
                const level = Math.round(battery.level * 100);
                updateVerticalBattery(level, battery.charging);
            };
            updateDisplay();
            battery.addEventListener('levelchange', updateDisplay);
            battery.addEventListener('chargingchange', updateDisplay);
        });
    } else {
        updateVerticalBattery(100, false);
    }
}

function addNotificationLog(text) {
    const logBox = document.getElementById('notification-logs');
    if (!logBox) return;
    
    const item = document.createElement('div');
    item.className = 'notif-item';
    
    const timeSpan = document.createElement('span');
    timeSpan.className = 'notif-time';
    const now = new Date();
    timeSpan.textContent = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const textSpan = document.createElement('span');
    textSpan.className = 'notif-text';
    textSpan.textContent = text;
    
    item.appendChild(timeSpan);
    item.appendChild(textSpan);
    
    logBox.insertBefore(item, logBox.firstChild);
    
    if (logBox.children.length > 15) {
        logBox.removeChild(logBox.lastChild);
    }
}

function checkWeather(city = "New York") {
    const weatherText = document.getElementById('weather-display');
    if (!weatherText) return;
    
    fetch(`${BACKEND_URL}/api/system/command`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: `weather ${city}` })
    })
    .then(r => r.json())
    .then(data => {
        if (data.status === 'success' && data.message) {
            const m = data.message.match(/(\-?\d+)\s*°C/);
            if (m) {
                weatherText.textContent = `${city.toUpperCase()}: ${m[1]}°C`;
            }
        }
    })
    .catch(() => {
        weatherText.textContent = "NEW YORK: 22°C";
    });
}

// Log Toggles Event Listeners
const toggleChatLogsBtn = document.getElementById('toggle-chat-logs-btn');
const chatLogsContainerDiv = document.getElementById('chat-logs-container');
if (toggleChatLogsBtn && chatLogsContainerDiv) {
    toggleChatLogsBtn.addEventListener('click', () => {
        const icon = toggleChatLogsBtn.querySelector('i');
        if (chatLogsContainerDiv.style.display === 'none') {
            chatLogsContainerDiv.style.display = 'flex';
            if (icon) icon.className = 'fa-solid fa-eye';
            toggleChatLogsBtn.title = 'Hide Comms Log';
        } else {
            chatLogsContainerDiv.style.display = 'none';
            if (icon) icon.className = 'fa-solid fa-eye-slash';
            toggleChatLogsBtn.title = 'Show Comms Log';
        }
        if (typeof playClickSound === 'function') playClickSound();
    });
}

const toggleSysLogsBtn = document.getElementById('toggle-sys-logs-btn');
const notificationLogsDiv = document.getElementById('notification-logs');
if (toggleSysLogsBtn && notificationLogsDiv) {
    toggleSysLogsBtn.addEventListener('click', () => {
        const icon = toggleSysLogsBtn.querySelector('i');
        if (notificationLogsDiv.style.display === 'none') {
            notificationLogsDiv.style.display = 'flex';
            if (icon) icon.className = 'fa-solid fa-eye';
            toggleSysLogsBtn.title = 'Hide System Log';
        } else {
            notificationLogsDiv.style.display = 'none';
            if (icon) icon.className = 'fa-solid fa-eye-slash';
            toggleSysLogsBtn.title = 'Show System Log';
        }
        if (typeof playClickSound === 'function') playClickSound();
    });
}
