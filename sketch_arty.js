let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;
let outfitFont;




let canvas;
let bgColour;

function preload() {
 outfitFont = loadFont('assets/Outfit-Medium.ttf');
}


function setup() {
  canvas = createCanvas(windowWidth = window.innerWidth, windowHeight = window.innerHeight);
  canvas.style('z-index','0');
  canvas.position(0,0);
  canvas.parent('js-area');

  bgColour = color(240);
  
 
  //Initializing random letters.
  for (let i = 0; i < targetText.length; i++) {
    currentText[i] = randomCharacter();
    iterationNumberForLetter[i] = randomNumber();
  }

  setInterval(swapLetters, swapSpeed);
}


function draw() {
  background(bgColour);
  document.body.style.backgroundColor = bgColour;




}


function reCenterText() {

  for (let i = 0; i < targetText.length; i++) {

    let xPos = windowWidth / 2 - textWidth(targetText) / 2;
    letters[i].originalX = xPos + textWidth(targetText.substring(0, i)) + textWidth(targetText[i]) / 2;

    letters[i].originalY = height / 2;

  }

}



function windowResized() {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  resizeCanvas(windowWidth, windowHeight);
  reCenterText();
}






