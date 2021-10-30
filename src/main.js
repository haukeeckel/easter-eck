const startGame = () => {
  const game = new Game();
  game.start();
  game.gameTimer = setInterval(() => {
    if(game.counter > 0) {
      game.counter--
      console.log(game.counter)
    } else {
      clearInterval(game.gameTimer)
      game.gameOver = true
    }
  },1000)
};

const adjustGrid = (field) => {
  return field*16
}




window.addEventListener('load', () => {

  startGame()
})