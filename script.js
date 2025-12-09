script.js
let currentQuiz = "";
let currentQuestion = 0;

const quizzes = {
    boto: {
        title: "Quiz do Boto-Cor-de-Rosa",
        questions: [
            {
                q: "Onde vive o boto-cor-de-rosa?",
                answers: ["Amazônia", "África", "Europa"],
                correct: 0
            },
            {
                q: "O boto é um...",
                answers: ["Peixe", "Mamífero", "Réptil"],
                correct: 1
            }
        ]
    },

    tucuxi: {
        title: "Quiz do Tucuxi",
        questions: [
            {
                q: "O tucuxi também vive na...",
                answers: ["Amazônia", "Groenlândia", "Ásia"],
                correct: 0
            },
            {
                q: "O tucuxi é parecido com...",
                answers: ["Golfinho marinho", "Tubarão", "Tartaruga"],
                correct: 0
            }
        ]
    }
};


function startQuiz(type) {
    currentQuiz = type;
    currentQuestion = 0;

    document.querySelector(".menu").classList.add("hidden");
    document.querySelector("#quiz-area").classList.remove("hidden");

    document.getElementById("quiz-title").innerText = quizzes[type].title;

    loadQuestion();
}

function loadQuestion() {
    const q = quizzes[currentQuiz].questions[currentQuestion];

    document.getElementById("question").innerText = q.q;

    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    q.answers.forEach((ans, i) => {
        answersDiv.innerHTML += `
            <button onclick="checkAnswer(${i})">${ans}</button>
        `;
    });

    document.getElementById("nextBtn").classList.add("hidden");
}

function checkAnswer(i) {
    const correct = quizzes[currentQuiz].questions[currentQuestion].correct;

    if (i === correct) {
        alert("✔️ Acertou!");
    } else {
        alert("❌ Errou!");
    }

    document.getElementById("nextBtn").classList.remove("hidden");
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion >= quizzes[currentQuiz].questions.length) {
        alert("🎉 Quiz concluído!");
        location.reload();
    } else {
        loadQuestion();
    }
}
