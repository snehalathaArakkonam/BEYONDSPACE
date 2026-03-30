
/* Space Quiz – 3 levels with scoring, badges and confetti */
const quizData = [
    { q: "What is India’s first Mars mission called?", a: "Mangalyaan", options: ["Chandrayaan", "Mangalyaan", "Gaganyaan", "Aditya-L1"] },
    { q: "Which planet is known as the Red Planet?", a: "Mars", options: ["Venus", "Mars", "Jupiter", "Saturn"] },
    { q: "What does ISRO stand for?", a: "Indian Space Research Organisation", options: ["International Space Rocket Organisation", "Indian Space Research Organisation", "Indian Satellite Research Office", "Interstellar Space Research Organisation"] }
];

let currentQuestion = 0, score = 0, level = 1;

function loadQuiz() {
    const container = document.getElementById('quiz-container');
    if (!container) return;
    
    function renderQuestion() {
        if (currentQuestion >= quizData.length) {
            document.getElementById('quiz-result').classList.remove('hidden');
            document.getElementById('quiz-result').innerHTML = `
                <h3>You scored ${score}/${quizData.length} ⭐</h3>
                <p>${score > 2 ? 'You are a future ISRO astronaut!' : 'Great try! Keep learning.'}</p>
                <button onclick="restartQuiz()" class="glow-button">Try Again</button>`;
            if (score >= 2) unlockAchievement('quiz-champ');
            return;
        }
        
        const q = quizData[currentQuestion];
        document.getElementById('question').innerHTML = `<strong>Level ${level}:</strong> ${q.q}`;
        const optsHTML = q.options.map(opt => `<button onclick="answer('${opt}')" class="option-btn">${opt}</button>`).join('');
        document.getElementById('options').innerHTML = optsHTML;
    }
    
    window.answer = function(selected) {
        if (selected === quizData[currentQuestion].a) score++;
        currentQuestion++;
        renderQuestion();
    };
    
    window.restartQuiz = function() {
        currentQuestion = 0; score = 0;
        document.getElementById('quiz-result').classList.add('hidden');
        renderQuestion();
    };
    
    renderQuestion();
}