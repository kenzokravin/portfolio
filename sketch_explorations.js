let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;
let outfitFont;


let pushForce = 40; // Force applied when cursor comes in contact with the letter
let repulsionDistance = 30; // Distance at which the letter starts to be pushed away
let smoothness = 0.1; // Smoothness of the push (1.0 for instant, 0 for no movement)

let targetText = "explorations";
let letters = [];
let iterationNumberForLetter = [];
let iterationNum = 0;
let characters = "ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz0123446789!?.,[}]}/$%&*@':)<> ";
let swapSpeed = 70; // Speed of letter swaps in milliseconds
let textComplete;
let draggingLetter = null;
let yOffset = 0;

let colours = ['orange', 'red','purple', 'teal','white'];

let randomBufferHeight = 200;
let randomBufferWidth = 100;

let canvas;
let bgColour;

function preload() {
 outfitFont = loadFont('assets/Outfit-Medium.ttf');
}


function setup() {
  canvas = createCanvas(windowWidth = window.innerWidth, windowHeight = (window.innerHeight*0.75));
  canvas.style('z-index','0');
  canvas.position(0,0);
  canvas.parent('js-area');


  bgColour = color(240);
  
  textComplete = false;
  textFont(outfitFont);
  
  generateText();
 

}


function draw() {
  background(bgColour);
  document.body.style.backgroundColor = bgColour;






  for(let i=0; i<letters.length; i++) {

    let letter = letters[i];
    fill(letter.colour);
    noStroke();
    circle(letter.x, letter.y, letter.r);
    
    fill(bgColour);
    textSize(letter.tSize);
    textAlign(CENTER, CENTER);
  text(letter.char, letter.x, letter.y);

  quad


  if(i < letters.length -1) {
    let radiusDistance = (letter.r*0.5) + (letters[i+1].r*0.5);
  letter.x = lerp(letter.x, (letters[i+1].x - radiusDistance), smoothness);
  letter.y = lerp(letter.y, letters[i+1].y, smoothness);
  }

  }

  

}



function generateText() {

    randomCanvasPosition();

}


function randomCanvasPosition() {

    let textSectionSize = (windowWidth-randomBufferWidth)/ targetText.length;

    for (let i = 0; i < targetText.length; i++) {

        let xPos = random() * ((textSectionSize*(i+1)) - (randomBufferWidth + (textSectionSize*i))) + (randomBufferWidth + (textSectionSize*i));
  

        let yPos = random() * ((windowHeight-randomBufferHeight) - (0 + randomBufferHeight)) + randomBufferHeight;

        let circleRadius = random() * (130-60) + 60;

        let fontSize = circleRadius * (random() * (1-0.5) + 0.5);
    
    
        letters.push({
            char: targetText[i],
            x: xPos,
            y: yPos,
            colour: "#FF291E",
            r: circleRadius,
            tSize: fontSize
          });
    
      }


}

function windowResized() {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  resizeCanvas(windowWidth, windowHeight);

}


