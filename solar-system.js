
/* Interactive Solar System Canvas – Home page only */
let solarCanvas, ctx, planets = [], sun;

function initSolarSystem() {
    solarCanvas = document.getElementById('solar-canvas');
    if (!solarCanvas) return;
    ctx = solarCanvas.getContext('2d');
    
    sun = { x: 550, y: 310, r: 32, color: '#ffeb3b' };
    
    planets = [
        { name: 'Mercury', r: 80, size: 9, color: '#aaa', speed: 0.028, angle: 0, fact: 'Smallest planet! ISRO studied it with Mangalyaan data.' },
        { name: 'Venus', r: 130, size: 14, color: '#ffcc88', speed: 0.018, angle: 0, fact: 'Hottest planet. Thick clouds!' },
        { name: 'Earth', r: 190, size: 16, color: '#00aaff', speed: 0.012, angle: 0, fact: 'Our home! ISRO satellites keep India connected.' },
        { name: 'Mars', r: 255, size: 12, color: '#ff4444', speed: 0.008, angle: 0, fact: 'India’s Mangalyaan reached here first try!' },
        { name: 'Jupiter', r: 340, size: 26, color: '#ffaa44', speed: 0.004, angle: 0, fact: 'Biggest planet with 79 moons!' },
        { name: 'Saturn', r: 410, size: 22, color: '#eedd99', speed: 0.0025, angle: 0, fact: 'Beautiful rings made of ice!' },
        { name: 'Uranus', r: 470, size: 18, color: '#99ffee', speed: 0.0018, angle: 0, fact: 'Ice giant that spins on its side!' },
        { name: 'Neptune', r: 520, size: 17, color: '#4488ff', speed: 0.0012, angle: 0, fact: 'Windiest planet in the solar system!' }
    ];
    
    function animateSolar() {
        ctx.clearRect(0, 0, solarCanvas.width, solarCanvas.height);
        
        // Sun
        ctx.fillStyle = sun.color;
        ctx.shadowBlur = 40;
        ctx.shadowColor = '#ffeb3b';
        ctx.beginPath();
        ctx.arc(sun.x, sun.y, sun.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        
        planets.forEach((p, i) => {
            p.angle += p.speed;
            const x = sun.x + Math.cos(p.angle) * p.r;
            const y = sun.y + Math.sin(p.angle) * p.r;
            
            // Orbit line
            ctx.strokeStyle = 'rgba(255,255,255,0.15)';
            ctx.beginPath();
            ctx.arc(sun.x, sun.y, p.r, 0, Math.PI * 2);
            ctx.stroke();
            
            // Planet
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 15;
            ctx.shadowColor = p.color;
            ctx.beginPath();
            ctx.arc(x, y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
            
            // Click detection stored for later
            p.cx = x;
            p.cy = y;
        });
        
        requestAnimationFrame(animateSolar);
    }
    
    solarCanvas.addEventListener('click', (e) => {
        const rect = solarCanvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        
        for (let p of planets) {
            const dx = mx - p.cx;
            const dy = my - p.cy;
            if (Math.sqrt(dx * dx + dy * dy) < p.size + 12) {
                document.getElementById('planet-name').innerHTML = p.name + ' <span style="color:#ffeb3b">★</span>';
                document.getElementById('planet-fact').textContent = p.fact;
                document.getElementById('planet-info').style.display = 'block';
                unlockAchievement('explorer-' + p.name.toLowerCase());
                return;
            }
        }
    });
    
    animateSolar();
}

function closePlanetInfo() {
    document.getElementById('planet-info').style.display = 'none';
}

// Export for index.html
window.initSolarSystem = initSolarSystem;
if (document.getElementById('solar-canvas')) window.addEventListener('load', initSolarSystem);