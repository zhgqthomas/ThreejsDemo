import * as THREE from './libs/three';
import {canvas} from "./adapter/window";

const Context = canvas.getContext('webgl');

export default class Main {
    constructor() {
        this.context = Context;
        this.width = window.innerWidth;
        this.heigth = window.innerHeight;
        this.devicePixelRatio = window.devicePixelRatio;
        this.viewCenter = new THREE.Vector3(0, 0, 0);

        this.initRender();
        this.initCamera();
        this.initScene();
        this.initLight();
        this.initObject();
        this.render();
    }

    initRender() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas: this.context,
        });
        this.renderer.setSize(this.width, this.heigth);
        this.renderer.setPixelRatio(this.devicePixelRatio);
        this.renderer.setClearColor(0xFFFFFF, 1.0);
        canvas.width = this.width * this.devicePixelRatio;
        canvas.heigth = this.heigth * this.devicePixelRatio;
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(45, this.width / this.heigth, 1, 1500);
        this.camera.position.set(0, 0, 300 / this.camera.aspect);
        this.camera.up.set(0, 1, 0);
        this.camera.lookAt(this.viewCenter);
    }

    initScene() {
        this.scene = new THREE.Scene();
    }

    initLight() {
        this.light = new THREE.AmbientLight(0xfefefe);
        this.scene.add(this.light);
    }

    initObject() {

    }

    render() {
        this.renderer.clear();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this), canvas);
    }
}