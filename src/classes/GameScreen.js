class GameScreen {
  constructor() {
    this.game = null;

    // Splash Screen
    this.starter = document.querySelector("#starter");
    this.splashScreen = document.querySelector("#splash-screen");
    this.playerNameInput = document.querySelector("#player-name-input");

    // Game
    this.gameStatus = document.querySelector("#game-status");
    this.playerName = document.querySelector("#player-name");
    this.timer = document.querySelector("#timer");
    this.score = document.querySelector("#score");
    this.gameArea = document.querySelector("#game-area");

    // Game Over
    this.gameOverScreen = document.querySelector("#game-over-screen");
    this.summary = document.querySelector("#summary");
    this.restarter = document.querySelector("#restarter");
    this.quit = document.querySelector("#quit");
  }

  startGame = () => {
    this.game = new Game(this.gameArea);
    this.game.start();

    this.game.gameTimer = setInterval(() => {
      if (this.game.isGameRunning && this.game.counter > 1) {
        this.game.counter--;
      } else {
        clearInterval(this.game.gameTimer);
        this.game.gameOver = true;
      }
      if (this.game.gameOver) {
        this.handleGameOver();
      } else {
        
      }
    }, 1000);
  };

  initEventlistener() {
    this.starter.addEventListener("click", () => {
      this.splashScreen.style.display = "none";
      this.gameArea.style.display = "block";
      this.gameStatus.style.display = "flex";
      this.playerName.innerText = this.playerNameInput.value

      this.startGame();
    });

    this.restarter.addEventListener("click", () => {
      this.gameOverScreen.style.display = "none";
      this.gameArea.style.display = "block";
      this.gameStatus.style.display = "flex";
      this.playerName.innerText = this.playerNameInput.value

      this.startGame();
    });

    this.quit.addEventListener("click", () => {
      this.gameOverScreen.style.display = "none";
      this.splashScreen.style.display = "flex";
    });
  }

  handleGameOver() {
    cancelAnimationFrame(this.game.animationId);
    this.summary.innerText = `you've collected ${this.game.score} of ${this.game.egg.spawnedEggs}`;
    this.gameOverScreen.style.display = "flex";
    this.gameArea.style.display = "none";
    this.gameStatus.style.display = "none";
    this.splashScreen.style.display = "none";
    return;
  }

  
}
