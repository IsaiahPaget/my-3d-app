import * as THREE from 'three'

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshStandardMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometry, material );

export default class Player {
    constructor() {
        this.model = cube

        this.moveForward = false
        this.moveBackward = false
        this.moveLeft = false
        this.moveRight = false
        this.moveUp = false
        this.moveDown = false

        this.onKeyDown = function ( event ) {

			switch ( event.code ) {

				case 'ArrowUp':
				case 'KeyW': this.moveForward = true; break;

				case 'ArrowLeft':
				case 'KeyA': this.moveLeft = true; break;

				case 'ArrowDown':
				case 'KeyS': this.moveBackward = true; break;

				case 'ArrowRight':
				case 'KeyD': this.moveRight = true; break;

				case 'Space': this.moveUp = true; break;
				case 'ControlLeft': this.moveDown = true; break;

			}

		};

		this.onKeyUp = function ( event ) {

			switch ( event.code ) {

				case 'ArrowUp':
				case 'KeyW': this.moveForward = false; break;

				case 'ArrowLeft':
				case 'KeyA': this.moveLeft = false; break;

				case 'ArrowDown':
				case 'KeyS': this.moveBackward = false; break;

				case 'ArrowRight':
				case 'KeyD': this.moveRight = false; break;

				case 'Space': this.moveUp = false; break;
				case 'ControlLeft': this.moveDown = false; break;

			}

		};
        
        const _onKeyDown = this.onKeyDown.bind( this );
        const _onKeyUp = this.onKeyUp.bind( this );
    
        window.addEventListener( 'keydown', _onKeyDown );
        window.addEventListener( 'keyup', _onKeyUp );
    }
    get state() {
        return {
            moveForward: this.moveForward,
            moveBackward: this.moveBackward,
            moveLeft: this.moveLeft,
            moveRight: this.moveRight,
            moveUp: this.moveUp,
            moveDown: this.moveDown,
        }
    }

}


