/*
 * Extends objects.
 */
function extend(child, parent) {
    var key;
    var descriptor;

    for (key in parent) {
        descriptor = Object.getOwnPropertyDescriptor(parent, key);

        if (child.hasOwnProperty(key)) {
            throw new Error('child already has `' + key + '` property');
        }
        else {
            Object.defineProperty(child, key, descriptor);
        }
    }
}

module.exports = extend;
