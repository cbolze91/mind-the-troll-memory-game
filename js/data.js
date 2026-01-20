// It's better to use a js object to store this information because it's cleaner
// The UI is generated from the game state
// And it's more dynamic
// because changes to the deck automatically update the board


const cards = [
  { name: "red", cardValue: "assets/images/red-gem.png" },
  { name: "blue", cardValue: "assets/images/blue-gem.png" },
  { name: "diamond", cardValue: "assets/images/diamond-gem.png" },
  { name: "green", cardValue: "assets/images/green-gem.png" },
  { name: "orange", cardValue: "assets/images/orange-gem.png" },
  { name: "purple", cardValue: "assets/images/purple-gem.png" },
];

const cardFront = "assets/images/card-front.png";