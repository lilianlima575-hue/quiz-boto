// --- 1. A Lista de Perguntas COM EXPLICAÇÕES (O SEU CONTEÚDO) ---
const quiz = [
    {
        question: "Onde vive principalmente o Boto Cor-de-Rosa?",
        options: ["Nos rios da Amazônia e Orinoco", "Nos oceanos Atlântico e Pacífico"],
        answer: 0, 
        explanation: "O Boto Cor-de-Rosa (Inia geoffrensis) é um golfinho de água doce, encontrado exclusivamente na Bacia Amazônica e do Orinoco."
    },
    {
        question: "Qual dos botos é o tema da lenda que se transforma em homem?",
        options: ["O Boto Tucuxi", "O Boto Cor-de-Rosa"],
        answer: 1, 
        explanation: "O Boto Cor-de-Rosa é o protagonista da famosa lenda amazônica, onde ele se transforma em um homem bonito para seduzir pessoas durante a noite."
    },
    {
        question: "Qual dos dois botos é conhecido por ter o pescoço mais flexível, podendo virar a cabeça em quase 90 graus?",
        options: ["Boto Cor-de-Rosa (Inia)", "Boto Tucuxi (Sotalia)"],
        answer: 0, 
        explanation: "O Boto Cor-de-Rosa possui vértebras cervicais não fundidas, o que lhe dá grande flexibilidade para caçar em águas rasas e na floresta inundada (igapó)."
    },
    {
        question: "Qual boto tem uma barbatana dorsal mais parecida com a de um golfinho marinho (triangular e definida)?",
        options: ["Boto Cor-de-Rosa", "Boto Tucuxi"],
        answer: 1, 
        explanation: "O Tucuxi (Sotalia) é classificado como um golfinho oceânico adaptado à água doce e possui uma barbatana dorsal bem definida, diferente da crista dorsal do Boto Cor-de-Rosa."
    },
    {
        question: "Qual é a principal ameaça atual ao Boto Cor-de-Rosa e ao Tucuxi?",
        options: ["Falcões e predadores aéreos", "Poluição, desmatamento e pesca ilegal"],
        answer: 1, 
        explanation: "Ambos os botos são vulneráveis devido à ação humana, especialmente a contaminação da água (poluição), a degradação do habitat (desmatamento) e a pesca acidental ou intencional."
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
    resultElement.innerHTML = ''; // Limpamos o conteúdo HTML

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
        
        button.onclick = () => checkAnswer(index, currentQuestion.answer, currentQuestion.explanation); // Passamos a explicação aqui
        
        optionsContainer.appendChild(button);
    });
}

// --- 5. FUNÇÃO: Verificar a Resposta (AGORA COM EXPLICAÇÃO) ---
function checkAnswer(selectedIndex, correctAnswerIndex, explanationText) {
    if (answered) return; 
    answered = true;

    const selectedButton = document.getElementById('option-' + selectedIndex);
    
    let resultMessage = '';

    if (selectedIndex === correctAnswerIndex) {
        score++;
        resultMessage = '✅ Resposta Correta! +1 Ponto';
        selectedButton.classList.add('correct');
    } else {
        resultMessage = '❌ Resposta Errada.';
        selectedButton.classList.add('wrong');
        document.getElementById('option-' + correctAnswerIndex).classList.add('correct');
    }

    // Exibe a mensagem de resultado e a explicação
    resultElement.innerHTML = `
        <p><strong>${resultMessage}</strong></p>
        <p class="explanation-text"><strong>Por quê?</strong> ${explanationText}</p>
    `;

    // Avança após 4 segundos (Demos mais tempo para ler a explicação)
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 4000);
}

// --- 6. FUNÇÃO: Exibir Resultados Finais e Reiniciar o Jogo (Sem Alterações) ---
function showResults() {
    questionElement.textContent = '🐬 Quiz Concluído! 💖';
    optionsContainer.innerHTML = '';
    resultElement.innerHTML = `
        <p>Sua pontuação final é: <strong>${score} de ${quiz.length}</strong>.</p>
        <p>Parabéns por testar seus conhecimentos sobre os Botos da Amazônia!</p>
        <button class="option-button" onclick="restartQuiz()">Reiniciar Quiz</button>
    `;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

document.addEventListener('DOMContentLoaded', loadQuestion);
