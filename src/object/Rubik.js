import * as THREE from '../libs/three';

const BasicParams = {
    point: {
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
    //画一个宽高都是256的黑色正方形
    context.fillStyle = 'rgba(0,0,0,1)';
    context.fillRect(0, 0, 256, 256);
    //在内部用某颜色的16px宽的线再画一个宽高为224的圆角正方形并用改颜色填充
    context.rect(16, 16, 224, 224);
    context.lineJoin = 'round';
    context.lineWidth = 16;
    context.fillStyle = color;
    context.strokeStyle = color;
    context.stroke();
    context.fill();
    return canvas;
}

function calculateCubeCenterPointByLeftPoint(leftPoint, len) {
    return {
        x: leftPoint.x + len / 2,
        y: leftPoint.y - len / 2,
        z: leftPoint.z - len / 2,
    }
}

class SimpleCube {

    constructor(point, num, len) {
        let leftPoint = {
            x: point.x - num * len / 2,
            y: point.y + num * len / 2,
            z: point.z + num * len / 2,
        };

        this.cubes = [];
        for (let i = 0; i < num; ++i) {
            for (let j = 0; j < num * num; ++j) {
                let materials = [];
                for (let k = 0; k < 6; ++k) {
                    let texture = new THREE.Texture(faces(BasicParams.colors[k]));
                    texture.needsUpdate = true;
                    materials.push(new THREE.MeshLambertMaterial({
                        map: texture,
                    }));

                    let cubeGeometry = new THREE.BoxGeometry(len, len, len);
                    let cube = new THREE.Mesh(cubeGeometry, materials);
                    let centerPoint = calculateCubeCenterPointByLeftPoint(leftPoint, len);

                    cube.position.x = centerPoint.x + (j % num) * len;
                    cube.position.y = centerPoint.y - parseInt(j / num) * len;
                    cube.position.z = centerPoint.z - i * len;

                    this.cubes.push(cube);
                }
            }
        }
    }

    getCubes() {
        return this.cubes;
    }
}

export default class Rubik {

    constructor(main) {
        this.main = main;
    }

    model(type) {
        this.group = new THREE.Group();
        this.group.childType = type;

        let cubes = new SimpleCube(BasicParams.point, BasicParams.num, BasicParams.len).getCubes();
        let length = cubes.length;
        for (let i = 0; i < length; ++i) {
            let item = cubes[i];
            this.group.add(item);
        }

        this.main.scene.add(this.group);
    }

    resizeHeight(percent, transformTag) {
        if (percent < this.main.minPercent) {
            percent = this.main.minPercent;
        }

        if (percent > this.main.maxPercent) {
            percent = this.main.maxPercent;
        }

        this.group.scale.set(percent, percent, percent);
        this.group.position.y = this.main.originHeight * (0.5 - percent / 2) * transformTag;
    }
}