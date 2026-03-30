
/* ============================================= */
/* BEYONDSPACE - Main shared JavaScript */
/* Modular, heavily commented, handles nav, language, achievements, particles loader, etc. */
/* ============================================= */

let currentLanguage = 'en';
const achievements = JSON.parse(localStorage.getItem('beyondspace_achievements')) || [];

// Unlock a new badge
function unlockAchievement(id) {
    if (achievements.includes(id)) return;
    achievements.push(id);
    localStorage.setItem('beyondspace_achievements', JSON.stringify(achievements));
    document.getElementById('badge-count').textContent = achievements.length;
    
    // Simple toast
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed; bottom:30px; right:30px; background:#ff00cc; color:#000; padding:15px 25px; border-radius:50px; box-shadow:0 0 20px #ff00cc; animation: pop 0.4s; z-index:9999';
    toast.textContent = '🏆 New badge unlocked!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2800);
}

// Render achievements modal
function showAchievements() {
    const modal = document.getElementById('achievement-modal');
    const grid = document.getElementById('badges-grid');
    grid.innerHTML = '';
    
    const allBadges = [
        {id:'launch-master', emoji:'🚀', name:'Launch Master'},
        {id:'explorer-moon', emoji:'🌕', name:'Moon Explorer'},
        {id:'quiz-champ', emoji:'🧠', name:'Quiz Champion'},
        {id:'fleet-fan', emoji:'🛰️', name:'Fleet Fan'},
        {id:'avatar-creator', emoji:'👨‍🚀', name:'Astronaut Creator'}
    ];
    
    allBadges.forEach(b => {
        const div = document.createElement('div');
        div.style.cssText = 'text-align:center; font-size:3rem; padding:15px; background:rgba(0,240,255,0.1); border-radius:16px;';
        div.innerHTML = `<div>${b.emoji}</div><small>${b.name}</small>`;
        if (!achievements.includes(b.id)) div.style.opacity = '0.3';
        grid.appendChild(div);
    });
    
    modal.style.display = 'flex';
}

function closeAchievementModal() {
    document.getElementById('achievement-modal').style.display = 'none';
}

// Language toggle
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'te' : 'en';
    
    document.querySelectorAll('[data-en]').forEach(el => {
        if (currentLanguage === 'te') {
            el.textContent = el.getAttribute('data-te') || el.textContent;
        } else {
            el.textContent = el.getAttribute('data-en') || el.textContent;
        }
    });
    
    // Extra Telugu flair animation
    console.log('%c🌍 Language switched to ' + (currentLanguage === 'en' ? 'English' : 'తెలుగు'), 'color:#ffeb3b');
}

// Sound toggle (Web Audio API rocket whoosh)
let audioCtx;
function toggleSound() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    oscillator.frequency.setValueAtTime(180, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    setTimeout(() => oscillator.stop(), 180);
    
    const btn = document.getElementById('sound-toggle');
    btn.textContent = btn.textContent === '🔊' ? '🔇' : '🔊';
}

// Mobile hamburger
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('open');
    });
}

// Back to top rocket
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        } else {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(60px)';
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        btn.style.transform = 'rotate(720deg)';
        setTimeout(() => btn.style.transform = '', 800);
    });
}

// Global load
window.addEventListener('load', () => {
    // Particles are initialized in particles.js
    initMobileNav();
    initBackToTop();
    
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) langBtn.addEventListener('click', toggleLanguage);
    
    const achBtn = document.getElementById('achievements-btn');
    if (achBtn) achBtn.addEventListener('click', showAchievements);
    
    const soundBtn = document.getElementById('sound-toggle');
    if (soundBtn) soundBtn.addEventListener('click', toggleSound);
    
    // Show current badge count
    if (document.getElementById('badge-count')) {
        document.getElementById('badge-count').textContent = achievements.length;
    }
    
    console.log('%c✅ BEYONDSPACE core JS loaded – ready for young Indian astronauts!', 'color:#00f0ff; font-size:18px; font-family:Orbitron');
});