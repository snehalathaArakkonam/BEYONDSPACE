
/* Trip Customizer + downloadable itinerary card */
function generateItinerary() {
    // Fake destinations
    const selectedDest = 'Mars';
    const total = 12800000;
    
    const content = document.getElementById('itinerary-content');
    content.innerHTML = `
        <h3>🚀 Your Trip to ${selectedDest}</h3>
        <p><strong>Departure:</strong> 12 Oct 2026 • Return: 28 Nov 2026</p>
        <ul>
            <li>Zero-G dinner on day 3</li>
            <li>Spacewalk experience</li>
            <li>ISRO patch included</li>
        </ul>
        <div style="font-size:2rem;margin:20px 0;color:#ffeb3b">₹${total.toLocaleString('en-IN')} Cr</div>
        <small>Booked for Sneha &amp; family • Confirmed by SPACERIDE2026</small>
    `;
    
    document.getElementById('itinerary-result').classList.remove('hidden');
    unlockAchievement('trip-planner');
}

function downloadItinerary() {
    // Canvas PDF mock
    const c = document.createElement('canvas');
    c.width = 600; c.height = 380;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#112233';
    ctx.fillRect(0, 0, 600, 380);
    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 32px Orbitron';
    ctx.fillText('BEYONDSPACE ITINERARY', 40, 80);
    ctx.fillText('MARS 2026', 40, 140);
    ctx.fillStyle = '#fff';
    ctx.font = '18px Inter';
    ctx.fillText('Traveller: Sneha • Total: ₹12,80,00,000 Cr', 40, 220);
    const link = document.createElement('a');
    link.download = 'mars-itinerary.png';
    link.href = c.toDataURL('image/png');
    link.click();
}