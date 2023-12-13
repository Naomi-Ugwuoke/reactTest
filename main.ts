import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";



// CAMERA
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1500);
camera.position.set(-35, 70, 100);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// WINDOW RESIZE HANDLING
export function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

// SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5);

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);

export function animate() {
  dragObject();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

// ambient light
let hemiLight = new THREE.AmbientLight(0xffffff, 0.20);
scene.add(hemiLight);

// Add directional light
let dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(-30, 50, -30);
scene.add(dirLight);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
dirLight.shadow.camera.left = -70;
dirLight.shadow.camera.right = 70;
dirLight.shadow.camera.top = 70;
dirLight.shadow.camera.bottom = -70;

function createFloor() {
  let pos = { x: 0, y: -1, z: 3 };
  let scale = { x: 100, y: 2, z: 100 };

  let blockPlane = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshPhongMaterial({ color: 0xf9c834 }));
  blockPlane.position.set(pos.x, pos.y, pos.z);
  blockPlane.scale.set(scale.x, scale.y, scale.z);
  blockPlane.castShadow = true;
  blockPlane.receiveShadow = true;
  scene.add(blockPlane);

  blockPlane.userData.ground = true;
}

// box
function createBox() {
  let scale = { x: 6, y: 6, z: 6 };
  let pos = { x: 15, y: scale.y / 2, z: 15 };

  let box = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshPhongMaterial({ color: 0xDC143C }));
  box.position.set(pos.x, pos.y, pos.z);
  box.scale.set(scale.x, scale.y, scale.z);
  box.castShadow = true;
  box.receiveShadow = true;
  scene.add(box);

  box.userData.draggable = true;
  box.userData.name = 'BOX';
}

function createSphere() {
  let radius = 4;
  let pos = { x: 15, y: radius, z: -15 };

  let sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 32), new THREE.MeshPhongMaterial({ color: 0x43a1f4 }));
  sphere.position.set(pos.x, pos.y, pos.z);
  sphere.castShadow = true;
  sphere.receiveShadow = true;
  scene.add(sphere);

  sphere.userData.draggable = true;
  sphere.userData.name = 'SPHERE';
}

function createCylinder() {
  let radius = 4;
  let height = 6;
  let pos = { x: -15, y: height / 2, z: 15 };

  let cylinder = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 32), new THREE.MeshPhongMaterial({ color: 0x90ee90 }));
  cylinder.position.set(pos.x, pos.y, pos.z);
  cylinder.castShadow = true;
  cylinder.receiveShadow = true;
  scene.add(cylinder);

  cylinder.userData.draggable = true;
  cylinder.userData.name = 'CYLINDER';
}

function createEmotion() {
  const objLoader = new GLTFLoader();

  objLoader.load( './models/happyFace.gltf', function ( gltf ) {
    const emotion = gltf.scene;

    emotion.position.x = -15;
    emotion.position.y = 5;
    emotion.position.z = -15;

    emotion.scale.x = 5;
    emotion.scale.y = 5;
    emotion.scale.z = 5;

    emotion.castShadow = true;
    emotion.receiveShadow = true;

    //mark object as draggable
    emotion.userData.draggable = true;
    emotion.userData.name = 'CASTLE';

    scene.add(emotion);
  });
}

const raycaster = new THREE.Raycaster(); // create once
const clickMouse = new THREE.Vector2();  // create once
const moveMouse = new THREE.Vector2();   // create once
var draggable: THREE.Object3D;

// function intersect(pos) {
//   raycaster.setFromCamera(pos, camera);
//   return raycaster.intersectObjects(scene.children);
// }

window.addEventListener('click', (event) => {
  if (draggable) {
    console.log('dropping draggable ${draggable.userData.name');
    draggable = null as any;
    return;
  }

  // THREE RAYCASTER
  clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(clickMouse, camera);
  const found = raycaster.intersectObjects(scene.children);
  if (found.length > 0 && found[0].object.userData.draggable) {
      draggable = found[0].object
      console.log('found draggable ${draggable.userData.name}')
    
  }
})

//track the movement of the mouse
window.addEventListener('mousemove', event => {
  moveMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  moveMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

//to drag the object
function dragObject() {
  if (draggable != null) {
    raycaster.setFromCamera(moveMouse, camera);
    const found = raycaster.intersectObjects(scene.children);
    if (found.length > 0) {
      for (let o of found) {
        if (o.object.userData.ground)
          continue
          
        
//         let target = found[i].point;
          draggable.position.x = o.point.x
          draggable.position.z = o.point.z
      }
    }
  }
}


createFloor()
createBox()
createSphere()
createCylinder()
createEmotion()
animate()
  