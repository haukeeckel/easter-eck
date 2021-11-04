// Game
class Game {
  constructor(canvas) {
    // ---------------------------------------------------------
    // Canvas
    // ---------------------------------------------------------
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    // ---------------------------------------------------------
    // Score Board
    // ---------------------------------------------------------
    this.score = 0;
    this.gameDate = Date.now();
    // ---------------------------------------------------------
    // Gameloop and End
    // ---------------------------------------------------------
    this.animationId = null;
    this.gameOver = false;
    this.gameTimer = null;
    this.isGameRunning = true;
    this.counter = 45;
    // ---------------------------------------------------------
    // FPS
    // ---------------------------------------------------------
    this.fps = 60;
    this.now = null;
    this.then = Date.now();
    this.interval = 1000 / this.fps;
    this.delta = null;
    // ---------------------------------------------------------
    // Level
    // ---------------------------------------------------------
    this.level = new Level();
    this.stage = 0;
    this.isClicked = false;
    this.myClick = {};
    // ---------------------------------------------------------
    // Audio
    // ---------------------------------------------------------
    this.hintSound = new Audio("./music/hint.wav");
    this.hintSound.muted = true;
    this.hintSound.volume = 0.8;
    this.stageSound = new Audio("./music/stage.wav");
    this.stageSound.muted = true;
    this.stageSound.volume = 0.8;
    this.collectSound = new Audio("./music/collect.wav");
    this.collectSound.muted = true;
    this.collectSound.volume = 0.8;
    this.footstepSound = new Audio("./music/footstep.wav");
    this.footstepSound.muted = true;
    this.footstepSound.volume = 0.015;
    // ---------------------------------------------------------
    // Game Objects
    // ---------------------------------------------------------
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
      this.now = Date.now();
      this.delta = this.now - this.then;
      // Recursion
      this.animationId = requestAnimationFrame(() => {
        animation();
      });

      if (this.delta > this.interval) {
        this.then = this.now - (this.delta % this.interval);
        // ---------------------------------------------------------
        // Clear Canvas
        // ---------------------------------------------------------
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // ---------------------------------------------------------
        // Drawings
        // ---------------------------------------------------------
        // Background
        this.ctx.drawImage(this.level.background, 0, 0);
        // Eggs
        if (this.isGameRunning) {
          this.egg.spawnRandom(this.ctx);
        }
        // Player
        this.player.move();
        this.player.draw(this.ctx);
        // Collectibles
        if (this.player.collectEgg(this.egg.x, this.egg.y, this.ctx)) {
          this.collected();
        }
        // Foreground
        this.ctx.drawImage(this.level.foreground, 0, 0);
        // Emotions
        this.player.drawEmotions(this.ctx);
        // Easter Eggs
        this.getStageOne();
        this.getStageTwo();
        this.getStageThree();
        this.getStageFour();
        this.getStageFive();
        this.getStageSix();
        this.getStageSeven();
        this.getStageEight();
        this.getStageNine();
        // DOM
        score.innerText = `Score: ${this.score}`;
        timer.innerText = `${this.counter} sec`;
      }
    };
    animation();
  }

  collected() {
    if (this.stage != 2) {
      clearInterval(this.egg.remainingTimeId);
      this.player.emotion.src = "./images/character/collect.png";
      this.egg.remainingTime = 3;
      this.egg.hasSpawnPoint = false;
      this.collectSound.play();
      this.score++;
      this.counter += 1;
    }
  }
  // ---------------------------------------------------------
  // Stage1
  // ---------------------------------------------------------
  getStageOne() {
    if (
      (this.player.x === adjustGrid(9) || this.player.x === adjustGrid(10)) &&
      this.player.y === adjustGrid(9) &&
      this.stage === 0
    ) {
      this.hintSound.play();
    }

    if (
      (this.player.x === adjustGrid(9) || this.player.x === adjustGrid(10)) &&
      this.player.y === adjustGrid(9) &&
      this.stage === 0 &&
      this.player.pressedKeys[0] == "x"
    ) {
      this.stageSound.play();
      this.stage += 1;
    }
  }
  // ---------------------------------------------------------
  // Stage2
  // ---------------------------------------------------------
  getStageTwo() {
    if (
      (this.player.x === adjustGrid(11) ||
        this.player.x === adjustGrid(12) ||
        this.player.x === adjustGrid(13)) &&
      (this.player.y === adjustGrid(12) || this.player.y === adjustGrid(13)) &&
      this.stage === 1
    ) {
      this.hintSound.play();
    }
    if (
      (this.player.x === adjustGrid(11) ||
        this.player.x === adjustGrid(12) ||
        this.player.x === adjustGrid(13)) &&
      this.player.y === adjustGrid(14) &&
      this.stage === 1
    ) {
      this.stageSound.play();
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
  // ---------------------------------------------------------
  // Stage3
  // ---------------------------------------------------------
  getStageThree() {
    if (this.stage === 2) {
      this.canvas.addEventListener("mousedown", (event) => {
        this.myClick = event;
        this.isClicked = true;
      });

      if (this.isClicked) {
        const canvasLeft = this.canvas.offsetLeft + this.canvas.clientLeft;
        const canvasTop = this.canvas.offsetTop + this.canvas.clientTop;
        let canvasX = this.myClick.pageX - canvasLeft;
        let canvasY = this.myClick.pageY - canvasTop;

        if (
          this.stage != 3 &&
          canvasX >= 145 &&
          canvasX <= 255 &&
          canvasY >= 515 &&
          canvasY <= 550
        ) {
          this.level.background.src = "./images/level/bg_forest_hint.png";
        } else if (
          this.level.background.src.includes("hint") &&
          this.stage != 3 &&
          canvasX >= 430 &&
          canvasX <= 540 &&
          canvasY >= 320 &&
          canvasY <= 385
        ) {
          this.level.background.src = "./images/level/bg_forest_final.png";
          this.stage = 3;
          this.stageSound.play();
        } else if (this.stage === 3) {
          this.level.background.src = "./images/level/bg_forest_final.png";
        } else {
          this.level.background.src = "./images/level/bg_forest.png";
        }
      }

      if (
        (this.player.x === adjustGrid(15) ||
          this.player.x === adjustGrid(16)) &&
        this.player.y === adjustGrid(3)
      ) {
        this.player.x = adjustGrid(0);
        this.player.y = adjustGrid(6);
        this.player.srcX = 0;
        this.player.srcY = 0;
        this.hintSound.play();
        console.log("pick up yellow flower");
      } else if (
        (this.player.x === adjustGrid(8) || this.player.x === adjustGrid(9)) &&
        this.player.y === adjustGrid(3)
      ) {
        this.hintSound.play();
        this.player.x = adjustGrid(18);
        this.player.y = adjustGrid(6);
        this.player.srcX = 2;
        this.player.srcY = 0;
        console.log("pick up yellow flower");
      } else if (
        this.player.x === adjustGrid(-1) &&
        this.player.y === adjustGrid(6)
      ) {
        this.hintSound.play();
        this.player.x = adjustGrid(8);
        this.player.y = adjustGrid(4);
        this.player.srcX = 3;
        this.player.srcY = 0;
        console.log("pick up yellow flower");
      } else if (
        this.player.x === adjustGrid(19) &&
        this.player.y === adjustGrid(6)
      ) {
        this.hintSound.play();
        this.player.x = adjustGrid(15);
        this.player.y = adjustGrid(4);
        this.player.srcX = 3;
        this.player.srcY = 0;
        console.log("pick up yellow flower");
      }
    }
  }
  // ---------------------------------------------------------
  // Stage4
  // ---------------------------------------------------------
  getStageFour() {
    if (this.stage === 3) {
      if (
        (this.player.x === adjustGrid(19) && this.player.y === adjustGrid(6)) ||
        (this.player.x === adjustGrid(-1) && this.player.y === adjustGrid(6)) ||
        ((this.player.x === adjustGrid(15) ||
          this.player.x === adjustGrid(16)) &&
          this.player.y === adjustGrid(3)) ||
        ((this.player.x === adjustGrid(8) || this.player.x === adjustGrid(9)) &&
          this.player.y === adjustGrid(3))
      ) {
        this.stageSound.play();
        this.stage = 4;
        this.isGameRunning = true;
        // TODO HALLOWEEN INTERIOR
        this.level.background.src = "./images/level/bg_basic_halloween.png";
        this.level.foreground.src = "./images/level/fg_basic_halloween.png";
        this.egg.sprite.src = "./images/gameObjects/halloween.png";
        this.player.x = adjustGrid(12);
        this.player.y = adjustGrid(13);
        this.level.blockedGrids.push(
          [11, 14],
          [12, 14],
          [13, 14],
          [8, 4],
          [9, 9],
          [10, 9]
        );
        this.player.blockedGrids = this.level.blockedGrids;
        this.player.srcX = 1;
        this.player.srcY = 0;
        this.counter += 15;
      }
    }
  }
  // ---------------------------------------------------------
  // Stage5
  // ---------------------------------------------------------
  getStageFive() {
    if (
      (this.player.x === adjustGrid(5) || this.player.x === adjustGrid(6)) &&
      this.player.y === adjustGrid(2) &&
      this.stage === 4
    ) {
      this.hintSound.play();
    }
    if (
      (this.player.x === adjustGrid(5) || this.player.x === adjustGrid(6)) &&
      this.player.y === adjustGrid(2) &&
      this.player.pressedKeys[0] == "x" &&
      this.stage === 4
    ) {
      this.stageSound.play();
      this.stage += 1;
      // TODO WITHOUT CABINET
      this.level.background.src =
        "./images/level/bg_basic_halloween_finished.png";
      this.level.blockedGrids.splice(0, 2);
      this.player.blockedGrids = this.level.blockedGrids;
    }
  }
  // ---------------------------------------------------------
  // Stage6
  // ---------------------------------------------------------
  getStageSix() {
    if (
      this.player.x === adjustGrid(6) &&
      this.player.y === adjustGrid(1) &&
      this.stage === 5
    ) {
      this.stageSound.play();
      this.stage += 1;
      this.egg.spawnedEggs--;
      this.egg.x = this.canvas.height;
      this.isGameRunning = false;
      this.level.background.src = "./images/level/bg_portal.png";
      this.level.foreground.src = "./images/level/fg_portal.png";
      this.player.x = adjustGrid(9);
      this.player.y = adjustGrid(5);
      this.player.blockedGrids = this.level.portalGrids;
    }
  }
  // ---------------------------------------------------------
  // Stage7
  // ---------------------------------------------------------
  getStageSeven() {
    if (
      this.player.x === adjustGrid(9) &&
      this.player.y === adjustGrid(7) &&
      this.stage === 6
    ) {
      this.hintSound.play();
    }
    if (
      this.player.x === adjustGrid(9) &&
      this.player.y === adjustGrid(7) &&
      this.stage === 6 &&
      this.player.pressedKeys[0] == "x"
    ) {
      this.stageSound.play();
      this.stage += 1;
    }
  }
  // ---------------------------------------------------------
  // Stage8
  // ---------------------------------------------------------
  getStageEight() {
    if (
      this.player.x === adjustGrid(9) &&
      this.player.y === adjustGrid(4) &&
      this.stage === 7
    ) {
      this.stage += 1;
      // TODO WITHOUT CABINET
      this.stageSound.play();
      this.isGameRunning = true;
      this.level.background.src = "./images/level/bg_portal_finished.png";
      this.level.foreground.src = "./images/level/fg_basic_halloween.png";
      this.egg.sprite.src = "./images/gameObjects/halloween.png";
      this.player.x = adjustGrid(6);
      this.player.y = adjustGrid(1);
      this.level.blockedGrids.push([6, 0]);
      this.player.blockedGrids = this.level.blockedGrids;
      this.player.srcX = 3;
      this.player.srcY = 0;
      this.counter += 15;
    }
  }
  // ---------------------------------------------------------
  // Stage9
  // ---------------------------------------------------------
  getStageNine() {
    if (
      (this.player.x === adjustGrid(14) ||
        this.player.x === adjustGrid(15) ||
        this.player.x === adjustGrid(16)) &&
      this.player.y === adjustGrid(2) &&
      this.player.y === adjustGrid(2) &&
      this.stage === 8
    ) {
      this.hintSound.play();
    }
    if (
      (this.player.x === adjustGrid(14) ||
        this.player.x === adjustGrid(15) ||
        this.player.x === adjustGrid(16)) &&
      this.player.y === adjustGrid(2) &&
      this.player.y === adjustGrid(2) &&
      this.player.pressedKeys[0] == "x" &&
      this.stage === 8
    ) {
      this.stageSound.play();
      this.stage += 1;
      this.printMe();
    }
  }
  // ---------------------------------------------------------
  // Cherry on Top
  // ---------------------------------------------------------
  printMe() {
    let me = [
      GameScreen.toString(),
      Game.toString(),
      Level.toString(),
      GameObject.toString(),
      Player.toString(),
      Egg.toString(),
      adjustGrid.toString(),
    ];
    me.forEach((element) => {
      console.log(element);
    });
  }
  // ---------------------------------------------------------
  // Movement
  // ---------------------------------------------------------
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
  // ---------------------------------------------------------
  // Start
  // ---------------------------------------------------------
  start() {
    this.activateMovement();
    this.gameLoop();
  }
}
