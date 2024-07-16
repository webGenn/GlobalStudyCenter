let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeRemaining = 300; // 10 minutes in seconds
let timerInterval;

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');

fetch('javascripts/questions.json')
.then(response => response.json())
.then(data => {
    questions = data;
});

function RunTest(){
startQuiz();
function startQuiz() {
currentQuestionIndex = 0;
score = 0;
timeRemaining = 300;
nextButton.classList.add('hide');
resultElement.classList.add('hide');
questionContainer.classList.remove('hide');
startTimer();
showQuestion();
}

function startTimer() {
timerInterval = setInterval(() => {
    timeRemaining--;
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;
    timerElement.textContent = `Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        endQuiz();
    }
}, 1000);
}

function showQuestion() {
resetState();
const question = questions[currentQuestionIndex];
questionElement.textContent = question.question;
question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
        button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
});
}

function resetState() {
while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
}
nextButton.classList.add('hide');
}

function selectAnswer(e) {
const selectedButton = e.target;
const correct = selectedButton.dataset.correct;
if (correct) {
    score++;
}
Array.from(answerButtonsElement.children).forEach(button => {
    button.classList.add(button.dataset.correct ? 'correct' : 'wrong');
    button.disabled = true;
});
if (currentQuestionIndex < questions.length - 1) {
    nextButton.classList.remove('hide');
} else {
    endQuiz();
}
}

nextButton.addEventListener('click', () => {
currentQuestionIndex++;
showQuestion();
});

function endQuiz() {
clearInterval(timerInterval);
questionContainer.classList.add('hide');
nextButton.classList.add('hide');
resultElement.classList.remove('hide');
scoreElement.textContent = `${score} out of ${questions.length}`;
}
}
