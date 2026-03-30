
/* Astronaut Avatar + downloadable ID card using HTML5 Canvas */
let avatarCanvas;

function initAvatarCustomizer() {
    const preview = document.getElementById('avatar-preview');
    if (!preview) return;
    
    avatarCanvas = document.createElement('canvas');
    avatarCanvas.width = 280;
    avatarCanvas.height = 340;
    preview.appendChild(avatarCanvas);
    
    window.changeHelmet = function(n) {
        updateAvatar(n);
    };
    
    window.updateAvatar = function(helmet = 0) {
        const ctx = avatarCanvas.getContext('2d');
        ctx.clearRect(0, 0, avatarCanvas.width, avatarCanvas.height);
        
        // Suit
        ctx.fillStyle = ['#ff8800','#00f0ff','#fff'][document.getElementById('suit-select').value];
        ctx.fillRect(60, 140, 160, 160);
        
        // Helmet
        const helmetColors = ['#fff', '#ff8800', '#00f0ff'];
        ctx.fillStyle = helmetColors[helmet];
        ctx.beginPath();
        ctx.arc(140, 110, 65, 0, Math.PI * 2);
        ctx.fill();
        
        // Visor
        ctx.fillStyle = '#112233';
        ctx.beginPath();
        ctx.arc(140, 105, 38, 0, Math.PI * 2);
        ctx.fill();
        
        // ISRO patch
        ctx.fillStyle = '#fff';
        ctx.fillRect(105, 210, 30, 30);
        ctx.fillStyle = '#ff0000';
        ctx.font = 'bold 18px Orbitron';
        ctx.fillText('ISRO', 108, 230);
        
        // Name on chest
        ctx.fillStyle = '#000';
        ctx.font = '700 18px Inter';
        ctx.fillText(document.getElementById('astronaut-name').value || 'Sneha', 88, 280);
    };
    
    window.generateIDCard = function() {
        const cardCanvas = document.createElement('canvas');
        cardCanvas.width = 420;
        cardCanvas.height = 260;
        const c = cardCanvas.getContext('2d');
        
        // Card background
        c.fillStyle = '#112233';
        c.fillRect(0, 0, 420, 260);
        c.strokeStyle = '#00f0ff';
        c.lineWidth = 12;
        c.strokeRect(20, 20, 380, 220);
        
        // Avatar
        c.drawImage(avatarCanvas, 30, 40, 120, 140);
        
        c.fillStyle = '#fff';
        c.font = '700 22px Orbitron';
        c.fillText('BEYONDSPACE', 180, 80);
        c.font = '400 18px Inter';
        c.fillText('JUNIOR ASTRONAUT ID', 180, 115);
        c.fillText(document.getElementById('astronaut-name').value || 'Sneha', 180, 155);
        c.fillText('ID: BS-' + Math.floor(100000 + Math.random() * 900000), 180, 190);
        
        // Download
        const link = document.createElement('a');
        link.download = 'beyondspace-id-card.png';
        link.href = cardCanvas.toDataURL();
        link.click();
        
        unlockAchievement('avatar-creator');
    };
}