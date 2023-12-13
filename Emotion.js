import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const emotionLoader = new GLTFLoader();

const Emotion = (scene) =>{
    emotionLoader.load( './models/happyFace.gltf', function ( gltf ) {

        // Set the scale of the loaded model
        gltf.scene.scale.set(5, 5, 5);
        gltf.scene.position.set(0, 5, 0)

        scene.add( gltf.scene );
        
    
    }, 
    undefined, function ( error ) {
    
        console.error( error );
    
    } );
    
}




export default Emotion;