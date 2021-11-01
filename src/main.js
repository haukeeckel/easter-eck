const startGame = () => {
  const game = new Game();
  game.start();
  activateMovement();

  game.gameTimer = setInterval(() => {
    if (game.isGameRunning && game.counter > 1) {
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
    const key = e.key;
    if (!pressedKeys.includes(key)) {
      pressedKeys.unshift(key);
    }
  });

  document.addEventListener("keyup", (e) => {
    const key = e.key;
    if (pressedKeys.includes(key)) {
      pressedKeys.splice(pressedKeys.indexOf(key), 1);
    }
  });
};

starter.addEventListener("click", () => {
  let config = {
    name: playerNameInput.value,
  };

  splashScreen.style.display = "none";
  gameArea.style.display = "block";
  gameStatus.style.display = "flex";
  playerName.innerText = config.name;

  startGame();
});

restarter.addEventListener("click", () => {
  let config = {
    name: playerNameInput.value,
  };
  gameOverScreen.style.display = "none";
  gameArea.style.display = "block";
  gameStatus.style.display = "flex";
  playerName.innerText = config.name;

  startGame();
});

quit.addEventListener("click", () => {
  let config = {
    name: playerNameInput.value,
  };
  gameOverScreen.style.display = "none";
  splashScreen.style.display = "flex";
});
// !SECTION
