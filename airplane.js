var player = {
    left: 450,
    top: 600
}

var missles = []

var enemies = [
    { left: 450, top: 0, w: 70, h: 75 }, { left: 350, top: 0, w: 70, h: 75 },
    { left: 150, top: 100, w: 70, h: 75 }, { left: 250, top: 50, w: 70, h: 75 }, { left: 550, top: 50, w: 70, h: 75 },
    { left: 650, top: 100, w: 70, h: 75 }, { left: 750, top: 50, w: 70, h: 75 }
]

var newEnemies = [{ left: 850, top: 100 }]

let ocean = document.querySelector("#ocean");
let enemiesHTML = document.querySelector("#enemies");

function drawPlayer() {
    ocean.innerHTML += `<div id="players"><div class="player"></div></div>`;
}

function movePlayer() {
    let player1 = document.querySelector(".player");
    player1.style.left = `${player.left}px`;
    player1.style.top = `${player.top}px`;
}


function drawEnemies() {
    content = '';
    for (let i = 0; i < enemies.length; i++) {
        content += `<div class='enemy' style='left:${enemies[i].left}px; top:${enemies[i].top}px'></div>`;
    }
    for (let i = 0; i < newEnemies.length; i++) {
        content += `<div class='new-enemy' style='left:${newEnemies[i].left}px; top:${newEnemies[i].top}px'></div>`;
    }
    document.getElementById('enemies').innerHTML = content;
}
function drawNewEnemies() {
    content = '';
    for (let i = 0; i < newEnemies.length; i++) {
        content += `<div class='new-enemy' style='left:${newEnemies[i].left}px; top:${newEnemies[i].top}px'></div>`;
    }
    document.getElementById('enemies').innerHTML = content;
}

function moveEnemies() {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].top += 1;
    }
    for (let i = 0; i < newEnemies.length; i++) {
        newEnemies[i].top += 1;
    }
}



function drawMissles() {
    content = '';
    for (let i = 0; i < missles.length; i++) {
        content += `<div class='missle' style='left:${missles[i].left}px; top:${missles[i].top}px'></div>`;
    }
    document.getElementById('missles').innerHTML = content
}

document.onkeydown = function (e) {
    console.log(e);
    if (e.code == "ArrowLeft" && player.left > 0) { // LEFT
        player.left = player.left - 50;
    }
    else if (e.code == "ArrowRight" && player.left < 900) { // RIGHT
        player.left = player.left + 50;
    }

    else if (e.code == "ArrowDown" && player.top < 600) { // DOWN
        player.top = player.top + 50;

    } else if (e.code == "ArrowUp" && player.top > 0) {
        player.top -= 50;

    } else if (e.code == "Space") {
        missles.push({ left: player.left + 33, top: player.top - 8, w: 3, h: 10 })
        drawMissles();

    }
    movePlayer();

}

function moveMissles() {
    for (let i = 0; i < missles.length; i++) {
        missles[i].top -= 1;
    }
    bulletCollision();
}

function bulletCollision() {
    for (let i = 0; i < missles.length; i++) {
        for (let j = 0; j < enemies.length; j++) {
            if ( missles[i].left + missles[i].w >= enemies[j].left &&  missles[i].left <= enemies[j].left + enemies[j].w) {
            console.log('HIT')
            }
        }
    }
}

function gameLoop() {
    drawEnemies();
    drawMissles();
    moveEnemies();
    moveMissles();
    setTimeout(gameLoop, 50)
}

drawPlayer();
gameLoop();

