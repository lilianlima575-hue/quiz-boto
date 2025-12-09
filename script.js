// --- 1. A Lista de Perguntas (O SEU CONTEÚDO) ---
const quiz = [
    {
        question: "Onde vive principalmente o Boto Cor-de-Rosa?",
        options: ["Nos rios da Amazônia e Orinoco", "Nos oceanos Atlântico e Pacífico"],
        answer: 0 
    },
    {
        question: "Qual dos botos é o tema da lenda que se transforma em homem?",
        options: ["O Boto Tucuxi", "O Boto Cor-de-Rosa"],
        answer: 1 
    },
    {
        question: "Qual dos dois botos é conhecido por ter o pescoço mais flexível, podendo virar a cabeça em quase 90 graus?",
        options: ["Boto Cor-de-Rosa (Inia)", "Boto Tucuxi (Sotalia)"],
        answer: 0 
    },
    {
        question: "Qual boto tem uma barbatana dorsal mais parecida com a de um golfinho marinho (triangular e definida)?",
        options: ["Boto Cor-de-Rosa", "Boto Tucuxi"],
        answer: 1 
    },
    {
        question: "Qual é a principal ameaça atual ao Boto Cor-de-Rosa e ao Tucuxi?",
        options: ["Falcões e predadores aéreos", "Poluição, desmatamento e pesca ilegal"],
        answer: 1 
    }
];

// --- 2. Variáveis de Controle ---
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// --- 3. Conexão com o HTML ---
const questionElement = document.querySelector('.question');
const optionsContainer = document.querySelector('.options');
const resultElement = document.getElementById('result'); 

// --- 4. FUNÇÃO: Carregar a Próxima Pergunta ---
function loadQuestion() {
    answered = false;
    optionsContainer.innerHTML = ''; 
    resultElement.textContent = ''; 

    if (currentQuestionIndex >= quiz.length) {
        showResults(); 
        return;
    }

    const currentQuestion = quiz[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    currentQuestion.options.forEach((optionText, index) => {
        const button = document.createElement('button');
        button.textContent = optionText;
        button.classList.add('option-button');
        button.id = 'option-' + index; 
        
        button.onclick = () => checkAnswer(index, currentQuestion.answer);
        
        optionsContainer.appendChild(button);
    });
}

// --- 5. FUNÇÃO: Verificar a Resposta ---
function checkAnswer(selectedIndex, correctAnswerIndex) {
    if (answered) return; 
    answered = true;

    const selectedButton = document.getElementById('option-' + selectedIndex);

    if (selectedIndex === correctAnswerIndex) {
        score++;
        resultElement.textContent = '✅ Resposta Correta! +1 Ponto';
        selectedButton.classList.add('correct');
    } else {
        resultElement.textContent = '❌ Resposta Errada.';
        selectedButton.classList.add('wrong');
        document.getElementById('option-' + correctAnswerIndex).classList.add('correct');
    }

    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 2000);
}

// --- 6. FUNÇÃO: Exibir Resultados Finais ---
function showResults() {
    questionElement.textContent = '🐬 Quiz Concluído! 💖';
    optionsContainer.innerHTML = '';
    resultElement.innerHTML = `
        <p>Sua pontuação final é: <strong>${score} de ${quiz.length}</strong>.</p>
        <p>Parabéns por testar seus conhecimentos sobre os Botos da Amazônia!</p>
        <button class="option-button" onclick="restartQuiz()">Reiniciar Quiz</button>
    `;
}

// --- 7. FUNÇÃO: Reiniciar o Jogo ---
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

document.addEventListener('DOMContentLoaded', loadQuestion);
