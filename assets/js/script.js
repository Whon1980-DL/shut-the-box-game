//Function to set game rules box as modal box
let modal = document.getElementById("game-rules");
let btn = document.getElementById("rules-btn");
let close = document.getElementsByClassName("close")[0];

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

//Function to hide or unhide homegame screen, game screen and end screen
let home = document.getElementById("start-screen");
let game = document.getElementById("game-screen");
let end = document.getElementById("end-screen"); 

function unhideGame() {
    home.style.display = "none";
    game.style.display = "block";
}

function showStart() {
    home.style.display = "block";
    game.style.display = "none";
}

// Create array to store cards that have already been fliped
let flipArray = [];
let flipTile = 0;
let sumOfDice = 0;

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

        document.getElementById("dice-1-value").innerHTML = randomNumber1;
        document.getElementById("dice-2-value").innerHTML = randomNumber2;
    }, 2500);
}
// Set variable for dice value and sum of two dice
let diceOneValue = parseInt(document.getElementById("dice-1-value").innerHTML);
let diceTwoValue = parseInt(document.getElementById("dice-2-value").innerHTML);
    sumOfDice = diceOneValue + diceTwoValue;

//unction flipTile() {
    //let choosenTile = document.getElementsByClassName("tile");
        //choosenTile = event.
//}
    

    





