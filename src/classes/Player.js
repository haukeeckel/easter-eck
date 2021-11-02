class Player extends GameObject {
  constructor(config) {
    super(config);
    this.isPlayer = true;
    this.footstepSound = config.footstepSound;
    this.toMove = 0;
    this.pressedKeys = [];
    this.pressedKey = null;
    this.controls = {
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
      this.srcX = this.controls[this.pressedKey].facing[1];
      this.srcY = this.controls[this.pressedKey].facing[0];
    }
    this.moveInGrid();
  }

  // drawing to Grid
  moveInGrid() {
    // if the Player has toMove, change this.x/y by 1/-1
    if (this.toMove > 0) {
      const axis = this.controls[this.pressedKey].movement[0];
      const value = this.controls[this.pressedKey].movement[1];

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
      this.srcX = this.controls[this.pressedKey].animations[0][1];
      this.srcY = this.controls[this.pressedKey].animations[0][0] * 2;
    } else if (this.toMove > 12) {
      this.srcX = this.controls[this.pressedKey].animations[1][1];
      this.srcY = this.controls[this.pressedKey].animations[1][0] * 2;
    } else if (this.toMove > 10) {
      this.srcX = this.controls[this.pressedKey].animations[2][1];
      this.srcY = this.controls[this.pressedKey].animations[2][0] * 2;
    } else if (this.toMove > 8) {
      this.srcX = this.controls[this.pressedKey].animations[3][1];
      this.srcY = this.controls[this.pressedKey].animations[3][0] * 2;
    } else if (this.toMove > 6) {
      this.srcX = this.controls[this.pressedKey].animations[4][1];
      this.srcY = this.controls[this.pressedKey].animations[4][0] * 2;
    } else if (this.toMove > 4) {
      this.srcX = this.controls[this.pressedKey].animations[5][1];
      this.srcY = this.controls[this.pressedKey].animations[5][0] * 2;
    } else if (this.toMove > 2) {
      this.srcX = this.controls[this.pressedKey].animations[6][1];
      this.srcY = this.controls[this.pressedKey].animations[6][0] * 2;
    } else {
      this.srcX = this.controls[this.pressedKey].animations[0][1];
      this.srcY = this.controls[this.pressedKey].animations[0][0] * 2;
    }
  }

  // SECTION Collision
  isColliding() {
    let collides = false;

    if (this.validKey()) {
      // Get the next aimed Axis and Value
      let testAxis = this.controls[this.pressedKey].movement[0];
      let testValue = this.controls[this.pressedKey].movement[1] / 2;

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
      return true;
    }
  }

  validKey() {
    return Object.keys(this.controls).includes(this.pressedKey);
  }
}
