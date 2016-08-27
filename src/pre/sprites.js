var SS = require('scrixel-spritesheet');


var rootdir = __dirname + '/../../';
var exportPath = rootdir + 'build/sprites.json';


loadSprite(rootdir + 'res/sprites/sprites.png', 'sprites', 16, 16, function () {
    loadSprite(rootdir + 'res/sprites/font.png', 'font', 8, 8, function () {

    });
});

function loadSprite(path, spriteSheetName, width, height, callback) {
    var loader = new SS.Loader();

    loader.loadImage(path, function (image) {
        var spriteSheet = new SS.SpriteSheet(image);
        var splitter = new SS.Splitter(spriteSheet);

        splitter.split(width, height, function (sprites) {
            var outputter = new SS.Outputter(sprites);

            outputter.path = exportPath;
            outputter.spriteSheetName = spriteSheetName;
            outputter.output(callback);
        });
    });
}
