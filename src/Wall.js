var ThreeEntityInterface = require('./ThreeEntityInterface');
var Texture = require('./Texture');
var THREE = require('three');
var sprites = require('../build/sprites.json').sprites;
var extend = require('./extend');


var texture = new Texture(sprites[1][0]);

function Wall() {
    this._geometry = new THREE.PlaneGeometry(200, 200);
    this._material = new THREE.MeshBasicMaterial({
        map: texture
    });
    
    this.mesh = new THREE.Mesh(this._geometry, this._material);

    this.x = 0;
    this.y = 0;
    this.z = -100;
}

extend(Wall.prototype, ThreeEntityInterface);

(function () {

}());

module.exports = Wall;
