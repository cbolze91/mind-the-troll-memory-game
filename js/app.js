/*-------Constants-------*/

const totalMatches = cards.length;       // 6 pairs
const totalWrongGuesses = 6;             // max wrong attempts

/*----------State Variables------*/

let firstPickIdx;        // Stores the first card the user picked by index
let secondPickIdx;       // Stores the second card the user picked by index
let lockBoard;           // prevents clicking during card flip back
let wrongGuessesMade;    // How many mismatches so far
let matchesFound;        // How many pairs found so far
let gameStatus;          // "Playing" | "Won" | "Lost" prevents clicks after game ends
let shuffledDeck;         // The full deck of 12 cards, shuffled


/*--------Cached Elements-----*/

const matchesEl = document.querySelector("#matches");
const wrongGuessesLeftEl = document.querySelector("#guesses-left");
const resetBtnEl = document.querySelector("#reset-btn");
const trollMessageEl = document.querySelector("#troll-message");
const boardEl = document.querySelector("#board");


/*------------Event Listeners-------------*/

boardEl.addEventListener("click", handleBoardClick);   // Event delegation
resetBtnEl.addEventListener("click", init);

/*---------- Functions----------*/

init();

function init() {
  gameStatus = "Playing";
  lockBoard = false;
  wrongGuessesMade = 0;
  matchesFound = 0;
  firstPickIdx = null;
  secondPickIdx = null;

  shuffledDeck = shuffle(buildDeck());   // buildDeck makes 12 card objects // shuffle randomizes them  // The result is stored in shuffledDeck
  renderBoard();   // Create card divs
  render();        // Update HUD + message
}

function buildDeck() {
    //spread method to duplicate and double the cards array and .map transform the array so it has some extra properties.
  return [...cards, ...cards].map((card, idx) => {
    return {
      id: idx, // Gives each card a unique id
      name: card.name,
      cardValue: card.cardValue,
      matched: false, // Needed for game state, and prevents clicking matched cards again.
      revealed: false, // Tracks whether the card is face-up
    };
  });
}

//Fisher-Yates shuffle (shuffles an array)
function shuffle(array) {
    // loops through the array backwards starting with the last element.
  for (let i = array.length - 1; i > 0; i--) {
    //chooses.  random index (j) math.random chooses a decimal between 0 an 1, 
    // (i+1) sclaes it to i, 
    // then math. floor rounds the number DOWN to a whole number
    // so j is a randome number between 0 and i
    const j = Math.floor(Math.random() * (i + 1));
    //swaps the elements at positions i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

