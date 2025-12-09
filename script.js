// PERGUNTAS DO BOTO-COR-DE-ROSA
const botoRosa = [
    {
        q: "Onde vive o boto-cor-de-rosa?",
        a: ["Amazônia", "Mar Mediterrâneo", "África"],
        c: 0
    },
    {
        q: "O boto-cor-de-rosa é um:",
        a: ["Peixe", "Mamífero", "Réptil"],
        c: 1
    },
    {
        q: "Por que o boto fica rosa?",
        a: ["Por causa dos vasos sanguíneos", "Por comer camarão rosa", "Por viver no mar"],
        c: 0
    },
    {
        q: "Os filhotes de boto-cor-de-rosa nascem:",
        a: ["Cinza", "Rosa", "Azul"],
        c: 1
    },
    {
        q: "O boto-cor-de-rosa está:",
        a: ["Em perigo de extinção", "Totalmente seguro", "Extinto"],
        c: 0
    }
];

// PERGUNTAS DO BOTO TUCUXI
const botoTucuxi = [
    {
        q: "O boto Tucuxi vive em qual região?",
        a: ["Amazônia", "Europa", "Oceano Índico"],
        c: 0
    },
    {
        q: "O Tucuxi é conhecido como:",
        a: ["Boto-do-mar", "Golfinho-cinza-da-Amazônia", "Golfinho-azul"],
        c: 1
    },
    {
        q: "O Tucuxi é:",
        a: ["Mamífero", "Anfíbio", "Peixe"],
        c: 0
    },
    {
        q: "O Tucuxi costuma viver:",
        a: ["Sozinho ou em pequenos grupos", "Sempre em bandos de 100", "Preso em cavernas"],
        c: 0
    },
    {
        q: "A maior ameaça ao Tucuxi é:",
        a: ["Poluição e redes de pesca", "Baixa temperatura", "Falta de alimento"],
        c: 0
    }
];

let quizAtual = [];
let index = 0;

// Escolher qual quiz vai abrir
function startQuiz(tipo) {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");

    if (tipo === "rosa") {
        quizAtual = botoRosa;
        document.getElementById("quiz-title").innerText = "💗 Quiz: Boto-Cor-de-Rosa";
    } else {
        quizAtual = botoTucuxi;
        document.getElementById("quiz-title").innerText = "💙 Quiz: Boto Tucuxi";
    }

    index = 0;
    loadQuestion();
}

// Carregar pergunta
function loadQuestion() {
    const q = quizAtual[index];
    document.getElementById("question").innerText = q.q;

    const optDiv = document.getElementById("options");
    optDiv.innerHTML = "";

    q.a.forEach((op, i) => {
        const btn = document.createElement("button");
        btn.innerText = op;
        btn.onclick = () => checkAnswer(i);
        optDiv.appendChild(btn);
    });
}

// Verificar resposta
function checkAnswer(i) {
    if (i === quizAtual[index].c) {
        alert("Acertou! 🐬✨");
    } else {
        alert("Errou! 😅");
    }
}

// Próxima pergunta
function nextQuestion() {
    index++;
    if (index >= quizAtual.length) {
        alert("Fim do quiz! 🎉");
        location.reload(); // Volta ao menu
        return;
    }
    loadQuestion();
}
