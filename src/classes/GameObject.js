class GameObject {
  constructor(config) {
    // ---------------------------------------------------------
    // Drawings
    // ---------------------------------------------------------
    this.sprite = new Image();
    this.sprite.src = config.src;
    this.srcX = config.srcX;
    this.srcY = config.srcY;
    this.x = config.drawX;
    this.y = config.drawY;
  }

  draw(ctx) {
    ctx.drawImage(
      this.sprite,
      adjustGrid(this.srcX),
      adjustGrid(this.srcY),
      adjustGrid(1),
      adjustGrid(2),
      this.x,
      this.y,
      adjustGrid(1),
      adjustGrid(2)
    );
  }
}
