// --- 1. A Lista de Perguntas COM EXPLICAÇÕES CIENTÍFICAS ---
const quiz = [
    {
        question: "Qual característica morfológica confere ao Boto Cor-de-Rosa maior capacidade de caça em ambientes de igapó?",
        options: ["Sua barbatana dorsal triangular", "Suas vértebras cervicais livres"],
        answer: 1, 
        explanation: "A ausência de fusão nas vértebras cervicais (livres) permite ao Boto Cor-de-Rosa alta flexibilidade cervical, essencial para manobrar e caçar em habitats complexos (igapós e áreas alagadas)."
    },
    {
        question: "Qual dos botos é geneticamente mais próximo dos golfinhos oceânicos (família Delphinidae)?",
        options: ["O Boto Cor-de-Rosa (Inia)", "O Boto Tucuxi (Sotalia)"],
        answer: 1, 
        explanation: "O Tucuxi (Sotalia fluviatilis) é classificado na família Delphinidae, indicando uma adaptação mais recente ao ambiente fluvial. O Boto Cor-de-Rosa pertence a uma família mais antiga (Iniidae)."
    },
    {
        question: "A principal ameaça antrópica que afeta a saúde dos botos devido à degradação do habitat é:",
        options: ["Ataques de predadores naturais como onças", "Contaminação por mercúrio e fragmentação do habitat"],
        answer: 1, 
        explanation: "A contaminação por mercúrio (garimpo) e a fragmentação do habitat por barragens são as principais ameaças de origem humana (antrópica) que impactam a sobrevivência de ambas as espécies."
    },
    {
        question: "Qual é a estrutura morfológica da nadadeira dorsal do Boto Tucuxi?",
        options: ["Uma crista dorsal baixa", "Uma barbatana dorsal triangular e definida"],
        answer: 1, 
        explanation: "O Tucuxi possui uma barbatana dorsal triangular, similar a de golfinhos oceânicos, enquanto o Boto Cor-de-Rosa possui apenas uma crista baixa, uma diferença morfológica-chave."
    },
    {
        question: "Onde o Boto Cor-de-Rosa é encontrado, indicando sua distribuição endêmica?",
        options: ["Em estuários costeiros e mar aberto", "Exclusivamente nas bacias hidrográficas do Amazonas e Orinoco"],
        answer: 1, 
        explanation: "O Boto Cor-de-Rosa é uma espécie endêmica, encontrada exclusivamente nas bacias dos rios Amazonas e Orinoco, não sobrevivendo no mar."
    }
];

// --- 2. Funcionalidade: Variáveis e Conexão com o HTML ---
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

const questionElement = document.querySelector('#slide-3 .question');
const optionsContainer = document.querySelector('#slide-3 .options');
const resultElement = document.getElementById('result'); 

// --- 2. Funcionalidade: Carregar a Próxima Pergunta ---
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
        
        button.onclick = () => checkAnswer(index, currentQuestion.answer, currentQuestion.explanation); 
        
        optionsContainer.appendChild(button);
    });
}

// --- 2. Funcionalidade: Verificar a Resposta ---
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
        <p class="explanation-text"><strong>Análise:</strong> ${explanationText}</p>
    `;

    // Avança após 4 segundos
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 4000);
}

// --- 2. Funcionalidade: Exibir Resultados Finais e Reiniciar ---
function showResults() {
    questionElement.textContent = '🐬 Apresentação Científica Concluída! 💖';
    optionsContainer.innerHTML = '';
    resultElement.innerHTML = `
        <p>A turma acertou: <strong>${score} de ${quiz.length}</strong>.</p>
        <p>Obrigado por participar do Projeto Mais Ciência.</p>
        <button class="option-button" onclick="restartQuiz()">Reiniciar Quiz</button>
    `;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    // Prepara o quiz para iniciar novamente pelo botão do Slide 3
    optionsContainer.innerHTML = '<button id="start-quiz-btn" class="option-button" onclick="loadQuiz()">Iniciar Quiz Interativo</button>';
    questionElement.textContent = 'Clique no botão abaixo para testar os conhecimentos da turma!';
    resultElement.innerHTML = '';
}
