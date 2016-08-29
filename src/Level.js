var DestroyableInterface = require('./DestroyableInterface');
var THREE = require('three');
var Box = require('./Box');
var Player = require('./Player');
var Collision = require('scrixel-collision');
var UpdatableInterface = require('./UpdatableInterface');
var Map = require('./Map');
var EntityManager = require('./EntityManager');
var Manager = require('./CollisionManager');
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
    this.groupA = new Collision.Group();
    this.groupB = new Collision.Group();
    this.collisionManager = new Manager(this.groupA, this.groupB);

    this.map.load(this._sortEntities.bind(this));

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

    proto_.addMesh = function (entity) {
        this.scene.add(entity.mesh);
    };

    proto_.addEntity = function (entity) {
        if (typeof entity.mesh !== 'undefined') {
            this.addMesh(entity);
        }

        if (typeof entity.collisionBox !== 'undefined') {
            this.groupA.addBox(entity.collisionBox);
            this.groupB.addBox(entity.collisionBox);
        }
    };


    proto_._sortEntities = function (entity, x, y, character) {
        this.entityManager.add(entity);
        this.addEntity(entity);
    };

}(Level.prototype));

module.exports = Level;
