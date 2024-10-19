const home = document.getElementById("start-screen");
const game = document.getElementById("game-screen");
const end = document.getElementById("end-screen"); 
const gamePageBtn = document.getElementsByClassName('choice-btn')[0];
const modal = document.getElementById("game-rules");
const close = document.getElementsByClassName("close")[0];
const startPageBtn = document.getElementById("ext-btn");
const rollDiceBtn = document.getElementById("dice-btn");
const tiles = Array.from(document.querySelectorAll('.tile'));
const scoreBtn = document.getElementById("score-btn");
let scoreDisplay = document.getElementById("score-display");
let sumOfDice = 0;
let flippedTileArray = [];
let tempFlippedTileArray = [];
let scoreArray = [];
let pickedTileOne = 0;
let pickedTileTwo = 0;
let pickedTileThree = 0;
let diceNum1;
let diceNum2;
let alertMsg = document.getElementById("alert");

//Function to hide or unhide homegame screen, game screen and end screen
function unhideGame() {
    home.style.display = "none";
    game.style.display = "block";
}

gamePageBtn.addEventListener('click', unhideGame);

//Function to set game rules box as modal box
function showRules() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

function showStart() {
    home.style.display = "block";
    game.style.display = "none";
}

startPageBtn.addEventListener('click', showStart);

rollDiceBtn.addEventListener('click', rollTheDice, { once: true });

//Function to roll the dice
function rollTheDice() {
    diceNum1 = document.querySelector(".img1");
    diceNum2 = document.querySelector(".img2");

    diceNum1.setAttribute("src","assets/image/game-page-image/rolling-dice1.gif");
    diceNum2.setAttribute("src","assets/image/game-page-image/rolling-dice2.gif");

    setTimeout (() => {
        let randomNumber1 = Math.floor(Math.random() * 6) + 1;
        let randomNumber2 = Math.floor(Math.random() * 6) + 1;

        diceNum1.setAttribute("src","assets/image/game-page-image/dice" + randomNumber1 + ".png");
        diceNum2.setAttribute("src","assets/image/game-page-image/dice" + randomNumber2 + ".png");

        sumOfDice = randomNumber1 + randomNumber2;
        
        return sumOfDice;

    }, 2500);

     alertMsg.style.display = 'none';

}

function flipTile(event) {
    let chosenTileValue = event;
    console.log(chosenTileValue);
    
    if (sumOfDice == 0) {
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Please roll the dice!";
        chosenTileValue = 0;
        console.log('sumOfDice == 0');
        return;
    } else if (tempFlippedTileArray.length === 0 && flippedTileArray.length === 9) {  
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Congratulation! You just shut the box!";
        return;
    } else if (chosenTileValue > sumOfDice && tempFlippedTileArray.length === 0) {  
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Wrong flip!";
        console.log('chosenTileValue > sumOfDice');
        console.log("sumOfDice == 0");
        return;
    } else if (chosenTileValue < sumOfDice && tempFlippedTileArray.length === 0) {
        flippedTileArray.push(chosenTileValue); 
        tempFlippedTileArray.push(chosenTileValue);
        pickedTileOne = tempFlippedTileArray[0];
        console.log(pickedTileOne);
        document.getElementById('tile' + event).style.visibility = "hidden";
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Flip another tile!";
        console.log('chosenTileValue < sumOfDice && tempFlippedTileArray.length === 0');
        console.log(chosenTileValue);
        return;
    } else if (chosenTileValue == sumOfDice && tempFlippedTileArray.length === 0)  {
        flippedTileArray.push(chosenTileValue);
        tempFlippedTileArray = [];
        scoreArray.push(sumOfDice);
        document.getElementById('tile' + event).style.visibility = "hidden";
        pickedTileOne = 0;
        sumOfDice = 0;
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Great job!";
        console.log('chosenTileValue = sumOfDice');
        rollDiceBtn.addEventListener('click', rollTheDice, { once: true });
        console.log(chosenTileValue);
        return;
    } else if ((chosenTileValue + pickedTileOne) < sumOfDice && tempFlippedTileArray.length === 1) {  
        flippedTileArray.push(chosenTileValue);
        tempFlippedTileArray.push(chosenTileValue);
        pickedTileTwo = tempFlippedTileArray[1];
        console.log(pickedTileTwo);
        document.getElementById('tile' + event).style.visibility = "hidden";
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Flip another tile!";
        console.log('(chosenTileValue + pickedTileOne) < sumOfDice');
        return;
    } else if ((chosenTileValue + pickedTileOne + pickedTileTwo) == sumOfDice && tempFlippedTileArray.length === 2) {  
        flippedTileArray.push(chosenTileValue);
        tempFlippedTileArray = []
        scoreArray.push(sumOfDice);
        document.getElementById('tile' + event).style.visibility = "hidden";
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Great job!";
        rollDiceBtn.addEventListener('click', rollTheDice, { once: true });
        console.log('(chosenTileValue + pickedTileOne + pickedTileTwo) == sumOfDice && tempFlippedTileArray.length === 2');
        return;
    } else if ((chosenTileValue + pickedTileOne + pickedTileTwo) < sumOfDice && tempFlippedTileArray.length === 2) {  
        flippedTileArray.push(chosenTileValue);
        tempFlippedTileArray.push(chosenTileValue);
        pickedTileThree = tempFlippedTileArray[2];
        document.getElementById('tile' + event).style.visibility = "hidden";
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Flip another tile!";
        console.log('(chosenTileValue + pickedTileOne + pickedTileTwo) == sumOfDice && tempFlippedTileArray.length === 2');
        return;
    } else if ((chosenTileValue + pickedTileOne + pickedTileTwo + pickedTileThree) == sumOfDice && tempFlippedTileArray.length === 3) {  
        flippedTileArray.push(chosenTileValue);
        scoreArray.push(sumOfDice);
        tempFlippedTileArray = []
        document.getElementById('tile' + event).style.visibility = "hidden";
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Great job!";
        rollDiceBtn.addEventListener('click', rollTheDice, { once: true });
        console.log('(chosenTileValue + pickedTileOne + pickedTileTwo + pickedTileThree) == sumOfDice && tempFlippedTileArray.length === 3');
        return;
    } else if ((chosenTileValue + pickedTileOne + pickedTileTwo + pickedTileThree) > sumOfDice && tempFlippedTileArray.length === 3) {  
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Game Over!";
        console.log('(chosenTileValue + pickedTileOne + pickedTileTwo + pickedTileThree) > sumOfDice && tempFlippedTileArray.length === 3');
        return;
    } else if ((chosenTileValue + pickedTileOne + pickedTileTwo) > sumOfDice && tempFlippedTileArray.length === 2) {  
        flippedTileArray.push(chosenTileValue);
        tempFlippedTileArray = []
        document.getElementById('tile' + event).style.visibility = "hidden";
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Game Over!";
        console.log('(chosenTileValue + pickedTileOne + pickedTileTwo) < sumOfDice && tempFlippedTileArray.length === 2');
        return;
    } else if ((chosenTileValue + pickedTileOne) > sumOfDice) {  
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Wrong flip!";
        console.log('chosenTileValue + pickedTileOne) > sumOfDice');
        return;
    } else if ((chosenTileValue + pickedTileOne) == sumOfDice) {
        flippedTileArray.push(chosenTileValue);
        tempFlippedTileArray = [];
        scoreArray.push(sumOfDice);
        pickedTileOne = 0;
        document.getElementById('tile' + event).style.visibility = "hidden";
        sumOfDice = 0;
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Great job!";
        rollDiceBtn.addEventListener('click', rollTheDice, { once: true });
        console.log('chosenTileValue + pickedTileOne) == sumOfDice');
        return;
    } else if (flippedTileArray.indexOf(chosenTileValue) !== -1) {
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Wrong flip!";
        console.log('flippedTileArray.indexOf(chosenTileValue) !== -1');
        return;
    } else {
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Game Over!";
        console.log('No condition met');
    }
} 

function calculateScore() {
    let sumOfChosenTile = 0;
    for (let i = 0; i < scoreArray.length; i++) {
        sumOfChosenTile += scoreArray[i];
    }
    let displayScore = 45 - sumOfChosenTile;
    scoreDisplay.style.display = "block"; 
    document.getElementById("score-number").innerText = displayScore;

    alertMsg.style.display = 'block';
    alertMsg.innerHTML = "Game Over!";
}
    
scoreBtn.addEventListener('click', calculateScore);
    
function resetGame() {
    tiles.forEach(tile => {
        tile.style.visibility = "visible";
    
        sumOfDice = 0;
        flippedTileArray = [];
        tempFlippedTileArray = [];
        scoreArray = [];
        pickedTileOne = 0;
        pickedTileTwo = 0;
        pickedTileThree = 0;

        diceNum1.setAttribute("src","assets/image/game-page-image/dice6.png");
        diceNum2.setAttribute("src","assets/image/game-page-image/dice6.png");

        alertMsg.style.display = 'none';
        alertMsg.innerHTML = "";

        scoreDisplay.style.display = "none"; 
        document.getElementById("score-number").innerText = "";

        rollDiceBtn.addEventListener('click', rollTheDice, { once: true });
    })

return;

}




