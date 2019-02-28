import * as THREE from '../libs/three';

const BaisParams = {
    position: {
        x: 0,
        y: 0,
        z: 0,
    },
    num: 3,
    len: 50,
    //右、左、上、下、前、后
    colors: ['#ff6b02', '#dd422f',
        '#ffffff', '#fdcd02',
        '#3d81f7', '#019d53'],
};

function faces(color) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d');
    context.fillStyle = 'black';
    context.fillRect(0, 0, 256, 256);
    context.rect(16, 16, 224, 224);
    context.lineJoin = 'round';
    context.fillStyle = color;
    context.strokeStyle = color;
    context.stroke();
    context.fill();
    return canvas;
}

function caculateCubeCenterPointByLeftPoint(x, y, z, len) {
    return {
        x: x + len / 2,
        y: y - len / 2,
        z: z - len / 2,
    }
}

class SimpleCube {

    constructor(position, num, len) {
        this.leftPoint = {
            x: position.x - num * len / 2,
            y: position.y + num * len / 2,
            z: position.z + num * len / 2,
        }
    }
}