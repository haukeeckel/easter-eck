# Easter Eck

[Test Game](https://haukeeckel.github.io/easter-eck/)

## Description
Easter Eck is a game in which the player has to catch as many as possible easter eggs, which appear randomly in a small room. Collecting an easter egg grants a small amount of bonus time and increases the score. The game ends when the time runs out.


## MVP
- game has one Player that moves to four directions in a room :heavy_check_mark:
- easter eggs appear randomly in the room :heavy_check_mark:
- collecting easter eggs grants a small amount of bonus time and increase score :heavy_check_mark:
- game ends when the time runs out :heavy_check_mark:


## Data structure

### ./src/init.js
- window.addEventListener("load", () => {})

### ./src/helper.js
- adjustGrid()

### ./src/classes/Game.js
- GameScreen
- constructor()
- showGameScreen()
- saveHighscore()
- startGame()
- hurryUp()
- handleGameOver()
- unmudeSound()
- initEventlistener()

### ./src/classes/Game.js
- Game
- constructor()
- gameLoop()
- collected()
- getStageOne()
- getStageTwo()
- getStageThree()
- getStageFour()
- getStageFive()
- getStageSix()
- getStageSeven()
- getStageEight()
- getStageNine()
- printMe()
- activateMovement()
- start()

### ./src/classes/Level.js
- constructor()

### ./src/classes/GameObject.js
- GameObject
- constructor()
- draw()
  
### ./src/classes/Player.js
- Player extends GameObject
- constructor()
- move()
- moveInGrid()
- isColliding()
- animate()
- validKey()
- collectEgg()
- drawEmotions()
- emotionInterval()
  
### ./src/classes/Egg.js
- Egg extends GameObject
- constructor()
- spawnRandom()
- setLiveTime()
- getSpawnPoint()

[Slides](https://docs.google.com/presentation/d/1vU__mjmmOyo2of1115_BaPXWQfEKdNAOfEuT1TiqINE/edit?usp=sharing)