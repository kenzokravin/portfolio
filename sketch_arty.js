let objectModel;

function preload() {
 outfitFont = loadFont('assets/Outfit-Medium.ttf');
 objectModel = loadModel('assets/sheetTable.obj', true, () => {
  console.log("Model loaded successfully!");
}, (err) => {
  console.error("Error loading model:", err);
});
}


function setup() {
  windowHeight = window.innerHeight;


  canvas = createCanvas(window.innerWidth,  window.innerHeight,WEBGL);
  canvas.style('z-index','0');
  canvas.position(0,0);
  canvas.parent('js-area');

  bgColour = color(240);
  
 
  //Initializing random letters.
 
}


function draw() {
  background(bgColour);
  document.body.style.backgroundColor = bgColour;

  orbitControl();
  model(objectModel);

}










