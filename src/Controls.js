function Controls() {
    this.keysDown = [];
    this.keys = {
        left: 37,
        right: 39,
        up: 28,
        down: 40,
        w: 87,
        a: 65,
        s: 83,
        d: 68,
        enter: 13,
        space: 32,
        m: 77,
        z: 90,
        p: 80
    };

    this._keydownFunc = this._keydown.bind(this);
    this._keyupFunc = this._keyup.bind(this);
}

(function (proto_) {

    /*
     * Enables the event listeners.
     */
    proto_.enable = function () {
        addEventListener('keydown', this._keydownFunc, false);
        addEventListener('keyup', this._keyupFunc, false);
    };

    /*
     * Disables the event listeners.
     */
    proto_.disable = function () {
        removeEventListener('keydown', this._keydown);
        removeEventListener('keyup', this._keyup);
    };


    /*
     * When key is down, value at the index of the key code is true.
     */
    proto_._keydown = function (e) {
        this.keysDown[e.keyCode] = true;
    };

    /*
     * When key is up, value at the index of the key code is undefined.
     */
    proto_._keyup = function (e) {
        delete this.keysDown[e.keyCode];
    }

}(Controls.prototype));

module.exports = Controls;
