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
      [10, 14],
      [14, 14],
      [10, 15],
      [14, 15],
      [11, 16],
      [12, 16],
      [13, 16],
      [14, 13],
      [15, 13],
      [16, 13],
      [17, 13],
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 7],
      [1, 9],
      [1, 11],
      [1, 12],
      [2, 9],
      [2, 11],
      [2, 12],
      [3, 3],
      [3, 7],
      [3, 9],
      [4, 3],
      [4, 7],
      [4, 9],
      [5, 1],
      [5, 7],
      [5, 9],
      [6, 1],
      [6, 9],
      [7, 1],
      [7, 9],
      [8, 1],
      [9, 1],
      [10, 4],
      [11, 4],
      [12, 4],
      [13, 1],
      [14, 1],
      [14, 5],
      [14, 10],
      [15, 1],
      [15, 5],
      [15, 10],
      [16, 1],
      [16, 5],
      [16, 10],
      [17, 1],
      [17, 2],
      [17, 5],
      [17, 6],
      [17, 7],
      [17, 8],
      [17, 10],
    ];
  }
}
