var ThreeEntityInterface = {
    three: null,

    get x() {
        return this.three.position.x;
    },
    set x(val) {
        this.three.position.x = val;
    },

    get y() {
        return this.three.position.y;
    },
    set y(val) {
        this.three.position.y = val;
    },

    get z() {
        return this.three.position.z;
    },
    set z(val) {
        this.three.position.z = val
    }
};

module.exports = ThreeEntityInterface;
