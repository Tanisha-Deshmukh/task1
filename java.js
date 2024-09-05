const board = document.getElementById('board');
const cells = Array.from(document.querySelectorAll('.cell'));
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;
const gameState = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(event) {
    const index = event.target.dataset.index;
    if (!gameState[index] && gameActive) {
        gameState[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWin()) {
            message.textContent = `${currentPlayer} wins!`;
            gameActive = false;
        } else if (gameState.every(cell => cell)) {
            message.textContent = 'It\'s a draw!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => gameState[index] === currentPlayer);
    });
}

function resetGame() {
    gameState.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = '';
}

board.addEventListener('click', handleClick);
resetButton.addEventListener('click', resetGame);
