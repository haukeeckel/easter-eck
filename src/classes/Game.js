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
    this.stage = 0;

    this.collectSound = new Audio("./music/collect.wav");
    this.collectSound.muted = true;
    this.collectSound.volume = 0.8;

    this.footstepSound = new Audio("./music/footstep.wav");
    this.footstepSound.muted = true;
    this.footstepSound.volume = 0.015;

    this.player = new Player({
      src: "./images/character/hero1.png",
      srcX: 3,
      srcY: 0,
      drawX: adjustGrid(9),
      drawY: adjustGrid(6),
      isPlayer: true,
      blockedGrids: this.level.blockedGrids,
      footstepSound: this.footstepSound,
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
      if (this.isGameRunning) {
        this.egg.spawnRandom(this.ctx);
      }

      // Player
      this.player.move();
      this.player.draw(this.ctx);

      if (this.player.collectEgg(this.egg.x, this.egg.y)) {
        this.collected();
      }
      // Foreground
      this.ctx.drawImage(this.level.foreground, 0, 0);

      this.getStageOne();
      this.getStageTwo();
      this.getStageThree();
      this.getStageFour();
      this.getStageSeven();
      this.getStageEight();
      this.getStageNine();

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
    this.collectSound.play();
    this.score++;
    this.counter += 1;
  }

  getStageOne() {
    if (
      (this.player.x === adjustGrid(9) || this.player.x === adjustGrid(10)) &&
      this.player.y === adjustGrid(9) &&
      this.stage === 0 &&
      this.player.pressedKeys[0] == "x"
    ) {
      this.stage += 1;
      console.log(this.stage);
    }
  }

  getStageTwo() {
    if (
      (this.player.x === adjustGrid(11) ||
        this.player.x === adjustGrid(12) ||
        this.player.x === adjustGrid(13)) &&
      this.player.y === adjustGrid(14) &&
      this.stage === 1
    ) {
      this.stage += 1;
      this.egg.spawnedEggs--;
      this.egg.x = this.canvas.height;
      this.isGameRunning = false;
      this.level.background.src = "./images/level/bg_forest.png";
      this.level.foreground.src = "./images/level/fg_forest.png";
      this.player.x = adjustGrid(15);
      this.player.y = adjustGrid(4);
      this.player.blockedGrids = this.level.forestGrids;
    }
  }

  getStageThree() {
    if (this.stage === 2) {
      let rect = this.canvas.getBoundingClientRect();
      this.canvas.addEventListener("click", (e) => {
        if (
          this.stage != 3 &&
          e.clientX - rect.left >= 145 &&
          e.clientX - rect.left <= 255 &&
          e.clientY - rect.left >= 500 &&
          e.clientY - rect.left <= 535
        ) {
          this.level.background.src = "./images/level/bg_forest_hint.png";
        } else if (
          e.clientX - rect.left >= 435 &&
          e.clientX - rect.left <= 540 &&
          e.clientY - rect.left >= 310 &&
          e.clientY - rect.left <= 370
        ) {
          this.level.background.src = "./images/level/bg_forest_final.png";
          this.stage = 3;
        } else if (this.stage === 3) {
          this.level.background.src = "./images/level/bg_forest_final.png";
        } else {
          this.level.background.src = "./images/level/bg_forest.png";
        }
      });

      if (
        (this.player.x === adjustGrid(15) ||
          this.player.x === adjustGrid(16)) &&
        this.player.y === adjustGrid(3)
      ) {
        this.player.x = adjustGrid(0);
        this.player.y = adjustGrid(6);
        this.player.srcX = 0;
        this.player.srcY = 0;
        console.log("pick up yellow flower");
      } else if (
        (this.player.x === adjustGrid(8) || this.player.x === adjustGrid(9)) &&
        this.player.y === adjustGrid(3)
      ) {
        this.player.x = adjustGrid(18);
        this.player.y = adjustGrid(6);
        this.player.srcX = 2;
        this.player.srcY = 0;
        console.log("pick up yellow flower");
      } else if (
        this.player.x === adjustGrid(-1) &&
        this.player.y === adjustGrid(6)
      ) {
        this.player.x = adjustGrid(8);
        this.player.y = adjustGrid(4);
        this.player.srcX = 3;
        this.player.srcY = 0;
        console.log("pick up yellow flower");
      } else if (
        this.player.x === adjustGrid(19) &&
        this.player.y === adjustGrid(6)
      ) {
        this.player.x = adjustGrid(15);
        this.player.y = adjustGrid(4);
        this.player.srcX = 3;
        this.player.srcY = 0;
        console.log("pick up yellow flower");
      }
    }
    if (
      (this.player.x === adjustGrid(19) &&
        this.player.y === adjustGrid(6) &&
        this.stage == 3) ||
      (this.player.x === adjustGrid(-1) &&
        this.player.y === adjustGrid(6) &&
        this.stage == 3) ||
      ((this.player.x === adjustGrid(15) || this.player.x === adjustGrid(16)) &&
        this.player.y === adjustGrid(3) &&
        this.stage == 3) ||
      ((this.player.x === adjustGrid(8) || this.player.x === adjustGrid(9)) &&
        this.player.y === adjustGrid(3) &&
        this.stage == 3)
    ) {
      this.stage = 4;
      this.isGameRunning = true;
      this.level.background.src = "./images/level/bg_basic.png";
      this.level.foreground.src = "./images/level/fg_basic.png";
      this.player.x = adjustGrid(12);
      this.player.y = adjustGrid(13);
      this.player.blockedGrids = this.level.blockedGrids;
      this.player.srcX = 1;
      this.player.srcY = 0;
      this.counter += 30;
    }
  }

  getStageFour() {
    if (
      (this.player.x === adjustGrid(5) || this.player.x === adjustGrid(6)) &&
      this.player.y === adjustGrid(2) &&
      this.player.pressedKeys[0] == "x" &&
      this.stage === 2
    ) {
      this.egg.sprite.src = "./images/gameObjects/halloween.png";
      this.stage += 1;
      console.log(this.stage);
    }
  }

  getStageSeven() {
    if (
      (this.player.x === adjustGrid(14) ||
        this.player.x === adjustGrid(15) ||
        this.player.x === adjustGrid(16)) &&
      this.player.y === adjustGrid(2) &&
      this.player.pressedKeys[0] == "x" &&
      this.stage === 3
    ) {
      this.egg.sprite.src = "./images/gameObjects/christmas.png";
      this.stage += 1;
      console.log(this.stage);
    }
  }

  getStageEight() {
    if (
      this.player.x === adjustGrid(13) &&
      this.player.y === adjustGrid(2) &&
      this.player.pressedKeys[0] == "x" &&
      this.stage === 4
    ) {
      this.stage += 1;
      console.log(this.stage);
    }
  }

  getStageNine() {
    if (
      (this.player.x === adjustGrid(14) ||
        this.player.x === adjustGrid(15) ||
        this.player.x === adjustGrid(16)) &&
      this.player.y === adjustGrid(2) &&
      this.player.y === adjustGrid(2) &&
      this.player.pressedKeys[0] == "x" &&
      this.stage === 5
    ) {
      this.stage += 1;
      console.log(this.stage);
    }
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
