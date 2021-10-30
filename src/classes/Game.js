// Game
class Game {
  constructor() {
    this.canvas = document.querySelector("#game-area");
    this.ctx = this.canvas.getContext("2d");

    this.animationId = null;
    this.gameOver = false;

    this.gameTimer = null;
    this.counter = 5;

    this.background = new Image();
    this.background.src = "../../images/level/bg_basic.png";
    this.foreground = new Image();
    this.foreground.src = "../../images/level/fg_basic.png";

    this.player = new Image();
    this.player.src = "../../images/character/hero.png";

    this.egg = new Image();
    this.egg.src = "../../images/gameObjects/eggs.png";
  }

  gameLoop() {
    const animation = () => {
      // Clear Canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // Drawings
      this.ctx.drawImage(this.background, 0, 0);

      this.ctx.drawImage(
        this.player,
        adjustGrid(0), // src-x
        adjustGrid(0), // src-y
        adjustGrid(1), // src-width
        adjustGrid(2), // src-height
        adjustGrid(1), // draw-x
        adjustGrid(5), // draw-y
        adjustGrid(1), // draw-width
        adjustGrid(2)  // draw-height
      );

      this.ctx.drawImage(
        this.egg,
        adjustGrid(0),
        adjustGrid(0),
        adjustGrid(1),
        adjustGrid(2),
        adjustGrid(3),
        adjustGrid(2),
        adjustGrid(1),
        adjustGrid(2)
      );

      this.ctx.drawImage(this.foreground, 0, 0)

      // Game Ends
      if (this.gameOver) {
        cancelAnimationFrame(this.animationId);
        // console.log(this.gameOver)
        return
      } else {
      }
      this.animationId = requestAnimationFrame(() => {
        animation();
      });
    };
    animation();
  }

  start() {
    console.log("Hello");
    this.gameLoop();
  }
}
