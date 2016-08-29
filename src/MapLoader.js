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
        var length = this.map.length;

        this.map.forEach(function (row, y) {
            this._stringForEach(row, function (character, x) {
                var surround = this.allAround(x, y, character);

                callback(character, x, length - y - 1, surround);
            }.bind(this));
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

    proto_.allAround = function (x, y, character) {
        var number = 0;

        if (this.getPos(x + 1, y, character)) {
            number = number | 1;
        }

        if (this.getPos(x, y + 1, character)) {
            number = number | 2;
        }

        if (this.getPos(x - 1, y, character)) {
            number = number | 4;
        }

        if (this.getPos(x, y - 1, character)) {
            number = number | 8;
        }

        return number;
    }

    proto_.getPos = function (x, y, targetChar) {
        var column = this.map[x];
        var character;

        if (typeof column === 'undefined') {
            return false;
        }

        character = column[y];

        if (typeof character === 'undefined') {
            return false;
        }

        return targetChar === character;
    };

}(MapLoader.prototype));

module.exports = MapLoader;
