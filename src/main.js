import * as THREE from './libs/three';
import BasicRubik from './object/Rubik';
import TouchLine from './object/TouchLine';

require('./libs/OrbitControls');

const Context = canvas.getContext('webgl');

export default class Main {
    constructor() {
        this.context = Context;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.devicePixelRatio = window.devicePixelRatio;
        this.viewCenter = new THREE.Vector3(0, 0, 0);
        this.minPercent = 0.25;
        this.maxPercent = 1 - this.minPercent;
        this.frontViewName = 'front-rubik';//正视角魔方名称
        this.endViewName = 'end-rubik';//反视角魔方名称

        this.initRender();
        this.initCamera();
        this.initScene();
        this.initLight();
        this.initObject();
        this.render();

        this.initTouchEvent();
    }

    initRender() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            context: this.context,
        });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(this.devicePixelRatio);
        this.renderer.setClearColor(0xFFFFFF, 1.0);
        canvas.width = this.width * this.devicePixelRatio;
        canvas.height = this.height * this.devicePixelRatio;
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 1500);
        this.camera.position.set(0, 0, 300 / this.camera.aspect);
        this.camera.up.set(0, 1, 0);
        this.camera.lookAt(this.viewCenter);

        // //轨道视角控制器
        // this.orbitController = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        // this.orbitController.enableZoom = false;
        // this.orbitController.rotateSpeed = 2;
        // this.orbitController.target = this.viewCenter;//设置控制点

        //透视投影相机视角为垂直视角，根据视角可以求出原点所在裁切面的高度，然后已知高度和宽高比可以计算出宽度
        this.originHeight = Math.tan(22.5 / 180 * Math.PI) * this.camera.position.z * 2;
        this.originWidth = this.originHeight * this.camera.aspect;
    }

    initScene() {
        this.scene = new THREE.Scene();
    }

    initLight() {
        this.light = new THREE.AmbientLight(0xfefefe);
        this.scene.add(this.light);
    }

    initObject() {
        //正视角魔方
        this.frontRubik = new BasicRubik(this);
        this.frontRubik.model(this.frontViewName);
        this.frontRubik.resizeHeight(0.5, 1);

        //反视角魔方
        this.endRubik = new BasicRubik(this);
        this.endRubik.model(this.endViewName);
        this.endRubik.resizeHeight(0.5, -1);

        this.touchLine = new TouchLine(this);
    }

    render() {
        this.renderer.clear();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this), canvas);
    }

    initTouchEvent() {
        wx.onTouchStart(this.touchStart.bind(this));
        wx.onTouchMove(this.touchMove.bind(this));
        wx.onTouchEnd(this.touchEnd.bind(this));
    }

    touchStart(event) {

    }

    touchMove(event) {

    }

    touchEnd(event) {

    }
}