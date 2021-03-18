/* store our game status to use it later */

const statusDisplay = document.querySelector('.game--status');

//declare variables to track the game status


let gameActive = true;


let currentPlayer = "X";

//store current player




let gameState = ["", "", "", "", "", "", "", "", ""];

//declare mesages to be used as funtions.


const winningMessage = () => `Player ${ currentPlayer } has won `;

const drawMessage = () => 'Game ended in a draw';

const currentPlayerTurn = () => `
It 's ${currentPlayer} '
s turn `;

//set message to know whose turn it is to play

statusDisplay.innerHTML = currentPlayerTurn()

function handleCellPlayed(clickedCell, clickedCellIndex) {

    //reflect the game played

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;



}


function handlePlayerChange() {

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();




}
//declare conatants
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


function handleResultValidation() {

    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();



}


function handleCellClick(clickedCellEvent) {
    //save the clicked

    const clickedCell = clickedCellEvent.target;

    //get string value

    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
    );

    //check if the cell has already been played

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    //if ok proceed with the game flow

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();



}

function handleRestartGame() {

    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
        .forEach(cell => cell.innerHTML = "");


}

//add event listeners to the actual game cells

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));

document.querySelector('.game--restart').addEventListener('click', handleRestartGame);