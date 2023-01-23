import * as THREE from 'three'
import Player from './player'

const pointLight = new THREE.PointLight(0xffffff)
const ambientLight = new THREE.AmbientLight(0x85dddd)
const gridHelper = new THREE.GridHelper(200, 50);
const lightHelper = new THREE.PointLightHelper(pointLight);
const loader = new GLTFLoader();

const player = new Player();
const playerSpeed = 0.2; // set the speed at which the object moves

export default class AppScene extends THREE.Scene {
    constructor(camera) {
        super()
        this.camera = camera;
    }
    
    async initialize() {
        pointLight.position.set(20,20,20)
        this.add( pointLight, ambientLight )

        this.add( player.model );
        player.model.position.set(0,1,0)
        console.log("🚀 ~ file: scene.js:27 ~ AppScene ~ initialize ~ playerModel", player.model.position)

        this.add(lightHelper, gridHelper)

        this.camera.position.set(10,10,10)
        console.log("🚀 ~ file: scene.js:31 ~ AppScene ~ initialize ~ this.camera.position", this.camera.position)
        

    }

    movePlayer(player, camera) {

        if (player.state.moveForward === true) forward()
        if (player.state.moveBackward === true) backward()
        if (player.state.moveRight === true) right()
        if (player.state.moveLeft === true) left()
        if (player.state.moveUp === true) up()
        if (player.state.moveDown === true) down()
        
        
        function forward() {
            let vector = new THREE.Vector3();
            vector.subVectors( player.model.position, camera.position );
            vector.normalize();
            player.model.position.addScaledVector(vector, playerSpeed);
            camera.position.addScaledVector(vector, playerSpeed)
        }
        function backward() {
            let vector = new THREE.Vector3();
            vector.subVectors(  camera.position, player.model.position );
            vector.normalize();
            player.model.position.addScaledVector(vector, playerSpeed);
            camera.position.addScaledVector(vector, playerSpeed);
        }
        function right() {
            let forward = new THREE.Vector3();
            forward.subVectors( player.model.position, camera.position );
            forward.normalize();

            let up = new THREE.Vector3(0, 1, 0);
            
            let vector = new THREE.Vector3();
            vector.crossVectors(  forward, up );
            vector.normalize();
            player.model.position.addScaledVector(vector, playerSpeed);
        }
        function left() {
            let forward = new THREE.Vector3();
            forward.subVectors( player.model.position, camera.position );
            forward.normalize();

            let up = new THREE.Vector3(0, 1, 0);

            let vector = new THREE.Vector3();
            vector.crossVectors(  up, forward );
            vector.normalize();
            player.model.position.addScaledVector(vector, playerSpeed);
        }
        function up() {
            let vector = new THREE.Vector3(0, 1, 0);
            player.model.position.addScaledVector(vector, playerSpeed)
        }
        function down() {
            let vector = new THREE.Vector3(0, -1, 0);
            player.model.position.addScaledVector(vector, playerSpeed)
        }
    }
    
    update() {
        this.camera.lookAt(player.model.position)

        this.movePlayer(player, this.camera)
    }

    
}