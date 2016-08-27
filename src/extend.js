/*
 * Extends objects.
 */
function extend(child, parent) {
    var key;
    var descriptor;

    for (key in parent) {
        descriptor = Object.getOwnPropertyDescriptor(parent, key);

        Object.defineProperty(child, key, descriptor);
    }
}

module.exports = extend;
