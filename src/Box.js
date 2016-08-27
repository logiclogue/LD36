var ThreeEntityInterface = require('./ThreeEntityInterface.js');
var THREE = require('three');
var extend = require('./extend.js');
var sprites = require('../build/sprites.json').sprites;


var texture = new THREE.TextureLoader().load(sprites[0][0]);
texture.magFilter = THREE.NearestFilter;
texture.minFilter = THREE.LinearMipMapLinearFilter;

function Box() {
    var geometry = new THREE.BoxBufferGeometry(200, 200, 200);
    var material = new THREE.MeshBasicMaterial({
        map: texture
    });

    this.mesh = new THREE.Mesh(geometry, material);
    console.log(this.mesh);
}

Box.prototype = {

};

extend(Box.prototype, ThreeEntityInterface);

module.exports = Box;
