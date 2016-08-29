function Animation(speed, sprites) {
    this.sprites = sprites;
    this.speed = speed;
    this.time = Date.now();
    this.index = 0;
}

(function (proto_) {

    /*
     * Gets the current sprite.
     */
    proto_.get = function () {
        if (Date.now() - this.time > this.speed) {
            this.time = Date.now();
            this.increment();
        }

        return this.sprites[this.index];
    };

    /*
     * Circular loop increment.
     */
    proto_.increment = function () {
        this.index += 1;

        if (this.index >= this.sprites.length) {
            this.index = 0;
        }
    };

}(Animation.prototype));

module.exports = Animation;
