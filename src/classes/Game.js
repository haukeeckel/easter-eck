// Game
class Game {
  constructor() {
    this.canvas = gameArea;
    this.ctx = this.canvas.getContext("2d");

    this.score = 0;
    this.gameDate = Date.now()

    this.animationId = null;
    this.gameOver = false;

    this.gameTimer = null;
    this.counter = 45;

    this.background = new Image();
    this.background.src = "./images/level/bg_basic.png";
    this.foreground = new Image();
    this.foreground.src = "./images/level/fg_basic.png";

    this.player = new Player({
      src: "./images/character/hero.png",
      srcX: 3,
      srcY: 0,
      drawX: adjustGrid(1),
      drawY: adjustGrid(1),
      isPlayer: true,
    });

    this.egg = new Egg({
      src: "./images/gameObjects/eggs.png",
      srcX: 3,
      srcY: 0,
      drawX: adjustGrid(3),
      drawY: adjustGrid(2),
    });
  }

  gameLoop() {
    const animation = () => {
      // Game Ends
      if (this.gameOver) {
        this.handleGameOver();
      } else {
        this.animationId = requestAnimationFrame(() => {
          animation();
        });
      }
      // Clear Canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // Drawings
      this.ctx.drawImage(this.background, 0, 0);

      // Eggs
      this.egg.spawnRandom(this.ctx);

      // Player
      this.player.move();
      this.player.draw(this.ctx);

      if (this.player.collectEgg(this.egg.x, this.egg.y)) {
        this.collected();
      }

      this.ctx.drawImage(this.foreground, 0, 0);

      // DOM
      score.innerText = `Score: ${this.score}`;
      timer.innerText = `${this.counter} sec`;
    };
    animation();
  }

  collected() {
    clearInterval(this.egg.remainingTimeId);
    this.egg.remainingTime = 3;
    this.egg.hasSpawnPoint = false;
    this.score++;
    this.counter += 1;
  }

  handleGameOver() {
    cancelAnimationFrame(this.animationId);
    summary.innerText = `you've collected ${this.score} of ${this.egg.spawnedEggs}`;
    gameOverScreen.style.display = "flex";
    gameArea.style.display = "none";
    gameStatus.style.display = "none";
    splashScreen.style.display = "none";
    return;
  }

  start() {
    // console.log("Hello");
    this.gameLoop();
  }
}
