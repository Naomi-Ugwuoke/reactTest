import { render } from 'react-dom';
import * as THREE from 'three';
import "./style.css";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// Scene
const scene = new THREE.Scene();

// Create a sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
    color: '#00ff83',
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Light
const light = new THREE.PointLight(0xffffff, 100, 100);
light.position.set(0, 10, 10);
scene.add(light);

//Window size
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

// Camera
const camera = new THREE.PerspectiveCamera(45,  sizes.width / sizes.height);
camera.position.z = 20;
scene.add(camera);

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setClearColor('#000000') //background color
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Perform any animations or updates here

    renderer.render(scene, camera);
}

animate();

//orbit controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;



//Resize window:
window.addEventListener('resize', () => {
    //update size 
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    //update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height); 
});

const loop = () =>{
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
}
loop();