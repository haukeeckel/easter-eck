// Game
class Game {
  constructor() {
    this.canvas = gameArea;
    this.ctx = this.canvas.getContext("2d");

    this.animationId = null;
    this.gameOver = false;

    this.gameTimer = null;
    this.counter = 2;

    this.background = new Image();
    this.background.src = "../../images/level/bg_basic.png";
    this.foreground = new Image();
    this.foreground.src = "../../images/level/fg_basic.png";

    this.player = new GameObject({
      src: "../../images/character/hero.png",
      srcX: 3,
      srcY: 0,
      drawX: adjustGrid(1),
      drawY: adjustGrid(1),
      isPlayer: true,
    });

    this.egg = new GameObject({
      src: "../../images/gameObjects/eggs.png",
      srcX: 3,
      srcY: 0,
      drawX: adjustGrid(3),
      drawY: adjustGrid(2),
    });
  }

  gameLoop() {
    const animation = () => {
      // Clear Canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // Drawings
      this.ctx.drawImage(this.background, 0, 0);

      // Eggs
      this.ctx.drawImage(
        this.egg.sprite,
        adjustGrid(0),
        adjustGrid(0),
        adjustGrid(1),
        adjustGrid(2),
        adjustGrid(3),
        adjustGrid(2),
        adjustGrid(1),
        adjustGrid(2)
      );
      // Player
      this.player.move();
      this.ctx.drawImage(
        this.player.sprite,
        adjustGrid(this.player.srcX),
        adjustGrid(this.player.srcY),
        adjustGrid(1), // TODO animation
        adjustGrid(2), // TODO animation
        this.player.x, // adjust Grid by move()
        this.player.y, // adjust Grid by move()
        adjustGrid(1),
        adjustGrid(2)
      );

      this.ctx.drawImage(this.foreground, 0, 0);
      
      timer.innerText = `${this.counter} sec`;
      // Game Ends
      if (this.gameOver) {
        cancelAnimationFrame(this.animationId);
        // TODO
        gameOverScreen.style.display = "flex";
        gameArea.style.display = "none";
        gameStatus.style.display = "none";
        return;
      } else {
        this.animationId = requestAnimationFrame(() => {
          animation();
        });
      }
    };
    animation();
  }

  start() {
    // console.log("Hello");
    this.gameLoop();
  }
}
