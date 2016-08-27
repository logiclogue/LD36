var DestroyableInterface = require('./DestroyableInterface');
var extend = require('./extend');


function Destroyer() {
    this.stack = [];
}

extend(Destroyer.prototype, DestroyableInterface);

(function (proto_) {

    /*
     * Adds an object the stack of objects that can be destroyed.
     */
    proto_.add = function (destroyableObject) {
        this.stack.push(destroyableObject);
    };

    /*
     * Destroys all objects in the stack.
     */
    proto_.destroy = function () {
        this.stack.forEach(function (destroyableObject) {
            destroyableObject.update();
        })
    };

}(Destroyer.prototype));

module.exports = Destroyer;
