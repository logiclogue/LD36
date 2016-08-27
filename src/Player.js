var THREE = require('three');
var Camera = THREE.PerspectiveCamera;
var Display = require('./Display');
var Texture = require('./Texture');
var sprites = require('../build/sprites.json').sprites;

var display = new Display();
var texture = new Texture(sprites[0][1]);


function Player() {
    var geometry = new THREE.PlaneGeometry(200, 200);
    var material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.camera = new Camera(70, display.ratio, 1, 1000);

    this.cameraDistance = 400;

    this.x = 0;
    this.y = 0;
    this.z = 0;
}

Player.prototype = {
    set x(val) {
        this.mesh.position.x = val;
        this.camera.position.x = val;
    },
    get x() {
        return this.mesh.position.x;
    },

    set y(val) {
        this.mesh.position.y = val;
        this.camera.position.y = val;
    },
    get x() {
        return this.mesh.position.y;
    },

    set z(val) {
        this.mesh.position.z = val;
        this.camera.position.z = val + this.cameraDistance;
    },
    get z() {
        return this.mesh.position.z;
    }
};

module.exports = Player;
