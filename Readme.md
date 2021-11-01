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

### ./src/main.js
- window.addEventListener("load", () => {})
- activateMovement()
- startGame()
- EventListener

### ./src/domElements.js
- querySelectors

### ./src/helper.js
- adjustGrid()
- controlls{}
- blockedGrids[]
- eggGrids[]

### ./src/classes/Game.js
- Game
- constructor()
- gameLoop()
- collected()
- handleGameOver()
- start()

### ./src/classes/GameObject.js
- GameObject
- constructor()
- draw()
- collectEgg()
  
### ./src/classes/Player.js
- Player extends GameObject
- constructor()
- move()
- moveInGrid()
- isColliding()
  
### ./src/classes/Egg.js
- Egg extends GameObject
- constructor()
- spawnRandom()
- setLiveTime()
- getSpawnPoint()

