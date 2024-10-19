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
let pickedTileOne = 0;
let pickedTileTwo = 0;
let alertMsg = document.getElementById("alert");
//let chosenTileValue = 0;

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

//Function to roll the dice
function rollTheDice() {
    let diceNum1 = document.querySelector(".img1");
    let diceNum2 = document.querySelector(".img2");

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

    //console.log(pickedTileOne);
}

rollDiceBtn.addEventListener('click', rollTheDice);

function flipTile(event) {
    let chosenTileValue = event;
    console.log(chosenTileValue);
    
    //let pickedTileThree = 0;
    //let pickedTileFour = 0;
    
    if (sumOfDice == 0) {
        //alert("Please roll the dice!");
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Please roll the dice!";
        chosenTileValue = 0;
        console.log('sumOfDice == 0');
        return;
    } else if (chosenTileValue > sumOfDice && tempFlippedTileArray.length === 0) {  
        //alert('Wrong flip');
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Wrong flip!";
        console.log('chosenTileValue > sumOfDice');
        console.log("sumOfDice == 0");
        return;
    } else if (chosenTileValue < sumOfDice && tempFlippedTileArray.length === 0) {
        flippedTileArray.push(chosenTileValue); 
        tempFlippedTileArray.push(chosenTileValue);
        pickedTileOne = flippedTileArray[0];
        pickedTileOne = tempFlippedTileArray[0];
        console.log(pickedTileOne);
        //chosenTileValue = 0;
        document.getElementById('tile' + event).style.visibility = "hidden";
        //alert("Flip another tile.");
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Flip another tile!";
        console.log('chosenTileValue < sumOfDice && tempFlippedTileArray.length === 0');
        console.log(chosenTileValue);
        return;
    } else if (chosenTileValue == sumOfDice && tempFlippedTileArray.length === 0)  {
        flippedTileArray.push(chosenTileValue);
        tempFlippedTileArray = [];
        document.getElementById('tile' + event).style.visibility = "hidden";
        pickedTileOne = 0;
        sumOfDice = 0;
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Great job!";
        //alert('Great Job!');
        console.log('chosenTileValue = sumOfDice');
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
        document.getElementById('tile' + event).style.visibility = "hidden";
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Great job!";
        console.log('(chosenTileValue + pickedTileOne + pickedTileTwo) == sumOfDice && tempFlippedTileArray.length === 2');
        return;
    } else if ((chosenTileValue + pickedTileOne) > sumOfDice) {  
        //alert("Wrong flip");
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Wrong flip!";
        console.log('chosenTileValue + pickedTileOne) > sumOfDice');
        return;
    } else if ((chosenTileValue + pickedTileOne) == sumOfDice) {
        flippedTileArray.push(chosenTileValue);
        tempFlippedTileArray = [];
        pickedTileOne = 0;
        document.getElementById('tile' + event).style.visibility = "hidden";
        sumOfDice = 0;
        //alert('Great Job!');
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Great job!";
        console.log('chosenTileValue + pickedTileOne) == sumOfDice');
        return;
    } else if (flippedTileArray.indexOf(chosenTileValue) !== -1) {
        //alert('Wrong Flip');
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Wrong flip!";
        console.log('flippedTileArray.indexOf(chosenTileValue) !== -1');
        return;
    } else {
        //alert('Wrong Flip!');
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Wrong flip!";
        console.log('No condition met');
    }
} 

function calculateScore() {
    let sumOfChosenTile = 0;
    for (let i = 0; i < flippedTileArray.length; i++) {
        sumOfChosenTile += flippedTileArray[i];
    }
    let displayScore = 45 - sumOfChosenTile;
    scoreDisplay.style.display = "block"; 
    document.getElementById("score-number").innerText = displayScore;

    alertMsg.style.display = 'block';
    alertMsg.innerHTML = "Game Over!";
}
    
scoreBtn.addEventListener('click', calculateScore);
    





