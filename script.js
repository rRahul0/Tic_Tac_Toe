const gameDesc = document.querySelector('.game-desc');
const gameContainer = document.querySelector('.game-container');
const boxes = document.querySelectorAll('.box');
const newGameBtn = document.querySelector('.btn');

let presentPlayer;
let count=0;
let gameArray;
let over=true;

const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


function init() {
    presentPlayer = "X";
    gameArray = ["", "", "", "", "", "", "", "", ""];
    newGameBtn.classList.remove("active");
    gameContainer.style.pointerEvents="all";
    boxes.forEach((box)=>{
        box.innerText="";
        box.classList.remove("win");
        
    });
    over=true;
    gameDesc.innerText = `Current Player - ${presentPlayer}`;
}
init();

function swapPlayer() {
    if (presentPlayer === "X") presentPlayer = "O";
    else presentPlayer = "X";
    gameDesc.innerText = `Current Player - ${presentPlayer}`;
}
function gameOver() {
    win.forEach((index) => {
        if (gameArray[index[0]] != "" && gameArray[index[1]] != "" && gameArray[index[2]] != "") {
            if (gameArray[index[0]] === gameArray[index[1]] && gameArray[index[1]] === gameArray[index[2]]) {
                gameDesc.innerText = `Winner - ${gameArray[index[0]]}`;
                boxes[index[0]].classList.add("win");
                boxes[index[1]].classList.add("win");
                boxes[index[2]].classList.add("win");
                gameContainer.style.pointerEvents = "none";
                newGameBtn.classList.add("active");
                over=false;
            }
        }
    });

    gameArray.forEach((box)=>{
        if (box !== "")count++;
    });
    console.log(count, over);
    if (count === 9 && over) {
        gameDesc.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }
    count=0;
}
function handleClick(index) {
    if (gameArray[index] === "") {
        gameArray[index] = presentPlayer;
        boxes[index].innerHTML = presentPlayer;
        swapPlayer();
        gameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => handleClick(index));
})

newGameBtn.addEventListener("click",()=>{
    init();
})