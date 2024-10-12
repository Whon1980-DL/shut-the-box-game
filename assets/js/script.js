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