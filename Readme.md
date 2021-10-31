# Easter Eck


## Description
Easter Eck is a game in which the player has to catch as many as possible easter eggs, which appear randomly in a small room. Collecting an easter egg grants a small amount of bonus time and increases the score. The game ends when the time runs out.


## MVP
- game has one Player that moves to four directions in a room :heavy_check_mark:
- easter eggs appear randomly in the room
- collecting easter eggs grants a small amount of bonus time and increase score
- game ends when the time runs out :heavy_check_mark:


## Backlog
- add scoreboard
- hide as many as possible easter eggs


## Data structure

### ./src/main.js
- window.addEventListener("load", () => {})
- activateMovement()
- startGame()

### ./src/domElements.js
- querySelectors

### ./src/helper.js
- adjustGrid()
- controlls{}
- blockedGrids[]

### ./src/classes/Game.js
- Game
- constructor()
- gameLoop()
- start()

### ./src/classes/GameObject.js
- GameObject
- constructor()
  
### ./src/classes/Player.js
- Player extends GameObject
- constructor()
- move()
- moveInGrid()
- isColliding()


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
- basic game loop
  - draw background
  - draw Game Objects
  - draw Player
  - draw foreground
- Game Class
  - add timer
  - config GameOver
- Game Object Class
  - get sprites
  - set up properties
  - set up methods
- Player Class
  - set up properties
  - set up methods


## Additional Links


### Trello
[Link url](https://trello.com/b/7D6vcrSW/easter-eck)
