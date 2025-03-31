
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


const loader = new OBJLoader();
const gltfloader = new GLTFLoader();
const rgbeLoader = new RGBELoader();
const mtlloader = new MTLLoader();
let scene, camera, renderer, model, container,environment,objMaterials,  composer;



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

    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.7;
    // renderer.outputEncoding = THREE.sRGBEncoding;

    const BrightnessContrastShader = {
        uniforms: {
            "tDiffuse": { value: null }, 
            "brightness": { value: 0.0 }, // Increase for brighter, decrease for darker
            "contrast": { value: 1.0 } // Increase for stronger contrast
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform sampler2D tDiffuse;
            uniform float brightness;
            uniform float contrast;
            varying vec2 vUv;
            
            void main() {
                vec4 color = texture2D(tDiffuse, vUv);
                color.rgb += brightness;
                color.rgb = (color.rgb - 0.5) * contrast + 0.5;
                gl_FragColor = color;
            }
        `
    };

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

    // Add lights
    // const light = new THREE.DirectionalLight(0xffffff, .5);
    // light.position.set(1, 1, 1).normalize();
    // scene.add(light);

    //const enviroLight = new THREE.AmbientLight( 0xffffff ,.1); // soft white light
   // scene.add( enviroLight );

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

    // const brightnessContrastPass = new ShaderPass(BrightnessContrastShader);
    // brightnessContrastPass.uniforms["brightness"].value = .05; // Adjust brightness
    // brightnessContrastPass.uniforms["contrast"].value = 1; // Adjust contrast
    
   // composer.addPass(brightnessContrastPass);

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
       


    });

    



    animate();





}

function animate() {
    requestAnimationFrame(animate);
    // composer.render();

    if (model) {
        model.rotation.x += 0.000;
        model.rotation.z += 0.000;
        model.rotation.y += 0.005; // Rotate for visibility
    }


     //composer.render();

   renderer.render(scene, camera);
}

init();