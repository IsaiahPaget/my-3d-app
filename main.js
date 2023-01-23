import './style.scss'
import * as THREE from 'three'
import AppScene from './scene';

// initialize THREEJs
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    
})
const scene = new AppScene(camera);
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.render( scene, camera )


scene.initialize();

function animate() {
   
    scene.update();    
    requestAnimationFrame( animate );


    renderer.render( scene, camera )
}
animate()