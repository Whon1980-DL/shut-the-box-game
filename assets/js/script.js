//Function for setting game rules box as modal box
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

let tileOne = document.getElementById("tile-1");
let tileTwo = document.getElementById("tile-2");
let tileThree = document.getElementById("tile-3");
let tileFour = document.getElementById("tile-4");
let tileFive = document.getElementById("tile-5");
let tileSix = document.getElementById("tile-6");
let tileSeven = document.getElementById("tile-7");
let tileEight = document.getElementById("tile-8");
let tileNine = document.getElementById("tile-9");


function flipTheTile() {
    let diceOneValue = parseInt(document.getElementById("dice-1-value").innerHTML);
    let diceTwoValue = parseInt(document.getElementById("dice-2-value").innerHTML);
    let sumOfDice = diceOneValue + diceTwoValue;
    console.log(sumOfDice);

    if (sumOfDice === 1) {
        tileOne
    }

    


}

