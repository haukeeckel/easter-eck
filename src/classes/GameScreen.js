class GameScreen {
  constructor() {
    this.game = null;
    // ---------------------------------------------------------
    // Splash Screen
    // ---------------------------------------------------------
    this.starter = document.querySelector("#starter");
    this.splashScreen = document.querySelector("#splash-screen");
    this.instructionsBtn = document.querySelector("#instructions");
    this.instructionsScreen = document.querySelector("#instructions-screen");
    this.instructionsClose = document.querySelector("#instructions-close");
    this.playerNameInput = document.querySelector("#player-name-input");
    // ---------------------------------------------------------
    // Heroes
    // ---------------------------------------------------------
    this.hero1 = document.querySelector("#hero1");
    this.hero2 = document.querySelector("#hero2");
    this.hero3 = document.querySelector("#hero3");
    this.hero4 = document.querySelector("#hero4");
    this.hero5 = document.querySelector("#hero5");
    this.hero6 = document.querySelector("#hero6");
    this.selectedHero = "./images/character/hero1.png";
    // ---------------------------------------------------------
    // Game
    // ---------------------------------------------------------
    this.gameStatus = document.querySelector("#game-status");
    this.playerName = document.querySelector("#player-name");
    this.timer = document.querySelector("#timer");
    this.score = document.querySelector("#score");
    this.gameArea = document.querySelector("#game-area");
    this.settings = document.querySelector("#settings");
    // ---------------------------------------------------------
    // Game Over
    // ---------------------------------------------------------
    this.gameOverScreen = document.querySelector("#game-over-screen");
    this.summary = document.querySelector("#summary");
    this.restarter = document.querySelector("#restarter");
    this.quit = document.querySelector("#quit");
    // ---------------------------------------------------------
    // Music
    // ---------------------------------------------------------
    this.muteBtn = document.querySelector("#mute");
    this.music = new Audio("./music/gamemusic.mp3");
    this.music.muted = true;
    this.music.loop = true;
    this.music.volume = 0.03;
  }
  // ---------------------------------------------------------
  // Game
  // ---------------------------------------------------------
  showGameScren() {
    this.gameOverScreen.style.display = "none";
    this.settings.style.display = "flex";
    this.muteBtn.src = "./images/global/unmute.png";
    this.splashScreen.style.display = "none";
    this.gameArea.style.display = "block";
    this.gameStatus.style.display = "flex";
    this.playerName.innerText = this.playerNameInput.value;
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

  hurryUp() {
    if (this.game.counter == 6) {
      this.timer.style.animationName = "hurryUp";
    }
    if (this.game.counter == 5) {
      this.gameArea.style.animationName = "hurryUp";
    }
  }

  handleGameOver() {
    cancelAnimationFrame(this.game.animationId);
    this.summary.innerText = `you've reached ${this.game.stage} of 9 and collected ${this.game.score} of ${this.game.egg.spawnedEggs} Eggs`;
    this.gameOverScreen.style.display = "flex";

    this.timer.style.animationName = "none";
    this.gameArea.style.animationName = "none";

    this.settings.style.display = "none";
    this.gameArea.style.display = "none";
    this.gameStatus.style.display = "none";
    this.splashScreen.style.display = "none";

    this.game.achievements.style.display = "none"
    this.game.achievementOne.style.display = "none"
    this.game.achievementTwo.style.display = "none"
    this.game.achievementThree.style.display = "none"
    this.game.achievementFour.style.display = "none"
    this.game.achievementFive.style.display = "none" 
    this.game.achievementSix.style.display = "none" 
    this.game.achievementSeven.style.display = "none" 
    this.game.achievementEight.style.display = "none"
    this.game.achievementNine.style.display = "none"
    return;
  }
  // ---------------------------------------------------------
  // Music
  // ---------------------------------------------------------
  unmuteSound() {
    this.music.muted = false;
    this.game.collectSound.muted = false;
    this.game.footstepSound.muted = false;
    this.game.hintSound.muted = false;
    this.game.stageSound.muted = false;
  }
  // ---------------------------------------------------------
  // Eventlistener
  // ---------------------------------------------------------
  initEventlistener() {
    // Hero Selection
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

    // Game Buttons
    this.instructionsClose.addEventListener("click", () => {
      this.instructionsScreen.style.display = "none";
    });
    this.instructionsBtn.addEventListener("click", () => {
      this.instructionsScreen.style.display = "flex";
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
      this.music.pause();
      this.gameOverScreen.style.display = "none";
      this.settings.style.display = "none";
      this.splashScreen.style.display = "flex";
    });

    // Sounds
    this.muteBtn.addEventListener("click", () => {
      if (this.muteBtn.src.includes("unmute.png")) {
        this.music.pause();
        this.muteBtn.src = "./images/global/mute.png";
      } else {
        this.music.play();
        this.muteBtn.src = "./images/global/unmute.png";
      }
    });
  }
}
