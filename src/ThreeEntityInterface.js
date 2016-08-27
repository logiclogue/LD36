var ThreeEntityInterface = {
    mesh: null,

    get x() {
        return this.mesh.position.x;
    },
    set x(val) {
        this.mesh.position.x = val;
    },

    get y() {
        return this.mesh.position.y;
    },
    set y(val) {
        this.mesh.position.y = val;
    },

    get z() {
        return this.mesh.position.z;
    },
    set z(val) {
        this.mesh.position.z = val
    }
};

module.exports = ThreeEntityInterface;
