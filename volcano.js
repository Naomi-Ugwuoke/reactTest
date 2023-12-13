import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const volcanoLoader = new GLTFLoader();

const Volcano = (scene) =>{
    volcanoLoader.load( './models/volcano.gltf', function ( gltf ) {

        // Set the scale of the loaded model
        gltf.scene.scale.set(30, 30, 30);
        gltf.scene.position.set(100, 0, -200)

        gltf.scene.castShadow = true;
        gltf.scene.receiveShadow = true;

        scene.add( gltf.scene );
        
    
    }, 
    undefined, function ( error ) {
    
        console.error( error );
    
    } );
    
}




export default Volcano;