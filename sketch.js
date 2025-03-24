let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;
let outfitFont;

function preload() {
 outfitFont = loadFont('assets/Outfit-Medium.ttf');
}


function setup() {
  createCanvas(windowWidth = window.innerWidth, windowHeight = window.innerHeight);

  textFont(outfitFont);
  textAlign(CENTER, CENTER); // Align text to center both horizontally and vertically
 
}

function draw() {
  background(220);

  let textSizeValue = min(windowWidth, windowHeight) * 0.08; 
  textSize(textSizeValue);
  //circle in the center with a width of 100
circle(200,200,100);
text("Hello, World!", windowWidth / 2, windowHeight / 2);
}

function windowResized() {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  resizeCanvas(windowWidth, windowHeight);
}

