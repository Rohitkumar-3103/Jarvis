// ==========================================================================
// J.A.R.V.I.S. 3.0 - Google Gemini AI Connect Engine (Cognitive Layer)
// ==========================================================================

async function queryGeminiAPI(promptText) {
    const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.0-flash-lite', 'gemini-1.5-flash'];
    let lastError = null;

    const promptLower = promptText.toLowerCase();

    // Image Generation Intent Detection (Expanded AI Art Patterns)
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
        
        // Clean prompt text by removing common action prefixes
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
        if (!cleanPrompt) {
            cleanPrompt = "futuristic Iron Man Arc Reactor suit in neon cyan lighting";
        }
        
        const randomSeed = Math.floor(Math.random() * 1000000);
        
        // Exact 2D Front-View Studio Anime Portrait (Matching Reference Image naruto.jpg)
        let formattedPrompt = cleanPrompt;
        let modelParam = "flux";
        const promptLowerCheck = cleanPrompt.toLowerCase();
        const isAnime = promptLowerCheck.includes('naruto') || promptLowerCheck.includes('anime') || promptLowerCheck.includes('manga') || promptLowerCheck.includes('goku') || promptLowerCheck.includes('sasuke');
        
        if (isAnime) {
            formattedPrompt = `front view close-up portrait of Naruto Uzumaki, 2D anime illustration art style, spiky yellow hair, Leaf Village headband with metallic plate, one bright blue eye and one red eye, cheek whiskers, high collar orange jacket, clean 2D anime linework, painted canvas background, masterpiece`;
            modelParam = "flux";
        } else {
            formattedPrompt = `${cleanPrompt}, bright vivid lighting, clear detailed face, high quality, sharp focus, clean vibrant colors`;
            modelParam = "flux";
        }
        
        // Build Pollinations AI High-Quality Image URL (2D & 3D Enhanced)
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

    // Classification Keywords
    const cpKeywords = ["problem", "codeforces", "codechef", "leetcode", "atcoder", "hackerrank", "uva", "spoj", "constraints", "sample input", "sample output"];
    const codingKeywords = ["code", "python", "javascript", "js", "c++", "cpp", "java", "html", "css", "function", "programming", "compile", "debug", "script", "regex"];
    const debugKeywords = ["error", "exception", "traceback", "syntaxerror", "nameerror", "typeerror", "bug", "crash", "fails", "failed", "fix"];
    const algoKeywords = ["algorithm", "how does", "sorting", "searching", "data structure", "bubble sort", "binary search", "dijkstra", "fibonacci", "graph", "tree", "linked list"];

    // 1. Intent Detection
    const hasWrite = promptLower.includes("write") || promptLower.includes("create") || promptLower.includes("build") || promptLower.includes("implement") || promptLower.includes("solve") || promptLower.includes("run") || promptLower.includes("compile");
    const hasLang = codingKeywords.some(k => promptLower.includes(k));

    let isCP = cpKeywords.some(k => promptLower.includes(k));
    let isCodeGeneration = hasWrite && hasLang;
    let isDebugging = debugKeywords.some(k => promptLower.includes(k)) && (promptLower.includes("code") || promptLower.includes("file") || promptLower.includes("script") || promptLower.includes("line") || promptLower.includes("\n"));
    let isAlgoRequest = algoKeywords.some(k => promptLower.includes(k)) && !isCodeGeneration;

    // A. Leaf: Complete Problem Statement (Automatic Code Interpreter)
    const isDetailedCP = isCP && (promptText.length > 200 || promptLower.includes("input") || promptLower.includes("output") || promptLower.includes("constraints") || promptLower.includes("n =") || promptLower.includes("k ="));
    if (isDetailedCP) {
        let lang = "cpp";
        if (promptLower.includes("python")) lang = "python";
        else if (promptLower.includes("javascript") || promptLower.includes("js")) lang = "javascript";
        else if (promptLower.includes("java")) lang = "java";
        await triggerCodeAutomation(promptText, lang);
        return;
    }

    // B. Leaf: Code Generation (Automatic Code Interpreter)
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

    // C. Setup System Instructions for remaining requests (Algorithm, Debugging, CP Title, General Chat)
    let activeInstruction = "You are J.A.R.V.I.S., the legendary advanced AI system. Speak politely, use terms like 'Sir', and keep responses extremely crisp, informative, and to-the-point (under 3-4 sentences max) so they translate perfectly to voice feedback. Do not output markdown lists, stars, or header syntax.";
    let detectedModeBadge = "";

    if (isAlgoRequest) {
        activeInstruction = "You are J.A.R.V.I.S. Coding Assistant, specializing in Algorithm Explanations. Describe what the algorithm does, how it works, and its time complexity in simple terms. Keep it under 5 sentences, Sir.";
        detectedModeBadge = "🧠 Mode Detected: Algorithm Explanation\n\n";
    } else if (isDebugging) {
        activeInstruction = "You are J.A.R.V.I.S. Debugging Assistant. Locate the bug, explain why it occurred in simple terms, and provide the corrected code. Keep it crisp and polite, Sir.";
        detectedModeBadge = "🧠 Mode Detected: Debugger\n\n";
    } else if (isCP) {
        activeInstruction = "You are J.A.R.V.I.S. Coding Assistant, specializing in Competitive Programming. When the user mentions a competitive programming problem name/ID (e.g., Maximum Factors Problem, Two Sum, Codeforces 210A): 1. NEVER assume the problem statement. 2. If the full problem statement is provided, solve exactly that problem. 3. If only the problem title/ID is provided, politely ask for the complete statement or contest link. Never invent a different problem. 4. Output: Algorithm, Complexity, C++17 Code, Explanation. Use Markdown, speak politely using 'Sir', and do not invent code for unknown statements.";
        detectedModeBadge = "🧠 Mode Detected: Competitive Programming\n\n";
    }

    for (let model of models) {
        const apiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`;
        const requestPayload = {
            contents: [{
                parts: [{ text: promptText }]
            }],
            systemInstruction: {
                parts: [{ 
                    text: activeInstruction 
                }]
            }
        };

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestPayload)
            });

            if (response.ok) {
                const data = await response.json();
                let responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
                if (responseText) {
                    let buttonsConfig = null;
                    if (isAlgoRequest) {
                        let algoName = promptText.replace(/algorithm/gi, "").replace(/explain/gi, "").replace(/how does/gi, "").replace(/work/gi, "").replace(/\?/gi, "").trim();
                        if (!algoName) algoName = "this";
                        responseText = responseText + `\n\n*Sir, would you like me to generate and run code for this algorithm?*`;
                        buttonsConfig = {
                            algoName: algoName,
                            list: [
                                { text: "🐍 PYTHON", lang: "python" },
                                { text: "⚙️ C++", lang: "cpp" },
                                { text: "☕ JAVA", lang: "java" },
                                { text: "⚡ JAVASCRIPT", lang: "javascript" }
                            ]
                        };
                    }
                    appendChatBubble('JARVIS', detectedModeBadge + responseText, buttonsConfig);
                    speak(data.candidates?.[0]?.content?.parts?.[0]?.text);
                    updateCoreState('IDLE');
                    return;
                }
            } else {
                const errDetails = await response.json();
                lastError = errDetails.error?.message || `HTTP error ${response.status}`;
                if (lastError.includes("API key not valid") || response.status === 401) {
                    break;
                }
            }
        } catch (err) {
            lastError = err.message;
        }
    }

    console.error("Gemini API connection failure:", lastError);

    // Intelligent Knowledge Fallback for all queries when Gemini API link is unreachable
    const fallbackAnswer = generateFallbackKnowledge(promptText);
    appendChatBubble('JARVIS', fallbackAnswer);
    speak(fallbackAnswer.replace(/[*_#`]/g, ""));
    updateCoreState('IDLE');
}

function generateFallbackKnowledge(query) {
    const q = query.toLowerCase().trim();

    // Greetings & Identity (Using word boundary regex so 'delhi' does not match 'hi')
    if (/\b(hello|hi|hey|greetings)\b/i.test(q) || q.includes("how are you")) {
        return "Hello Sir! I am fully operational and ready to assist you. Systems are running smoothly.";
    }
    
    // City Knowledge & Atmospheric Data
    if (q === "delhi" || q.includes("delhi")) {
        if (typeof checkWeather === 'function') checkWeather("Delhi");
        return "Delhi (New Delhi) is the capital territory of India, renowned for its rich history, iconic landmarks (Red Fort, Qutub Minar, India Gate), and vibrant cultural heritage, Sir.";
    }
    if (q === "mumbai" || q.includes("mumbai")) {
        if (typeof checkWeather === 'function') checkWeather("Mumbai");
        return "Mumbai is the financial hub and largest city of India, famous for the Gateway of India, Marine Drive, and the Bollywood film industry, Sir.";
    }
    if (q === "london" || q.includes("london")) {
        if (typeof checkWeather === 'function') checkWeather("London");
        return "London is the capital city of the United Kingdom, famous for Big Ben, the Tower of London, and its historic global prominence, Sir.";
    }
    if (q === "tokyo" || q.includes("tokyo")) {
        if (typeof checkWeather === 'function') checkWeather("Tokyo");
        return "Tokyo is the capital of Japan, celebrated for its blend of ultramodern technology, ancient temples, and vibrant urban culture, Sir.";
    }
    if (q.includes("namaste") || q.includes("kaise ho") || q.includes("kaise hain") || q.includes("kya haal hai")) {
        return "Namaste Sir! Main bilkul theek hoon. Stark System Diagnostics normal hain. Main aapki kya sahayata kar sakta hoon?";
    }
    if (q.includes("tum kaun ho") || q.includes("aap kaun ho") || q.includes("kaun ho tum")) {
        return "Main J.A.R.V.I.S. (Just A Rather Very Intelligent System) hoon, aapka advanced AI assistant aur Stark Mainframe coordinator, Sir.";
    }
    if (q.includes("kya kar sakte ho") || q.includes("tum kya kar sakte ho")) {
        return "Main aapki har sawaal ka jawab de sakta hoon, coding kar sakta hoon, AI images generate kar sakta hoon, weather check kar sakta hoon aur system commands execute kar sakta hoon, Sir!";
    }

    // Subject & Academic Knowledge Base
    if (q.includes("mathematics") || q.includes("maths") || q.includes("math")) {
        return "Mathematics is the abstract science of numbers, quantity, structure, space, and change. It provides the foundational framework for logic, physics, engineering, and computer science, Sir.";
    }
    if (q.includes("physics")) {
        return "Physics is the natural science that studies matter, motion, energy, force, space, and time, exploring fundamental laws from subatomic particles to the cosmos, Sir.";
    }
    if (q.includes("chemistry")) {
        return "Chemistry is the scientific discipline that studies elements, compounds, atoms, molecules, and chemical reactions that transform matter, Sir.";
    }
    if (q.includes("biology")) {
        return "Biology is the scientific study of life and living organisms, covering their cellular structure, genetics, physiological mechanisms, and evolution, Sir.";
    }
    if (q.includes("history")) {
        return "History is the systematic study and documentation of the human past, analyzing civilizations, historical events, and cultural transformations over time, Sir.";
    }
    if (q.includes("geography")) {
        return "Geography is the study of Earth's landscapes, environments, climates, and the relationships between people and their natural surroundings, Sir.";
    }
    if (q.includes("computer science") || q.includes("coding")) {
        return "Computer Science is the study of computation, algorithmic problem solving, software engineering, artificial intelligence, and system architecture, Sir.";
    }
    if (q.includes("economics")) {
        return "Economics is the social science that analyzes the production, distribution, and consumption of goods, services, and market financial systems, Sir.";
    }
    if (q.includes("who are you") || q.includes("your name") || q.includes("what are you")) {
        return "I am J.A.R.V.I.S. (Just A Rather Very Intelligent System), your advanced automated AI assistant and Stark Mainframe coordinator, Sir.";
    }
    if (q.includes("gravity")) {
        return "Gravity (Gurutvakarshan) is the fundamental force of attraction that pulls objects with mass toward one another, Sir.";
    }
    if (q.includes("black hole")) {
        return "A black hole is a region of space where gravity is so strong that nothing—not even light—can escape, Sir.";
    }
    if (q.includes("dna") || q.includes("rna")) {
        return "DNA (Deoxyribonucleic Acid) is the hereditary molecule that encodes genetic instructions in living organisms, Sir.";
    }

    // 1. User Name & Introduction Handling
    const nameMatch = q.match(/(?:i am|my name is|mera naam|naam)\s+([a-z\s]+)/i);
    if (nameMatch && !q.includes("what") && !q.includes("who")) {
        const rawName = nameMatch[1].replace(/gupta|kumar|sharma|singh|verma/gi, m => m).trim();
        if (rawName && rawName.length > 1) {
            const formattedName = rawName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
            const userObj = {
                username: rawName.toLowerCase().replace(/\s+/g, ''),
                fullname: formattedName,
                role: "Primary User // Administrator",
                avatar: "assets/images/avatar.png"
            };
            try {
                localStorage.setItem('jarvis_user', JSON.stringify(userObj));
                if (typeof loadUserProfile === 'function') loadUserProfile(userObj);
            } catch(e) {}
            return `Pleasure to meet you, ${formattedName}! I have updated your administrator profile on the Stark Mainframe. How may I assist you today, Sir?`;
        }
    }

    // 2. Technical & Computer Science Definitions
    if (q.includes("dynamic")) {
        return "Dynamic programming is an algorithmic technique for solving optimization problems by breaking them down into simpler overlapping subproblems and storing their intermediate results to avoid redundant calculations, Sir.";
    }
    if (q.includes("array")) {
        return "An Array is a linear data structure that stores elements of the same data type in contiguous memory locations, allowing O(1) constant-time indexed access, Sir.";
    }
    if (q.includes("recursion")) {
        return "Recursion is a programming technique where a function calls itself to solve smaller instances of a problem until a terminating base case is reached, Sir.";
    }
    if (q.includes("stack")) {
        return "A Stack is a linear data structure operating on a Last-In, First-Out (LIFO) protocol, commonly used for execution call stacks and expression parsing, Sir.";
    }
    if (q.includes("queue")) {
        return "A Queue is a linear data structure operating on a First-In, First-Out (FIFO) protocol, essential for task scheduling and asynchronous message buffers, Sir.";
    }
    if (q.includes("pointer")) {
        return "A Pointer is a variable that stores the direct memory address of another variable, enabling low-level memory manipulation in languages like C and C++, Sir.";
    }

    // 3. Dynamic Natural Fallback
    const topic = query.replace(/^what is\s+/i, '').replace(/^what are\s+/i, '').replace(/^explain\s+/i, '').replace(/^tell me about\s+/i, '').replace(/\?/g, '').trim();
    if (!topic) return "System operational, Sir. How can I assist you?";
    
    const formattedTopic = topic.charAt(0).toUpperCase() + topic.slice(1);
    return `Regarding ${formattedTopic}: I have indexed your inquiry into system registers. How else may I assist you, Sir?`;
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
        } else {
            const data = await response.json().catch(() => ({ message: `HTTP status ${response.status}` }));
            appendChatBubble('JARVIS', `❌ **Automation Server Error**: ${data.message}`);
            speak("Sir, the local execution server returned an error status.");
            updateCoreState('IDLE');
            return;
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
