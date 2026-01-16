
/*-------Constants-------*/

const cards = [
    { name: "red", cardValue: "../assets/images/red-gem.png", },
    { name: "blue", cardValue: "../assets/images/blue-gem.png" },
    { name: "diamond", cardValue: "../assets/images/diamond-gem.png" },
    { name: "green", cardValue: "../assets/images/green-gem.png" },
    { name: "orange", cardValue: "../assets/images/orange-gem.png"},
    { name: "purple", cardValue: "../assets/images/purple-gem.png"},
];

const cardFront = "../assets/images/card-front.png";

const totalMatches = cards.length;

const totalWrongGuesses = 6;


/*----------State Variables------*/

let firstPickIdx;

let secondPickIdx;

let lockBoard;

let trollMessage;

let wrongGuessesMade;

let matchesFound;

let gameStatus;

let shuffledDeck;

/*--------Cached Elements-----*/

const matchesEl = document.querySelector(".matches");

const wrongGuessesLeftEl = document.querySelector(".guesses-left");

const resetBtnEl = document.querySelector(".reset-btn");

const trollMessageEl = document.querySelector(".message");

const boardEl = document.querySelector("#board");

const cardEl = document.querySelector(".card");


/*------------Event Listeners-------------*/

boardEl.addEventListener("click, handleBoardClick");

resetBtnEl.addEventListener("click", init);



