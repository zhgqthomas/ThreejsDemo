import * as THREE from '../libs/three';

export default class TouchLine {

    constructor(main) {
        this.main = main;

        this.originalWidth = 750;
        this.originalHeight = 64;

        this.measureWidth = this.main.originWidth;
        this.measureHeight = this.originalHeight * this.measureWidth / this.originalWidth;

        let loader = new THREE.TextureLoader();
        loader.load('src/images/touch-line.png', (texture) => {
            let geometry = new THREE.PlaneGeometry(this.measureWidth, this.measureHeight);
            let material = new THREE.MeshBasicMaterial({map: texture, transparent: true});
            this.plane = new THREE.Mesh(geometry, material);
            this.plane.position.set(0, 0, 0);
            this.main.scene.add(this.plane)
        }, (progress) => {
            console.log((progress.loaded / progress.total * 100) + '% loaded');
        }, (error) => {
            console.error('TouchLine error: ', error);
        });

        this.width = window.innerWidth;
        this.height = this.width * this.originalHeight / this.originalWidth;

        let left = 0;
        let top = (window.innerHeight - this.height) / 2;
        this.rect = {
            left,
            right: left + this.width,
            top,
            bottom: top + this.height,
        }
    }

    isHover({clientX, clientY}) {
        return clientX >= this.rect.left &&
            clientX <= this.rect.right &&
            clientY >= this.rect.top &&
            clientY <= this.rect.bottom;
    }

    enable = () => {
        this.isActive = true;
    };

    disable = () => {
        this.isActive = false;
    };

    move = ({ clientY }) => {

    }
}