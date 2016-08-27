/*
 * Manages the display size, width, height, etc.
 */
function Display() {
    
}

Display.prototype = {
    get width() {
        return window.innerWidth;
    },

    get height() {
        return window.innerHeight;
    },

    get pixelRatio() {
        return window.devicePixelRatio;
    },

    get ratio() {
        return this.width / this.height;
    }
};

module.exports = Display;
