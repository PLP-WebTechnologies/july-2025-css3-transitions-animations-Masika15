// Global variables to track game state
let cards = [];
let flippedCards = [];
let matchedPairs = 0;

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to create card elements
function createCards() {
    const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
    const shuffledValues = shuffleArray(cardValues);
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';

    shuffledValues.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${value}</div>
                <div class="card-back">?</div>
            </div>
        `;
        card.addEventListener('click', () => handleCardClick(card));
        cardContainer.appendChild(card);
        cards.push(card);
    });
}

// Function to handle card click
function handleCardClick(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !flippedCards.includes(card)) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

// Function to check if flipped cards match
function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === cards.length / 2) {
            showModal('Congratulations! You won!');
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Function to show modal
function showModal(message) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${message}</h2>
            <button onclick="resetGame()">Play Again</button>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

// Function to reset the game
function resetGame() {
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    const modal = document.querySelector('.modal');
    if (modal) modal.remove();
    createCards();
}

// Initialize game and set up reset button
document.addEventListener('DOMContentLoaded', () => {
    createCards();
    document.getElementById('resetButton').addEventListener('click', resetGame);
});
