const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const shipImage = new Image();
shipImage.src = "public/ship.png";

const enemyImage = new Image();
enemyImage.src = "public/enemy.png";

const backgroundImage = new Image();
backgroundImage.src = "public/background.png";

const bottomBarImage = new Image();
bottomBarImage.src = "public/bottomBar.png";

const ship = {
    x: 0,
    y: 0,
    width: 50,
    height: 30,
    speed: 5,
    dx: 0
};

const bullets = [];
const bulletSpeed = 3;

const enemies = [];
const enemySpeed = 2;

let score = 0;
let lives = 3;
let gameOver = false;
let gameStarted = false;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ship.speed = (canvas.width / 1000) * 5;

    ship.x = canvas.width / 2 - ship.width / 2;
    ship.y = canvas.height - ship.height - 60;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function drawTextWithLineBreaks(text, fontSize, maxWidth, yPosition) {
    ctx.font = fontSize + "px Arial";
    const words = text.split(' ');
    let line = "";
    let lineHeight = fontSize * 1.2;
    let yOffset = yPosition;

    words.forEach(word => {
        let testLine = line + word + " ";
        let testWidth = ctx.measureText(testLine).width;

        if (testWidth > maxWidth && line !== "") {
            ctx.fillText(line, (canvas.width - ctx.measureText(line).width) / 2, yOffset);
            line = word + " ";
            yOffset += lineHeight;
        } else {
            line = testLine;
        }
    });

    ctx.fillText(line, (canvas.width - ctx.measureText(line).width) / 2, yOffset);
}

function showStartScreen() {
    drawBackground();
    drawBottomBar();

    const titleFontSize = Math.min(canvas.width / 10, 50);
    const subtitleFontSize = Math.min(canvas.width / 20, 30);
    const controlFontSize = Math.min(canvas.width / 30, 20);

    ctx.fillStyle = "Black";
    const titleText = "Skin Invader";
    drawTextWithLineBreaks(titleText, titleFontSize, canvas.width * 0.8, canvas.height / 3);

    const defenseText = "Défends ta peau contre le soleil !";
    drawTextWithLineBreaks(defenseText, subtitleFontSize, canvas.width * 0.8, canvas.height / 2.5);

    const controlText1 = "Ordinateur : Utilise les flèches gauche/droite ou glisse pour déplacer.";
    const controlText2 = "Téléphone : clique à droite et à gauche de l'écran pour te déplacer, et au milieu pour tirer";
    const controlText3 = "Appuie sur Espace, ou touchez l'écran pour commencer.";

    drawTextWithLineBreaks(controlText1, controlFontSize, canvas.width * 0.8, canvas.height / 1.75);
    drawTextWithLineBreaks(controlText2, controlFontSize, canvas.width * 0.8, canvas.height / 1.5);
    drawTextWithLineBreaks(controlText3, controlFontSize, canvas.width * 0.8, canvas.height / 1.25);
}

function drawGameOver() {
    const gameOverFontSize = Math.min(canvas.width / 10, 50);
    ctx.fillStyle = "black";
    const gameOverText = "Vous avez attrapé un coup de soleil !";
    drawTextWithLineBreaks(gameOverText, gameOverFontSize, canvas.width * 0.8, canvas.height / 2);
}

function startGame() {
    gameStarted = true;
    gameOver = false;
    score = 0;
    lives = 3;
    enemies.length = 0;
    bullets.length = 0;
    update();
}

function moveShip() {
    ship.x += ship.dx;

    if (ship.x < 0) ship.x = 0;
    if (ship.x + ship.width > canvas.width) ship.x = canvas.width - ship.width;
}

function drawBackground() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

function drawShip() {
    ctx.drawImage(shipImage, ship.x, ship.y, ship.width, ship.height);
}

function createBullet() {
    const bullet = {
        x: ship.x + ship.width / 2 - 2.5,
        y: ship.y,
        width: 5,
        height: 10,
    };
    bullets.push(bullet);
}

function drawBullets() {
    ctx.fillStyle = "yellow";
    bullets.forEach((bullet, index) => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        bullet.y -= bulletSpeed;

        if (bullet.y < 0) {
            bullets.splice(index, 1);
        }
    });
}

function createEnemy() {
    const enemy = {
        x: Math.random() * (canvas.width - 60),
        y: -60,
        width: 60,
        height: 60,
    };
    enemies.push(enemy);
}

function drawEnemies() {
    enemies.forEach((enemy, index) => {
        ctx.drawImage(enemyImage, enemy.x, enemy.y, enemy.width, enemy.height);
        enemy.y += enemySpeed;

        bullets.forEach((bullet, bulletIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                enemies.splice(index, 1);
                bullets.splice(bulletIndex, 1);
                score += 10;
            }
        });

        if (enemy.y + enemy.height >= canvas.height) {
            lives--;
            enemies.splice(index, 1);
            if (lives <= 0) {
                gameOver = true;
            }
        }
    });
}

function drawScore() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);
}

function drawLives() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Lives: " + lives, canvas.width - 100, 30);
}

function drawBottomBar() {
    ctx.drawImage(bottomBarImage, 0, canvas.height - 60, canvas.width, 60);
}

function update() {
    if (!gameStarted) {
        showStartScreen();
        return;
    }

    if (gameOver) {
        drawGameOver();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground();
    moveShip();
    drawShip();
    drawBullets();
    drawEnemies();
    drawScore();
    drawLives();
    drawBottomBar();

    if (Math.random() < 0.01) {
        createEnemy();
    }

    requestAnimationFrame(update);
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        ship.dx = -ship.speed;
    }
    if (e.key === "ArrowRight") {
        ship.dx = ship.speed;
    }
    if (e.key === " " && !gameStarted) {
        startGame();
    }
    if (e.key === " ") {
        createBullet();
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        ship.dx = 0;
    }
});

document.addEventListener("touchstart", (e) => {
    if (!gameStarted) {
        startGame();
    } else {
        const touchX = e.touches[0].clientX;
        if (touchX <= canvas.width / 3) {
            ship.dx = -ship.speed;
        } else if (touchX >= 2 * canvas.width / 3) {
            ship.dx = ship.speed;
        } else {
            createBullet();
        }
    }
});

canvas.addEventListener("touchmove", (e) => {
    if (gameStarted) {
        const touchX = e.touches[0].clientX;

        if (touchX <= canvas.width / 3) {
            ship.dx = -ship.speed;
        } else if (touchX >= 2 * canvas.width / 3) {
            ship.dx = ship.speed;
        } else {
            ship.dx = 0;
        }
    }
});

canvas.addEventListener("touchend", () => {
    ship.dx = 0;
});

showStartScreen();
