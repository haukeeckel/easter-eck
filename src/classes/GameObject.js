class GameObject {
  constructor(config) {
    this.srcX = config.srcX;
    this.srcY = config.srcY;
    this.sprite = new Image();
    this.sprite.src = config.src;
    this.x = config.drawX;
    this.y = config.drawY;
  }

  draw(ctx) {
    ctx.drawImage(
      this.sprite,
      adjustGrid(this.srcX),
      adjustGrid(this.srcY),
      adjustGrid(1), // TODO animation
      adjustGrid(2), // TODO animation
      this.x,
      this.y,
      adjustGrid(1),
      adjustGrid(2)
    );
  }
}
