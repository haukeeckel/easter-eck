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


starter.addEventListener("click", () => {
  let config = {
    name: playerNameInput.value,
  };

  // TODO
  splashScreen.style.display = "none";
  gameArea.style.display = "block";
  gameStatus.style.display = "flex";
  playerName.innerText = config.name;

  starter.style.display = "none";
  playerNameInput.style.display = "none";

  startGame();
});
// !SECTION
