class Egg extends GameObject {
  constructor(config) {
    super(config);
    this.spawnedEggs = 0;

    this.remainingTime = 3;
    this.remainingTimeId = null;

    this.hasSpawnPoint = false;
    this.spawnPoint = [];
    this.isSpawnTop = true;
  }

  spawnRandom(ctx) {
    if (!this.hasSpawnPoint) {
      this.spawnPoint = this.getSpawnPoint();
      this.x = adjustGrid(this.spawnPoint[0]);
      this.y = adjustGrid(this.spawnPoint[1]);
      this.srcX = Math.floor(Math.random()*4)
      this.remainingTimeId = null;
      this.setLiveTime();
      this.spawnedEggs++;
    }

    if (!this.isCollected && this.remainingTime > 0) {
      this.draw(ctx);
    }
  }
  eggGrids;
  setLiveTime() {
    this.remainingTimeId = setInterval(() => {
      if (this.remainingTime > 1) {
        this.remainingTime--;
      } else {
        clearInterval(this.remainingTimeId);
        this.hasSpawnPoint = false;
        this.remainingTime = 3;
        this.x = 0;
        this.y = 0;
      }
    }, 1000);
  }

  getSpawnPoint() {
    this.hasSpawnPoint = true;
    if (this.isSpawnTop) {
      this.isSpawnTop = !this.isSpawnTop;
      return eggsTop[Math.floor(Math.random() * eggsTop.length)];
    } else {
      this.isSpawnTop = !this.isSpawnTop;
      return eggBottom[Math.floor(Math.random() * eggBottom.length)];
    }
  }
}
