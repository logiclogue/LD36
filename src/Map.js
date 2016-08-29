var MapLoader = require('./MapLoader');
var Player = require('./Player');
var Box = require('./Box');
var Wall = require('./Wall')
var maps = require('../res/maps.json');


function Map(mapName) {
    this.mapLoader = new MapLoader(maps[mapName]);
    this.player;
    this.meshes = [];

    this._callback;
}

(function (proto_) {

    proto_.load = function (callback) {
        this._callback = callback;

        this.mapLoader.forEach(function (character, y, x) {
            switch (character) {
                case '0':
                    this.player = new Player();
                    this._addEntity(this.player, x, y, character);
                    this._addEntity(new Wall(), x, y, character);
                    break;
                case '#':
                    this._addEntity(new Box(), x, y, character);
                    break;
                default:
                    this._addEntity(new Wall(), x, y, character);
                    break;
            }
        }.bind(this));

        console.log(this.player);
    };

    proto_._addEntity = function (entity, x, y, character) {
        entity.x = x * 200;
        entity.y = y * 200;

        this._callback(entity, x, y, character);
    };

}(Map.prototype));

module.exports = Map;
