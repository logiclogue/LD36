var DestroyableInterface = require('./DestroyableInterface');
var THREE = require('three');
var Box = require('./Box');
var Player = require('./Player');
var Collision = require('scrixel-collision');
var UpdatableInterface = require('./UpdatableInterface');
var Map = require('./Map');
var EntityManager = require('./EntityManager');
var extend = require('./extend');


function Level() {
    var Manager = Collision.CollisionManager;

    this.scene = new THREE.Scene();
    this.player = new Player();
    this.box1 = new Box();
    this.box2 = new Box();
    this.box3 = new Box();
    this.boxCollisionGroup = new Collision.Group();
    this.entityManager = new EntityManager();
    this.map = new Map('level1', this.scene);

    this.map.load();

    var groupA = this.boxCollisionGroup;
    var groupB = this.player.collisionGroup;

    this.collisionManager = new Manager(groupA, groupB);

    this.collisionManager.onWest = this._onXCollision;
    this.collisionManager.onEast = this._onXCollision;

    this.boxCollisionGroup.addBox(this.box1.collisionBox);
    this.boxCollisionGroup.addBox(this.box2.collisionBox);
    this.boxCollisionGroup.addBox(this.box3.collisionBox);

    this.box1.x = -200;
    this.box2.y = 200;
    this.box3.x = 600;
    this.box3.x = 1000;

    this.scene.add(this.player.mesh);
    this.scene.add(this.box1.mesh);
    this.scene.add(this.box2.mesh);
    this.scene.add(this.box3.mesh);
}

extend(Level.prototype, UpdatableInterface);
extend(Level.prototype, DestroyableInterface);

(function (proto_) {

    proto_.update = function () {
        this.player.update();
        this.collisionManager.test();
    };

    proto_.destroy = function () {
        this.player.destroy();
        this.box1.destroy();
        this.box2.destroy();
    };


    proto_._onXCollision = function (boxA, boxB) {
        boxB.parent.x = boxB.prevX;
    };

}(Level.prototype));

module.exports = Level;
