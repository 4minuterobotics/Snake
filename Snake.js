const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;

function drawSnakePart(part) {
  ctx.fillStyle = "blue";
  ctx.fillRect(part.x * box, part.y * box, box, box);
  ctx.strokeStyle = "darkblue";
  ctx.strokeRect(part.x * box, part.y * box, box, box);
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * box, food.y * box, box, box);
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * (canvas.width / box)),
      y: Math.floor(Math.random() * (canvas.height / box)),
    };
  } else {
    snake.pop();
  }
  checkCollision();
}

function checkCollision() {
  if (
    snake[0].x < -1 ||
    snake[0].x >= canvas.width / box + 1 ||
    snake[0].y < -1 ||
    snake[0].y >= canvas.height / box + 1
  ) {
    clearInterval(game);
    alert("Game Over!");
  }
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      clearInterval(game);
      alert("Game Over!");
    }
  }
}

function changeDirection(event) {
  const keyPressed = event.keyCode;
  if (keyPressed === 37 && dx !== 1) {
    // left arrow
    dx = -1;
    dy = 0;
  } else if (keyPressed === 38 && dy !== 1) {
    // up arrow
    dx = 0;
    dy = -1;
  } else if (keyPressed === 39 && dx !== -1) {
    // right arrow
    dx = 1;
    dy = 0;
  } else if (keyPressed === 40 && dy !== -1) {
    // down arrow
    dx = 0;
    dy = 1;
  }
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
  moveSnake();
}

document.addEventListener("keydown", changeDirection);
const game = setInterval(drawGame, 100);
