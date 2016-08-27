var DestroyableInterface = require('./DestroyableInterface');
var THREE = require('three');
var Box = require('Box');
var Player = require('Player');
var extend = require('./extend');


function Level() {
    this.scene = new THREE.Scene();
    this.player = new Player();
    this.box1 = new Box();
    this.box2 = new Box();

    this.player.z = 0;
    this.box1.z = -200;
    this.box2.y = 200;

    this.scene.add(this.player.mesh);
    this.scene.add(this.box1.mesh);
    this.scene.add(this.box2.mesh);
}

extend(Level.prototype, DestroyableInterface);

(function (proto_) {

    proto_.destroy = function () {

    };

}(Level.prototype));
