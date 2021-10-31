class Player extends GameObject {
  constructor(config) {
    super(config);
    this.isPlayer = true;
    this.toMove = 0;
    this.viewDirection = {
      MoveUp: [
        [0, 1],
        [3, 0],
        [3, 1],
        [3, 2],
        [3, 3],
        [3, 4],
        [3, 5],
        [0, 1],
      ],
      MoveRight: [
        [0, 0],
        [4, 0],
        [4, 1],
        [4, 2],
        [4, 3],
        [4, 4],
        [4, 5],
        [0, 0],
      ],
      MoveDown: [
        [0, 3],
        [1, 0],
        [1, 1],
        [1, 2],
        [1, 3],
        [1, 4],
        [1, 5],
        [0, 3],
      ],
      MoveLeft: [
        [0, 2],
        [2, 0],
        [2, 1],
        [2, 2],
        [2, 3],
        [2, 4],
        [2, 5],
        [0, 1],
      ],
    };
    this.input = null;
    this.movement = {
      MoveUp: ["y", -2],
      MoveRight: ["x", 2],
      MoveDown: ["y", 2],
      MoveLeft: ["x", -2],
    };
  }

  move() {
    // fires every Frame
    this.moveInGrid();
    if (!this.isColliding()) {
      // if the Player is finished Moving and presses a key
      if (this.toMove === 0 && this.validKey()) {
        // set Movement to one Grid
        this.toMove = adjustGrid(1);
        // set this.input to mapped Controls Value (main.js)
        this.input = controls[pressedKeys[0]];
        // set this.srcX /srcY to view direction
        console.log(this.toMove);
      }
    }
  }

  // drawing to Grid
  moveInGrid() {
    // if the Player has toMove, change this.x/y by 1/-1
    if (this.toMove > 0) {
      const axis = this.movement[this.input][0];
      const value = this.movement[this.input][1];
      // this.x or this.y + 1 or +-1
      this[axis] += value;
      if (this.toMove > 14) {
        this.srcX = this.viewDirection[this.input][0][1];
        this.srcY = this.viewDirection[this.input][0][0] * 2;
      } else if (this.toMove > 12) {
        this.srcX = this.viewDirection[this.input][1][1];
        this.srcY = this.viewDirection[this.input][1][0] * 2;
      } else if (this.toMove > 10) {
        this.srcX = this.viewDirection[this.input][2][1];
        this.srcY = this.viewDirection[this.input][2][0] * 2;
      } else if (this.toMove > 8) {
        this.srcX = this.viewDirection[this.input][3][1];
        this.srcY = this.viewDirection[this.input][3][0] * 2;
      } else if (this.toMove > 6) {
        this.srcX = this.viewDirection[this.input][4][1];
        this.srcY = this.viewDirection[this.input][4][0] * 2;
      } else if (this.toMove > 4) {
        this.srcX = this.viewDirection[this.input][5][1];
        this.srcY = this.viewDirection[this.input][5][0] * 2;
      } else if (this.toMove > 2) {
        this.srcX = this.viewDirection[this.input][6][1];
        this.srcY = this.viewDirection[this.input][6][0] * 2;
      } else {
        this.srcX = this.viewDirection[this.input][0][1];
        this.srcY = this.viewDirection[this.input][0][0] * 2;
      }
      // reduce toMove by one, untill he's finished Moving
      this.toMove -= 2;
    }
  }

  // SECTION Collision
  isColliding() {
    let collides = false;

    if (this.validKey()) {
      // Get the next aimed Axis and Value
      let testAxis = this.movement[controls[pressedKeys[0]]][0];
      let testValue = this.movement[controls[pressedKeys[0]]][1] / 2;

      if (testAxis == "x") {
        let newX = this.x / 16 + testValue;
        let newY = this.y / 16;
        // Loop though all blocked Grids
        blockedGrids.forEach((elem) => {
          if (elem[0] == newX && elem[1] == newY) {
            // If the Grid is blocked:
            collides = true;
          }
        });
      } else {
        let newY = this.y / 16 + testValue;
        let newX = this.x / 16;
        // Loop though all blocked Grids
        blockedGrids.forEach((elem) => {
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
    return controllsArray.includes(pressedKeys[0]);
  }
}
