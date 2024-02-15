// Mock data for questions and answers
const quizData = [
    {
        question: "What is the capital of France?",
        type: "single",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris",
        solution: "The capital of France is Paris."
    },
    {
        question: "Which of the following are programming languages?",
        type: "multiple",
        options: ["HTML", "CSS", "JavaScript", "London"],
        correctAnswers: ["HTML", "CSS", "JavaScript"],
        solution: "HTML, CSS, and JavaScript are programming languages."
    },
    {
        question: "What is the square root of 25?",
        type: "numeric",
        correctAnswer: 5,
        range: { min: 0, max: 10 },
        solution: "The square root of 25 is 5."
    }
];

const quizContainer = document.getElementById("quiz-container");

// Function to render quiz questions and options
function renderQuiz() {
    quizData.forEach((questionData, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");

        const questionText = document.createElement("p");
        questionText.textContent = `${index + 1}. ${questionData.question}`;
        questionDiv.appendChild(questionText);

        if (questionData.type === "numeric") {
            const input = document.createElement("input");
            input.type = "number";
            input.min = questionData.range.min;
            input.max = questionData.range.max;
            questionDiv.appendChild(input);

            // Add "Check Answer" button
            const checkAnswerBtn = document.createElement("button");
            checkAnswerBtn.textContent = "Check Answer";
            checkAnswerBtn.addEventListener("click", () => checkAnswer(questionData, index, null, questionDiv));
            questionDiv.appendChild(checkAnswerBtn);
        } else {
            // Render multiple-choice questions
            const optionsList = document.createElement("div");
            optionsList.classList.add("options");

            questionData.options.forEach((option, optionIndex) => {
                const optionItem = document.createElement("div");
                optionItem.classList.add("option");

                const label = document.createElement("label");
                label.textContent = `${String.fromCharCode(65 + optionIndex)}. ${option}`;

                // Event listener for option click
                label.addEventListener("click", () => checkAnswer(questionData, index, option, questionDiv));

                optionItem.appendChild(label);
                optionsList.appendChild(optionItem);
            });

            questionDiv.appendChild(optionsList);
        }

        const resultMessage = document.createElement("p");
        questionDiv.appendChild(resultMessage);

        const solution = document.createElement("p");
        solution.textContent = `Solution: ${questionData.solution}`;
        solution.style.display = "none"; // Initially hidden
        questionDiv.appendChild(solution);

        quizContainer.appendChild(questionDiv);
    });
}

// Function to check the user's answer
function checkAnswer(questionData, questionIndex, selectedOption, questionDiv) {
    const resultMessage = questionDiv.querySelector("p");
    const solution = questionDiv.querySelector("p:last-child");

    if (questionData.type === "numeric") {
        const userNumericAnswer = parseInt(questionDiv.querySelector("input").value);
        if (userNumericAnswer >= questionData.range.min && userNumericAnswer <= questionData.range.max) {
            displayResult(true, resultMessage, questionDiv);
        } else {
            displayResult(false, resultMessage, questionDiv);
        }
    } else {
        const userAnswer = selectedOption;

        const correctAnswers = questionData.correctAnswers || [questionData.correctAnswer];
        const isCorrect = correctAnswers.includes(userAnswer);

        displayResult(isCorrect, resultMessage, questionDiv);

        // Highlight correct and incorrect options
        if (questionData.type !== "numeric") {
            const optionLabels = questionDiv.querySelectorAll(".option label");
            optionLabels.forEach((label) => {
                const optionSymbolElement = label.querySelector("span");
                const optionText = label.textContent.trim().slice(3); // Extract option text excluding the option symbol
                if (optionText === userAnswer) {
                    label.style.backgroundColor = isCorrect ? "green" : "red";
                } else {
                    label.style.backgroundColor = "";
                }
            });
        }
    }

    // Show solution after checking the answer
    solution.style.display = "block";

    // Disable further clicks on options
    const optionLabels = questionDiv.querySelectorAll(".option label");
    optionLabels.forEach((label) => {
        label.removeEventListener("click", optionClickHandler);
    });
}

// Event listener for option click
function optionClickHandler(event) {
    const label = event.currentTarget;
    const optionText = label.textContent.trim().slice(3); // Extract option text excluding the option symbol
    const questionDiv = label.closest(".question");

    // Simulate a click on the selected option to trigger the checkAnswer function
    checkAnswer(getQuestionData(questionDiv), getQuestionIndex(questionDiv), optionText, questionDiv);
}

// Function to display the result
function displayResult(isCorrect, resultMessage, questionDiv) {
    const questionText = questionDiv.querySelector("p:first-child");

    if (isCorrect) {
        resultMessage.textContent = "Correct!";
        resultMessage.classList.add("correct-answer");
    } else {
        resultMessage.textContent = "Incorrect!";
        resultMessage.classList.add("incorrect-answer");
    }

    // Move the result message above the question text
    questionDiv.insertBefore(resultMessage, questionText);
}

// Function to get question data from the HTML element
function getQuestionData(questionDiv) {
    const questionIndex = Array.from(quizContainer.children).indexOf(questionDiv);
    return quizData[questionIndex];
}

// Function to get question index from the HTML element
function getQuestionIndex(questionDiv) {
    return Array.from(quizContainer.children).indexOf(questionDiv);
}

// Attach event listener to options
const optionLabels = document.querySelectorAll(".option label");
optionLabels.forEach((label) => {
    label.addEventListener("click", optionClickHandler);
});

// Call the renderQuiz function to display the quiz
renderQuiz();
