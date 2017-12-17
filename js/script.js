let tiles = document.getElementsByClassName("tile");
let simon = []; //array to check against.
let canPickTile = false;
let simonIndex = 0;
let level = 1;
let displaySimonSpeed = 1000;
let levelLabel = document.getElementsByClassName("level-wrapper")[0].getElementsByTagName("a")[0];
var random = function(min, max) {
    return Math.floor((Math.random() * max) + min);
}

function addListeners() {
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].addEventListener("click", handleTileClick)
    }
}

function handleTileClick() {
    if (canPickTile === true) {
        let tile_color = this.id.replace("-tile", "");
        let simon_color = simon[simonIndex];
        if (simonIndex === simon.length - 1) {
            canPickTile = false;
            level++;
            simonSays();
        } else {
            if (tile_color === simon_color) {
                console.log("tile matched");
                simonIndex++;
            } else {
                resetGame();
            }
        }
    } else {
        console.log("cant pick tile right now");
    }
}

function simonSays(offset) {
    levelLabel.innerText = level;
    simonIndex = 0;
    let t = random(0, tiles.length || offset);
    let tile_color = tiles[t].getAttribute("id").replace("-tile", "");
    if (tile_color === simon[simon.length - 1]) {
        console.log("colors matched picking new one");
        simonSays(t);
    } else {
        simon.push(tile_color);
        console.log(simon);
        displaySimonSays();
    }
}

function displaySimonSays() {
    setTimeout(function() {
        let previous_tile = simon[simonIndex - 1];
        let current_tile = simon[simonIndex];
        if (simonIndex < level) {
            console.log("timeout loop");
            if (document.getElementById(previous_tile + "-tile") != null) {
                document.getElementById(previous_tile + "-tile").style.opacity = ".5";
                document.getElementById(current_tile + "-tile").style.opacity = "1";
            }
            document.getElementById(current_tile + "-tile").style.opacity = "1";
            simonIndex++;
            displaySimonSays();
        } else {
            document.getElementById(previous_tile + "-tile").style.opacity = ".5";
            simonIndex = 0;
            canPickTile = true;
        }
    }, displaySimonSpeed)
}

function resetGame() {
    alert("game over");
    level = 1;
    simon = [];
    simonSays();
}
window.onload = function() {
    addListeners();
    simonSays();
}