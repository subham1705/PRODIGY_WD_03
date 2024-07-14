// Global variables
let board = Array.from({ length: 9 }, () => '');
let player = 'X';
let gameActive = true;

// Function to handle cell clicks
function cellClicked(event) {
    const cellId = parseInt(event.target.id.split('-')[1]);
    if (board[cellId - 1] !== '' || !gameActive) return;

    board[cellId - 1] = player;
    event.target.textContent = player;

    checkForWin();
    switchPlayer();
}

// Function to check for a win
function checkForWin() {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    winningConditions.forEach((condition) => {
        if (
            board[condition[0]] === board[condition[1]] &&
            board[condition[0]] === board[condition[2]] &&
            board[condition[0]] !== ''
        ) {
            gameActive = false;
            document.getElementById('status').textContent = `${player} wins`;
        }
    });

    if (!board.includes('') && !gameActive) {
        gameActive = false;
        document.getElementById('status').textContent = 'It\'s a tie!';
    }
}

// Function to switch players
function switchPlayer() {
    player = player === 'X' ? 'O' : 'X';
    document.getElementById('title').textContent = `Player ${player}'s turn`;
}

// Function to reset the game
function resetGame() {
    board = Array.from({ length: 9 }, () => '');
    gameActive = true;
    document.getElementById('board').textContent = '';
    document.getElementById('status').textContent = 'Player X\'s turn';
}

// Add event listeners to cells
document.querySelectorAll('.cell').forEach((cell) => {
    cell.addEventListener('click', cellClicked);
});

// Add event listener to reset button
document.getElementById('reset').addEventListener('click', resetGame);