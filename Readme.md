# Easter Eck


## Description
Easter Eck is a game in which the player has to catch as many as possible easter eggs, which appear randomly in a small room. Collecting an easter egg grants a small amount of bonus time and increases the score. The game ends when the time runs out.


## MVP
- game has one Player that moves to four directions in a room
- easter eggs appear randomly in the room
- collecting easter eggs grants a small amount of bonus time and increase score
- game ends when the time runs out 


## Backlog
- add scoreboard
- hide as many as possible easter eggs


## Data structure

### ./src/main.js
- window.addEventListener("load", () => {})
- startGame()

### ./src/classes/Game.js
- Game
- constructor()
- gameLoop()
- start()



## States y States Transitions
Definition of the different states and their transition (transition functions)

- splashScreen
- gameScreen
- gameoverScreen


## Task
- HTML
  - Header
  - Game-Area
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
