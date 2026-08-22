// ==========================================================================
// J.A.R.V.I.S. 3.2.0 - Google Gemini & Universal Cognitive AI Engine
// ==========================================================================

const ACRONYMS_DATABASE = {
    "NDA": "The full form of **NDA** has three primary meanings, Sir:\n1. **National Defence Academy** — The premier joint training academy for the Indian Army, Navy, and Air Force.\n2. **Non-Disclosure Agreement** — A legally binding confidentiality agreement between parties.\n3. **National Democratic Alliance** — A political coalition in India.",
    "ISRO": "The full form of **ISRO** is **Indian Space Research Organisation**, India's national space exploration agency headquartered in Bengaluru, Sir.",
    "DRDO": "The full form of **DRDO** is **Defence Research and Development Organisation**, India's military research and development agency, Sir.",
    "NASA": "The full form of **NASA** is **National Aeronautics and Space Administration**, the United States civil space agency, Sir.",
    "UPSC": "The full form of **UPSC** is **Union Public Service Commission**, India's premier central recruiting agency for civil services (IAS, IPS, IFS), Sir.",
    "IAS": "The full form of **IAS** is **Indian Administrative Service**, the premier administrative civil service branch of India, Sir.",
    "IPS": "The full form of **IPS** is **Indian Police Service**, the senior law enforcement civil service branch of India, Sir.",
    "IFS": "The full form of **IFS** is **Indian Foreign Service** (or Indian Forest Service), Sir.",
    "IIT": "The full form of **IIT** is **Indian Institute of Technology**, premier autonomous public technical universities across India, Sir.",
    "NIT": "The full form of **NIT** is **National Institute of Technology**, premier public engineering institutes in India, Sir.",
    "AIIMS": "The full form of **AIIMS** is **All India Institute of Medical Sciences**, autonomous public medical research universities in India, Sir.",
    "WHO": "The full form of **WHO** is **World Health Organization**, the United Nations specialized agency responsible for global public health, Sir.",
    "UN": "The full form of **UN** is **United Nations**, the international intergovernmental organization founded to maintain international peace and security, Sir.",
    "UNO": "The full form of **UNO** is **United Nations Organization**, Sir.",
    "UNESCO": "The full form of **UNESCO** is **United Nations Educational, Scientific and Cultural Organization**, Sir.",
    "UNICEF": "The full form of **UNICEF** is **United Nations International Children's Emergency Fund**, Sir.",
    "FBI": "The full form of **FBI** is **Federal Bureau of Investigation**, the domestic intelligence and security service of the United States, Sir.",
    "CIA": "The full form of **CIA** is **Central Intelligence Agency**, the foreign civilian intelligence service of the United States, Sir.",
    "RAW": "The full form of **RAW** is **Research and Analysis Wing**, the primary foreign intelligence agency of India, Sir.",
    "CBI": "The full form of **CBI** is **Central Bureau of Investigation**, the premier domestic crime investigating agency of India, Sir.",
    "ED": "The full form of **ED** is **Enforcement Directorate**, the economic intelligence agency responsible for enforcing economic laws in India, Sir.",
    "GST": "The full form of **GST** is **Goods and Services Tax**, the comprehensive indirect tax levied on goods and services across India, Sir.",
    "ATM": "The full form of **ATM** is **Automated Teller Machine**, an electronic banking outlet allowing automated cash withdrawals and deposits, Sir.",
    "OTP": "The full form of **OTP** is **One-Time Password**, a single-use numerical security passcode valid for an authentication session, Sir.",
    "PIN": "The full form of **PIN** is **Personal Identification Number**, a numeric passcode used for secure user authentication, Sir.",
    "PAN": "The full form of **PAN** is **Permanent Account Number**, a 10-digit alphanumeric identifier issued by the Indian Income Tax Department, Sir.",
    "SIM": "The full form of **SIM** is **Subscriber Identity Module**, a smart card that securely stores mobile subscriber identity keys, Sir.",
    "PDF": "The full form of **PDF** is **Portable Document Format**, a versatile file format developed by Adobe to present documents reliably, Sir.",
    "USB": "The full form of **USB** is **Universal Serial Bus**, an industry standard for connecting peripheral devices to computers, Sir.",
    "GPS": "The full form of **GPS** is **Global Positioning System**, a satellite-based radionavigation system providing precise geolocational coordinates, Sir.",
    "VPN": "The full form of **VPN** is **Virtual Private Network**, an encrypted connection over the Internet from a device to a secure network, Sir.",
    "IP": "The full form of **IP** is **Internet Protocol**, the principal communications protocol for relaying datagrams across network boundaries, Sir.",
    "URL": "The full form of **URL** is **Uniform Resource Locator**, the colloquial web address referencing a specific Internet resource, Sir.",
    "HTTP": "The full form of **HTTP** is **Hypertext Transfer Protocol**, the foundation data communication protocol for the World Wide Web, Sir.",
    "HTTPS": "The full form of **HTTPS** is **Hypertext Transfer Protocol Secure**, the encrypted extension of HTTP using TLS/SSL encryption, Sir.",
    "HTML": "The full form of **HTML** is **Hypertext Markup Language**, the standard markup language for web documents, Sir.",
    "CSS": "The full form of **CSS** is **Cascading Style Sheets**, the stylesheet language used for styling HTML elements, Sir.",
    "JS": "The full form of **JS** is **JavaScript**, the high-level programming language that powers interactive behavior across the web, Sir.",
    "API": "The full form of **API** is **Application Programming Interface**, a set of definitions and protocols for building and integrating application software, Sir.",
    "AI": "The full form of **AI** is **Artificial Intelligence**, the simulation of human intelligence processes by computer systems, Sir.",
    "ML": "The full form of **ML** is **Machine Learning**, an AI discipline focused on building applications that learn patterns from data, Sir.",
    "DL": "The full form of **DL** is **Deep Learning**, a subset of machine learning based on multi-layered artificial neural networks, Sir.",
    "CPU": "The full form of **CPU** is **Central Processing Unit**, the primary electronic circuitry that executes instructions comprising a computer program, Sir.",
    "GPU": "The full form of **GPU** is **Graphics Processing Unit**, a specialized electronic processor designed to accelerate 3D rendering and parallel computational workloads, Sir.",
    "RAM": "The full form of **RAM** is **Random Access Memory**, high-speed volatile computational memory providing instant read/write access to running applications, Sir.",
    "ROM": "The full form of **ROM** is **Read-Only Memory**, non-volatile memory storing permanent firmware instructions like the system BIOS, Sir.",
    "SSD": "The full form of **SSD** is **Solid State Drive**, a high-speed flash-memory storage device with no moving mechanical parts, Sir.",
    "HDD": "The full form of **HDD** is **Hard Disk Drive**, electro-mechanical data storage using magnetic rotating platters, Sir.",
    "BIOS": "The full form of **BIOS** is **Basic Input/Output System**, the motherboard firmware used to perform hardware initialization during the booting process, Sir.",
    "OS": "The full form of **OS** is **Operating System**, system software that manages computer hardware, software resources, and common services, Sir.",
    "SQL": "The full form of **SQL** is **Structured Query Language**, a domain-specific language used for managing data in relational database systems, Sir.",
    "DBMS": "The full form of **DBMS** is **Database Management System**, software that enables users to create, maintain, and control access to structured databases, Sir.",
    "JSON": "The full form of **JSON** is **JavaScript Object Notation**, a lightweight open-standard data interchange format, Sir.",
    "XML": "The full form of **XML** is **Extensible Markup Language**, a markup language designed for storing and transporting structured data, Sir.",
    "SDK": "The full form of **SDK** is **Software Development Kit**, a collection of software development tools in one installable package, Sir.",
    "GUI": "The full form of **GUI** is **Graphical User Interface**, a visual interface allowing users to interact with electronic devices through graphical icons, Sir.",
    "CLI": "The full form of **CLI** is **Command Line Interface**, a text-based interface used for entering commands and running programs, Sir.",
    "LAN": "The full form of **LAN** is **Local Area Network**, a computer network interconnecting computers within a limited area, Sir.",
    "WAN": "The full form of **WAN** is **Wide Area Network**, a telecommunications network extending over a large geographic distance, Sir.",
    "WiFi": "The full form of **WiFi** stands for **Wireless Fidelity**, the radio wireless networking technology for local area network device connectivity, Sir.",
    "CCTV": "The full form of **CCTV** is **Closed-Circuit Television**, video transmission to a specific, limited set of monitors, Sir.",
    "LED": "The full form of **LED** is **Light Emitting Diode**, a semiconductor light source that emits light when current flows through it, Sir.",
    "LCD": "The full form of **LCD** is **Liquid Crystal Display**, a flat-panel display technology using liquid crystals, Sir.",
    "OLED": "The full form of **OLED** is **Organic Light Emitting Diode**, display technology that produces deep blacks and vibrant colors through individual organic pixels, Sir.",
    "UPI": "The full form of **UPI** is **Unified Payments Interface**, the real-time instant payment system developed by the National Payments Corporation of India (NPCI), Sir.",
    "NEFT": "The full form of **NEFT** is **National Electronic Funds Transfer**, an electronic funds transfer system maintained by the RBI, Sir.",
    "RTGS": "The full form of **RTGS** is **Real Time Gross Settlement**, continuous settlement of fund transfers individually on an order-by-order basis, Sir.",
    "IMPS": "The full form of **IMPS** is **Immediate Payment Service**, an instant inter-bank electronic fund transfer service in India, Sir.",
    "EMI": "The full form of **EMI** is **Equated Monthly Installment**, a fixed payment amount made by a borrower to a lender on a specified calendar date each month, Sir.",
    "KYC": "The full form of **KYC** is **Know Your Customer**, the mandatory process of customer identity verification by financial institutions, Sir.",
    "FIR": "The full form of **FIR** is **First Information Report**, a written document prepared by police upon receiving information about a cognizable offence, Sir.",
    "CV": "The full form of **CV** is **Curriculum Vitae**, an in-depth summary of an individual's career, qualifications, and education history, Sir.",
    "CEO": "The full form of **CEO** is **Chief Executive Officer**, the highest-ranking executive in an organization responsible for overall management and operations, Sir.",
    "CTO": "The full form of **CTO** is **Chief Technology Officer**, the executive overseeing technical and engineering operations, Sir.",
    "CFO": "The full form of **CFO** is **Chief Financial Officer**, the executive responsible for managing the financial actions of a company, Sir.",
    "HR": "The full form of **HR** is **Human Resources**, the corporate division responsible for screening, recruiting, and training personnel, Sir.",
    "SOS": "The full form of **SOS** is commonly referred to as **Save Our Souls** or **Save Our Ship**, the international Morse code distress signal (· · · — — — · · ·), Sir."
};

function resolveAcronymOrFullForm(promptText) {
    if (!promptText || typeof promptText !== 'string') return null;
    const lower = promptText.toLowerCase().trim();
    
    const isFullFormQuery = lower.includes("full form") || lower.includes("ful form") || lower.includes("fullform") || 
                           lower.includes("ka full form") || lower.includes("ki full form") || lower.includes("full form of") ||
                           lower.includes("stands for") || lower.includes("stand for") || lower.includes("meaning of") ||
                           lower.includes("matlab");
                           
    if (!isFullFormQuery) return null;

    let candidate = promptText
        .replace(/\b(koi|kya|hai|he|batao|bataiye|ka|ki|ke|ful|full|form|fullform|of|the|what|is|mean|meaning|stands|stand|for|in|hindi|english|matlab|bhai|sir|please|plz)\b/gi, '')
        .replace(/[^a-zA-Z0-9]/g, ' ')
        .trim();

    const words = candidate.split(/\s+/).filter(w => w.length >= 2);
    for (let word of words) {
        const upper = word.toUpperCase();
        if (ACRONYMS_DATABASE[upper]) {
            return ACRONYMS_DATABASE[upper];
        }
    }

    return null;
}

function evaluateMathExpression(expr) {
    if (!expr || typeof expr !== 'string') return null;
    const clean = expr.trim().toLowerCase()
        .replace(/^what is\s+/gi, '')
        .replace(/^calculate\s+/gi, '')
        .replace(/^solve\s+/gi, '')
        .replace(/^compute\s+/gi, '')
        .replace(/^value of\s+/gi, '')
        .replace(/^equals\s+/gi, '')
        .replace(/^equal to\s+/gi, '')
        .replace(/\?/g, '')
        .trim();

    // 1. Percentage check: e.g. "20% of 500"
    const pctMatch = clean.match(/^(\d+(?:\.\d+)?)\s*%\s*(?:of|\*)\s*(\d+(?:\.\d+)?)$/);
    if (pctMatch) {
        const pct = parseFloat(pctMatch[1]);
        const total = parseFloat(pctMatch[2]);
        const res = (pct / 100) * total;
        return `${pct}% of ${total} is **${res}**, Sir.`;
    }

    // 2. Square Root: sqrt(144) or square root of 144
    const sqrtMatch = clean.match(/^sqrt\s*\(\s*(\d+(?:\.\d+)?)\s*\)$/i) || clean.match(/^square root of\s*(\d+(?:\.\d+)?)$/i);
    if (sqrtMatch) {
        const val = parseFloat(sqrtMatch[1]);
        const res = Math.sqrt(val);
        return `The square root of ${val} is **${parseFloat(res.toFixed(4))}**, Sir.`;
    }

    // 3. Pure arithmetic: numbers, +, -, *, /, %, ^, (, ), spaces, .
    const isArithmetic = /^[0-9+\-*/%.^()\s]+$/.test(clean) && /[0-9]/.test(clean) && /[+\-*/%.^]/.test(clean);
    if (isArithmetic) {
        try {
            const sanitized = clean.replace(/\^/g, '**');
            const res = Function(`"use strict"; return (${sanitized})`)();
            if (typeof res === 'number' && !isNaN(res) && isFinite(res)) {
                const formattedRes = Number.isInteger(res) ? res.toLocaleString() : parseFloat(res.toFixed(4)).toString();
                return `The result of ${clean} is **${formattedRes}**, Sir.`;
            }
        } catch(e) {}
    }

    return null;
}

async function queryGeminiAPI(promptText) {
    const promptLower = promptText.toLowerCase().trim();

    // 0. Instant Mathematical Computation
    const mathResult = evaluateMathExpression(promptText);
    if (mathResult) {
        appendChatBubble('JARVIS', mathResult);
        speak(mathResult.replace(/[*_#`]/g, ""));
        updateCoreState('IDLE');
        return;
    }

    // 0.5. Instant Acronym & Full Form Resolution
    const acronymResult = resolveAcronymOrFullForm(promptText);
    if (acronymResult) {
        appendChatBubble('JARVIS', acronymResult);
        speak(acronymResult.replace(/[*_#`]/g, ""));
        updateCoreState('IDLE');
        return;
    }

    // Image Generation Intent Detection
    const imageKeywords = [
        "generate image", "generate picture", "generate photo", "create image", "create picture", "create photo", 
        "make image", "make picture", "make photo", "draw a", "draw", "paint a", "paint", "make a picture of", 
        "make a photo of", "image of", "picture of", "photo of", "show me an image", "show me a picture", 
        "design an image", "render a photo", "generate wallpaper", "create wallpaper", "ai art", "make art"
    ];
    const isImageRequest = imageKeywords.some(k => promptLower.includes(k)) || 
                           (promptLower.startsWith("make ") && (promptLower.includes("picture") || promptLower.includes("photo") || promptLower.includes("image") || promptLower.includes("art"))) || 
                           (promptLower.startsWith("create ") && (promptLower.includes("picture") || promptLower.includes("photo") || promptLower.includes("image") || promptLower.includes("art"))) || 
                           (promptLower.startsWith("generate ") && (promptLower.includes("picture") || promptLower.includes("photo") || promptLower.includes("image") || promptLower.includes("art")));

    if (isImageRequest) {
        updateCoreState('THINKING');
        
        let cleanPrompt = promptText;
        const prefixes = [
            /generate an image of/i, /generate image of/i, /generate a picture of/i, /generate picture of/i, /generate a photo of/i, /generate photo of/i,
            /create an image of/i, /create image of/i, /create a picture of/i, /create picture of/i, /create a photo of/i, /create photo of/i,
            /make an image of/i, /make image of/i, /make a picture of/i, /make picture of/i, /make a photo of/i, /make photo of/i,
            /show me an image of/i, /show me a picture of/i, /show me a photo of/i, /show me image of/i,
            /design an image of/i, /design a photo of/i, /render a photo of/i, /generate wallpaper of/i,
            /make image/i, /make picture/i, /make photo/i, /generate image/i, /generate picture/i, /generate photo/i,
            /create image/i, /create picture/i, /create photo/i, /image of/i, /picture of/i, /photo of/i,
            /draw a/i, /draw/i, /paint a/i, /paint/i
        ];
        
        for (let pattern of prefixes) {
            cleanPrompt = cleanPrompt.replace(pattern, "");
        }
        cleanPrompt = cleanPrompt.trim();
        if (!cleanPrompt) cleanPrompt = "futuristic Iron Man Arc Reactor suit in neon cyan lighting";
        
        const randomSeed = Math.floor(Math.random() * 1000000);
        let formattedPrompt = cleanPrompt;
        const isAnime = promptLower.includes('naruto') || promptLower.includes('anime') || promptLower.includes('manga') || promptLower.includes('goku') || promptLower.includes('sasuke');
        
        if (isAnime) {
            formattedPrompt = `front view close-up portrait of Naruto Uzumaki, 2D anime illustration art style, spiky yellow hair, Leaf Village headband with metallic plate, one bright blue eye and one red eye, cheek whiskers, high collar orange jacket, clean 2D anime linework, painted canvas background, masterpiece`;
        } else {
            formattedPrompt = `${cleanPrompt}, bright vivid lighting, clear detailed face, high quality, sharp focus, clean vibrant colors`;
        }
        
        const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(formattedPrompt)}?width=1024&height=1024&seed=${randomSeed}&nologo=true&enhance=true`;
        speak(`Generating AI image for ${cleanPrompt}, Sir.`);
        
        setTimeout(() => {
            const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            appendChatBubbleImageDOM('JARVIS', imageUrl, timeStr);
            speak("Here is your requested image, Sir.");
            updateCoreState('IDLE');
        }, 1200);
        return;
    }

    // Code Automation & Competitive Programming Intent Detection
    const cpKeywords = ["problem", "codeforces", "codechef", "leetcode", "atcoder", "hackerrank", "uva", "spoj", "constraints", "sample input", "sample output"];
    const codingKeywords = ["code", "python", "javascript", "js", "c++", "cpp", "java", "html", "css", "function", "programming", "compile", "debug", "script", "regex"];
    const debugKeywords = ["error", "exception", "traceback", "syntaxerror", "nameerror", "typeerror", "bug", "crash", "fails", "failed", "fix"];
    const algoKeywords = ["algorithm", "how does", "sorting", "searching", "data structure", "bubble sort", "binary search", "dijkstra", "fibonacci", "graph", "tree", "linked list"];

    const hasWrite = promptLower.includes("write") || promptLower.includes("create") || promptLower.includes("build") || promptLower.includes("implement") || promptLower.includes("solve") || promptLower.includes("run") || promptLower.includes("compile");
    const hasLang = codingKeywords.some(k => promptLower.includes(k));

    let isCP = cpKeywords.some(k => promptLower.includes(k));
    let isCodeGeneration = hasWrite && hasLang;
    let isDebugging = debugKeywords.some(k => promptLower.includes(k)) && (promptLower.includes("code") || promptLower.includes("file") || promptLower.includes("script") || promptLower.includes("line") || promptLower.includes("\n"));
    let isAlgoRequest = algoKeywords.some(k => promptLower.includes(k)) && !isCodeGeneration;

    if (isCP && (promptText.length > 200 || promptLower.includes("input") || promptLower.includes("output") || promptLower.includes("constraints"))) {
        let lang = "cpp";
        if (promptLower.includes("python")) lang = "python";
        else if (promptLower.includes("javascript") || promptLower.includes("js")) lang = "javascript";
        else if (promptLower.includes("java")) lang = "java";
        await triggerCodeAutomation(promptText, lang);
        return;
    }

    if (isCodeGeneration) {
        let lang = "python";
        if (promptLower.includes("c++") || promptLower.includes("cpp")) lang = "cpp";
        else if (promptLower.includes("javascript") || promptLower.includes("js")) lang = "javascript";
        else if (promptLower.includes("java")) lang = "java";
        else if (promptLower.includes("html")) lang = "html";
        else if (promptLower.includes("css")) lang = "css";
        await triggerCodeAutomation(promptText, lang);
        return;
    }

    // Google Gemini API (if key AIzaSy... is configured)
    if (geminiApiKey && geminiApiKey.startsWith("AIzaSy")) {
        const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.0-flash-lite', 'gemini-1.5-flash'];
        let activeInstruction = "You are J.A.R.V.I.S., the legendary advanced AI system. You understand and answer in English and Hindi (Hinglish). Speak politely, use terms like 'Sir', and keep responses extremely crisp, informative, and to-the-point (under 3-4 sentences max).";
        let detectedModeBadge = "";

        if (isAlgoRequest) {
            activeInstruction = "You are J.A.R.V.I.S. Coding Assistant, specializing in Algorithm Explanations. Describe what the algorithm does, how it works, and its time complexity in simple terms. Keep it under 5 sentences, Sir.";
            detectedModeBadge = "🧠 Mode Detected: Algorithm Explanation\n\n";
        } else if (isDebugging) {
            activeInstruction = "You are J.A.R.V.I.S. Debugging Assistant. Locate the bug, explain why it occurred in simple terms, and provide the corrected code. Keep it crisp and polite, Sir.";
            detectedModeBadge = "🧠 Mode Detected: Debugger\n\n";
        } else if (isCP) {
            activeInstruction = "You are J.A.R.V.I.S. Coding Assistant, specializing in Competitive Programming. Output: Algorithm, Complexity, C++17 Code, Explanation. Use Markdown, speak politely using 'Sir'.";
            detectedModeBadge = "🧠 Mode Detected: Competitive Programming\n\n";
        }

        for (let model of models) {
            const apiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`;
            const requestPayload = {
                contents: [{ parts: [{ text: promptText }] }],
                systemInstruction: { parts: [{ text: activeInstruction }] }
            };

            try {
                const response = await fetch(apiEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestPayload)
                });

                if (response.ok) {
                    const data = await response.json();
                    let responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (responseText) {
                        appendChatBubble('JARVIS', detectedModeBadge + responseText);
                        speak(responseText);
                        updateCoreState('IDLE');
                        return;
                    }
                }
            } catch (err) {}
        }
    }

    // Universal Knowledge & Live Intelligence Engine
    const fallbackAnswer = await generateFallbackKnowledge(promptText);
    appendChatBubble('JARVIS', fallbackAnswer);
    speak(fallbackAnswer.replace(/[*_#`$]/g, ""));
    updateCoreState('IDLE');
}

function cleanHinglishQuery(query) {
    let clean = query.trim()
        .replace(/\b(koi|bhai|sir|please|plz)\b/gi, '')
        .replace(/\b(kya hai|kya hota hai|kya he|kisko bolte hai|kisko kehte hain|kise kehte hai)\b/gi, '')
        .replace(/\b(batao|bataiye|samjhao|samjha do|bataye|batao na)\b/gi, '')
        .replace(/\b(ke bare me|ke bare mein|ke baare me|ke baare mein|ka matlab|ki paribhasha)\b/gi, '')
        .replace(/\b(what is the formula of|what is the formula for|what is the definition of|what is the meaning of|what is the|what is an?|what are|what does|explain|tell me about|define|meaning of|who is|who was)\b/gi, '')
        .replace(/,\s*no explanation.*$/gi, '')
        .replace(/\?/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    return clean;
}

async function fetchOnlineIntelligence(query) {
    const cleanTopic = cleanHinglishQuery(query);

    if (!cleanTopic || cleanTopic.length < 2) return null;

    // 1. DuckDuckGo Instant Knowledge API
    try {
        const ddgUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(cleanTopic)}&format=json`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500);
        const res = await fetch(ddgUrl, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (res.ok) {
            const data = await res.json();
            if (data.AbstractText && data.AbstractText.length > 20) {
                return `${data.AbstractText}, Sir.`;
            }
        }
    } catch (e) {}

    // 2. Wikipedia Search Query + Summary
    try {
        const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(cleanTopic)}&utf8=&format=json&origin=*`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        const sRes = await fetch(searchUrl, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (sRes.ok) {
            const sData = await sRes.json();
            const results = sData.query?.search || [];
            for (let item of results.slice(0, 3)) {
                if (!item.title) continue;
                const sumUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(item.title)}`;
                const sumRes = await fetch(sumUrl, { headers: { 'Accept': 'application/json' } });
                if (sumRes.ok) {
                    const sumData = await sumRes.json();
                    if (sumData.extract && sumData.type !== 'disambiguation' && sumData.extract.length > 20 && !sumData.extract.includes("may refer to:")) {
                        const sentences = sumData.extract.split(/(?<=[.!?])\s+/);
                        const shortExtract = sentences.slice(0, 3).join(' ');
                        return `${shortExtract}, Sir.`;
                    }
                }
            }
        }
    } catch (e) {}

    return null;
}

async function generateFallbackKnowledge(query) {
    const q = query.toLowerCase().trim();
    const isNoExplanation = q.includes("no explanation") || q.includes("no explain");

    // 1. Greetings & Identity
    if (/\b(hello|hi|hey|greetings|good morning|good evening|good afternoon)\b/i.test(q)) {
        return "Hello Sir! I am fully operational and ready to assist you. Systems are running smoothly.";
    }
    if (q.includes("how are you")) {
        return "All internal diagnostics and core telemetry are operating at peak performance, Sir. How may I assist you today?";
    }
    if (q.includes("who are you") || q.includes("your name") || q.includes("what are you") || q.includes("what is your name")) {
        return "I am J.A.R.V.I.S. (Just A Rather Very Intelligent System), your advanced automated AI assistant and Stark Mainframe coordinator, Sir.";
    }
    if (q.includes("tum kaun ho") || q.includes("aap kaun ho") || q.includes("kaun ho tum")) {
        return "Main J.A.R.V.I.S. (Just A Rather Very Intelligent System) hoon, aapka advanced AI assistant aur Stark Mainframe coordinator, Sir.";
    }
    if (q.includes("namaste") || q.includes("kaise ho") || q.includes("kaise hain") || q.includes("kya haal hai")) {
        return "Namaste Sir! Main bilkul theek hoon. Stark System Diagnostics normal hain. Main aapki kya sahayata kar sakta hoon?";
    }
    if (q.includes("kya kar sakte ho") || q.includes("tum kya kar sakte ho") || q.includes("what can you do")) {
        return "I can answer questions across science, mathematics, coding, and history, generate 4K AI images, execute local system automation, control media playback, and run code in our localized interpreter, Sir!";
    }

    // 2. Stark Industries & Iron Man Lore
    if (/\b(iron\s*man|ironman|tony\s*stark)\b/i.test(q)) {
        return "Iron Man is the superhero persona of Anthony Edward 'Tony' Stark—genius billionaire, industrialist, and founder of the Avengers. He engineered high-tech powered armor suits powered by the Arc Reactor to protect global security, Sir.";
    }
    if (/\barc\s*reactor\b/i.test(q)) {
        return "The Arc Reactor is a clean fusion energy core invented by Howard Stark and miniaturized by Tony Stark to power his life-support electromagnets and high-output Iron Man armor systems, Sir.";
    }

    // 3. Application & Shortcut Controls (YouTube, Browser, OS)
    if (q.includes("youtube playback speed") || q.includes("playback speed control") || q.includes("youtube speed")) {
        return "On YouTube, you can control playback speed using keyboard shortcuts: 1. Press **Shift + >** (period) to speed up video (up to 2x). 2. Press **Shift + <** (comma) to slow down video. 3. Or click the Settings Gear icon ⚙️ on the video player and select **Playback speed**, Sir.";
    }
    if (/\b(design.*animation|animation.*design|what is design)\b/i.test(q)) {
        return "Design is the systematic creation of functional and visual systems. In digital media and animation, design orchestrates layout, keyframe timing, physics easing, and visual hierarchy to communicate information and bring interfaces to life, Sir.";
    }

    // 4. Physics & Mechanics
    if (/\bdynamics\b/i.test(q)) {
        return "Dynamics is the branch of classical mechanics concerned with the study of forces and torques and their effect on the motion of physical bodies, governed by Newton's Laws of Motion, Sir.";
    }
    if (/\bkinematics\b/i.test(q)) {
        return "Kinematics is the branch of classical mechanics that describes the motion of points, bodies, and systems of bodies without considering the forces that cause them to move, Sir.";
    }
    if (q === "formula" || q === "what is formula" || q === "what is a formula" || q === "define formula") {
        return "In science and mathematics, a Formula is a concise symbolic representation or rule (such as F = ma or E = mc²) used to state relationships between physical quantities or compute mathematical values, Sir.";
    }
    if (q.includes("kinetic energy")) {
        if (isNoExplanation) return "Kinetic Energy Formula: **KE = ½ m v²** (where $m$ = mass, $v$ = velocity), Sir.";
        return "Kinetic Energy ($KE$) is the energy an object possesses due to its motion: **KE = ½ m v²**, where $m$ is mass and $v$ is velocity, measured in Joules (J), Sir.";
    }
    if (q.includes("potential energy")) {
        if (isNoExplanation) return "Potential Energy Formula: **PE = m g h** (where $m$ = mass, $g$ = 9.8 m/s², $h$ = height), Sir.";
        return "Gravitational Potential Energy ($PE$) is the energy stored in an object due to its position: **PE = m × g × h**, where $m$ is mass, $g$ is gravity (~9.8 m/s² on Earth), and $h$ is height in meters, Sir.";
    }
    if (q.includes("force formula") || q.includes("formula of force") || q.includes("formula for force") || q === "force" || q.includes("what is force")) {
        if (isNoExplanation) return "Force Formula: **F = m × a** (Force = mass × acceleration, measured in Newtons), Sir.";
        return "According to Newton's Second Law of Motion, Force ($F$) is calculated as mass ($m$) multiplied by acceleration ($a$): **F = m × a**. In the SI system, force is measured in Newtons (N), where 1 N = 1 kg·m/s², Sir.";
    }
    if (q.includes("photosynthesis")) {
        return "Photosynthesis is the biological process by which autotrophic organisms (such as plants, algae, and cyanobacteria) convert light energy from sunlight into chemical energy in the form of glucose, releasing oxygen as a byproduct. Chemical equation: **6CO₂ + 6H₂O + Light Energy ➔ C₆H₁₂O₆ + 6O₂**, Sir.";
    }
    if (q.includes("newton's law") || q.includes("newtons law") || q.includes("laws of motion")) {
        return "Newton's Three Laws of Motion: 1. **Inertia**: An object remains at rest or in uniform motion unless acted upon by a net external force. 2. **Force**: F = m × a. 3. **Action-Reaction**: For every action, there is an equal and opposite reaction, Sir.";
    }
    if (q.includes("speed of light") || q.includes("velocity of light")) {
        return "The speed of light in a vacuum is exactly **299,792,458 meters per second** (~3.0 × 10⁸ m/s, or approximately 186,282 miles per second), denoted by the universal constant $c$, Sir.";
    }
    if (q.includes("e=mc") || q.includes("e = mc") || q.includes("einstein formula") || q.includes("mass energy")) {
        return "Einstein's mass-energy equivalence equation is **E = mc²**, stating that energy ($E$) equals mass ($m$) multiplied by the speed of light squared ($c^2$). It demonstrates that mass and energy are interchangeable, Sir.";
    }
    if (q.includes("ohm's law") || q.includes("ohms law") || q.includes("ohm law")) {
        return "Ohm's Law states that the current ($I$) flowing through a conductor between two points is directly proportional to voltage ($V$) and inversely proportional to resistance ($R$): **V = I × R** (Voltage = Current × Resistance), Sir.";
    }
    if (q.includes("work formula") || q.includes("formula of work") || q.includes("what is work in physics")) {
        return "Work ($W$) in physics is the measure of energy transfer when an object is moved over a distance by an external force: **W = F × d × cos(θ)**, measured in Joules (J), Sir.";
    }
    if (q.includes("power formula") || q.includes("formula of power")) {
        return "Power ($P$) is the rate at which work is performed or energy is transferred over time: **P = W / t** (Work / Time) or in electrical systems **P = V × I** (Voltage × Current), measured in Watts (W), Sir.";
    }
    if (q.includes("momentum")) {
        return "Linear Momentum ($p$) is the product of an object's mass and its velocity: **p = m × v**, measured in kg·m/s, Sir.";
    }
    if (q.includes("acceleration")) {
        return "Acceleration ($a$) is the rate of change of velocity with respect to time: **a = (v - u) / t**, where $v$ is final velocity, $u$ is initial velocity, and $t$ is time (measured in m/s²), Sir.";
    }
    if (q.includes("density formula") || q.includes("formula of density")) {
        return "Density ($ρ$) is mass per unit volume: **ρ = m / V**, measured in kg/m³ or g/cm³, Sir.";
    }
    if (q.includes("pressure formula") || q.includes("formula of pressure")) {
        return "Pressure ($P$) is defined as force applied perpendicular to a surface per unit area: **P = F / A**, measured in Pascals (Pa), Sir.";
    }
    if (q.includes("gravity") || q.includes("gravitation")) {
        return "Gravity is the universal force of attraction between objects with mass. Newton's Law of Universal Gravitation states **F = G(m₁m₂)/r²**, where $G$ is the gravitational constant ($6.674×10⁻¹¹ N·m²/kg²$), Sir.";
    }
    if (q.includes("black hole")) {
        return "A Black Hole is an astronomically dense celestial body where gravity is so strong that not even electromagnetic radiation like light can escape past its event horizon, Sir.";
    }
    if (q.includes("quantum")) {
        return "Quantum Mechanics is the fundamental branch of physics describing matter and energy at atomic and subatomic scales, where physical properties exist in discrete packets called quanta, Sir.";
    }
    if (q.includes("thermodynamics")) {
        return "Thermodynamics is the branch of physics that deals with heat, work, and temperature. The First Law states energy cannot be created or destroyed; the Second Law states entropy of an isolated system always increases, Sir.";
    }

    // 5. Biology, Chemistry & Medicine
    if (q.includes("mitochondria") || q.includes("mitochondrion")) {
        return "The Mitochondria is the organelle known as the 'powerhouse of the cell', responsible for generating adenosine triphosphate (ATP) through cellular respiration to fuel biochemical reactions, Sir.";
    }
    if (q.includes("cellular respiration")) {
        return "Cellular Respiration is the metabolic pathway that breaks down glucose in the presence of oxygen to produce ATP, water, and carbon dioxide: **C₆H₁₂O₆ + 6O₂ ➔ 6CO₂ + 6H₂O + 36-38 ATP**, Sir.";
    }
    if (q.includes("dna") || q.includes("deoxyribonucleic")) {
        return "DNA (Deoxyribonucleic Acid) is the double-helix molecule carrying genetic instructions for the development, functioning, growth, and reproduction of all known organisms, Sir.";
    }
    if (q.includes("rna") || q.includes("ribonucleic")) {
        return "RNA (Ribonucleic Acid) is a single-stranded nucleic acid essential in gene expression, coding, decoding, and translating genetic messages into proteins, Sir.";
    }
    if (q.includes("atom")) {
        return "An Atom is the fundamental unit of chemical elements, composed of a dense central nucleus of positively charged protons and neutral neutrons, surrounded by a cloud of negatively charged electrons, Sir.";
    }
    if (q.includes("periodic table")) {
        return "The Periodic Table arranges all 118 known chemical elements in order of increasing atomic number, grouping elements with similar chemical properties together, Sir.";
    }
    if (q.includes("water formula") || q.includes("formula of water")) {
        return "The chemical formula for water is **H₂O**, consisting of two Hydrogen atoms covalently bonded to one Oxygen atom, Sir.";
    }

    // 6. Mathematics & Geometry
    if (q.includes("pythagorean theorem") || q.includes("pythagoras theorem") || q.includes("pythagoras")) {
        return "The Pythagorean Theorem states that in any right-angled triangle, the square of the hypotenuse ($c$) equals the sum of the squares of the other two sides: **a² + b² = c²**, Sir.";
    }
    if (q.includes("pi") || q.includes("value of pi")) {
        return "Pi ($\pi$) is the mathematical constant representing the ratio of a circle's circumference to its diameter, approximately equal to **3.1415926535...** (or 22/7), Sir.";
    }
    if (q.includes("quadratic formula") || q.includes("quadratic equation")) {
        return "The quadratic formula solves $ax² + bx + c = 0$ as: **x = (-b ± √(b² - 4ac)) / (2a)**, Sir.";
    }

    // 7. Computer Science & AI
    if (q.includes("artificial intelligence") || q === "ai" || q.includes("what is ai")) {
        return "Artificial Intelligence (AI) is the discipline of building software systems and models capable of performing tasks requiring human cognition—including natural language processing, visual perception, decision-making, and automated problem solving, Sir.";
    }
    if (q.includes("machine learning")) {
        return "Machine Learning (ML) is a subset of AI where computational models learn patterns from training data to make predictions and optimize performance without manual rule-based programming, Sir.";
    }
    if (q.includes("deep learning") || q.includes("neural network")) {
        return "Deep Learning uses multi-layered Artificial Neural Networks inspired by biological brains to extract high-level feature representations from raw datasets (images, audio, text), Sir.";
    }
    if (q.includes("binary search")) {
        return "Binary Search is an efficient $O(\\log n)$ divide-and-conquer algorithm that finds target values within sorted arrays by repeatedly halving the search interval, Sir.";
    }
    if (/\b(dynamic programming|dp algorithm|dp approach)\b/i.test(q)) {
        return "Dynamic Programming is an algorithmic optimization technique that solves complex problems by breaking them down into overlapping subproblems and memoizing intermediate solutions to achieve polynomial time complexity, Sir.";
    }
    if (q.includes("array")) {
        return "An Array is a linear data structure storing homogenous data elements in contiguous memory slots, supporting $O(1)$ constant-time indexed lookups, Sir.";
    }
    if (q.includes("recursion")) {
        return "Recursion is a programming paradigm where a function invokes itself to resolve smaller subproblems until encountering a base termination case, Sir.";
    }
    if (q.includes("blockchain")) {
        return "Blockchain is a cryptographically secured, decentralized, distributed digital ledger that records immutable transactions across a peer-peer network, Sir.";
    }

    // 8. Live Online Intelligence Engine (DuckDuckGo + Wikipedia Search)
    const onlineAnswer = await fetchOnlineIntelligence(query);
    if (onlineAnswer) {
        return onlineAnswer;
    }

    // 9. Fallback with Guidance
    const topic = cleanHinglishQuery(query);
    const formattedTopic = (topic || query).charAt(0).toUpperCase() + (topic || query).slice(1);
    return `I have cataloged your query regarding **${formattedTopic}**, Sir. For unrestricted real-time generative conversation across any topic (like Gemini or ChatGPT), you can also link your free Gemini API key in Settings (⚙️).`;
}

async function triggerCodeAutomation(promptText, language) {
    updateCoreState('THINKING');
    appendChatBubble('JARVIS', "🧠 J.A.R.V.I.S. Code Interpreter Activated.\nInitializing core build sequence...");
    speak("Code Interpreter activated. Running build and execution sequence, Sir.");
    
    try {
        const response = await fetch(`${BACKEND_URL}/api/code/helper`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'build',
                description: promptText,
                language: language,
                timeout: 10
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            if (data.status === 'success') {
                const result = data.result;
                appendChatBubble('JARVIS', `💻 **Automation Completed Successfully**\n\n${result}`);
                speak("Code execution completed successfully, Sir.");
                updateCoreState('IDLE');
                return;
            } else {
                appendChatBubble('JARVIS', `❌ **Automation Build Error**: ${data.message}`);
                speak("Sir, the build failed due to an error.");
                updateCoreState('IDLE');
                return;
            }
        }
    } catch (err) {
        console.error("Code Interpreter automation failure:", err);
    }
    
    appendChatBubble('JARVIS', "⚠️ **System Warning**: Local build execution timed out or failed to connect.");
    speak("Sir, the local execution environment returned a connection warning.");
    updateCoreState('IDLE');
}

window.triggerSuggestedLanguage = function(algoName, lang) {
    const prompt = `Write ${lang} code for ${algoName} algorithm`;
    triggerCodeAutomation(prompt, lang);
};
