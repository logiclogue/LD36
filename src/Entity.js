function Entity() {
    this.collisionBox = null;
    this.mesh = null;
}

Entity.prototype = {
    set x(val) {
        this.mesh.position.x = val;
        this.collisionBox.x = val;
    },
    get x() {
        return this.mesh.position.x;
    },

    set y(val) {
        this.mesh.position.y = val;
        this.collisionBox.y = val;
    },
    get y() {
        return this.mesh.position.y;
    },

    set z(val) {
        this.mesh.position.z = val;
        this.collisionBox.z = val;
    },
    get z() {
        return this.mesh.position.z;
    }
};

module.exports = Entity;
