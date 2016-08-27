var THREE = require('three');
var TextureLoader = THREE.TextureLoader;
var extend = require('./extend');


function Texture(sprite) {
    TextureLoader.apply(this);

    var texture = this.load(sprite);

    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;

    return texture;
}

extend(Texture.prototype, TextureLoader.prototype);

module.exports = Texture;
