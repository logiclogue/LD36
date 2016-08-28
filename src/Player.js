var THREE = require('three');
var Camera = THREE.PerspectiveCamera;
var Display = require('./Display');
var Texture = require('./Texture');
var UpdatableInterface = require('./UpdatableInterface');
var DestroyableInterface = require('./DestroyableInterface');
var Controls = require('./Controls');
var Collision = require('scrixel-collision');
var extend = require('./extend');
var sprites = require('../build/sprites.json').sprites;


var display = new Display();
var texture = new Texture(sprites[0][1]);

function Player() {
    var width = 200;
    var height = 200;

    this._geometry = new THREE.PlaneGeometry(width, height);
    this._material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true
    });

    this.mesh = new THREE.Mesh(this._geometry, this._material);
    this.camera = new Camera(70, display.ratio, 1, 1000);
    this.controls = new Controls();
    this.collisionBox = new Collision.Box(width, height);
    this.collisionGroup = new Collision.Group();

    this.collisionBox.parent = this;

    this.collisionGroup.addBox(this.collisionBox);
    this.controls.enable();

    this.cameraDistance = 400;

    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.prevX = 0;
    this.prevY = 0;
}

extend(Player.prototype, UpdatableInterface);
extend(Player.prototype, DestroyableInterface);

extend(Player.prototype, {
    set x(val) {
        this.prevX = this.mesh.position.x;
        this.mesh.position.x = val;
        this.camera.position.x = val;
        this.collisionBox.x = val;
    },
    get x() {
        return this.mesh.position.x;
    },

    set y(val) {
        this.prevY = this.mesh.position.y;
        this.mesh.position.y = val;
        this.camera.position.y = val;
        this.collisionBox.y = val;
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
    },

    destroy: function () {
        this.mesh.dispose();
        this._geometry.dispose();
        this._material.dispose();

        this.update = function () {};
    }
});

module.exports = Player;
