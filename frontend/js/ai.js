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
    const fallbackAnswer = await generateFallbackKnowledge(promptText);
    appendChatBubble('JARVIS', fallbackAnswer);
    speak(fallbackAnswer.replace(/[*_#`]/g, ""));
    updateCoreState('IDLE');
}

async function fetchWikipediaSummary(topic) {
    if (!topic || topic.length < 2) return null;
    try {
        const cleanTitle = topic.replace(/[?.,!]/g, '').trim();
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanTitle)}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);
        
        const res = await fetch(url, { 
            signal: controller.signal,
            headers: { 'Accept': 'application/json' }
        });
        clearTimeout(timeoutId);
        
        if (res.ok) {
            const data = await res.json();
            if (data.extract && data.type !== 'disambiguation') {
                // Return first 2-3 sentences for clean speech & display
                const sentences = data.extract.split(/(?<=[.!?])\s+/);
                const shortExtract = sentences.slice(0, 3).join(' ');
                return `${shortExtract} (Source: Encyclopedic Archives), Sir.`;
            }
        }
    } catch (e) {
        // Network or timeout failure
    }
    return null;
}

async function generateFallbackKnowledge(query) {
    const q = query.toLowerCase().trim();

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

    // 2. City Knowledge & Atmospheric Triggers
    if (/\b(delhi|new delhi)\b/i.test(q)) {
        if (typeof checkWeather === 'function') checkWeather("Delhi");
        return "Delhi (New Delhi) is the capital territory of India, renowned for its rich history, iconic landmarks (Red Fort, Qutub Minar, India Gate), and vibrant cultural heritage, Sir.";
    }
    if (/\bmumbai\b/i.test(q)) {
        if (typeof checkWeather === 'function') checkWeather("Mumbai");
        return "Mumbai is the financial capital of India, famous for the Gateway of India, Marine Drive, and the Bollywood film industry, Sir.";
    }
    if (/\blondon\b/i.test(q)) {
        if (typeof checkWeather === 'function') checkWeather("London");
        return "London is the capital city of the United Kingdom, famous for Big Ben, the Tower of London, and its historic global prominence, Sir.";
    }
    if (/\btokyo\b/i.test(q)) {
        if (typeof checkWeather === 'function') checkWeather("Tokyo");
        return "Tokyo is the capital of Japan, celebrated for its blend of ultramodern technology, ancient temples, and vibrant urban culture, Sir.";
    }
    if (/\bnew york\b/i.test(q)) {
        if (typeof checkWeather === 'function') checkWeather("New York");
        return "New York City is a major global hub for international finance, diplomacy, culture, and architecture, Sir.";
    }

    // 3. Physics & Fundamental Scientific Formulas
    if (q.includes("photosynthesis")) {
        return "Photosynthesis is the biological process by which autotrophic organisms (such as plants, algae, and cyanobacteria) convert light energy from sunlight into chemical energy in the form of glucose, releasing oxygen as a byproduct. Chemical equation: **6CO₂ + 6H₂O + Light Energy ➔ C₆H₁₂O₆ + 6O₂**, Sir.";
    }
    if (q.includes("force formula") || q.includes("formula of force") || q.includes("formula for force") || q === "force" || q.includes("what is force")) {
        return "According to Newton's Second Law of Motion, Force ($F$) is calculated as mass ($m$) multiplied by acceleration ($a$): **F = m × a**. In the SI system, force is measured in Newtons (N), where 1 N = 1 kg·m/s², Sir.";
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
    if (q.includes("kinetic energy")) {
        return "Kinetic Energy ($KE$) is the energy an object possesses due to its motion: **KE = ½ m v²**, where $m$ is mass and $v$ is velocity, measured in Joules (J), Sir.";
    }
    if (q.includes("potential energy")) {
        return "Gravitational Potential Energy ($PE$) is the energy stored in an object due to its position: **PE = m × g × h**, where $m$ is mass, $g$ is gravity (~9.8 m/s² on Earth), and $h$ is height in meters, Sir.";
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

    // 4. Biology, Chemistry & Medicine
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

    // 5. Mathematics & Geometry
    if (q.includes("pythagorean theorem") || q.includes("pythagoras theorem") || q.includes("pythagoras")) {
        return "The Pythagorean Theorem states that in any right-angled triangle, the square of the hypotenuse ($c$) equals the sum of the squares of the other two sides: **a² + b² = c²**, Sir.";
    }
    if (q.includes("pi") || q.includes("value of pi")) {
        return "Pi ($\pi$) is the mathematical constant representing the ratio of a circle's circumference to its diameter, approximately equal to **3.1415926535...** (or 22/7), Sir.";
    }
    if (q.includes("quadratic formula") || q.includes("quadratic equation")) {
        return "The quadratic formula solves $ax² + bx + c = 0$ as: **x = (-b ± √(b² - 4ac)) / (2a)**, Sir.";
    }
    if (q.includes("mathematics") || q.includes("maths") || q.includes("math")) {
        return "Mathematics is the science of numbers, quantity, structure, space, and change, providing the foundational architecture for logic, engineering, physics, and computer science, Sir.";
    }

    // 6. Computer Science & AI
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
    if (q.includes("dynamic programming")) {
        return "Dynamic Programming is an optimization technique that solves complex problems by breaking them down into overlapping subproblems and memoizing intermediate solutions to achieve polynomial time complexity, Sir.";
    }
    if (q.includes("array")) {
        return "An Array is a linear data structure storing homogenous data elements in contiguous memory slots, supporting $O(1)$ constant-time indexed lookups, Sir.";
    }
    if (q.includes("recursion")) {
        return "Recursion is a programming paradigm where a function invokes itself to resolve smaller subproblems until encountering a base termination case, Sir.";
    }
    if (q.includes("stack")) {
        return "A Stack is a linear data structure following the Last-In, First-Out (LIFO) protocol, utilized in function call stacks and syntax parsing, Sir.";
    }
    if (q.includes("queue")) {
        return "A Queue is a linear data structure following the First-In, First-Out (FIFO) protocol, utilized in breadth-first traversal and asynchronous task dispatching, Sir.";
    }
    if (q.includes("blockchain")) {
        return "Blockchain is a cryptographically secured, decentralized, distributed digital ledger that records immutable transactions across a peer-to-peer network, Sir.";
    }

    // 7. General Academic Domains
    if (q.includes("physics")) {
        return "Physics is the fundamental natural science studying matter, energy, space, time, and the universal forces governing the cosmos, Sir.";
    }
    if (q.includes("chemistry")) {
        return "Chemistry is the science of matter, exploring the structure, properties, composition, and transformations of atoms and molecular compounds, Sir.";
    }
    if (q.includes("biology")) {
        return "Biology is the scientific study of living organisms, their cellular physiology, genetic mechanics, evolution, and ecological interactions, Sir.";
    }
    if (q.includes("history")) {
        return "History is the systematic study and documentation of past human civilizations, sociocultural developments, and historical eras, Sir.";
    }
    if (q.includes("economics")) {
        return "Economics is the social science analyzing production, distribution, and consumption of goods, capital, and financial systems, Sir.";
    }

    // 8. User Name / Introduction Handling
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

    // 9. Live Wikipedia Summary Query Fallback
    const cleanTopic = query
        .replace(/^what is the formula of\s+/i, '')
        .replace(/^what is the formula for\s+/i, '')
        .replace(/^what is the\s+/i, '')
        .replace(/^what is\s+/i, '')
        .replace(/^what are\s+/i, '')
        .replace(/^explain\s+/i, '')
        .replace(/^tell me about\s+/i, '')
        .replace(/^define\s+/i, '')
        .replace(/^who is\s+/i, '')
        .replace(/^who was\s+/i, '')
        .replace(/\?/g, '')
        .trim();

    if (cleanTopic && cleanTopic.length >= 2) {
        const wikiExtract = await fetchWikipediaSummary(cleanTopic);
        if (wikiExtract) {
            return wikiExtract;
        }
    }

    // 10. Fallback with Guidance
    const topic = cleanTopic || query;
    const formattedTopic = topic.charAt(0).toUpperCase() + topic.slice(1);
    return `I have cataloged your query regarding **${formattedTopic}**, Sir. For comprehensive real-time generative reasoning across any topic, you can connect your Gemini API key in Settings (⚙️).`;
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
