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


window.addEventListener("load", () => {
  startGame();
});
