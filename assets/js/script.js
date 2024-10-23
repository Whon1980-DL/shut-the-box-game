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
 * Funciton to roll dice by using random number function and attach numbers to src attribute setting. 
 * Add event listener method is used. Timne out is set so funciton finish executing after 2,500ms
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
 * The funciton takes one parameter which is the event from the click. Some if-else sstatement activate the calculateScore function
 */
function flipTile(event) {
    let chosenTileValue = event;
    
    if (sumOfDice == 0) {
        chosenTileValue = 0;
        return setAlertMessage("Please roll the dice!");
    } else if (chosenTileValue > sumOfDice && tempFlippedTileArray.length === 0 && flippedTileArray.length > 7) {  
        calculateScore();
        tiles.forEach(tile => {
            tile.removeAttribute("onclick");
        })
        return setAlertMessage("Game Over!");
    } else if (chosenTileValue > sumOfDice && tempFlippedTileArray.length === 0) {  
        return setAlertMessage("Wrong flip!");
    } else if (chosenTileValue < sumOfDice && tempFlippedTileArray.length === 0 && flippedTileArray.length > 7) {
        pickedTileOne = tempFlippedTileArray[0];
        document.getElementById('tile' + event).style.backgroundColor = "brown";
        document.getElementById('tile' + event).style.color = "cornsilk";
        tiles.forEach(tile => {
            tile.removeAttribute("onclick");
        })
        calculateScore();
        return setAlertMessage("Game Over!");
    } else if (chosenTileValue < sumOfDice && tempFlippedTileArray.length === 0) {
        flippedTileArray.push(chosenTileValue); 
        tempFlippedTileArray.push(chosenTileValue);
        pickedTileOne = tempFlippedTileArray[0];
        document.getElementById('tile' + event).style.backgroundColor = "brown";
        document.getElementById('tile' + event).style.color = "cornsilk";
        return setAlertMessage("Flip another tile!");
    } else if (chosenTileValue == sumOfDice && tempFlippedTileArray.length === 0 && flippedTileArray.length !== 8)  {
        flippedTileArray.push(chosenTileValue);
        tempFlippedTileArray = [];
        scoreArray.push(sumOfDice);
        document.getElementById('tile' + event).style.visibility = "hidden";
        pickedTileOne = 0;
        sumOfDice = 0;
        document.getElementById("tile1").disabled = true
        rollDiceBtn.addEventListener('click', rollTheDice, { once: true });
        return setAlertMessage("Great job!");
    } else if (chosenTileValue == sumOfDice && tempFlippedTileArray.length === 0 && flippedTileArray.length === 8)  {
        flippedTileArray.push(chosenTileValue);
        tempFlippedTileArray = [];
        scoreArray.push(sumOfDice);
        document.getElementById('tile' + event).style.visibility = "hidden";
        pickedTileOne = 0;
        sumOfDice = 0;
        rollDiceBtn.addEventListener('click', rollTheDice, { once: true });
        return setAlertMessage("Congratulation! You just shut the box!");
    } else if ((chosenTileValue + pickedTileOne) > sumOfDice && flippedTileArray.length > 4) {  
        tiles.forEach(tile => {
            tile.removeAttribute("onclick");
        })
        calculateScore();
        return setAlertMessage("Game Over!");
    } else if ((chosenTileValue + pickedTileOne) > sumOfDice) {  
        return setAlertMessage("Wrong flip!");
    } else if ((chosenTileValue + pickedTileOne) < sumOfDice && tempFlippedTileArray.length === 1 && chosenTileValue !== pickedTileOne && flippedTileArray.length > 7) {  
        tiles.forEach(tile => {
            tile.removeAttribute("onclick");
        })
        calculateScore();
        return setAlertMessage("Game Over!");
    } else if ((chosenTileValue + pickedTileOne) < sumOfDice && tempFlippedTileArray.length === 1 && chosenTileValue !== pickedTileOne) {  
        flippedTileArray.push(chosenTileValue);
        tempFlippedTileArray.push(chosenTileValue);
        pickedTileTwo = tempFlippedTileArray[1];
        document.getElementById('tile' + event).style.backgroundColor = "brown";
        document.getElementById('tile' + event).style.color = "cornsilk";
        return setAlertMessage("Flip another tile!");
    } else if ((chosenTileValue + pickedTileOne) == sumOfDice && chosenTileValue !== pickedTileOne && flippedTileArray.length !== 8) {
        flippedTileArray.push(chosenTileValue);
        tempFlippedTileArray = [];
        scoreArray.push(sumOfDice);
        document.getElementById('tile' + event).style.visibility = "hidden";
        document.getElementById('tile' + pickedTileOne).style.visibility = "hidden";
        pickedTileOne = 0;
        sumOfDice = 0;
        document.getElementById("tile1").disabled = true
        rollDiceBtn.addEventListener('click', rollTheDice, { once: true });
        return setAlertMessage("Great job!");
    } else if ((chosenTileValue + pickedTileOne) == sumOfDice && chosenTileValue !== pickedTileOne && flippedTileArray.length === 8) {
        flippedTileArray.push(chosenTileValue);
        tempFlippedTileArray = [];
        scoreArray.push(sumOfDice);
        document.getElementById('tile' + event).style.visibility = "hidden";
        document.getElementById('tile' + pickedTileOne).style.visibility = "hidden";
        pickedTileOne = 0;
        sumOfDice = 0;
        rollDiceBtn.addEventListener('click', rollTheDice, { once: true });
        return setAlertMessage("Congratulation! You just shut the box!");
    } else if ((chosenTileValue + pickedTileOne + pickedTileTwo) > sumOfDice && tempFlippedTileArray.length === 2 && chosenTileValue !== pickedTileOne && chosenTileValue !== pickedTileTwo) {  
        tempFlippedTileArray = []
        document.getElementById('tile' + event).style.backgroundColor = "brown";
        document.getElementById('tile' + event).style.color = "cornsilk";
        tiles.forEach(tile => {
            tile.removeAttribute("onclick");
        })
        calculateScore();
        return setAlertMessage("Game Over!");
    } else if ((chosenTileValue + pickedTileOne + pickedTileTwo) < sumOfDice && tempFlippedTileArray.length === 2 && chosenTileValue !== pickedTileOne && chosenTileValue !== pickedTileTwo && flippedTileArray.length >= 7) {  
        pickedTileThree = tempFlippedTileArray[2];
        document.getElementById('tile' + event).style.backgroundColor = "brown";
        document.getElementById('tile' + event).style.color = "cornsilk";
        tiles.forEach(tile => {
            tile.removeAttribute("onclick");
        })
        calculateScore();
        return setAlertMessage("Game Over!");
    } else if ((chosenTileValue + pickedTileOne + pickedTileTwo) < sumOfDice && tempFlippedTileArray.length === 2 && chosenTileValue !== pickedTileOne && chosenTileValue !== pickedTileTwo) {  
        flippedTileArray.push(chosenTileValue);
        tempFlippedTileArray.push(chosenTileValue);
        pickedTileThree = tempFlippedTileArray[2];
        document.getElementById('tile' + event).style.backgroundColor = "brown";
        document.getElementById('tile' + event).style.color = "cornsilk";
        return setAlertMessage("Flip another tile");
    } else if ((chosenTileValue + pickedTileOne + pickedTileTwo) == sumOfDice && tempFlippedTileArray.length === 2 && chosenTileValue !== pickedTileOne && chosenTileValue !== pickedTileTwo && flippedTileArray.length !== 8) {  
        flippedTileArray.push(chosenTileValue);
        tempFlippedTileArray = []
        scoreArray.push(sumOfDice);
        document.getElementById('tile' + event).style.visibility = "hidden";
        document.getElementById('tile' + pickedTileOne).style.visibility = "hidden";
        document.getElementById('tile' + pickedTileTwo).style.visibility = "hidden";
        document.getElementById("tile1").disabled = true
        rollDiceBtn.addEventListener('click', rollTheDice, { once: true });
        return setAlertMessage("Great Job!");
    } else if ((chosenTileValue + pickedTileOne + pickedTileTwo) == sumOfDice && tempFlippedTileArray.length === 2 && chosenTileValue !== pickedTileOne && chosenTileValue !== pickedTileTwo && flippedTileArray.length === 8) {  
        flippedTileArray.push(chosenTileValue);
        tempFlippedTileArray = []
        scoreArray.push(sumOfDice);
        document.getElementById('tile' + event).style.visibility = "hidden";
        document.getElementById('tile' + pickedTileOne).style.visibility = "hidden";
        document.getElementById('tile' + pickedTileTwo).style.visibility = "hidden";
        setTileVisibility(event, pickedTileOne, pickedTileTwo, null);
        rollDiceBtn.addEventListener('click', rollTheDice, { once: true });
        return setAlertMessage("Congratulation! You just shut the box!");
    } else if ((chosenTileValue + pickedTileOne + pickedTileTwo + pickedTileThree) > sumOfDice && tempFlippedTileArray.length === 3 && chosenTileValue !== pickedTileOne && chosenTileValue !== pickedTileTwo && chosenTileValue !== pickedTileThree) {  
        document.getElementById('tile' + event).style.backgroundColor = "brown";
        document.getElementById('tile' + event).style.color = "cornsilk";
        tiles.forEach(tile => {
            tile.removeAttribute("onclick");
        })
        calculateScore();
        return setAlertMessage('Game Over!');
    } else if ((chosenTileValue + pickedTileOne + pickedTileTwo + pickedTileThree) == sumOfDice && tempFlippedTileArray.length === 3 && chosenTileValue !== pickedTileOne && chosenTileValue !== pickedTileTwo && chosenTileValue !== pickedTileThree && flippedTileArray.length !== 8) {  
        flippedTileArray.push(chosenTileValue);
        scoreArray.push(sumOfDice);
        tempFlippedTileArray = []
        document.getElementById('tile' + event).style.visibility = "hidden";
        document.getElementById('tile' + pickedTileOne).style.visibility = "hidden";
        document.getElementById('tile' + pickedTileTwo).style.visibility = "hidden";
        document.getElementById('tile' + pickedTileThree).style.visibility = "hidden";
        document.getElementById("tile1").disabled = true
        rollDiceBtn.addEventListener('click', rollTheDice, { once: true });
        return setAlertMessage('Great job!');
    } else if ((chosenTileValue + pickedTileOne + pickedTileTwo + pickedTileThree) == sumOfDice && tempFlippedTileArray.length === 3 && chosenTileValue !== pickedTileOne && chosenTileValue !== pickedTileTwo && chosenTileValue !== pickedTileThree && flippedTileArray.length === 8) {  
        flippedTileArray.push(chosenTileValue);
        scoreArray.push(sumOfDice);
        tempFlippedTileArray = []
        setTileVisibility(event, pickedTileOne, pickedTileTwo, pickedTileThree)
        rollDiceBtn.addEventListener('click', rollTheDice, { once: true });
        return setAlertMessage("Congratulation! You just shut the box!");
    } else if (flippedTileArray.indexOf(chosenTileValue) !== -1) {
        return setAlertMessage('Wrong flip!');
    } else {
        tiles.forEach(tile => {
            tile.removeAttribute("onclick");
        })
        calculateScore();
        return setAlertMessage('Game Over!');
    }
} 

function setAlertMessage(message) {
    alertMsg.style.display = "block",
    alertMsg.innerHTML = message
  }

  function setTileVisibility(event, tileOne, tileTwo, tileThree) {
    document.getElementById('tile' + event).style.visibility = "hidden";
        document.getElementById('tile' + tileOne).style.visibility = "hidden";
        document.getElementById('tile' + tileTwo).style.visibility = "hidden";
        if (tileThree != null) {
            document.getElementById('tile' + tileThree).style.visibility = "hidden";
        }
  }

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




