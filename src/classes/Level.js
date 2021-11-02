class Level {
  constructor() {
    this.background = new Image();
    this.background.src = "./images/level/bg_basic.png";

    this.foreground = new Image();
    this.foreground.src = "./images/level/fg_basic.png";

    this.blockedGrids = [
      //[x,y]
      // Wall left
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
      [0, 8],
      [0, 9],
      [0, 10],
      [0, 11],
      [0, 12],
      // Wall top
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0],
      [7, 0],
      [8, 0],
      [9, 0],
      [10, 1],
      [10, 2],
      [10, 3],
      [11, 3],
      [12, 1],
      [12, 2],
      [12, 3],
      [13, 0],
      [14, 0],
      [15, 0],
      [16, 0],
      [17, 0],
      // Wall right
      [18, 1],
      [18, 2],
      [18, 3],
      [18, 4],
      [18, 5],
      [18, 6],
      [18, 7],
      [18, 8],
      [18, 9],
      [18, 10],
      [18, 11],
      [18, 12],
      // Wall middle
      [1, 8],
      [2, 8],
      [3, 8],
      [4, 8],
      [5, 8],
      [6, 8],
      [7, 8],
      [8, 8],
      [9, 8],
      [10, 8],
      [14, 9],
      [15, 9],
      [16, 9],
      [17, 9],
      // Wall bottom
      [1, 13],
      [2, 13],
      [3, 13],
      [4, 13],
      [5, 13],
      [6, 13],
      [7, 13],
      [8, 13],
      [9, 13],
      [10, 13],
      [11, 16],
      [12, 17],
      [13, 18],
      [14, 13],
      [15, 13],
      [16, 13],
      [17, 13],
    ];
  }
}
