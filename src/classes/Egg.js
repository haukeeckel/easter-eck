class Egg extends GameObject {
  constructor(config) {
    super(config);
    this.spawnedEggs = 0;

    this.remainingTime = 2;
    this.remainingTimeId = null;

    this.hasSpawnPoint = false;
    this.spawnPoint = [];
  }

  spawnRandom(ctx) {
    if (!this.hasSpawnPoint) {
      this.spawnPoint = this.getSpawnPoint();
      this.x = adjustGrid(this.spawnPoint[0]);
      this.y = adjustGrid(this.spawnPoint[1]);
      this.remainingTimeId = null;
      this.setLiveTime();
      this.spawnedEggs++;
    }

    if (!this.isCollected && this.remainingTime > 0) {
      this.draw(ctx);
    }
  }

  setLiveTime() {
    this.remainingTimeId = setInterval(() => {
      if (this.remainingTime > 1) {
        this.remainingTime--;
      } else {
        clearInterval(this.remainingTimeId);
        this.hasSpawnPoint = false;
        this.remainingTime = 2;
        this.x = 0;
        this.y = 0;
      }
    }, 1000);
  }

  getSpawnPoint() {
    this.hasSpawnPoint = true;
    return eggGrids[Math.floor(Math.random() * eggGrids.length)];
  }
}
