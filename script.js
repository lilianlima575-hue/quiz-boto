// --- 1. A Lista de Perguntas CIENTÍFICAS ---
const quiz = [
    {
        question: "Qual característica morfológica confere ao Boto Cor-de-Rosa maior capacidade de caça em ambientes de igapó?",
        options: ["Sua barbatana dorsal triangular", "Suas vértebras cervicais livres"],
        answer: 1, 
    },
    {
        question: "Qual dos botos é geneticamente mais próximo dos golfinhos oceânicos (família Delphinidae)?",
        options: ["O Boto Cor-de-Rosa (Inia)", "O Boto Tucuxi (Sotalia)"],
        answer: 1, 
    },
    {
        question: "A principal ameaça antrópica que afeta a saúde dos botos devido à degradação do habitat é:",
        options: ["Ataques de predadores naturais como onças", "Contaminação por mercúrio e fragmentação do habitat"],
        answer: 1, 
    },
    {
        question: "Qual é a estrutura morfológica da nadadeira dorsal do Boto Tucuxi?",
        options: ["Uma crista dorsal baixa", "Uma barbatana dorsal triangular e definida"],
        answer: 1, 
    },
    {
        question: "Onde o Boto Cor-de-Rosa é encontrado, indicando sua distribuição endêmica?",
        options: ["Em estuários costeiros e mar aberto", "Exclusivamente nas bacias hidrográficas do Amazonas e Orinoco"],
        answer: 1, 
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
    resultElement.innerHTML = ''; 

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
    
    let resultMessage = '';

    if (selectedIndex === correctAnswerIndex) {
        score++;
        resultMessage = '✅ Correto!';
        selectedButton.classList.add('correct');
    } else {
        resultMessage = '❌ Errado.';
        selectedButton.classList.add('wrong');
        document.getElementById('option-' + correctAnswerIndex).classList.add('correct');
    }

    // Exibe apenas a mensagem de Correto/Errado no placar
    resultElement.innerHTML = `<p><strong>${resultMessage}</strong></p>`;

    // Avança para a próxima pergunta após 2 segundos
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 2000); 
}

// --- 6. FUNÇÃO: Exibir Resultados Finais e Reiniciar ---
function showResults() {
    questionElement.textContent = 'Quiz Concluído!';
    optionsContainer.innerHTML = '';
    resultElement.innerHTML = `
        <p>Sua pontuação final: <strong>${score} de ${quiz.length}</strong>.</p>
        <button class="option-button" onclick="restartQuiz()">Reiniciar Quiz</button>
    `;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}
