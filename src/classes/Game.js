// Game
class Game {
  constructor() {
    this.canvas = document.querySelector("#game-area");
    this.ctx = this.canvas.getContext("2d")
    this.intervalId = 0;
    this.gameOver = false;
  }
  
  gameLoop() {
    const animation = () => {
      // Clear Canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Game Ends
      if (this.gameOver) {
        cancelAnimationFrame(intervalId);
      } else {}
        this.intervalId = requestAnimationFrame(() => {
          animation();   
      })
    }
    animation();
    
  }

  

  start() {
    console.log('Hello')
    this.gameLoop()
  }
}