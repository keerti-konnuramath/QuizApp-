const questions = [
    {
        question: "JavaScript What is the JavaScript method used to select an HTML element by its ID?",
        answers: [
            { text: "getElementByClass()", correct: false },
            { text: "getElementById()", correct: true },
            { text: "querySelector()", correct: false },
            { text: "getElementsByTag()", correct: false },
        ]
    },
    {
        question: "HTML What is the purpose of the <head> tag in HTML?",
        answers: [
            { text: "To define the structure of the web page", correct: false },
            { text: "To add styles to the web page", correct: false },
            { text: "provide metadata about the web page", correct: true },
            { text: "To display content on the web page", correct: false },
        ]
    },
    {
        question: "CSS What is the CSS property used to set the background color of an element?",
        answers: [
            { text: "background-image", correct: false },
            { text: "background-color", correct: true },
            { text: "color", correct: false },
            { text: "text-align", correct: false },
        ]
    },
    {
        question: " HTML What is the HTML tag used to create a hyperlink?",
        answers: [
            { text: "<a>", correct: true },
            { text: "<link>", correct: false },
            { text: "<img>", correct: false },
            { text: "<button>", correct: false },
        ]
    },
    {
        question: "CSS What is the CSS unit used to set the font size of an element in pixels?",
        answers: [
            { text: "%", correct: false },
            { text: "px", correct: true },
            { text: "em", correct: false },
            { text: "pt", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0 ;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
 
    currentQuestion.answers.forEach(answer => {
     const button = document.createElement("button");
     button.innerHTML = answer.text;
     button.classList.add("btn");
     answerButtons.appendChild(button);
     if(answer.correct){
        button.dataset.correct = answer.correct;
     }
     button.addEventListener("click", selectAnswer);
       });
}

// To Remove all the previous answers
function resetState(){
   nextButton.style.display = "none";
   while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
   }
}

function selectAnswer(e){
const selectedBtn = e.target;
const isCorrect = selectedBtn.dataset.correct === "true";
if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
}else{
    selectedBtn.classList.add("incorrect");
}
Array.from(answerButtons.children).forEach(button =>
    {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled =true;
    }
);
nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex  < questions.lenght){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();