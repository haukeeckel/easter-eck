class Egg extends GameObject {
  constructor(config) {
    super(config);
    this.remainingTime = 10;
    this.remainingTimeId = null;

    this.hasSpawnPoint = false;
    this.spawnPoint = [];

    this.isDrawn = false;
    
    this.isCollected = false;
  }

  spawnRandom(ctx) {
    if (!this.hasSpawnPoint) {
      this.spawnPoint = this.getSpawnPoint();
      this.x = adjustGrid(this.spawnPoint[0]);
      this.y = adjustGrid(this.spawnPoint[1]);
      this.setLiveTime();
    }

    if (this.remainingTime > 0) {
      this.draw(ctx);
    }
  }

  setLiveTime() {
    this.remainingTimeId = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        clearInterval(this.remainingTimeId)
        this.hasSpawnPoint = false;
        this.remainingTime = 10;
      }
      console.log(this.remainingTime);
    }, 1000);
  }

  getSpawnPoint() {
    this.hasSpawnPoint = true;
    return eggGrids[Math.floor(Math.random() * eggGrids.length)];
  }
}