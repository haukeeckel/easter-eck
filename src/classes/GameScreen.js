class GameScreen {
  constructor() {
    this.game = null;

    // Splash Screen
    this.starter = document.querySelector("#starter");
    this.splashScreen = document.querySelector("#splash-screen");
    this.playerNameInput = document.querySelector("#player-name-input");

    // Heroes
    this.hero1 = document.querySelector("#hero1");
    this.hero2 = document.querySelector("#hero2");
    this.hero3 = document.querySelector("#hero3");
    this.hero4 = document.querySelector("#hero4");
    this.hero5 = document.querySelector("#hero5");
    this.hero6 = document.querySelector("#hero6");
    this.selectedHero = "./images/character/hero1.png";

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

    this.music = new Audio("./music/gamemusic.mp3");
    this.music.muted = true;
    this.music.loop = true;
    this.music.volume = 0.05;
  }

  startGame = () => {
    this.game = new Game(this.gameArea);
    this.game.player.sprite.src = this.selectedHero;
    this.unmuteSound();
    this.music.play();
    this.game.start();

    this.game.gameTimer = setInterval(() => {
      if (this.game.counter > 1) {
        this.hurryUp();
        if (this.game.isGameRunning) {
          this.game.counter--;
        }
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

  unmuteSound() {
    this.music.muted = false;
    this.game.collectSound.muted = false;
    this.game.footstepSound.muted = false;
  }

  initEventlistener() {
    this.hero1.addEventListener("focus", () => {
      this.selectedHero = "./images/character/hero1.png";
    });
    this.hero2.addEventListener("focus", () => {
      this.selectedHero = "./images/character/hero2.png";
    });
    this.hero3.addEventListener("focus", () => {
      this.selectedHero = "./images/character/hero3.png";
    });
    this.hero4.addEventListener("focus", () => {
      this.selectedHero = "./images/character/hero4.png";
    });
    this.hero5.addEventListener("focus", () => {
      this.selectedHero = "./images/character/hero5.png";
    });
    this.hero6.addEventListener("focus", () => {
      this.selectedHero = "./images/character/hero6.png";
    });

    this.starter.addEventListener("click", () => {
      this.showGameScren();
      this.startGame();
    });

    this.restarter.addEventListener("click", () => {
      this.showGameScren();
      this.startGame();
    });

    this.quit.addEventListener("click", () => {
      this.gameOverScreen.style.display = "none";
      this.splashScreen.style.display = "flex";
    });
  }

  hurryUp() {
    if (this.game.counter == 6) {
      this.timer.style.animationName = "hurryUp";
    }
    if (this.game.counter == 5) {
      this.gameArea.style.animationName = "hurryUp";
    }
  }

  showGameScren() {
    this.gameOverScreen.style.display = "none";
    this.splashScreen.style.display = "none";
    this.gameArea.style.display = "block";
    this.gameStatus.style.display = "flex";
    this.playerName.innerText = this.playerNameInput.value;
  }

  handleGameOver() {
    cancelAnimationFrame(this.game.animationId);
    this.summary.innerText = `you've collected ${this.game.score} of ${this.game.egg.spawnedEggs}`;
    this.timer.style.animationName = "none";
    this.gameArea.style.animationName = "none";
    this.gameOverScreen.style.display = "flex";
    this.gameArea.style.display = "none";
    this.gameStatus.style.display = "none";
    this.splashScreen.style.display = "none";
    return;
  }
}
