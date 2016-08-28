var THREE = require('three');
var Texture = require('./Texture');
var extend = require('./extend.js');
var DestroyableInterface = require('./DestroyableInterface');
var ThreeEntityInterface = require('./ThreeEntityInterface.js');
var sprites = require('../build/sprites.json').sprites;


var texture = new Texture(sprites[0][0]);

function Box() {
    var geometry = new THREE.BoxBufferGeometry(200, 200, 200);
    var material = new THREE.MeshBasicMaterial({
        map: texture
    });

    this.mesh = new THREE.Mesh(geometry, material);

    this.x = 0;
    this.y = 0;
    this.z = 0;

    this._geometry = geometry;
    this._material = material;
}

extend(Box.prototype, DestroyableInterface);
extend(Box.prototype, ThreeEntityInterface);

extend(Box.prototype, {
    destroy: function () {
        
    }
});

(function (proto_) {
    
    proto_.destroy = function () {
        this.mesh.dispose();
        this._geometry.dispose();
        this._material.dispose();
    };

}(Box.prototype));

module.exports = Box;
