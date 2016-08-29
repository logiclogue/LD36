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
            var theClass;

            if (typeof TheClass === 'undefined') {
                return;
            }

            theClass = new TheClass();
            theClass.x = x * 200;
            theClass.y = y * 200;

            this.scene.add(theClass.mesh);
        }.bind(this));
    };

}(Map, Map.prototype));

module.exports = Map;
