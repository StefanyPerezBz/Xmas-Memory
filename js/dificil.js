let moves = 0;
let flippedCards = [];
let matchedPairs = 0;
let currentLevel = 1; 
let totalPairs = 4; 
let score = 0; 
let levelScores = []; 

const gameBoard = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const messageDisplay = document.getElementById('message');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const restartButton = document.getElementById('restart-button');
const nextLevelButton = document.getElementById('next-level');

const cardImages = [
    'assets/arbol.png', 
    'assets/baston.png', 
    'assets/decoracion.png', 
    'assets/estrella.png', 
    'assets/regalo.png', 
    'assets/gorro.png', 
    'assets/tambor.png',
    'assets/trompeta.png',
    'assets/gnomo.png', 
    'assets/regalo2.png',
    'assets/nieve.png',
    'assets/santa.png',
    'assets/reno.png'
];

// Función para barajar un arreglo
function shuffledArray(array) {
    return array.sort(() => Math.random() - 0.5); 
}

// Crear el tablero con las cartas
function createBoard() {
    gameBoard.innerHTML = '';  

    let cards = [...cardImages];
    cards = cards.slice(0, totalPairs); 

    let doubledCards = [...cards, ...cards]; 
    doubledCards = shuffledArray(doubledCards); 

    // Crea las cartas en el tablero
    for (let i = 0; i < doubledCards.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = i;

        const img = document.createElement('img');
        img.src = doubledCards[i];
        img.alt = 'Carta';
        card.appendChild(img);

        card.addEventListener('click', flipCard);  
        gameBoard.appendChild(card);
    }
}

// Función para voltear las cartas
function flipCard(event) {
    const card = event.target.closest('.card');
    if (flippedCards.length === 2 || card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        moves++;
        movesDisplay.textContent = `Movimientos: ${moves}`;

        const [card1, card2] = flippedCards;
        const img1 = card1.querySelector('img').src;
        const img2 = card2.querySelector('img').src;

        if (img1 === img2) {
            matchedPairs++;
            flippedCards = [];
            if (matchedPairs === totalPairs) {
                // Ahora sumamos 5 puntos por nivel
                score += 15;  // Aumento de 5 en 5

                scoreDisplay.textContent = `Puntaje: ${score}`;
                messageDisplay.textContent = `¡Nivel ${currentLevel} ganado!`;

                levelScores.push(score);

                if (currentLevel < 5) {
                    nextLevelButton.style.display = 'inline-block';
                } else {
                    messageDisplay.textContent += '¡Felicidades, has completado todos los niveles!';
                    nextLevelButton.style.display = 'none';
                    restartButton.style.display = 'inline-block'; 
                }
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }
    }
}

// Función para avanzar al siguiente nivel
function nextLevel() {
    if (currentLevel < 5) {
        currentLevel++;
        matchedPairs = 0;
        totalPairs = 4 + (currentLevel - 1) * 2; 
        moves = 0;
        movesDisplay.textContent = `Movimientos: ${moves}`;
        levelDisplay.textContent = `Nivel: ${currentLevel}`;
        messageDisplay.textContent = '';
        nextLevelButton.style.display = 'none';
        createBoard();  
    }
}

// Función para reiniciar el juego
function restartGame() {
    currentLevel = 1; 
    matchedPairs = 0;
    totalPairs = 4; 
    score = 0;
    levelScores = [];
    moves = 0;
    movesDisplay.textContent = `Movimientos: 0`;
    scoreDisplay.textContent = `Puntaje: 0`;
    levelDisplay.textContent = `Nivel: 1`;
    messageDisplay.textContent = '';
    nextLevelButton.style.display = 'none';
    restartButton.style.display = 'none';
    createBoard();  
}

createBoard();
