var MapLoader = require('./MapLoader');
var Player = require('./Player');
var Box = require('./Box');
var Wall = require('./Wall')
var maps = require('../res/maps.json');


function Map(mapName) {
    this.mapLoader = new MapLoader(maps[mapName]);
    this.meshes = [];
}

(function (static_, proto_) {

    static_.symbols = {
        '0': Player,
        '#': Box
    };


    proto_.load = function (callback) {
        this.mapLoader.forEach(function (character, x, y) {
            var TheClass = static_.symbols[character];
            var theClass;

            if (typeof TheClass === 'undefined') {
                TheClass = Wall;
            }

            theClass = new TheClass();
            theClass.x = x * 200;
            theClass.y = y * 200;

            callback(theClass, x, y, character);
        }.bind(this));
    };

}(Map, Map.prototype));

module.exports = Map;
