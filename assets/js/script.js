/**
 * Declare constants for DOM elements and variables for array
 */
const home = document.getElementById("start-screen");
const game = document.getElementById("game-screen");
const gamePageBtn = document.getElementById("start-game")
const modal = document.getElementById("game-rules");
const startPageBtn = document.getElementById("ext-btn");
const rollDiceBtn = document.getElementById("dice-btn");
const tiles = Array.from(document.querySelectorAll('.tile'));
const scoreBtn = document.getElementById("score-btn");
let alertMsg = document.getElementById("alert");
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

/**
 * Function to hide or unhide homegame screen and game screen by adding event listener to game button
 */
function unhideGame() {    
    home.style.display = "none";
    game.style.display = "block";
}

gamePageBtn.addEventListener('click', unhideGame);

/**
 * Function to set game rules box as modal box which activate using onclick attribute
 */
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

/**
 * Function to hide and show start and game button so only one display at one time using add event listener
 */
function showStart() {
    home.style.display = "block";
    game.style.display = "none";
}

startPageBtn.addEventListener('click', showStart);

/**
 * Funciton to roll dice by using random number function and attach numbers to src attribute setting. A
 * dd event listener method is used. Timne out is set so funciton finish executing after 2,500ms
 */
rollDiceBtn.addEventListener('click', rollTheDice, { once: true });

function rollTheDice() {
    diceNum1 = document.querySelector(".img1");
    diceNum2 = document.querySelector(".img2");

    diceNum1.setAttribute("src","assets/image/game-page-image/rolling-dice1.gif");
    diceNum2.setAttribute("src","assets/image/game-page-image/rolling-dice2.gif");

    setTimeout (() => {
        let randomNumber1 = Math.floor(Math.random() * 6) + 1;
        let randomNumber2 = Math.floor(Math.random() * 6) + 1;

        diceNum1.setAttribute("src","assets/image/game-page-image/dice" + randomNumber1 + ".png");
        diceNum1.setAttribute("alt","Dice with" + randomNumber1 + "dots");
        diceNum2.setAttribute("src","assets/image/game-page-image/dice" + randomNumber2 + ".png");
        diceNum2.setAttribute("alt","Dice with" + randomNumber2 + "dots");

        sumOfDice = randomNumber1 + randomNumber2;

        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Now select a tile!";
        
        return sumOfDice;

    }, 2000);

}

/**
 * Function to allow player to flip tiles. Onclick method is used for accuracy. if-else statements are set to meet each senario. 
 * The funciton takes one parameter which is the event from the click. Some if-else sstatement activate the calculateScore funciton
 */
function flipTile(event) {
    let chosenTileValue = event;
    console.log(chosenTileValue);
    
    if (sumOfDice == 0) {
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Please roll the dice!";
        chosenTileValue = 0;
        return;
    } else if (chosenTileValue > sumOfDice && tempFlippedTileArray.length === 0 && flippedTileArray.length > 7) {  
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Game Over!";
        calculateScore();
        tiles.forEach(tile => {
            tile.removeAttribute("onclick");
        })
        console.log('chosenTileValue > sumOfDice && tempFlippedTileArray.length === 0 && flippedTileArray.length > 7');
        return;
    } else if (chosenTileValue > sumOfDice && tempFlippedTileArray.length === 0) {  
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Wrong flip!";
        console.log('chosenTileValue > sumOfDice && tempFlippedTileArray.length === 0');
        return;
    } else if (chosenTileValue < sumOfDice && tempFlippedTileArray.length === 0 && flippedTileArray.length > 7) {
        pickedTileOne = tempFlippedTileArray[0];
        console.log(pickedTileOne);
        document.getElementById('tile' + event).style.backgroundColor = "brown";
        document.getElementById('tile' + event).style.color = "cornsilk";
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Game Over!";
        tiles.forEach(tile => {
            tile.removeAttribute("onclick");
        })
        calculateScore();
        console.log('chosenTileValue < sumOfDice && tempFlippedTileArray.length === 0 && flippedTileArray.length > 7');
        console.log(chosenTileValue);
        return;
    } else if (chosenTileValue < sumOfDice && tempFlippedTileArray.length === 0) {
        flippedTileArray.push(chosenTileValue); 
        tempFlippedTileArray.push(chosenTileValue);
        pickedTileOne = tempFlippedTileArray[0];
        console.log(pickedTileOne);
        document.getElementById('tile' + event).style.backgroundColor = "brown";
        document.getElementById('tile' + event).style.color = "cornsilk";
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Flip another tile!";
        console.log('chosenTileValue < sumOfDice && tempFlippedTileArray.length === 0');
        console.log(chosenTileValue);
        return;
    } else if (chosenTileValue == sumOfDice && tempFlippedTileArray.length === 0 && flippedTileArray.length !== 8)  {
        flippedTileArray.push(chosenTileValue);
        tempFlippedTileArray = [];
        scoreArray.push(sumOfDice);
        document.getElementById('tile' + event).style.visibility = "hidden";
        pickedTileOne = 0;
        sumOfDice = 0;
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Great job!";
        console.log('chosenTileValue == sumOfDice && tempFlippedTileArray.length === 0 && flippedTileArray.length !== 8');
        rollDiceBtn.addEventListener('click', rollTheDice, { once: true });
        console.log(chosenTileValue);
        return;
    } else if (chosenTileValue == sumOfDice && tempFlippedTileArray.length === 0 && flippedTileArray.length === 8)  {
        flippedTileArray.push(chosenTileValue);
        tempFlippedTileArray = [];
        scoreArray.push(sumOfDice);
        document.getElementById('tile' + event).style.visibility = "hidden";
        pickedTileOne = 0;
        sumOfDice = 0;
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Congratulation! You just shut the box!";
        console.log('chosenTileValue == sumOfDice && tempFlippedTileArray.length === 0 && flippedTileArray.length === 8');
        rollDiceBtn.addEventListener('click', rollTheDice, { once: true });
        console.log(chosenTileValue);
        return;
    } else if ((chosenTileValue + pickedTileOne) > sumOfDice && flippedTileArray.length > 4) {  
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Game Over!";
        tiles.forEach(tile => {
            tile.removeAttribute("onclick");
        })
        calculateScore();
        console.log('(chosenTileValue + pickedTileOne) > sumOfDice && flippedTileArray.length > 4');
        return;
    } else if ((chosenTileValue + pickedTileOne) > sumOfDice) {  
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Wrong flip!";
        console.log('chosenTileValue + pickedTileOne) > sumOfDice');
        return;
    } else if ((chosenTileValue + pickedTileOne) < sumOfDice && tempFlippedTileArray.length === 1 && chosenTileValue !== pickedTileOne && flippedTileArray.length > 7) {  
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Game Over!";
        tiles.forEach(tile => {
            tile.removeAttribute("onclick");
        })
        calculateScore();
        console.log('(chosenTileValue + pickedTileOne) < sumOfDice && tempFlippedTileArray.length === 1 && chosenTileValue !== pickedTileOne && flippedTileArray.length > 7');
        return;
    } else if ((chosenTileValue + pickedTileOne) < sumOfDice && tempFlippedTileArray.length === 1 && chosenTileValue !== pickedTileOne) {  
        flippedTileArray.push(chosenTileValue);
        tempFlippedTileArray.push(chosenTileValue);
        pickedTileTwo = tempFlippedTileArray[1];
        console.log(pickedTileTwo);
        document.getElementById('tile' + event).style.backgroundColor = "brown";
        document.getElementById('tile' + event).style.color = "cornsilk";
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Flip another tile!";
        console.log('(chosenTileValue + pickedTileOne) < sumOfDice && tempFlippedTileArray.length === 1 && chosenTileValue !== pickedTileOne');
        return;
    } else if ((chosenTileValue + pickedTileOne) == sumOfDice && chosenTileValue !== pickedTileOne && flippedTileArray.length !== 8) {
        flippedTileArray.push(chosenTileValue);
        tempFlippedTileArray = [];
        scoreArray.push(sumOfDice);
        document.getElementById('tile' + event).style.visibility = "hidden";
        document.getElementById('tile' + pickedTileOne).style.visibility = "hidden";
        pickedTileOne = 0;
        sumOfDice = 0;
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Great job!";
        rollDiceBtn.addEventListener('click', rollTheDice, { once: true });
        console.log('(chosenTileValue + pickedTileOne) == sumOfDice && chosenTileValue !== pickedTileOne && flippedTileArray.length !== 8');
        return;
    } else if ((chosenTileValue + pickedTileOne) == sumOfDice && chosenTileValue !== pickedTileOne && flippedTileArray.length === 8) {
        flippedTileArray.push(chosenTileValue);
        tempFlippedTileArray = [];
        scoreArray.push(sumOfDice);
        document.getElementById('tile' + event).style.visibility = "hidden";
        document.getElementById('tile' + pickedTileOne).style.visibility = "hidden";
        pickedTileOne = 0;
        sumOfDice = 0;
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Congratulation! You just shut the box!";
        rollDiceBtn.addEventListener('click', rollTheDice, { once: true });
        console.log('(chosenTileValue + pickedTileOne) == sumOfDice && chosenTileValue !== pickedTileOne && flippedTileArray.length === 8');
        return;
    } else if ((chosenTileValue + pickedTileOne + pickedTileTwo) > sumOfDice && tempFlippedTileArray.length === 2 && chosenTileValue !== pickedTileOne && chosenTileValue !== pickedTileTwo) {  
        tempFlippedTileArray = []
        document.getElementById('tile' + event).style.backgroundColor = "brown";
        document.getElementById('tile' + event).style.color = "cornsilk";
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Game Over!";
        tiles.forEach(tile => {
            tile.removeAttribute("onclick");
        })
        calculateScore();
        console.log('(chosenTileValue + pickedTileOne + pickedTileTwo) > sumOfDice && tempFlippedTileArray.length === 2 && chosenTileValue !== pickedTileOne && chosenTileValue !== pickedTileTwo');
        return;
    } else if ((chosenTileValue + pickedTileOne + pickedTileTwo) < sumOfDice && tempFlippedTileArray.length === 2 && chosenTileValue !== pickedTileOne && chosenTileValue !== pickedTileTwo && flippedTileArray.length >= 7) {  
        pickedTileThree = tempFlippedTileArray[2];
        document.getElementById('tile' + event).style.backgroundColor = "brown";
        document.getElementById('tile' + event).style.color = "cornsilk";
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Game Over!";
        tiles.forEach(tile => {
            tile.removeAttribute("onclick");
        })
        calculateScore();
        console.log('(chosenTileValue + pickedTileOne + pickedTileTwo) < sumOfDice && tempFlippedTileArray.length === 2 && chosenTileValue !== pickedTileOne && chosenTileValue !== pickedTileTwo && flippedTileArray.length >= 7');
        return;
    } else if ((chosenTileValue + pickedTileOne + pickedTileTwo) < sumOfDice && tempFlippedTileArray.length === 2 && chosenTileValue !== pickedTileOne && chosenTileValue !== pickedTileTwo) {  
        flippedTileArray.push(chosenTileValue);
        tempFlippedTileArray.push(chosenTileValue);
        pickedTileThree = tempFlippedTileArray[2];
        document.getElementById('tile' + event).style.backgroundColor = "brown";
        document.getElementById('tile' + event).style.color = "cornsilk";
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Flip another tile!";
        console.log('(chosenTileValue + pickedTileOne + pickedTileTwo) < sumOfDice && tempFlippedTileArray.length === 2 && chosenTileValue !== pickedTileOne && chosenTileValue !== pickedTileTwo');
        return; 
    } else if ((chosenTileValue + pickedTileOne + pickedTileTwo) == sumOfDice && tempFlippedTileArray.length === 2 && chosenTileValue !== pickedTileOne && chosenTileValue !== pickedTileTwo && flippedTileArray.length !== 8) {  
        flippedTileArray.push(chosenTileValue);
        tempFlippedTileArray = []
        scoreArray.push(sumOfDice);
        document.getElementById('tile' + event).style.visibility = "hidden";
        document.getElementById('tile' + pickedTileOne).style.visibility = "hidden";
        document.getElementById('tile' + pickedTileTwo).style.visibility = "hidden";
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Great job!";
        rollDiceBtn.addEventListener('click', rollTheDice, { once: true });
        console.log('(chosenTileValue + pickedTileOne + pickedTileTwo) == sumOfDice && tempFlippedTileArray.length === 2 && chosenTileValue !== pickedTileOne && chosenTileValue !== pickedTileTwo && flippedTileArray.length !== 8');
        return;
    } else if ((chosenTileValue + pickedTileOne + pickedTileTwo) == sumOfDice && tempFlippedTileArray.length === 2 && chosenTileValue !== pickedTileOne && chosenTileValue !== pickedTileTwo && flippedTileArray.length === 8) {  
        flippedTileArray.push(chosenTileValue);
        tempFlippedTileArray = []
        scoreArray.push(sumOfDice);
        document.getElementById('tile' + event).style.visibility = "hidden";
        document.getElementById('tile' + pickedTileOne).style.visibility = "hidden";
        document.getElementById('tile' + pickedTileTwo).style.visibility = "hidden";
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Congratulation! You just shut the box!";
        rollDiceBtn.addEventListener('click', rollTheDice, { once: true });
        console.log('(chosenTileValue + pickedTileOne + pickedTileTwo) == sumOfDice && tempFlippedTileArray.length === 2 && chosenTileValue !== pickedTileOne && chosenTileValue !== pickedTileTwo && flippedTileArray.length === 8');
        return;
    } else if ((chosenTileValue + pickedTileOne + pickedTileTwo + pickedTileThree) > sumOfDice && tempFlippedTileArray.length === 3 && chosenTileValue !== pickedTileOne && chosenTileValue !== pickedTileTwo && chosenTileValue !== pickedTileThree) {  
        document.getElementById('tile' + event).style.backgroundColor = "brown";
        document.getElementById('tile' + event).style.color = "cornsilk";
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Game Over!";
        tiles.forEach(tile => {
            tile.removeAttribute("onclick");
        })
        calculateScore();
        console.log('(chosenTileValue + pickedTileOne + pickedTileTwo + pickedTileThree) > sumOfDice && tempFlippedTileArray.length === 3 && chosenTileValue !== pickedTileOne && chosenTileValue !== pickedTileTwo && chosenTileValue !== pickedTileThree');
        return;
    } else if ((chosenTileValue + pickedTileOne + pickedTileTwo + pickedTileThree) == sumOfDice && tempFlippedTileArray.length === 3 && chosenTileValue !== pickedTileOne && chosenTileValue !== pickedTileTwo && chosenTileValue !== pickedTileThree && flippedTileArray.length !== 8) {  
        flippedTileArray.push(chosenTileValue);
        scoreArray.push(sumOfDice);
        tempFlippedTileArray = []
        document.getElementById('tile' + event).style.visibility = "hidden";
        document.getElementById('tile' + pickedTileOne).style.visibility = "hidden";
        document.getElementById('tile' + pickedTileTwo).style.visibility = "hidden";
        document.getElementById('tile' + pickedTileThree).style.visibility = "hidden";
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Great job!";
        rollDiceBtn.addEventListener('click', rollTheDice, { once: true });
        console.log('(chosenTileValue + pickedTileOne + pickedTileTwo + pickedTileThree) == sumOfDice && tempFlippedTileArray.length === 3 && chosenTileValue !== pickedTileOne && chosenTileValue !== pickedTileTwo && chosenTileValue !== pickedTileThree && flippedTileArray.length !== 8');
        return;
    } else if ((chosenTileValue + pickedTileOne + pickedTileTwo + pickedTileThree) == sumOfDice && tempFlippedTileArray.length === 3 && chosenTileValue !== pickedTileOne && chosenTileValue !== pickedTileTwo && chosenTileValue !== pickedTileThree && flippedTileArray.length === 8) {  
        flippedTileArray.push(chosenTileValue);
        scoreArray.push(sumOfDice);
        tempFlippedTileArray = []
        document.getElementById('tile' + event).style.visibility = "hidden";
        document.getElementById('tile' + pickedTileOne).style.visibility = "hidden";
        document.getElementById('tile' + pickedTileTwo).style.visibility = "hidden";
        document.getElementById('tile' + pickedTileThree).style.visibility = "hidden";
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Congratulation! You just shut the box!";
        rollDiceBtn.addEventListener('click', rollTheDice, { once: true });
        console.log('(chosenTileValue + pickedTileOne + pickedTileTwo + pickedTileThree) == sumOfDice && tempFlippedTileArray.length === 3 && chosenTileValue !== pickedTileOne && chosenTileValue !== pickedTileTwo && chosenTileValue !== pickedTileThree && flippedTileArray.length === 8');
        return;
    } else if (flippedTileArray.indexOf(chosenTileValue) !== -1) {
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Wrong flip!";
        console.log('flippedTileArray.indexOf(chosenTileValue) !== -1');
        return;
    } else {
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Game Over!";
        tiles.forEach(tile => {
            tile.removeAttribute("onclick");
        })
        calculateScore();
        console.log('No condition met');
    }
} 

/* function unFlipTile(event) {
    let chosenTileValue = event;
    let chosenTileElement = document.getElementsByClassName("tile");
     if (event.target.style.backgroundColor = "brown" && flippedTileArray.includes(chosenTileValue)) {
        flippedTileArray.pop();
        tempFlippedTileArray.pop();
        document.getElementById('tile' + event).style.backgroundColor = "cornsilk";
        document.getElementById('tile' + event).style.color = "brown";
        alertMsg.style.display = 'block';
        alertMsg.innerHTML = "Flip different tile!";
     } else {
        // do nothing
     }
     return;
     console.log("I got unflipped");
} */

/**
 * Function to calculate score once game over or player can no longer flip any tiles. 
 * The score is display in a hidden p element which then unvealed.
 */
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

/**
 * Function to reset the game page. This help reset global variables to their original values.
 */
scoreBtn.addEventListener('click', calculateScore);
    
function resetGame() {
    document.getElementById("tile1").setAttribute("onclick", "flipTile(1)");
    document.getElementById("tile2").setAttribute("onclick", "flipTile(2)");
    document.getElementById("tile3").setAttribute("onclick", "flipTile(3)");
    document.getElementById("tile4").setAttribute("onclick", "flipTile(4)");
    document.getElementById("tile5").setAttribute("onclick", "flipTile(5)");
    document.getElementById("tile6").setAttribute("onclick", "flipTile(6)");
    document.getElementById("tile7").setAttribute("onclick", "flipTile(7)");
    document.getElementById("tile8").setAttribute("onclick", "flipTile(8)");
    document.getElementById("tile9").setAttribute("onclick", "flipTile(9)");

    tiles.forEach(tile => {
        tile.style.visibility = "visible";
        tile.style.backgroundColor = "cornsilk";
        tile.style.color = "brown";
    
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
    });

return;

}




