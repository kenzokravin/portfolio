let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;
let outfitFont;

let targetText = "<hello, i'm angus :)>";
let currentText = [];
let iterationNumberForLetter = [];
let iterationNum = 0;
let characters = "ABCEFHIJKLMNOPQSUXYZabcefghijlmnoprstuwxyz0124679!?.,[}]}/$%&*@':)<> ";
let swapSpeed = 50; // Speed of letter swaps in milliseconds

function preload() {
 outfitFont = loadFont('assets/Outfit-Medium.ttf');
}


function setup() {
  createCanvas(windowWidth = window.innerWidth, windowHeight = window.innerHeight);

  textFont(outfitFont);
  textAlign(CENTER, CENTER); // Align text to center both horizontally and vertically
 
  //Initializing random letters.
  for (let i = 0; i < targetText.length; i++) {
    currentText[i] = randomCharacter();
    iterationNumberForLetter[i] = randomNumber();
  }

  setInterval(swapLetters, swapSpeed);
}

function draw() {
  background(220);

  let textSizeValue = min(windowWidth, windowHeight) * 0.08; 
  textSize(textSizeValue);
  //circle in the center with a width of 100

text(currentText.join(""), windowWidth / 2, windowHeight / 2);
}

function windowResized() {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  resizeCanvas(windowWidth, windowHeight);
}

function swapLetters() {
  for (let i = 0; i < targetText.length; i++) {

    if(iterationNumberForLetter[i] <= iterationNum) {
      currentText[i] = targetText[i];
    }


    if (currentText[i] !== targetText[i]) {

      iterationNum++;


      currentText[i] = randomCharacter(); // Keep swapping until it matches
    }
  }
}

// Function to get a random character
function randomCharacter() {
  return characters.charAt(floor(random(characters.length)));
}

function randomNumber() {
  return Math.floor(Math.random() * 150 + 1);
}

