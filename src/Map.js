var MapLoader = require('./MapLoader');
var Player = require('./Player');
var Box = require('./Box');
var maps = require('../res/maps.json');


function Map(mapName, scene) {
    this.mapLoader = new MapLoader(maps[mapName]);
    this.scene = scene;
    this.meshes = [];
}

(function (static_, proto_) {

    static_.symbols = {
        '0': Player,
        '#': Box
    };


    proto_.load = function () {
        this.mapLoader.forEach(function (character, x, y) {
            var TheClass = static_.symbols[character];

            if (typeof TheClass === 'undefined') {
                return;
            }

            this.scene.add(new TheClass());
        });
    };

}(Map, Map.prototype));

module.exports = Map;
