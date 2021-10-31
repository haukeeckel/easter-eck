class Player extends GameObject {
  constructor(config){
    super(config)
    this.isPlayer = true;
    this.toMove = 0;
    this.input = null;
    this.movement = {
      MoveUp: ["y", -1],
      MoveRight: ["x", 1],
      MoveDown: ["y", 1],
      MoveLeft: ["x", -1],
    };
  }
  
  move() {
    // fires every Frame
    this.moveInGrid();
    if (!this.isColliding()) {
      // if the Player is finished Moving and presses a key
      if (this.toMove === 0 && pressedKeys.length > 0) {
        // set Movement to one Grid
        this.toMove = adjustGrid(1);
        // set this.input to mapped Controls Value (main.js)
        this.input = controls[pressedKeys[0]];
        console.log();
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
      // reduce toMove by one, untill he's finished Moving
      this.toMove -= 1;
    }
  }

  // SECTION Collision
  isColliding() {
    let collides = false;

    if (pressedKeys.length > 0) {
      // Get the next aimed Axis and Value
      let testAxis = this.movement[controls[pressedKeys[0]]][0];
      let testValue = this.movement[controls[pressedKeys[0]]][1];

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
}