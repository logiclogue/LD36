var THREE = require('three');
var Texture = require('./Texture');
var extend = require('./extend.js');
var DestroyableInterface = require('./DestroyableInterface');
var ThreeEntityInterface = require('./ThreeEntityInterface.js');
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

    this.x = 0;
    this.y = 0;
    this.z = 0;
}

extend(Box.prototype, DestroyableInterface);
extend(Box.prototype, ThreeEntityInterface);

(function (proto_) {
    
    proto_.destroy = function () {
        this.mesh.dispose();
        this._geometry.dispose();
        this._material.dispose();
    };

}(Box.prototype));

module.exports = Box;
