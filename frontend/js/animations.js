// ==========================================================================
// J.A.R.V.I.S. 3.0 - Premium Canvas Animations & Mouse Glow
// ==========================================================================

const canvas = document.getElementById('particle-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;

let particles = [];
const particleCount = 65;
let mouse = { x: null, y: null, radius: 120 };

// Particle Class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce boundaries
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        // Mouse interaction (repel)
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let force = (mouse.radius - distance) / mouse.radius;
            this.x += forceDirectionX * force * 1.5;
            this.y += forceDirectionY * force * 1.5;
        }
    }

    draw(color) {
        if (!ctx) return;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Get Theme Colors dynamically
function getThemeColor() {
    const rootStyle = getComputedStyle(document.documentElement);
    return rootStyle.getPropertyValue('--theme-primary').trim() || '#00f0ff';
}

function initParticles() {
    if (!canvas || !ctx) return;
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
    }
}

function animateParticles() {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const themeColor = getThemeColor();
    
    // Draw connections
    for (let a = 0; a < particles.length; a++) {
        particles[a].update();
        particles[a].draw(themeColor);
        
        for (let b = a; b < particles.length; b++) {
            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 110) {
                let opacity = (1 - (distance / 110)) * 0.15;
                ctx.strokeStyle = themeColor;
                ctx.globalAlpha = opacity;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
                ctx.globalAlpha = 1.0;
            }
        }
    }

    // Mouse glow effect
    if (mouse.x !== null && mouse.y !== null) {
        let glowGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius);
        glowGrad.addColorStop(0, themeColor.replace(')', ', 0.08)').replace('rgb', 'rgba').replace('#00f0ff', 'rgba(0, 240, 255, 0.08)'));
        glowGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx.fill();
    }
    
    requestAnimationFrame(animateParticles);
}

// Window Event Listeners
window.addEventListener('resize', () => {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

// Click Ripple Effect
window.addEventListener('click', (e) => {
    createRipple(e.clientX, e.clientY);
});

function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = `${x - 20}px`;
    ripple.style.top = `${y - 20}px`;
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Initialization trigger
if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
    animateParticles();
}
