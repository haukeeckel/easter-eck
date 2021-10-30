class GameObject {
  constructor(config) {
    this.isPlayer = config.isPlayer || false;

    this.srcX = config.srcX;
    this.srcY = config.srcY;
    this.sprite = new Image();
    this.sprite.src = config.src;
    this.x = config.drawX;
    this.y = config.drawY;

    this.toMove = 0;
    this.input = null;
    this.movement = {
      MoveUp: [ "y", -1 ],
      MoveRight: [ "x", 1 ],
      MoveDown: [ "y", 1 ],
      MoveLeft: [ "x", -1 ],
    }
  }
  
  // SECTION Movement
  // Update drawing 
  move() {
    // fires every Frame
    this.moveInGrid()

    // if the Player is finished Moving and presses a key
    if (this.toMove === 0 && pressedKeys.length > 0) {
      // set Movement to one Grid
      this.toMove = adjustGrid(1);
      // set this.input to mapped Controls Value (main.js)
      this.input = controls[pressedKeys[0]];
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
    // !SECTION
}
