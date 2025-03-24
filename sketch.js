let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;
let outfitFont;


let pushForce = 40; // Force applied when cursor comes in contact with the letter
let repulsionDistance = 20; // Distance at which the letter starts to be pushed away
let smoothness = 0.1; // Smoothness of the push (1.0 for instant, 0 for no movement)

let targetText = "<hello, i'm angus :)>";
let currentText = [];
let letters = [];
let iterationNumberForLetter = [];
let iterationNum = 0;
let characters = "ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz0123446789!?.,[}]}/$%&*@':)<> ";
let swapSpeed = 70; // Speed of letter swaps in milliseconds
let textComplete;
let draggingLetter = null;

let colours = ['orange', 'red','purple', 'teal','white'];


let wobbleAmount = 1.2; // How much each letter wobbles
let speed = 0.08; // Speed of wobbling

let canvas;

function preload() {
 outfitFont = loadFont('assets/Outfit-Medium.ttf');
}


function setup() {
  canvas = createCanvas(windowWidth = window.innerWidth, windowHeight = window.innerHeight);
  canvas.style('z-index','-1');
  canvas.position(0,0);
  textComplete = false;
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
  background(240);

  let textSizeValue = min(windowWidth, windowHeight) * 0.08; 
  textSize(textSizeValue);
  //circle in the center with a width of 100

if(textComplete == true) {
 // for (let i = 0; i < letters.length; i++) {
//    let letter = letters[i];
 //   fill('orange');
//    text(letter.char, letter.x, letter.y);
 // }


    if(draggingLetter && draggingLetter.dragging == false) {
 //   moveBackToPosition();
    }

     // Check each letter and apply push effect if close to the cursor
  for (let i = 0; i < letters.length; i++) {
    let letter = letters[i];
    
    // Calculate the distance from the mouse to the letter
    let d = dist(mouseX, mouseY, letter.x, letter.y);
    
    // If the cursor is within the repulsion distance, push the letter away
      
    if (d < repulsionDistance) {

      /*
      letter.colour = colours[floor(random(0,colours.length-1))];
      console.log(letter.colour);
      //Can activate for colour randomization per hit.
      */

      // Calculate the direction from the letter to the mouse
      let angle = atan2(letter.y - mouseY, letter.x - mouseX);
      
      // Calculate the target position away from the mouse
      let targetX = letter.originalX + cos(angle) * pushForce;
      let targetY = letter.originalY + sin(angle) * pushForce;
      
      // Smoothly interpolate towards the target position using lerp()
      letter.x = lerp(letter.x, targetX, smoothness);
      letter.y = lerp(letter.y, targetY, smoothness);
    } else {
      // If the letter is not close to the cursor, return to its original position smoothly
      
      letter.x = lerp(letter.x, letter.originalX, smoothness);
      letter.y = lerp(letter.y, letter.originalY, smoothness);
      
    }
    
    // Draw the letter at its new position
    fill(letter.colour);
    text(letter.char, letter.x, letter.y);
    textAlign(CENTER, CENTER);
  }




} else {

  let centerX = windowWidth / 2;
  let centerY = windowHeight / 2;

  text(currentText.join(""), centerX, centerY);
  fill('orange');
}





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

function swapLetters() {
  for (let i = 0; i < targetText.length; i++) {

    if(iterationNumberForLetter[i] <= iterationNum) {
      currentText[i] = targetText[i];
      checkTextForCompletion();
    }


    if (currentText[i] !== targetText[i]) {

      iterationNum++;


      currentText[i] = randomCharacter(); // Keep swapping until it matches
    }
  }
}

function checkTextForCompletion() {
  let check = true;

  for (let i = 0; i < targetText.length; i++) {
    if (currentText[i] !== targetText[i]) {
      check = false;
    }
  }

  if(check == true && textComplete == false) {
    

    let xPos = width / 2 - textWidth(targetText) / 2;
    for (let i = 0; i < targetText.length; i++) {
      letters.push({
        char: targetText[i],
        x: xPos + textWidth(targetText.substring(0, i)) + textWidth(targetText[i]) / 2,
        y: height / 2,
        originalX: xPos + textWidth(targetText.substring(0, i)) + textWidth(targetText[i]) / 2,
        originalY: height / 2,
        dragging: false,
        colour: 'orange'
      });
    }
    textComplete = true;
    console.log(letters);
  }


}


// Function to get a random character
function randomCharacter() {
  return characters.charAt(floor(random(characters.length)));
}

function randomNumber() {
  return Math.floor(Math.random() * 150 + 1);
}

function mousePressed() {

  if(textComplete) {
   /* for (let i = 0; i < letters.length; i++) {
      let letter = letters[i];
      // Check if mouse is over the letter
      let letterWidth = textWidth(letter.char);
      if (mouseX > letter.x - letterWidth / 2 && mouseX < letter.x + letterWidth / 2 &&
          mouseY > letter.y - textSize() / 2 && mouseY < letter.y + textSize() / 2) {
        letter.dragging = true;
        draggingLetter = letter;

        console.log('Dragging letter: '+ letter.char);



        break;
      }
    }
      */
}
}

function moveBackToPosition() {



  draggingLetter.x = lerp(draggingLetter.x, draggingLetter.originalX, speed);  // Smoothly move back to original X
  draggingLetter.y = lerp(draggingLetter.y, draggingLetter.originalY, speed); 

  if(draggingLetter.x == draggingLetter.originalX && draggingLetter.y == draggingLetter.originalY) {
    draggingLetter = null;  // Stop dragging
  }
}


// Drag the letter while the mouse is pressed
function mouseDragged() {
  if (draggingLetter) {
    draggingLetter.x = mouseX;  // Update the x position of the letter
    draggingLetter.y = mouseY;  // Update the y position of the letter
  }
}

// Return the letter to its original position upon mouse release
function mouseReleased() {
  if (draggingLetter) {




    //draggingLetter.x = draggingLetter.originalX;  // Reset to original position
    //draggingLetter.y = draggingLetter.originalY;
    draggingLetter.dragging = false;
    
  }
}