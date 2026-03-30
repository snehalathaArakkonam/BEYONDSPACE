
/* Full rocket launch simulator with realistic 2D physics */
let rocketCanvas, rCtx, rocket = {}, gravity = 0.12, isLaunched = false, particles = [];

function initRocketSimulator() {
    rocketCanvas = document.getElementById('rocket-canvas');
    if (!rocketCanvas) return;
    rCtx = rocketCanvas.getContext('2d');
    
    // Reset rocket
    rocket = {
        x: 420,
        y: 440,
        vx: 0,
        vy: 0,
        angle: 45,
        fuel: 1200,
        width: 18,
        height: 60,
        landed: false
    };
    
    function drawRocket() {
        rCtx.save();
        rCtx.translate(rocket.x, rocket.y);
        rCtx.rotate((rocket.angle - 90) * Math.PI / 180);
        
        // Body
        rCtx.fillStyle = '#00f0ff';
        rCtx.fillRect(-rocket.width/2, -rocket.height, rocket.width, rocket.height);
        
        // Nose
        rCtx.fillStyle = '#ff00cc';
        rCtx.beginPath();
        rCtx.moveTo(0, -rocket.height);
        rCtx.lineTo(-10, -rocket.height - 22);
        rCtx.lineTo(10, -rocket.height - 22);
        rCtx.fill();
        
        // Flames when thrusting
        if (isLaunched && rocket.fuel > 0) {
            rCtx.fillStyle = '#ff8800';
            rCtx.fillRect(-6, rocket.height - 10, 12, 30 + Math.random() * 15);
        }
        
        rCtx.restore();
        
        // Ground
        rCtx.fillStyle = '#113300';
        rCtx.fillRect(0, 480, rocketCanvas.width, 40);
        
        // Launch pad
        rCtx.fillStyle = '#555';
        rCtx.fillRect(380, 450, 100, 30);
    }
    
    function physicsLoop() {
        if (!isLaunched) {
            drawRocket();
            return requestAnimationFrame(physicsLoop);
        }
        
        if (rocket.fuel > 0) {
            const thrust = parseFloat(document.getElementById('thrust').value) / 8;
            const rad = (rocket.angle * Math.PI) / 180;
            rocket.vx += Math.cos(rad) * thrust * 0.6;
            rocket.vy -= Math.sin(rad) * thrust * 0.6;
            rocket.fuel -= 9;
            document.getElementById('fuel-val').textContent = Math.floor(rocket.fuel);
        }
        
        rocket.vy += gravity;
        rocket.x += rocket.vx;
        rocket.y += rocket.vy;
        
        // Ground collision
        if (rocket.y > 420) {
            isLaunched = false;
            if (rocket.vy < 4 && Math.abs(rocket.vx) < 3 && rocket.angle > 30 && rocket.angle < 60) {
                document.getElementById('result').innerHTML = `<span style="color:#0f0">🎉 ORBIT ACHIEVED! You’re an astronaut now!</span>`;
                unlockAchievement('launch-master');
                createConfetti();
            } else {
                document.getElementById('result').innerHTML = `<span style="color:#f00">💥 CRASH! Try again with better angle &amp; fuel.</span>`;
            }
            rocket.y = 420;
        }
        
        drawRocket();
        requestAnimationFrame(physicsLoop);
    }
    
    // Live sliders
    document.getElementById('angle').addEventListener('input', (e) => {
        document.getElementById('angle-val').textContent = e.target.value + '°';
        rocket.angle = parseFloat(e.target.value);
    });
    
    document.getElementById('thrust').addEventListener('input', (e) => {
        document.getElementById('thrust-val').textContent = e.target.value + '%';
    });
    
    window.launchRocket = function() {
        if (isLaunched) return;
        isLaunched = true;
        document.getElementById('result').innerHTML = '';
        rocket.vy = -6;
        physicsLoop();
    };
    
    physicsLoop();
}

function createConfetti() {
    // Simple confetti burst using DOM
    for (let i = 0; i < 80; i++) {
        const c = document.createElement('div');
        c.style.position = 'fixed';
        c.style.left = Math.random() * 100 + 'vw';
        c.style.top = '-20px';
        c.style.fontSize = '20px';
        c.textContent = ['🚀','🪐','⭐','🌍'][Math.floor(Math.random()*4)];
        document.body.appendChild(c);
        const anim = c.animate([
            { transform: `translateY(0)` },
            { transform: `translateY(${window.innerHeight + 100}px)` }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
        });
        anim.onfinish = () => c.remove();
    }
}