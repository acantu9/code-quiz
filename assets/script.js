const questions = [
    {
        question: "Select all of the elements that require container tags.",
        answers: [
            { text: "<img>", correct: false},
            { text: "<h1>", correct: true},
            { text: "<p>", correct: true},
            { text: "<button>", correct: true},
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
        question: "Select all of the semantic formatting tags that make web pages more accessible.",
        answers: [
            { text: "<b>", correct: false},
            { text: "<em>", correct: true},
            { text: "<strong>", correct: true},
            { text: "<i>", correct: false},
        ]
    },
];

const questionEl = document.getElementById("question");
const answerBtn = document.getElementById("answer-btns");
const nextBtn = document.getElementById("nextBtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestions();
}

function showQuestions() {
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionEl.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextBtn.style.display = none;
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    };
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtn.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.ariaDisabled = true;
    });
    nextBtn.style.display = "block";
}

startQuiz();