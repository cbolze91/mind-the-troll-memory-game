# 🧌 Mind the Troll

**Mind the Troll** is a browser-based memory matching game where the player must match pairs of magical gems to cross a bridge guarded by a hungry troll. Match all six pairs before you run out of wrong guesses — or the troll feasts.

## 🎮 How to Play

- Click two cards to flip them over  
- If the gems match, they stay revealed  
- If they don’t match, they flip back  
- You have **6 wrong guesses total**  
- Match all **6 pairs** to win the game  
- Run out of guesses, and the troll wins  

Game status, remaining guesses, and messages are displayed in the HUD above the board.

## 🚀 Getting Started

### Play the Game
👉 **Live Game:**   https://cbolze91.github.io/mind-the-troll-memory-game/

### Planning Materials
### User Stories
### A. Landing Page / UI
- As a user, I want to see the game title and story intro so I understand the stakes (the troll will eat me if I lose).
- As a user, I want to see a grid of face-down gem cards so I can start playing.
- As a user, I want to see instructions explaining how to play so I know what to do.
- As a user, I want to see the troll’s “generous offer” (win by matching gems) so the goal is clear.
- As a user, I want to see how many wrong guesses I have left so I know how close I am to being eaten.
- As a user, I want to see how many matches I’ve found so I can track my progress.
- As a user, I want a reset button so I can restart if I want another chance.
### B. Gameplay
- As a user, I want to click a card to flip it over so I can reveal a gem.
- As a user, I want to flip two cards per turn so I can try to find a matching pair.
- As a user, I want matching gem cards to stay face-up so I can remember what I’ve found.
- As a user, I want non-matching cards to flip back over after a short delay so I can try again.
- As a user, I want clicks disabled while two non-matching cards are flipping back so the game doesn’t break.
### C. Win / Loss
- As a user, I want to win when I match all gem pairs so I can escape the troll.
- As a user, I want to lose when I run out of allowed wrong guesses so the troll eats me.
- As a user, I want to see a clear win or loss message in the page so I understand the outcome immediately.

### Pseudocode
### A. Constants (the parts that do not change)
- //DEFINE constant cardValues as an array of gem symbols
- // DEFINE constant totalPairs as cardValues.length
- // DEFINE constant maxWrongGuesses (max mismatches allowed), ex: 8
### B. State Variables (game data that changes)
- // DEFINE variable cards for the shuffled deck of card objects
- // DEFINE variable firstPickIndex
- // DEFINE variable secondPickIndex
- // DEFINE variable lockBoard
- // DEFINE variable wrongGuesses
- // DEFINE variable matchesFound
- // DEFINE variable gameStatus ("playing" or "win" or "lose")
- // DEFINE variable trollMessage
### C. Cache DOM Elements (things we update on the page)
- // SELECT board element (the grid container)
- // SELECT message element (troll dialogue + win/lose message)
- // SELECT wrong guesses display element
- // SELECT matches display element
- // SELECT reset button element
### D. Event Listeners
- // ADD click event listener to board element (event delegation)
- // ADD click event listener to reset button
### E. Initialize Game State
- // CALL init()

FUNCTION init():
  - // SET gameStatus to "playing"
  - // SET firstPickIndex to null
  - // SET secondPickIndex to null
  - // SET lockBoard to false
  - // SET wrongGuesses to 0
  - // SET matchesFound to 0

  - // DUPLICATE cardValues to create pairs
  - // CREATE card objects for each value (value, faceUp, matched)
  - // SHUFFLE the deck
  - // STORE the result in cards

  - // BUILD the board in the DOM using cards
  - // SET starting troll message: "Match the gems and I’ll let you live…"
  - // CALL render()

### F. Render (state → DOM)
- // FUNCTION render():
  - // UPDATE wrong guesses left display (maxWrongGuesses - wrongGuesses)
  - // UPDATE matches display (matchesFound out of totalPairs)

  - // IF gameStatus is "playing"
    - // SET troll message based on wrong guesses remaining
  - // IF gameStatus is "win"
    - // SET message to win/escape message
  - // IF gameStatus is "lose"
    - // SET message to lose/eaten message

  - // FOR each card element on the board
    - // IF card is faceUp OR matched
      - // SHOW gem value
    - // ELSE
      - // SHOW card back

  - // IF gameStatus is "win" OR "lose"
    - // PREVENT more moves (ignore clicks OR keep lockBoard true)
### G. Handle Card Clicks
- // WHEN the user clicks on the game board
- // CHECK if a card was clicked
- // IF the click was not on a card
  - // STOP and do nothing

- // DETERMINE which card was clicked

- // IF the game status is not "playing"
  - // STOP and do nothing

- // IF the board is locked
  - // STOP and do nothing

- // IF the clicked card is already matched
  - // STOP and do nothing

- // IF the clicked card is already face-up
  - // STOP and do nothing

- // FLIP the clicked card face-up
- // UPDATE the screen

- // IF there is no first card selected yet
  - // SAVE this card as the first pick
  - // STOP and wait for the second click

- // ELSE (this is the second card selected)
- // SAVE this card as the second pick

- // IF the first card value matches the second card value
  - // MARK both cards as matched
  - // INCREASE matchesFound by 1
  - // CLEAR first pick and second pick
  - // IF matchesFound equals totalPairs
    - // SET gameStatus to "win"
  - // UPDATE the screen
  - // STOP

- // ELSE (the cards do not match)
  - // INCREASE wrongGuesses by 1

  - // IF wrongGuesses is greater than or equal to maxWrongGuesses
    - // SET gameStatus to "lose"
    - // LOCK the board
    - // UPDATE the screen
    - // STOP

  - // LOCK the board
  - // UPDATE the screen

  - // AFTER a short delay
    - // FLIP both cards back face-down
    - // CLEAR first pick and second pick
    - // UNLOCK the board
    - // UPDATE the screen
### H. Win / Loss Checks (optional helper functions)
- // FUNCTION checkWin():
  - // IF matchesFound equals totalPairs
    - // SET gameStatus to "win"

- // FUNCTION checkLoss():
  - // IF wrongGuesses is greater than or equal to maxWrongGuesses
    - // SET gameStatus to "lose"
### I. Reset Button
- // WHEN the reset button is clicked
  - // CALL init() to restart the game

## Technologies Used

- HTMl5
- CSS3 (Flexbox)
- JavaScript
- Git and GitHub

## Attributions
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background

- https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox

- https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations/Using

- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@keyframes

- https://www.youtube.com/watch?v=xWdkt6KSirw&t=408s

- https://www.youtube.com/watch?v=ZniVgo8U7ek&t=316s

 - https://www.youtube.com/watch?v=DABkhfsBAWw&t=359s


## Next Steps

- Add sound effects for win/lose
- Add backgroud music
- Add evil laugh sound effect to start of game
- Clean up card transitions
- Improve Accessibility
- Add a short intro viseo
- Add difficulty levels
