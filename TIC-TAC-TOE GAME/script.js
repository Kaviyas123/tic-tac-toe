const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const restartButton = document.querySelector("#restartButton");
const startCells = ["", "", "", "", "", "", "", "", ""];
let go = "cross"; 
infoDisplay.textContent = "START THE GAME WITH CROSS!"; 

function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('square');
        cellElement.dataset.index = index;
        cellElement.addEventListener('click',addGo);
        gameBoard.append(cellElement);
    });
}
createBoard();

function addGo(e){
    const goDisplay = document.createElement('div');
    goDisplay.classList.add(go);
    e.target.append(goDisplay);
    go = go === "circle" ? "cross" : "circle";
    infoDisplay.textContent = " now " + go + "'s go";
    e.target.removeEventListener("click",addGo);
    checkscore();
}

function checkscore(){
        const allsquares = document.querySelectorAll(".square");
        const winningCombos = [
           [0,1,2],[3,4,5],[6,7,8],
           [0,3,6],[1,4,7],[2,5,8],
           [0,4,8],[2,4,6]
       ];
   
       let draw = true;
   
       for(let i = 0; i < winningCombos.length; i++) {
           const array = winningCombos[i];
           const circleWins = array.every(cell => allsquares[cell].firstChild?.classList.contains('circle'));
           const crossWins = array.every(cell => allsquares[cell].firstChild?.classList.contains('cross'));
   
           if (circleWins) {
               infoDisplay.textContent = "CIRCLE WINS!";
               allsquares.forEach(square => square.replaceWith(square.cloneNode(true)));
               return;
           }
   
           if (crossWins) {
               infoDisplay.textContent = "CROSS WINS!";
               allsquares.forEach(square => square.replaceWith(square.cloneNode(true)));
               return;
           }
   
           if (allsquares[array[0]].childElementCount === 0 || allsquares[array[1]].childElementCount === 0 || allsquares[array[2]].childElementCount === 0) {
               draw = false;
           }
       }
   
       if (draw) {
           infoDisplay.textContent = "It's a DRAW!";
           return;
       }
   }

function restartGame() {
    gameBoard.innerHTML = "";
    createBoard(); 
    infoDisplay.textContent = "circle goes first";
    go = "circle"; 
}
restartButton.addEventListener('click', restartGame);
