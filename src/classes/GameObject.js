class GameObject {
  constructor(config) {
    this.srcX = config.srcX;
    this.srcY = config.srcY;
    this.sprite = new Image();
    this.sprite.src = config.src;
    this.x = config.drawX;
    this.y = config.drawY;
  }
  
}