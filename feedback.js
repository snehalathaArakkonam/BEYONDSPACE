
/* Feedback form with star rating, validation & confetti */
let rating = 0;

function rate(stars) {
    rating = stars;
    const starsContainer = document.querySelector('.star-rating');
    Array.from(starsContainer.children).forEach((star, i) => {
        star.style.color = i < stars ? '#ffeb3b' : '#555';
    });
}

function submitFeedback() {
    const name = document.getElementById('name').value.trim();
    if (!name && document.getElementById('age-group').value === '') {
        alert('Please fill at least name or age group 😊');
        return;
    }
    
    // Hide form, show success
    document.getElementById('feedback-form').classList.add('hidden');
    const success = document.getElementById('success-screen');
    success.classList.remove('hidden');
    
    // Confetti
    for (let i = 0; i < 120; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.textContent = '🚀';
            confetti.style.position = 'absolute';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.fontSize = '2rem';
            success.appendChild(confetti);
            confetti.animate([{ transform: 'translateY(0)' }, { transform: `translateY(${window.innerHeight}px)` }], { duration: 2200, easing: 'ease-out' });
            setTimeout(() => confetti.remove(), 2300);
        }, i * 3);
    }
    
    unlockAchievement('feedback-hero');
}