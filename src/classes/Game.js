// Game
class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.score = 0;
    this.gameDate = Date.now();

    this.animationId = null;
    this.gameOver = false;

    this.gameTimer = null;
    this.isGameRunning = true;
    this.counter = 45;

    this.level = new Level();

    this.player = new Player({
      src: "./images/character/hero1.png",
      srcX: 3,
      srcY: 0,
      drawX: adjustGrid(1),
      drawY: adjustGrid(1),
      isPlayer: true,
      blockedGrids: this.level.blockedGrids,
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

      // Clear Canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // Drawings
      // Background
      this.ctx.drawImage(this.level.background, 0, 0);

      // Eggs
      this.egg.spawnRandom(this.ctx);

      // Player
      this.player.move();
      this.player.draw(this.ctx);

      if (this.player.collectEgg(this.egg.x, this.egg.y)) {
        this.collected();
      }
      // Foreground
      this.ctx.drawImage(this.level.foreground, 0, 0);

      // DOM
      score.innerText = `Score: ${this.score}`;
      timer.innerText = `${this.counter} sec`;

      this.animationId = requestAnimationFrame(() => {
        animation();
      });
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

  activateMovement() {
    document.addEventListener("keydown", (e) => {
      const key = e.key;
      if (!this.player.pressedKeys.includes(key)) {
        this.player.pressedKeys.unshift(key);
      }
    });

    document.addEventListener("keyup", (e) => {
      const key = e.key;
      if (this.player.pressedKeys.includes(key)) {
        this.player.pressedKeys.splice(this.player.pressedKeys.indexOf(key), 1);
      }
    });
  }

  start() {
    // console.log("Hello");
    this.activateMovement();
    this.gameLoop();
  }
}
