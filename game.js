const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Configuración del juego
const WIDTH = 800;
const HEIGHT = 400;

// Jugador
let player = {
    width: 50,
    height: 50,
    x: 100,
    y: HEIGHT - 50,
    jumping: false,
    jumpCount: 0
};

// Pared
let wall = {
    width: 30,
    height: 100,
    x: WIDTH,
    y: HEIGHT - 100
};

// Juego
let gameSpeed = 5;
let score = 0;

// Controles
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !player.jumping) {
        player.jumping = true;
        player.jumpCount = 20;
    }
});

function update() {
    // Salto del jugador
    if (player.jumping) {
        player.y -= player.jumpCount;
        player.jumpCount--;
        if (player.jumpCount < -20) {
            player.jumping = false;
        }
    }

    // Limitar la posición del jugador
    player.y = Math.min(Math.max(player.y, 0), HEIGHT - player.height);

    // Mover la pared
    wall.x -= gameSpeed;
    if (wall.x < -wall.width) {
        wall.x = WIDTH;
        wall.y = Math.random() * (HEIGHT - 200) + (HEIGHT - wall.height);
        score++;
        gameSpeed += 0.2;
    }

    // Colisión
    if (
        player.x < wall.x + wall.width &&
        player.x + player.width > wall.x &&
        player.y < wall.y + wall.height &&
        player.y + player.height > wall.y
    ) {
        alert('¡Juego terminado! Puntuación: ' + score);
        resetGame();
    }
}

function draw() {
    // Limpiar canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Dibujar jugador
    ctx.fillStyle = 'black';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Dibujar pared
    ctx.fillStyle = 'red';
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);

    // Mostrar puntuación
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText('Puntuación: ' + score, 10, 30);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function resetGame() {
    player.y = HEIGHT - player.height;
    wall.x = WIDTH;
    gameSpeed = 5;
    score = 0;
}

gameLoop();
