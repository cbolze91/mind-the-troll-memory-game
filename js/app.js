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

//Updates HUD
function render() {
    // String() converts whatever is inside it into a string.
  matchesEl.textContent = String(matchesFound);

  const wrongLeft = totalWrongGuesses - wrongGuessesMade;
  wrongGuessesLeftEl.textContent = String(wrongLeft);

  trollMessageEl.textContent = getTrollMessage();
}

function getTrollMessage() {
  if (gameStatus === "Won") return "You matched all the gems. The troll lets you pass. 🧌✨";
  if (gameStatus === "Lost") return "No guesses left... the troll feasts. 🧌🍽";

  const wrongLeft = totalWrongGuesses - wrongGuessesMade;

  if (wrongLeft === totalWrongGuesses) return "Flip two cards. Match 6 pairs to cross the bridge. You have 6 wrong guesses before the troll eats you.";
  if (wrongLeft <= 2) return "Careful… the troll is getting hungry.";
  return `Choose wisely. You have ${wrongLeft} wrong guesses left.`;
}

function renderBoard() {

    // Deletes evrycard currently on the board so you can create a new shuffled deck
  while (boardEl.firstChild) {
     boardEl.removeChild(boardEl.firstChild);
  }

  //loops through the shuffledDeck object
  shuffledDeck.forEach((card, index) => {
    // creates a button element in HTML for each card 
    const cardEl = document.createElement("button");
    // Button attribute so it behaves as a button
    cardEl.type = "button";
    //Adds the class card so the cards can be styled
    cardEl.classList.add("card");
    // dataset is an object that creates data attribues in HTML.
    // The index is used to find the card object in sheffledDeck
    // Use String b/c dataset values are stored as strings in HTML.
    cardEl.dataset.index = String(index);
    // aria-label for accessibility
    cardEl.setAttribute("aria-label", "Face down card");

    // face-down by default
    // sets inline css on the element
    cardEl.style.backgroundImage = `url("${cardFront}")`;

    // Use appendChild to put the element onto the page.
    boardEl.appendChild(cardEl);
  });
}

function handleBoardClick(evt) {

    // First block invalid situations 
    // if the game status is not playing, don't allow clicks
  if (gameStatus !== "Playing") return;
  // if lockBoard === true, don't allow clicks
  if (lockBoard) return;

  // Next find the click 
  // Using .closest() ensures the correct element is clicked 
  const cardEl = evt.target.closest(".card");
  // Ensures that if anything else on the board is clicked nothing happens
  if (!cardEl) return;

  //Number is a javascript built in function that allows us to turn the index into a number
  //insetad of a string and then store it in a variable called idx.
  const idx = Number(cardEl.dataset.index);
  // Use that index to grab the corresponding card object fromt the shuffled deck.
  const cardObj = shuffledDeck[idx];


// So far we have clicked a .card elemnt in the DOM.
// retrieved the data-index string
// turned the data-index into a number to store it as idx,
// then retrieved the card data


  // Next, ignore clicks on matched or already revealed cards
  if (cardObj.matched) return;
  if (cardObj.revealed) return;

  // Then reveal the card- defined function below
  revealCard(idx);

  // if the variable firstPickIdx is null
  if (firstPickIdx === null) {
    // change it to the clicked idx
    firstPickIdx = idx;
    // Then update the HUD
    render();
    return;
  }

  // prevent picking the same card twice
  if (idx === firstPickIdx) return;

// Second card click
  secondPickIdx = idx;
  lockBoard = true;

  // Check to see if the cards match- function defined below
  checkForMatch();
}

// After the card is clicked- show it as face-up
// 1. Mark card as revealed
// 2. Find the card element
// 3. Show the card image
function revealCard(idx) {
    // get the clicked card object and mark it as revealed
  shuffledDeck[idx].revealed = true;
  // Selexts the card element on the page that corresponds th this index
  const cardEl = getCardElByIndex(idx);
  // Sets inline css for the card face image
  // so when its clicked this image will be revealed
  cardEl.style.backgroundImage = `url("${shuffledDeck[idx].cardValue}")`;
// Set aria-label for accessibility
  cardEl.setAttribute(
    "aria-label",
    `Revealed ${shuffledDeck[idx].name} gem`
  );
}

// Will be called to flip cards back if not matched
function hideCard(idx) {
  shuffledDeck[idx].revealed = false;
  const cardEl = getCardElByIndex(idx);
  cardEl.style.backgroundImage = `url("${cardFront}")`;
  cardEl.setAttribute("aria-label", "Face down card");
}

// Finds the card in the board that has that specific index- built dynamically
function getCardElByIndex(idx) {
    // the template literal builds from the card class, and the data-set attribute
    // then uses the selected index
  return boardEl.querySelector(`.card[data-index="${idx}"]`);
}

