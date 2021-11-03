class Egg extends GameObject {
  constructor(config) {
    super(config);
    this.spawnedEggs = 0;
    this.remainingTime = 3;
    this.remainingTimeId = null;
    // ---------------------------------------------------------
    // Appearance
    // ---------------------------------------------------------
    this.hasSpawnPoint = false;
    this.spawnPoint = [];
    this.isSpawnTop = true;
    this.spawnPointsTop = [
      [2, 5],
      [6, 4],
      [7, 2],
      [10, 5],
      [15, 3],
      [16, 6],
    ];
    this.spawnPointsBottom = [
      //[x,y]
      [3, 11],
      [7, 10],
      [11, 9],
      [12, 7],
      [12, 13],
      [14, 11],
    ];
  }

  spawnRandom(ctx) {
    if (!this.hasSpawnPoint) {
      this.spawnPoint = this.getSpawnPoint();
      this.x = adjustGrid(this.spawnPoint[0]);
      this.y = adjustGrid(this.spawnPoint[1]);
      this.srcX = Math.floor(Math.random() * 4);
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
      return this.spawnPointsTop[
        Math.floor(Math.random() * this.spawnPointsTop.length)
      ];
    } else {
      this.isSpawnTop = !this.isSpawnTop;
      return this.spawnPointsBottom[
        Math.floor(Math.random() * this.spawnPointsBottom.length)
      ];
    }
  }
}
