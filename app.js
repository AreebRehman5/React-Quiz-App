const quiz = [
    {
        question: "What does 'DOM' stand for in JavaScript?",
        options: ["Document Object Model", "Data Object Model", "Database of Objects and Models"],
        correctAnswer: "Document Object Model"
    },
    {
        question: "Which keyword is used to define a function in JavaScript?",
        options: ["method", "func", "function"],
        correctAnswer: "function"
    },
    {
        question: "What is the result of the expression '5 + '5' in JavaScript?",
        options: ["10", "55", "Error"],
        correctAnswer: "55"
    },
    {
        question: "Which loop is used to iterate through an array in JavaScript?",
        options: ["for loop", "while loop", "if-else loop"],
        correctAnswer: "for loop"
    },
    {
        question: "What is the purpose of the 'localStorage' object in JavaScript?",
        options: ["To interact with the server", "To store key-value pairs in the browser", "To perform mathematical calculations"],
        correctAnswer: "To store key-value pairs in the browser"
    },
    {
        question: "Which event occurs when an HTML element is clicked in JavaScript?",
        options: ["onhover", "onload", "onclick"],
        correctAnswer: "onclick"
    },
    {
        question: "What does 'JSON' stand for in JavaScript?",
        options: ["JavaScript Object Notation", "JavaScript Oriented Networking", "JavaScript Online Network"],
        correctAnswer: "JavaScript Object Notation"
    },
    {
        question: "What is the 'NaN' data type in JavaScript?",
        options: ["Not a Number", "New Array Number", "Number and Null"],
        correctAnswer: "Not a Number"
    },
    {
        question: "How do you declare a constant variable in JavaScript?",
        options: ["const", "let", "var"],
        correctAnswer: "const"
    },
    {
        question: "Which method is used to add a new element to the end of an array in JavaScript?",
        options: [".push()", ".pop()", ".concat()"],
        correctAnswer: ".push()"
    },
    {
        question: "What does 'AJAX' stand for in JavaScript?",
        options: ["Asynchronous JavaScript and XML", "All JavaScript Actions Extended", "Advanced JavaScript XML"],
        correctAnswer: "Asynchronous JavaScript and XML"
    },
    {
        question: "What is the purpose of 'setTimeout' in JavaScript?",
        options: ["To create a timer", "To prevent memory leaks", "To define a variable"],
        correctAnswer: "To create a timer"
    },
    {
        question: "How do you comment out a single line of code in JavaScript?",
        options: ["// This is a comment", "<!-- This is a comment -->", "/* This is a comment */"],
        correctAnswer: "// This is a comment"
    },
    {
        question: "Which operator is used to compare the value and data type in JavaScript?",
        options: ["==", "===", "=", "!="],
        correctAnswer: "==="
    },
    {
        question: "What is the purpose of the 'this' keyword in JavaScript?",
        options: ["To refer to the current object", "To create a new variable", "To define a function"],
        correctAnswer: "To refer to the current object"
    },
    {
        question: "How do you round a number to the nearest integer in JavaScript?",
        options: ["Math.floor()", "Math.round()", "Math.ceil()"],
        correctAnswer: "Math.round()"
    },
    {
        question: "Which function is used to parse a JSON string in JavaScript?",
        options: ["parseJSON()", "stringify()", "JSON.parse()"],
        correctAnswer: "JSON.parse()"
    },
    {
        question: "What does 'IIFE' stand for in JavaScript?",
        options: ["Instant Iterative Function Execution", "Immediately Invoked Function Expression", "Inline If-Else Statement"],
        correctAnswer: "Immediately Invoked Function Expression"
    },
    {
        question: "How do you add a comment to multiple lines in JavaScript?",
        options: ["// This is a comment", "<!-- This is a comment -->", "/* This is a comment */"],
        correctAnswer: "/* This is a comment */"
    }
];

let currentQuestion = 0;
let rightAnswers = 0;
let wrongAnswers = 0;
let userAnswer = undefined;

const quizContainer = document.getElementById('quizContainer');
const resultContainer = document.getElementById('resultContainer');
const nextBtn = document.getElementById('next-btn');
const timerElement = document.getElementById("timer");

const showQuestion = () => {
    quizContainer.innerHTML = '';
    timerElement.textContent = '00:30';
    nextBtn.disabled = true;

    if (currentQuestion < quiz.length) {
        let queDiv = document.createElement('div');
        let h3 = document.createElement('h3');
        h3.innerText = quiz[currentQuestion].question;
        h3.className = 'quiz-question';
        queDiv.appendChild(h3);
        quiz[currentQuestion].options.forEach((data, index) => {
            let optionDiv = document.createElement('div');
            let input = document.createElement('input');
            input.type = 'radio';
            let label = document.createElement('label');
            input.id = `option-${index}`;
            input.name = 'quiz-option';
            input.value = data;
            input.className = 'selector';
            label.innerText = data;
            label.setAttribute('for', `option-${index}`);
            input.addEventListener('change', function () {
                userAnswer = this.value;
                nextBtn.disabled = false;
            });
            optionDiv.appendChild(input);
            optionDiv.appendChild(label);
            optionDiv.className = 'quiz-option';
            queDiv.appendChild(optionDiv);
        });
        quizContainer.appendChild(queDiv);
    } 
    else {
        resultContainer.style.display = 'block';
        showResult();
        quizContainer.style.display = 'none';
        nextBtn.style.display = 'none';

    
            
    }
};

showQuestion();

nextBtn.addEventListener('click', showNextQuestion);

const countdownTime = 30; // Set the countdown time for each question (5 seconds)
let timer = countdownTime;
let timerInterval;


function updateTimer() {
    const timerElement = document.getElementById("timer");

    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    const minutesString = minutes < 10 ? "0" + minutes : minutes;
    const secondsString = seconds < 10 ? "0" + seconds : seconds;
    
    timerElement.textContent = minutesString + ":" + secondsString;

    if (timer > 0) {
        timer--;
    } else {
        clearInterval(timerInterval);
        timerElement.textContent = "Time's up!";
        showNextQuestion();
        showQuestionCount();
    }
}
const showQuestionCount = () => {
    const questionCountElement = document.getElementById("questionCount");
    questionCountElement.innerText = `${currentQuestion + 1} out of ${quiz.length}`;
  }

function startTimer() {
    clearInterval(timerInterval); // Clear the previous timer interval if it exists
    timer = countdownTime; // Reset the timer
    timerInterval = setInterval(updateTimer, 1000);
}

function showNextQuestion() {
    const question = quiz[currentQuestion];
    if (userAnswer === question.correctAnswer) {
        rightAnswers++;
    } else {
        wrongAnswers++;
    }

    if (currentQuestion + 1 < quiz.length) {
        currentQuestion++;
        showQuestion();
        showQuestionCountAndTimer()
        startTimer(); // Start the timer for the next question
        showQuestionCount(); // Update the question count when showing a new question
    } else if (currentQuestion + 1 === quiz.length) {
        resultContainer.style.display = "block";
        showResult();
        quizContainer.style.display = "none";
        nextBtn.style.display = "none";
    }

    nextBtn.disabled = true;
}


// Initial call to update the timer and start the first question
startTimer();
showQuestionCount()


function showResult() {
    resultContainer.innerHTML = '';
    const div = document.createElement('div');
    const h1 = document.createElement('h1');
    if (rightAnswers > wrongAnswers) {
        h1.innerText = 'You Win Enjoy!';
        document.getElementById('winAudio').play(); // Play the win sound
    } else {
        h1.innerText = 'You Lost Better Luck Next Time';
        document.getElementById('failAudio').play(); // Play the fail sound
    }
    const rightH3 = document.createElement('h3');
    rightH3.innerText = 'Right Answers ' + rightAnswers;
    const score = document.createElement('h3');
    score.innerText = 'Score ' + rightAnswers * 10;
    const wrongH3 = document.createElement('h3');
    wrongH3.innerText = 'Wrong Answers ' + wrongAnswers;
    hideQuestionCountAndTimer();

    div.appendChild(h1);
    div.appendChild(rightH3);
    div.appendChild(score);
    div.appendChild(wrongH3);
    resultContainer.appendChild(div);
}

function hideQuestionCountAndTimer() {
    const questionCountElement = document.getElementById("questionCount");
    const timerElement = document.getElementById("timer");
    questionCountElement.style.display = "none";
    timerElement.style.display = "none";
}

// Function to show question count and timer
function showQuestionCountAndTimer() {
    const questionCountElement = document.getElementById("questionCount");
    const timerElement = document.getElementById("timer");
    questionCountElement.style.display = "block";
    timerElement.style.display = "block";
}