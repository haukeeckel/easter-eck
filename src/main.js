const startGame = () => {
  const game = new Game();

  game.start();
};

const adjustGrid = (field) => {
  return field*16
}


window.addEventListener('load', () => {

  startGame()
})