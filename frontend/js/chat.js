// ==========================================================================
// J.A.R.V.I.S. 3.0 - AI Chat Log Management & PDF Exporter
// ==========================================================================

function appendChatBubble(sender, text, buttons = null) {
    const timeStr = getFormattedTime();
    appendChatBubbleDOM(sender, text, timeStr, buttons);
    saveChatLogsToStorage();
}

function formatMessageText(text) {
    if (!text) return "";
    
    let escaped = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
        
    const codeBlockRegex = /```([a-zA-Z0-9#\+\-]+)?\s*([\s\S]*?)\s*```/g;
    escaped = escaped.replace(codeBlockRegex, (match, lang, code) => {
        const language = lang ? lang.trim().toLowerCase() : 'plaintext';
        return `<div class="code-container" style="position: relative; margin: 12px 0; border: 1px solid rgba(0, 240, 255, 0.15); border-radius: 6px; overflow: hidden; background: #040914; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
            <div class="code-header" style="display: flex; justify-content: space-between; align-items: center; padding: 6px 12px; background: rgba(0, 240, 255, 0.05); border-bottom: 1px solid rgba(0, 240, 255, 0.1); font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">
                <span class="code-lang">${language}</span>
                <div style="display: flex; gap: 8px; align-items: center;">
                    <button class="code-copy-btn" onclick="copyCodeBlock(this)" style="background: none; border: none; color: var(--text-secondary); cursor: pointer; padding: 4px 6px; font-size: 0.8rem; display: flex; align-items: center; justify-content: center; border-radius: 4px; transition: all 0.2s;" title="Copy code">
                        <i class="fa-regular fa-copy"></i>
                    </button>
                    <button class="code-zoom-btn" onclick="zoomCodeBlock(this)" style="background: none; border: none; color: var(--text-secondary); cursor: pointer; padding: 4px 6px; font-size: 0.8rem; display: flex; align-items: center; justify-content: center; border-radius: 4px; transition: all 0.2s;" title="Zoom code">
                        <i class="fa-solid fa-expand"></i>
                    </button>
                </div>
            </div>
            <pre class="language-${language}" style="margin: 0 !important; border: none !important; border-radius: 0 !important; box-shadow: none !important; background: transparent !important;"><code class="language-${language}">${code}</code></pre>
        </div>`;
    });

    const inlineCodeRegex = /`([^`\n]+)`/g;
    escaped = escaped.replace(inlineCodeRegex, '<code style="background: rgba(0, 240, 255, 0.1); color: var(--theme-primary); padding: 1px 4px; border-radius: 3px; font-family: var(--font-mono); font-size: 0.75rem;">$1</code>');
    
    return escaped;
}

function appendChatBubbleDOM(sender, text, timeStr, buttons = null) {
    if (!chatLogsContainer) return;

    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender.toLowerCase()}-bubble`;
    bubble.dataset.rawText = text;

    const senderDiv = document.createElement('div');
    senderDiv.className = 'bubble-sender';
    senderDiv.textContent = sender;

    const textDiv = document.createElement('div');
    textDiv.className = 'bubble-text';
    textDiv.dataset.rawText = text;
    textDiv.innerHTML = formatMessageText(text);

    // Trigger Prism highlight on code blocks
    if (window.Prism) {
        Prism.highlightAllUnder(textDiv);
    }

    // If buttons are provided, build and append them as DOM nodes
    if (buttons && buttons.list) {
        const btnContainer = document.createElement('div');
        btnContainer.style.marginTop = '12px';
        btnContainer.style.display = 'flex';
        btnContainer.style.gap = '8px';
        btnContainer.style.flexWrap = 'wrap';

        buttons.list.forEach(btnConfig => {
            const btn = document.createElement('button');
            btn.className = 'hud-btn primary';
            btn.style.fontSize = '0.65rem';
            btn.style.padding = '4px 8px';
            btn.style.letterSpacing = '0.5px';
            btn.textContent = btnConfig.text;
            btn.onclick = (e) => {
                e.stopPropagation();
                if (window.triggerSuggestedLanguage) {
                    window.triggerSuggestedLanguage(buttons.algoName, btnConfig.lang);
                }
            };
            btnContainer.appendChild(btn);
        });
        textDiv.appendChild(btnContainer);
    }

    const timeDiv = document.createElement('div');
    timeDiv.className = 'bubble-time';
    timeDiv.textContent = timeStr;

    // Create a copy button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'bubble-copy-btn';
    copyBtn.title = 'Copy response to clipboard';
    copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
    copyBtn.onclick = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(text).then(() => {
            const icon = copyBtn.querySelector('i');
            icon.className = 'fa-solid fa-check text-green';
            setTimeout(() => {
                icon.className = 'fa-regular fa-copy';
            }, 1500);
        }).catch(err => {
            console.error("Clipboard copy failed:", err);
        });
    };

    bubble.appendChild(senderDiv);
    bubble.appendChild(textDiv);
    bubble.appendChild(timeDiv);
    bubble.appendChild(copyBtn);

    chatLogsContainer.appendChild(bubble);
    chatLogsContainer.scrollTop = chatLogsContainer.scrollHeight;
}

function appendChatBubbleImageDOM(sender, imgUrl, timeStr) {
    if (!chatLogsContainer) return;

    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender.toLowerCase()}-bubble`;
    bubble.dataset.rawText = `[IMAGE: ${imgUrl}]`;

    const senderDiv = document.createElement('div');
    senderDiv.className = 'bubble-sender';
    senderDiv.textContent = sender;

    const imgWrapper = document.createElement('div');
    imgWrapper.style.position = 'relative';
    imgWrapper.style.display = 'inline-block';
    imgWrapper.style.width = '100%';

    const img = document.createElement('img');
    img.src = imgUrl;
    img.className = 'chat-bubble-image';
    img.style.maxWidth = '100%';
    img.style.maxHeight = '360px';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '8px';
    img.style.marginTop = '6px';
    img.style.border = '1.5px solid var(--theme-primary, #00f0ff)';
    img.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.35)';
    img.style.cursor = 'pointer';
    img.style.transition = 'transform 0.3s ease, filter 0.3s ease';
    img.title = 'Click to inspect 4K High-Res Artwork';
    img.onmouseover = () => { img.style.transform = 'scale(1.02)'; img.style.filter = 'brightness(1.1)'; };
    img.onmouseout = () => { img.style.transform = 'scale(1)'; img.style.filter = 'brightness(1)'; };
    img.onclick = () => window.open(imgUrl, '_blank');

    const dlBtn = document.createElement('button');
    dlBtn.innerHTML = '<i class="fa-solid fa-download" style="margin-right: 6px;"></i>SAVE';
    dlBtn.style.marginTop = '8px';
    dlBtn.style.display = 'flex';
    dlBtn.style.alignItems = 'center';
    dlBtn.style.justifyContent = 'center';
    dlBtn.style.width = '100%';
    dlBtn.style.background = 'rgba(0, 240, 255, 0.12)';
    dlBtn.style.border = '1px solid var(--theme-primary, #00f0ff)';
    dlBtn.style.color = 'var(--theme-primary, #00f0ff)';
    dlBtn.style.padding = '7px 14px';
    dlBtn.style.borderRadius = '6px';
    dlBtn.style.fontSize = '12px';
    dlBtn.style.fontFamily = 'var(--font-hud)';
    dlBtn.style.letterSpacing = '1.5px';
    dlBtn.style.fontWeight = 'bold';
    dlBtn.style.cursor = 'pointer';
    dlBtn.style.transition = 'all 0.2s';
    dlBtn.onmouseover = () => {
        dlBtn.style.background = 'rgba(0, 240, 255, 0.3)';
        dlBtn.style.boxShadow = '0 0 14px rgba(0, 240, 255, 0.5)';
    };
    dlBtn.onmouseout = () => {
        dlBtn.style.background = 'rgba(0, 240, 255, 0.12)';
        dlBtn.style.boxShadow = 'none';
    };

    dlBtn.onclick = async () => {
        try {
            dlBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" style="margin-right: 6px;"></i>DOWNLOADING...';
            const res = await fetch(imgUrl);
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'jarvis_ai_artwork_' + Date.now() + '.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            dlBtn.innerHTML = '<i class="fa-solid fa-circle-check" style="margin-right: 6px;"></i>SAVED!';
            setTimeout(() => {
                dlBtn.innerHTML = '<i class="fa-solid fa-download" style="margin-right: 6px;"></i>SAVE';
            }, 2000);
        } catch (err) {
            window.open(imgUrl, '_blank');
            dlBtn.innerHTML = '<i class="fa-solid fa-up-right-from-square" style="margin-right: 6px;"></i>OPENED FULL RES';
            setTimeout(() => {
                dlBtn.innerHTML = '<i class="fa-solid fa-download" style="margin-right: 6px;"></i>SAVE';
            }, 2000);
        }
    };

    imgWrapper.appendChild(img);
    imgWrapper.appendChild(dlBtn);

    const timeDiv = document.createElement('div');
    timeDiv.className = 'bubble-time';
    timeDiv.textContent = timeStr;

    bubble.appendChild(senderDiv);
    bubble.appendChild(imgWrapper);
    bubble.appendChild(timeDiv);

    chatLogsContainer.appendChild(bubble);
    chatLogsContainer.scrollTop = chatLogsContainer.scrollHeight;
    saveChatLogsToStorage();
}

window.appendChatBubbleImageDOM = appendChatBubbleImageDOM;

function saveChatLogsToStorage() {
    if (!chatLogsContainer) return;
    const bubbles = [];
    chatLogsContainer.querySelectorAll('.chat-bubble').forEach(bubble => {
        const senderEl = bubble.querySelector('.bubble-sender');
        const textEl = bubble.querySelector('.bubble-text');
        const timeEl = bubble.querySelector('.bubble-time');
        
        if (!senderEl || !timeEl) return;
        
        const sender = senderEl.textContent;
        const time = timeEl.textContent;
        let text = bubble.dataset.rawText || (textEl ? (textEl.dataset.rawText || textEl.innerText || textEl.textContent) : "");
        
        if (!text) {
            const imgEl = bubble.querySelector('img');
            if (imgEl) {
                text = `[IMAGE: ${imgEl.getAttribute('src')}]`;
            }
        }
        bubbles.push({ sender, text, time });
    });
    localStorage.setItem('jarvis_chat_logs', JSON.stringify(bubbles));
    
    // Also save to server API asynchronously
    fetch(`${BACKEND_URL}/api/chat/history`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender: bubbles[bubbles.length - 1]?.sender, text: bubbles[bubbles.length - 1]?.text, timestamp: bubbles[bubbles.length - 1]?.time })
    }).catch(() => {});
}

async function loadChatLogsFromStorage() {
    if (!chatLogsContainer) return;
    
    let loadedLogs = null;
    try {
        const response = await fetch(`${BACKEND_URL}/api/chat/history`);
        if (response.ok) {
            const serverLogs = await response.json();
            if (serverLogs && serverLogs.length > 0) {
                loadedLogs = serverLogs.map(m => ({ sender: m.sender, text: m.text, time: m.timestamp }));
            }
        }
    } catch(err) {}

    if (!loadedLogs) {
        const saved = localStorage.getItem('jarvis_chat_logs');
        if (saved) {
            try {
                loadedLogs = JSON.parse(saved);
            } catch(e) {}
        }
    }

    if (loadedLogs && loadedLogs.length > 0) {
        chatLogsContainer.innerHTML = '';
        loadedLogs.forEach(msg => {
            const sender = msg.sender || 'JARVIS';
            const text = msg.text || '';
            const time = msg.time || msg.timestamp || '00:00';
            
            const imgMatch = text.match(/^\[IMAGE:\s*(https?:\/\/[^\]]+)\]$/i);
            if (imgMatch) {
                appendChatBubbleImageDOM(sender, imgMatch[1], time);
            } else {
                appendChatBubbleDOM(sender, text, time);
            }
        });
        if (window.Prism) {
            Prism.highlightAllUnder(chatLogsContainer);
        }
    }
}

function clearChatLogs() {
    if (!chatLogsContainer) return;
    localStorage.removeItem('jarvis_chat_logs');
    chatLogsContainer.innerHTML = '';
    
    fetch(`${BACKEND_URL}/api/chat/history`, {
        method: 'DELETE'
    }).then(() => {
        appendChatBubbleDOM('JARVIS', "Database logs flushed. Security parameters cleared.", getFormattedTime());
    }).catch(() => {
        appendChatBubbleDOM('JARVIS', "Local memory cleared.", getFormattedTime());
    });
}

function exportChatAsPDF() {
    if (!chatLogsContainer) return;
    const logsHTML = chatLogsContainer.innerHTML;
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
        speak("Print window blocked. Please disable pop-up blockers.");
        return;
    }
    
    printWindow.document.write(`
        <html>
        <head>
            <title>J.A.R.V.I.S. Chat Export</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #fff; color: #222; padding: 40px; }
                h1 { border-bottom: 2px solid #00f0ff; padding-bottom: 8px; color: #0f172a; font-size: 1.6rem; letter-spacing: 1px; }
                .meta-info { font-size: 0.8rem; color: #64748b; margin-bottom: 30px; }
                .chat-bubble { margin-bottom: 12px; padding: 12px; border-radius: 6px; background: #f8fafc; border: 1px solid #e2e8f0; max-width: 90%; }
                .bubble-sender { font-weight: bold; font-size: 0.72rem; text-transform: uppercase; color: #0284c7; margin-bottom: 4px; }
                .bubble-text { font-size: 0.95rem; }
                .bubble-time { font-size: 0.7rem; color: #94a3b8; text-align: right; margin-top: 4px; }
            </style>
        </head>
        <body>
            <h1>J.A.R.V.I.S. OS 3.0 // SECURE TRANSCRIPT EXPORT</h1>
            <div class="meta-info">TIMESTAMP: ${new Date().toLocaleString()} // LEVEL 4 SYNAPSE ACCESS</div>
            <div>${logsHTML}</div>
            <script>window.onload = function() { window.print(); window.close(); }</script>
        </body>
        </html>
    `);
    printWindow.document.close();
    speak("Communication logs exported to document print channel.");
}

if (clearLogsBtn) {
    clearLogsBtn.addEventListener('click', async () => {
        const confirmed = await showSystemConfirm("Execute core protocol: Flush communication history registers?");
        if (confirmed) {
            clearChatLogs();
        }
    });
}

// Global helper function for code block copy buttons
window.copyCodeBlock = function(buttonElement) {
    const container = buttonElement.closest('.code-container');
    if (!container) return;
    const codeElement = container.querySelector('code');
    if (!codeElement) return;

    const codeText = codeElement.textContent;
    navigator.clipboard.writeText(codeText).then(() => {
        const icon = buttonElement.querySelector('i');
        icon.className = 'fa-solid fa-check';
        buttonElement.style.color = '#00ff66';

        if (window.playClickSound) window.playClickSound();

        setTimeout(() => {
            icon.className = 'fa-regular fa-copy';
            buttonElement.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy code: ', err);
    });
};

// Global helper function for expanding/zooming code blocks
window.zoomCodeBlock = function(buttonElement) {
    const container = buttonElement.closest('.code-container');
    if (!container) return;
    const codeElement = container.querySelector('code');
    if (!codeElement) return;

    const codeText = codeElement.textContent;
    const langSpan = container.querySelector('.code-lang');
    const lang = langSpan ? langSpan.textContent.toLowerCase() : 'plaintext';

    const zoomOverlay = document.getElementById('code-zoom-overlay');
    const zoomPre = document.getElementById('code-zoom-pre');
    const zoomCode = document.getElementById('code-zoom-code');

    if (zoomOverlay && zoomPre && zoomCode) {
        zoomPre.className = `language-${lang}`;
        zoomCode.className = `language-${lang}`;
        zoomCode.textContent = codeText;

        if (window.Prism) {
            Prism.highlightElement(zoomCode);
        }

        zoomOverlay.style.display = 'flex';
        if (window.playClickSound) window.playClickSound();
    }
};

// Document event bindings for code zoom overlay
document.addEventListener('DOMContentLoaded', () => {
    const zoomOverlay = document.getElementById('code-zoom-overlay');
    const closeZoomBtn = document.getElementById('close-zoom-btn');
    const zoomCopyBtn = document.getElementById('code-zoom-copy');
    const zoomCode = document.getElementById('code-zoom-code');

    if (closeZoomBtn && zoomOverlay) {
        closeZoomBtn.addEventListener('click', () => {
            zoomOverlay.style.display = 'none';
            if (window.playClickSound) window.playClickSound();
        });
        zoomOverlay.addEventListener('click', (e) => {
            if (e.target === zoomOverlay) {
                zoomOverlay.style.display = 'none';
                if (window.playClickSound) window.playClickSound();
            }
        });
    }

    if (zoomCopyBtn && zoomCode) {
        zoomCopyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(zoomCode.textContent).then(() => {
                const icon = zoomCopyBtn.querySelector('i');
                icon.className = 'fa-solid fa-check';
                zoomCopyBtn.style.color = '#00ff66';

                if (window.playClickSound) window.playClickSound();

                setTimeout(() => {
                    icon.className = 'fa-regular fa-copy';
                    zoomCopyBtn.style.color = '';
                }, 2000);
            });
        });
    }
});
