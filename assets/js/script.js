const home = document.getElementById("start-screen");
const game = document.getElementById("game-screen");
const end = document.getElementById("end-screen"); 
const gamePageBtn = document.getElementsByClassName('choice-btn')[0];
const modal = document.getElementById("game-rules");
const close = document.getElementsByClassName("close")[0];
const startPageBtn = document.getElementById("ext-btn");
const rollDiceBtn = document.getElementById("dice-btn");

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

        document.getElementById("dice-1-value").innerHTML = randomNumber1;
        document.getElementById("dice-2-value").innerHTML = randomNumber2;
    }, 2500);
}

rollDiceBtn.addEventListener('click', rollTheDice);

// Set variable for dice value and sum of two dice
let diceOneValue = parseInt(document.getElementById("dice-1-value").innerHTML);
let diceTwoValue = parseInt(document.getElementById("dice-2-value").innerHTML);
    sumOfDice = diceOneValue + diceTwoValue;

//unction flipTile() {
    //let choosenTile = document.getElementsByClassName("tile");
        //choosenTile = event.
//}
    

    





