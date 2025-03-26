
import WebGL from 'three/addons/capabilities/WebGL.js';
import * as THREE from 'three';
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
import { GLTFLoader, RGBELoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GroundedSkybox } from 'three/addons/objects/GroundedSkybox.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';


const loader = new OBJLoader();
const rgbeLoader = new RGBELoader();
let scene, camera, renderer, model, container,environment;



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

    // Create the renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);


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

        scene.environment = envMap;
       
        texture.dispose();
        pmremGenerator.dispose();

        // Create a reflective material
        const material = new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            metalness: 1,
            roughness: 0.2,
            envMap: scene.environment
        });

        //const geometry = new THREE.BoxGeometry(1, 1, 1);
       // model = new THREE.Mesh(geometry, material);
       // scene.add(model);
    });

    // Add lights
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    const enviroLight = new THREE.AmbientLight( 0xffffff ,.8); // soft white light
    scene.add( enviroLight );

    // Load the OBJ model
  
    loader.load(
        'assets/sheetTable.obj', // Ensure correct path
        (object) => {
            model = object;

            const material = new THREE.MeshStandardMaterial({
                color: 0xFFFFFF,
                metalness: 1,
                roughness: 0.2,
                envMap: scene.environment
            });

            object.traverse((child) => {
                if (child.isMesh) {
                    child.material = material;
                }
            });
    
            model.scale.set(3, 3, 3); // Adjust scale
            scene.add(model);
            console.log("Model loaded successfully!");
        },
        (xhr) => {
            console.log(`Loading: ${(xhr.loaded / xhr.total) * 100}%`);
        },
        (error) => {
            console.error("Error loading model:", error);
        }
    );

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    



    animate();





}

function animate() {
    requestAnimationFrame(animate);
    

    if (model) {
        model.rotation.x += 0.000;
        model.rotation.z += 0.000;
        model.rotation.y += 0.005; // Rotate for visibility
    }

    renderer.render(scene, camera);
}

init();