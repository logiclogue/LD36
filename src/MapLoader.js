function MapLoader(map) {
    this.map = map;
}

(function (proto_) {

    /*
     * Loads the map.
     */
    proto_.load = function (map) {
        this.map = map;
    };

    /*
     * For each character in the map, calling back with character, x,
     * and y coordinates.
     */
    proto_.forEach = function (callback) {
        this.map.forEach(function (row, x) {
            this._stringForEach(row, function (character, y) {
                callback(character, x, y);
            });
        }.bind(this));
    };


    proto_._stringForEach = function (string, callback) {
        var i;
        var length = string.length;
        var character;

        for (i = 0; i < length; i += 1) {
            character = string[i];

            callback(character, i);
        }
    };

}(MapLoader.prototype));

module.exports = MapLoader;
