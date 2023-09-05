const questions = [
    {
        question: "Which elements require container tags?",
        answers: [
            { text: "<h1>", correct: false},
            { text: "<p>", correct: false},
            { text: "<button>", correct: false},
            { text: "All of the above", correct: true}
        ]
    },
    {
        question: "Which of the following is the correct way of changing the text to uppercase?",
        answers: [
            { text: "text-format: uppercase;", correct: false},
            { text: "text-convert: uppercase;", correct: false},
            { text: "text-transform: uppercase;", correct: true},
            { text: "text-style: uppercase;", correct: false},
        ]
    },
    {
        question: "Incrementing a value using the ++ operator...",
        answers: [
            { text: "subtracts 1 from it", correct: false},
            { text: "does not change it", correct: false},
            { text: "assigns 1 to it", correct: false},
            { text: "adds 1 to it", correct: true},
        ]
    },
    {
        question: "What is the shorthand for x = x*5; statement?",
        answers: [
            { text: "x==5", correct: false},
            { text: "x*5", correct: false},
            { text: "x=*5", correct: false},
            { text: "x*=5", correct: true},
        ]
    },
    {
        question: "Select the semantic formatting tags that make web pages more accessible.",
        answers: [
            { text: "<b> and <br>", correct: false},
            { text: "<em> and <strong>", correct: true},
            { text: "<p> and <em>", correct: false},
            { text: "<strong> and <b>", correct: false},
        ]
    },
];
const questionEl = document.getElementById("question");
const answerBtn = document.getElementById("answer-btns");
const startBtn = document.getElementById("startBtn");
const submitBtn = document.getElementById("submitBtn");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");

let currentQuestionIndex = 0;
let timer = 60;
let score = 0;
let isQuizOver = false;

function startQuiz(){
    document.querySelector(".intro").style.display = "none";
    document.querySelector(".quiz").style.display = "block";
    currentQuestionIndex = 0;
    showQuestions();
    startTimer();
}

function showQuestions() {
    if(currentQuestionIndex >= questions.length) {
        document.querySelector(".quiz").style.display = "none";
        endQuiz();
        return;
    }
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionEl.innerHTML = questionNo + ". " + currentQuestion.question;
    answerBtn.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        console.log(answer);
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function startTimer() {
    var intervalId = setInterval(function() {
        if(timer === 0 || isQuizOver) {
            clearInterval(intervalId);
            endQuiz();
            finalScore();
        } else {
            timer--;
        }
        timerEl.textContent = "Time: " + timer;
    }, 1000);
}

function endQuiz() {
    document.querySelector(".quizEnd").style.display = "block";
    document.querySelector(".quiz").style.display = "none";
    isQuizOver = true;
}

function finalScore() {
    score = timer;
    scoreEl.textContent = score;
}

function resetState() {
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    };
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        timer = timer + 10;
    } else {
        selectedBtn.classList.add("incorrect");
        if(timer > 10) {
            timer = timer - 10;
        } else {
            timer = 0;
        }
    }
    Array.from(answerBtn.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.ariaDisabled = true;
    });
    currentQuestionIndex++;
    setTimeout(function(){
    showQuestions();
    }, 1000);
}

function showScores() {
    document.querySelector(".scores").style.display = "block";
}

startBtn.addEventListener("click", ()=> {
    startQuiz();
})

submitBtn.addEventListener("click", ()=> {
    showScores();
})