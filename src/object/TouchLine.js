import * as THREE from '../libs/three';

export default class TouchLine {

    constructor(main) {
        this.main = main;

        this.realWidth = 750;
        this.realHeight = 64;

        this.width = this.main.originWidth;
        this.height = this.realHeight * this.width / this.realWidth;

        let loader = new THREE.TextureLoader();
        loader.load('src/images/touch-line.png', (texture) => {
            let geometry = new THREE.PlaneGeometry(this.width, this.height);
            let material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
            this.plane = new THREE.Mesh(geometry, material);
            this.plane.position.set(0, 0, 0);
            this.main.scene.add(this.plane)
        }, (progress) => {
            console.log((progress.loaded / progress.total * 100) + '% loaded');
        }, (error) => {
            console.error('TouchLine error: ', error);
        });
    }
}