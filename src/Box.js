var THREE = require('three');
var Texture = require('./Texture');
var extend = require('./extend.js');
var DestroyableInterface = require('./DestroyableInterface');
var ThreeEntityInterface = require('./ThreeEntityInterface.js');
var Entity = require('./Entity');
var Collision = require('scrixel-collision');
var sprites = require('../build/sprites.json').sprites;


var texture = new Texture(sprites[0][0]);

function Box() {
    var width = 200;
    var height = 200;
    var depth = 200;

    this._geometry = new THREE.BoxBufferGeometry(width, height, depth);
    this._material = new THREE.MeshBasicMaterial({
        map: texture
    });

    this.mesh = new THREE.Mesh(this._geometry, this._material);
    this.collisionBox = new Collision.Box(width, height);

    this.collisionBox.parent = this;
    this.surround = 0;

    this.x = 0;
    this.y = 0;
    this.z = 0;
}

extend(Box.prototype, DestroyableInterface);
extend(Box.prototype, ThreeEntityInterface);
extend(Box.prototype, Entity.prototype);

(function (proto_) {
    
    proto_.destroy = function () {
        this.mesh.dispose();
        this._geometry.dispose();
        this._material.dispose();
    };


    proto_.onWest = function (box) {
        if (!box.parent.isPlayer || this.surround & 8 === 8) {
            return;
        }

        box.parent.x = box.prevX;
    };

    proto_.onEast = function (box) {
        if (!box.parent.isPlayer || this.surround & 2 === 2) {
            return;
        }

        box.parent.x = box.prevX;
    }

}(Box.prototype));

module.exports = Box;
