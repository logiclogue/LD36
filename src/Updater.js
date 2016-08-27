var UpdatableInterface = require('./UpdatableInterface');
var extend = require('./extend');


function Updater() {
    this.stack = [];
}

extend(Updater.prototype, UpdatableInterface);

(function (proto_) {

    /*
     * Adds an object which is updatable to the stack.
     */
    proto_.add = function (updatableObject) {
        this.stack.push(updatableObject);
    };

    /*
     * Executes all #update() methods in the objects in the stack.
     */
    proto_.update = function () {
        this.stack.forEach(function (updatableObject) {
            updatableObject.update();
        });
    };

}(Updater.prototype));
