class Player extends GameObject {
  constructor(config) {
    super(config);
    this.isPlayer = true;

    this.footstepSound = config.footstepSound;

    this.emotion = new Image();
    this.emotion.src = null;
    this.emotionId = null;
    this.emotionReady = false;
    this.emotionCounter = 1;

    this.toMove = 0;
    this.pressedKeys = [];
    this.pressedKey = null;
    this.controlls = {
      ArrowUp: {
        animations: [
          [0, 1],
          [3, 0],
          [3, 1],
          [3, 2],
          [3, 3],
          [3, 4],
          [3, 5],
          [0, 1],
        ],
        movement: ["y", -2],
        facing: [0, 1],
      },
      ArrowRight: {
        animations: [
          [0, 0],
          [4, 0],
          [4, 1],
          [4, 2],
          [4, 3],
          [4, 4],
          [4, 5],
          [0, 0],
        ],
        movement: ["x", 2],
        facing: [0, 0],
      },
      ArrowDown: {
        animations: [
          [0, 3],
          [1, 0],
          [1, 1],
          [1, 2],
          [1, 3],
          [1, 4],
          [1, 5],
          [0, 3],
        ],
        movement: ["y", 2],
        facing: [0, 3],
      },
      ArrowLeft: {
        animations: [
          [0, 2],
          [2, 0],
          [2, 1],
          [2, 2],
          [2, 3],
          [2, 4],
          [2, 5],
          [0, 2],
        ],
        movement: ["x", -2],
        facing: [0, 2],
      },
    };
    this.blockedGrids = config.blockedGrids;
  }

  move() {
    if (this.toMove === 0 && !this.pressedKeys.lenght) {
      this.pressedKey = this.pressedKeys[0];
    }
    // fires every Frame
    if (!this.isColliding()) {
      // if the Player is finished Moving and presses a key
      if (this.toMove === 0 && this.validKey()) {
        // set Movement to one Grid
        this.toMove = adjustGrid(1);
        this.footstepSound.play();
      }
    } else {
      this.srcX = this.controlls[this.pressedKey].facing[1];
      this.srcY = this.controlls[this.pressedKey].facing[0];
    }
    this.moveInGrid();
  }

  // drawing to Grid
  moveInGrid() {
    // if the Player has toMove, change this.x/y by 1/-1
    if (this.toMove > 0) {
      const axis = this.controlls[this.pressedKey].movement[0];
      const value = this.controlls[this.pressedKey].movement[1];

      // this.x or this.y + 1 or +-1
      this[axis] += value;
      this.animate();
      // reduce toMove by one, untill he's finished Moving
      this.toMove -= 2;
    } else {
      this.pressedKey = null;
    }
  }

  animate() {
    if (this.toMove > 14) {
      this.srcX = this.controlls[this.pressedKey].animations[0][1];
      this.srcY = this.controlls[this.pressedKey].animations[0][0] * 2;
    } else if (this.toMove > 12) {
      this.srcX = this.controlls[this.pressedKey].animations[1][1];
      this.srcY = this.controlls[this.pressedKey].animations[1][0] * 2;
    } else if (this.toMove > 10) {
      this.srcX = this.controlls[this.pressedKey].animations[2][1];
      this.srcY = this.controlls[this.pressedKey].animations[2][0] * 2;
    } else if (this.toMove > 8) {
      this.srcX = this.controlls[this.pressedKey].animations[3][1];
      this.srcY = this.controlls[this.pressedKey].animations[3][0] * 2;
    } else if (this.toMove > 6) {
      this.srcX = this.controlls[this.pressedKey].animations[4][1];
      this.srcY = this.controlls[this.pressedKey].animations[4][0] * 2;
    } else if (this.toMove > 4) {
      this.srcX = this.controlls[this.pressedKey].animations[5][1];
      this.srcY = this.controlls[this.pressedKey].animations[5][0] * 2;
    } else if (this.toMove > 2) {
      this.srcX = this.controlls[this.pressedKey].animations[6][1];
      this.srcY = this.controlls[this.pressedKey].animations[6][0] * 2;
    } else {
      this.srcX = this.controlls[this.pressedKey].animations[0][1];
      this.srcY = this.controlls[this.pressedKey].animations[0][0] * 2;
    }
  }

  // SECTION Collision
  isColliding() {
    let collides = false;

    if (this.validKey()) {
      // Get the next aimed Axis and Value
      let testAxis = this.controlls[this.pressedKey].movement[0];
      let testValue = this.controlls[this.pressedKey].movement[1] / 2;

      if (testAxis == "x") {
        let newX = this.x / 16 + testValue;
        let newY = this.y / 16;
        // Loop though all blocked Grids
        this.blockedGrids.forEach((elem) => {
          if (elem[0] == newX && elem[1] == newY) {
            // If the Grid is blocked:
            collides = true;
          }
        });
      } else {
        let newY = this.y / 16 + testValue;
        let newX = this.x / 16;
        // Loop though all blocked Grids
        this.blockedGrids.forEach((elem) => {
          if (elem[0] == newX && elem[1] == newY) {
            // If the Grid is blocked:
            collides = true;
          }
        });
      }
    }

    return collides;
  }

  collectEgg(eggX, eggY) {
    if (eggX == this.x && eggY == this.y) {
      this.emotionReady = true;
      clearInterval(this.emotionId);
      this.emotionInterval();

      return true;
    }
  }

  drawEmotions(ctx) {
    if (this.emotionCounter > 0) {
      if (this.emotionReady === true) {
        ctx.drawImage(
          this.emotion,
          0,
          0,
          adjustGrid(1),
          adjustGrid(1),
          this.x,
          this.y - 7,
          adjustGrid(1),
          adjustGrid(1)
        );
      }
    } else {
      clearInterval(this.emotionId);
      this.emotionCounter = 1;
      this.emotionReady = false;
    }
  }

  emotionInterval() {
    if (this.emotionCounter > 0) {
      this.emotionId = setInterval(() => {
        this.emotionCounter--;
        console.log(this.emotionCounter);
      }, 1000);
    }
  }

  validKey() {
    return Object.keys(this.controlls).includes(this.pressedKey);
  }
}
