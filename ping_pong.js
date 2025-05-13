
import WebGL from 'three/addons/capabilities/WebGL.js';
import * as THREE from 'three';
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
import { GLTFLoader, RGBELoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';

import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";

import { CustomOutlinePass } from "./CustomOutlinePass.js";
import FindSurfaces from "./FindSurfaces.js";

import {}


const loader = new OBJLoader();
const gltfloader = new GLTFLoader();
const rgbeLoader = new RGBELoader();
const mtlloader = new MTLLoader();
let scene, camera, renderer, model, container,environment,objMaterials,  composer, sound;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();








const depthTexture = new THREE.DepthTexture();

const renderTarget = new THREE.WebGLRenderTarget(
    window.innerWidth,
    window.innerHeight,
    {
      depthTexture: depthTexture,
      depthBuffer: true,
    }
  );

  

function init() {
    // Create the scene
    
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0); // Background color


    // Create the camera
    camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000
    );
    camera.position.set(0, 2, 5); // Adjust camera position

    container = document.getElementById( 'header-container' );

    const listener = new THREE.AudioListener();
    camera.add(listener);

    sound = new THREE.Audio(listener);

    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('sounds/ping.mp3', (buffer) => {
        sound.setBuffer(buffer);
        sound.setLoop(false);
        sound.setVolume(0.5);
       // sound.play();
      });

    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.7;
    // renderer.outputEncoding = THREE.sRGBEncoding;

   

    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera,renderer.domElement);
    controls.panSpeed = 2;
    controls.target.set( 0, 1, 0 );
    controls.maxPolarAngle = THREE.MathUtils.degToRad( 90 );
    controls.maxDistance = 80;
    controls.minDistance = 1;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.update();


    rgbeLoader.load('assets/brown_photostudio_02_2k.hdr', function (texture) {
        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;

        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = envMap;

        //render();
       
        // texture.dispose();
        // pmremGenerator.dispose();


        gltfloader.load('assets/SheetTable/sheetTable.gltf', function (gltf) {
            console.log("GLTF Model Loaded");
        
            model = gltf.scene;
            model.scale.set(3, 3, 3); // Adjust scale as needed

            model.castShadow = true;
            model.receiveShadow = true;

            scene.add(model);
    
    
        });


    });


    console.log("materials: " + objMaterials);

   

    const renderTarget = new THREE.WebGLRenderTarget(
    window.innerWidth,
    window.innerHeight,
    {
        depthTexture: depthTexture,
        depthBuffer: true,
    }
    );

    // Initial render pass.
     composer = new EffectComposer(renderer, renderTarget);
    const pass = new RenderPass(scene, camera);
    composer.addPass(pass);


    composer.addPass(new RenderPass(scene, camera));


    

    animate();





}

function animate() {
    requestAnimationFrame(animate);
    // composer.render();

    if (model) {
        model.rotation.x += 0.000;
        model.rotation.z += 0.000;
        model.rotation.y += 0.000; // Rotate for visibility
    }


     //composer.render();

   renderer.render(scene, camera);
}





init();

