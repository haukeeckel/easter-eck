# Easter Eck

Test [Game](https://haukeeckel.github.io/easter-eck/)

## Description
Easter Eck is a game in which the player has to catch as many as possible easter eggs, which appear randomly in a small room. Collecting an easter egg grants a small amount of bonus time and increases the score. The game ends when the time runs out.


## MVP
- game has one Player that moves to four directions in a room :heavy_check_mark:
- easter eggs appear randomly in the room :heavy_check_mark:
- collecting easter eggs grants a small amount of bonus time and increase score :heavy_check_mark:
- game ends when the time runs out :heavy_check_mark:


## Backlog
- add animation
- add scoreboard
- hide as many as possible easter eggs


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


## States y States Transitions
Definition of the different states and their transition (transition functions)

- splashScreen
- gameScreen
- gameoverScreen


## Task
- HTML
  - Header
  - Splash Screen
  - Game-Area
  - Game Over Screen
- CSS
  - basic styles
- basic game loop :heavy_check_mark:
  - draw background :heavy_check_mark:
  - draw Game Objects 
  - draw Player :heavy_check_mark:
  - draw Egg :heavy_check_mark:
  - draw foreground :heavy_check_mark:
- Game Class
  - add timer :heavy_check_mark:
  - config GameOver :heavy_check_mark:
- Game Object Class
  - get sprites
  - set up properties
  - set up methods
- Player Class :heavy_check_mark:
  - set up properties :heavy_check_mark:
  - set up methods :heavy_check_mark:
- Egg Class :heavy_check_mark:
  - set up properties :heavy_check_mark:
  - set up methods :heavy_check_mark:


## Additional Links

