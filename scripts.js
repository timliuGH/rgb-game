let numSquares = 6;   // Start on hard mode with 6 squares
let colors = [];
let targetColor;
let squares = document.querySelectorAll(".square");
let header = document.querySelector("h1");
let msg = document.querySelector("#message");
let colorDisplay = document.querySelector("#colorDisplay");
let newColorsBtn = document.querySelector("#reset");

init();

function init() {
  // Pick random colors for squares
  reset();

  // Add event listeners to squares
  for (let i = 0; i < numSquares; i++) {
    squares[i].addEventListener("click", function() {
      if (this.style.backgroundColor === targetColor)
        match();
      else
        noMatch(this);
    });
  }

  // Add functionality to "New Colors" button
  newColorsBtn.addEventListener("click", function() {
    reset();
  });

  setUpModeBtns();
}

// Add functionality to mode buttons
function setUpModeBtns() {
  let modeBtns = document.querySelectorAll(".mode");
  for (let i = 0; i < modeBtns.length; i++) {
    modeBtns[i].addEventListener("click", function() {
      // Set numSquares based on difficulty of button
      if (this.textContent === "Easy")
        numSquares = 3;
      else if (this.textContent === "Hard")
        numSquares = 6;
      // Remove styling from all buttons
      for (let j = 0; j < modeBtns.length; j++)
        modeBtns[j].classList.remove("selected");
      // Add styling to selected button
      this.classList.add("selected");
      // Reset game
      reset();
    });
  }
}

// Resets game
function reset() {
  // Get new square colors and target color
  colors = generateRandomColors(numSquares);
  targetColor = pickColor();

  // Update header
  colorDisplay.textContent = targetColor;
  header.style.backgroundColor = "steelblue";

  // Update stripe under header
  newColorsBtn.textContent = "New game";
  msg.textContent = "";

  // Update square colors
  for (let i = 0; i < squares.length; i++) {
    if (colors[i])
      squares[i].style.backgroundColor = colors[i];
    else
      squares[i].style.backgroundColor = "black";
  }
}

// Changes all squares and header to target color and displays "Correct"
function match() {
  for (let i = 0; i < numSquares; i++)
    squares[i].style.backgroundColor = targetColor;
  header.style.backgroundColor = targetColor;
  msg.textContent = "Correct!";
  newColorsBtn.textContent = "Play again?";
}

// Takes a square and fades it out and displays "Try again"
function noMatch(sq) {
  sq.style.backgroundColor = "black";
  msg.textContent = "Try again";
}

// Takes a number and returns an array of that many colors in rgb format
function generateRandomColors(num) {
  let arr = [];
  for (let i = 0; i < num; i++)
    arr.push(randomColor());
  return arr;
}

// Returns a random number in rgb format
function randomColor() {
  // Pick red, green, and blue from 0 - 255
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);

  return "rgb(" + r + ", " + g + ", " + b + ")";
}

// Selects a random color from array of colors
function pickColor() {
  return colors[Math.floor(Math.random() * numSquares)];
}
