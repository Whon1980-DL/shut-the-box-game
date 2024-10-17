const home = document.getElementById("start-screen");
const game = document.getElementById("game-screen");
const end = document.getElementById("end-screen"); 
const gamePageBtn = document.getElementsByClassName('choice-btn')[0];
const modal = document.getElementById("game-rules");
const close = document.getElementsByClassName("close")[0];
const startPageBtn = document.getElementById("ext-btn");
const rollDiceBtn = document.getElementById("dice-btn");
const tiles = Array.from(document.querySelectorAll('.tile'));
let sumOfDice = 0;
let flippedTileArray = [];
let pickedTileOne = 0;
let chosenTileValue = 0;

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

        //document.getElementById("dice-1-value").innerHTML = randomNumber1;
        //document.getElementById("dice-2-value").innerHTML = randomNumber2;

        sumOfDice = randomNumber1 + randomNumber2;
        
        return sumOfDice;

    }, 2500);
}

rollDiceBtn.addEventListener('click', rollTheDice);

// Set variable for dice value and sum of two dice
//let diceOne = document.getElementById("dice-1-value");
//let diceOneValue = diceOne.innerHTML;

//console.log(diceOneValue);

//let diceTwo = document.getElementById("dice-2-value");
//let diceTwoValue = diceTwo.innerHTML;
//let sumOfDice = diceOneValue + diceTwoValue;

tiles.forEach(tile => {
    tile.addEventListener('click', flipTile);
})

function flipTile(event) {
    let chosenTile = event.target;
    chosenTileValue = chosenTile.innerHTML;
    
    //let pickedTileTwo = 0;
    //let pickedTileThree = 0;
    //let pickedTileFour = 0;
    
    if (chosenTileValue > sumOfDice) {  
        alert("Wrong flip");
     } else if (chosenTileValue < sumOfDice && flippedTileArray.length === 0) {
        flippedTileArray.push(chosenTileValue); 
        pickedTileOne = flippedTileArray[0];
        chosenTile.style.visibility = "hidden";
        alert("Flip more tile.");
    } else if (chosenTileValue = sumOfDice)  {
        //flippedTileArray.push(chosenTileValue);
        flippedTileArray = [];
        chosenTile.style.visibility = "hidden";
        alert('Great Job!');
    } else if (chosenTileValue + pickedTileOne == sumOfDice)  {
        //flippedTileArray.push(chosenTileValue);
        flippedTileArray = [];
        pickedTileOne = 0;
        chosenTile.style.visibility = "hidden";
        alert('Great Job!');
    } else if (chosenTileValue + pickedTileOne < sumOfDice) {  
        chosenTile.style.visibility = "hidden";
        alert("Flip more tile.");
    } else if (chosenTileValue + pickedTileOne > sumOfDice) {  
        alert("Wrong flip");
    } else if (flippedTileArray.indexOf(chosenTileValue) !== -1) {
        alert('Wrong Flip');
    } else 
        alert('Wrong Flip!');

}


    
    
//flippedTileArray.indexOf(chosenTileValue ) == -1)
    

    





