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
    this.scene = new THREE.Scene();
    this.entityManager = new EntityManager();
    this.map = new Map('level1', this.scene);
    this.groupA = new Collision.Group();
    this.groupB = new Collision.Group();
    this.collisionManager = new Manager(this.groupA, this.groupB);

    this.map.load(this._sortEntities.bind(this));

    this.player = this.map.player;

    this.scene.add(this.player.mesh);
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

        this.entityManager.forEach(function (entity) {
            entity.destroy();
        });
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
