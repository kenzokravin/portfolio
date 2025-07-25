import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";

import { CustomOutlinePass } from "./CustomOutlinePass.js";
import FindSurfaces from "./FindSurfaces.js";

const GUI = dat.GUI;

let model;

// Init scene
const camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000
    );
camera.position.set(0, 2, 5); 

const scene = new THREE.Scene();
 scene.background = new THREE.Color(0xf0f0f0);


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas"),
});
renderer.setSize(window.innerWidth, window.innerHeight);
// const light = new THREE.DirectionalLight(0xffffff, 1);
// scene.add(light);
// light.position.set(1.7, 1, -1);

// Set up post processing
// Create a render target that holds a depthTexture so we can use it in the outline pass
// See: https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderTarget.depthBuffer
const depthTexture = new THREE.DepthTexture();
const renderTarget = new THREE.WebGLRenderTarget(
  window.innerWidth,
  window.innerHeight,
  {
    depthTexture: depthTexture,
    depthBuffer: true,
  }
);

// Initial render pass.
const composer = new EffectComposer(renderer, renderTarget);
const pass = new RenderPass(scene, camera);
composer.addPass(pass);

// Outline pass.
const customOutline = new CustomOutlinePass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  scene,
  camera
);
composer.addPass(customOutline);

// Antialias pass.
const effectFXAA = new ShaderPass(FXAAShader);
effectFXAA.uniforms["resolution"].value.set(
  1 / window.innerWidth,
  1 / window.innerHeight
);
composer.addPass(effectFXAA);

const surfaceFinder = new FindSurfaces();
// Load model
const loader = new GLTFLoader();



loader.load('assets/SheetTable/sheetTable.gltf', function (gltf) {
  console.log("GLTF Model Loaded");

   model = gltf.scene;
   model.position.set(0,-1,0);
  model.scale.set(3, 3, 3); // Adjust scale as needed
  scene.add(model);

  
  surfaceFinder.surfaceId = 0;

  scene.traverse((node) => {
    if (node.type == "Mesh") {
      const colorsTypedArray = surfaceFinder.getSurfaceIdAttribute(node);
      node.geometry.setAttribute(
        "color",
        new THREE.BufferAttribute(colorsTypedArray, 4)
      );
    }
  });
  customOutline.updateMaxSurfaceId(surfaceFinder.surfaceId + 1);
});




// Set up orbital camera controls.
let controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// Render loop
function update() {
  requestAnimationFrame(update);
  composer.render();

  model.rotation.y += 0.005;

}
update();

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
  effectFXAA.setSize(window.innerWidth, window.innerHeight);
  customOutline.setSize(window.innerWidth, window.innerHeight);
  effectFXAA.uniforms["resolution"].value.set(
    1 / window.innerWidth,
    1 / window.innerHeight
  );
}
window.addEventListener("resize", onWindowResize, false);
