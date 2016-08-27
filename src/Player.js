var THREE = require('three');
var Camera = THREE.PerspectiveCamera;
var Display = require('./Display');
var Texture = require('./Texture');
var UpdatableInterface = require('./UpdatableInterface');
var Controls = require('./Controls');
var extend = require('./extend');
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
    this.controls = new Controls();

    this.controls.enable();

    this.cameraDistance = 400;

    this._x = 0;
    this._y = 0;
    this._z = 0;
}

extend(Player.prototype, UpdatableInterface);

extend(Player.prototype, {
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
    get y() {
        return this.mesh.position.y;
    },

    set z(val) {
        this.mesh.position.z = val;
        this.camera.position.z = val + this.cameraDistance;
    },
    get z() {
        return this.mesh.position.z;
    },


    update: function () {
        var isLeft = this.controls.keysDown[this.controls.keys.left];
        var isRight = this.controls.keysDown[this.controls.keys.right];
        var isA = this.controls.keysDown[this.controls.keys.a];
        var isD = this.controls.keysDown[this.controls.keys.d];

        if (isLeft || isA) {
            this.left();
        }

        if (isRight || isD) {
            this.right();
        }
    },

    left: function () {
        this.x -= 10;
    },

    right: function () {
        this.x += 10;
    }
});

module.exports = Player;
