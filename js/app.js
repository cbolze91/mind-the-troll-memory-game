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

