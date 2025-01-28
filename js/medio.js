let moves = 0;
let flippedCards = [];
let matchedPairs = 0;
let currentLevel = 1; // Nivel inicial
let totalPairs = 3; // Comienza con 3 pares (6 cartas)
let score = 0; // Puntaje total
let levelScores = []; // Arreglo para almacenar el puntaje de cada nivel

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

// Función para barajar el arreglo de cartas
function shuffledArray(array) {
    return array.sort(() => Math.random() - 0.5); // Baraja el arreglo aleatoriamente
}

// Crear el tablero con las cartas
function createBoard() {
    gameBoard.innerHTML = '';  // Limpia el tablero antes de crear uno nuevo

    // Crea una nueva copia de las cartas disponibles para este nivel
    let cards = [...cardImages];
    cards = cards.slice(0, totalPairs); // Toma solo las imágenes necesarias para este nivel

    let doubledCards = [...cards, ...cards]; // Duplica las cartas para crear pares
    doubledCards = shuffledArray(doubledCards); // Baraja las cartas de manera aleatoria

    // Crea las cartas en el tablero
    for (let i = 0; i < doubledCards.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = i;

        const img = document.createElement('img');
        img.src = doubledCards[i];
        img.alt = 'Carta';
        card.appendChild(img);

        card.addEventListener('click', flipCard);  // Evento para voltear las cartas
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
                // Asignar puntaje fijo según el nivel
                switch (currentLevel) {
                    case 1:
                        score = 10;
                        break;
                    case 2:
                        score = 15;
                        break;
                    case 3:
                        score = 20;
                        break;
                    case 4:
                        score = 25;
                        break;
                    case 5:
                        score = 30;
                        break;
                    default:
                        score = 0;
                }

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
        totalPairs = 3 + (currentLevel - 1) * 2; // Aumenta de 2 en 2 los pares en cada nivel (6, 9, 12, 15, 18)
        moves = 0;
        movesDisplay.textContent = `Movimientos: ${moves}`;
        levelDisplay.textContent = `Nivel: ${currentLevel}`;
        messageDisplay.textContent = '';
        nextLevelButton.style.display = 'none';
        
        // El puntaje ya está fijo por nivel, no se debe sumar más al puntaje
        createBoard();  // Crea un nuevo tablero para el siguiente nivel
    }
}

// Función para reiniciar el juego
function restartGame() {
    currentLevel = 1; 
    matchedPairs = 0;
    totalPairs = 3; // Comienza con 3 pares
    score = 0;
    levelScores = [];
    moves = 0;
    movesDisplay.textContent = `Movimientos: 0`;
    scoreDisplay.textContent = `Puntaje: 0`;
    levelDisplay.textContent = `Nivel: 1`;
    messageDisplay.textContent = '';
    nextLevelButton.style.display = 'none';
    restartButton.style.display = 'none';
    createBoard();  // Crea un nuevo tablero al reiniciar el juego
}

// Inicializa el tablero al cargar
createBoard();
