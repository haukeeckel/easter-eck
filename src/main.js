const startGame = () => {
  const game = new Game();
  game.start();

  activateMovement();

  game.gameTimer = setInterval(() => {
    if (game.counter > 0) {
      game.counter--;
      // console.log(game.counter)
    } else {
      clearInterval(game.gameTimer);
      game.gameOver = true;
    }
  }, 1000);
};

// SECTION Helper
// helper for 16x16 Images
const adjustGrid = (field) => {
  return field * 16;
};
// !SECTION


// SECTION Movement
// SECTION Controls
// Mapping 
const controls = {
  ArrowUp: "MoveUp",
  ArrowRight: "MoveRight",
  ArrowDown: "MoveDown",
  ArrowLeft: "MoveLeft",
};
// !SECTION

// SECTION Eventlistener
const pressedKeys = [];

const activateMovement = () => {
  document.addEventListener("keydown", (e) => {
    const key = e.code;
    if (!pressedKeys.includes(key)) {
      pressedKeys.unshift(key);
    }
  });

  document.addEventListener("keyup", (e) => {
    const key = e.code;
    if (pressedKeys.includes(key)) {
      pressedKeys.splice(pressedKeys.indexOf(key), 1);
    }
  });
};
// !SECTION 
// !SECTION 

const blockedGrids = [
//[x,y]
// Wall left
  [0,1],
  [0,2],
  [0,3],
  [0,4],
  [0,5],
  [0,6],
  [0,7],
  [0,8],
  [0,9],
  [0,10],
  [0,11],
  [0,12],
// Wall top
  [1,0],
  [2,0],
  [3,0],
  [4,0],
  [5,0],
  [6,0],
  [7,0],
  [8,0],
  [9,0],
  [10,1],
  [10,2],
  [10,3],
  [11,3],
  [12,1],
  [12,2],
  [12,3],
  [13,0],
  [14,0],
  [15,0],
  [16,0],
  [17,0],
// Wall right
  [18,1],
  [18,2],
  [18,3],
  [18,4],
  [18,5],
  [18,6],
  [18,7],
  [18,8],
  [18,9],
  [18,10],
  [18,11],
  [18,12],
// Wall middle 
  [1,8],
  [2,8],
  [3,8],
  [4,8],
  [5,8],
  [6,8],
  [7,8],
  [8,8],
  [9,8],
  [10,8],
  [14,9],
  [15,9],
  [16,9],
  [17,9],
// Wall bottom
  [1,13],
  [2,13],
  [3,13],
  [4,13],
  [5,13],
  [6,13],
  [7,13],
  [8,13],
  [9,13],
  [10,13],
  [14,13],
  [15,13],
  [16,13],
  [17,13],
]


window.addEventListener("load", () => {
  startGame();
});
