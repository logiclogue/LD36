var Collision = require('scrixel-collision');
var extend = require('./extend');


function CollisionManager() {
    Collision.CollisionManager.apply(this, arguments);

    console.log(this.groupA);
    console.log(this.groupB);
}

extend(CollisionManager.prototype, Collision.CollisionManager.prototype);

(function (proto_) {

    proto_.onCollision = function (methodName, boxA, boxB) {
        this._getMethod(methodName, boxA)(boxB);
        this._getMethod(methodName, boxB)(boxB);
    };

    proto_.onTouch = function (boxA, boxB) {
        console.log('here');
        this.onCollision('onTouch', boxA, boxB);
    };

    proto_.onNorth = function (boxA, boxB) {
        this.onCollision('onNorth', boxA, boxB);
    };

    proto_.onEast = function (boxA, boxB) {
        this.onCollision('onEast', boxA, boxB);
    };

    proto_.onSouth = function (boxA, boxB) {
        this.onCollision('onSouth', boxA, boxB);
    };

    proto_.onWest = function (boxA, boxB) {
        this.onCollision('onWest', boxA, boxB);
    };

    proto_.onInside = function (boxA, boxB) {
        this.onCollision('onInside', boxA, boxB);
    };


    proto_._getMethod = function (methodName, box) {
        if (typeof box.parent === 'undefined') {
            return this._emptyMethod;
        }
        else if (typeof box.parent[methodName] === 'undefined') {
            return this._emptyMethod;
        }

        var boxMethod = box.parent[methodName];

        return box.parent[methodName];
    };

    proto_._emptyMethod = function () {

    };

}(CollisionManager.prototype));

module.exports = CollisionManager;
