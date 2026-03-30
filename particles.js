
/* Particle star field background – used on EVERY page */
function createParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    
    const stars = [];
    for (let i = 0; i < 800; i++) {
        stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            size: Math.random() * 2.8,
            speed: Math.random() * 0.8 + 0.2
        });
    }
    
    function draw() {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#e0f8ff';
        
        stars.forEach(star => {
            ctx.globalAlpha = Math.random() * 0.9 + 0.3;
            ctx.fillRect(star.x, star.y, star.size, star.size);
            
            // Twinkle movement
            star.y += star.speed;
            if (star.y > h) star.y = 0;
            
            // Occasional shooting star
            if (Math.random() < 0.002) {
                ctx.fillStyle = '#fff';
                ctx.fillRect(star.x, star.y, 60, 2);
            }
        });
        
        requestAnimationFrame(draw);
    }
    
    window.addEventListener('resize', () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    });
    
    draw();
}

window.addEventListener('load', createParticles);