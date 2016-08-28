var GameLoop = require('scrixel-gameloop');
var THREE = require('three');
var Display = require('./Display');
var Box = require('./Box');
var Player = require('./Player');
var Level = require('./Level');


var box;
var scene;
var renderer;
var display;
var player;
var level;

(function () {
    var loopFunctions = new GameLoop.LoopFunctions();
    var looper = new GameLoop.Looper(loopFunctions);
    display = new Display();
    level = new Level();

    loopFunctions.draw = draw;
    loopFunctions.update = update;

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(display.pixelRatio);
    renderer.setSize(display.width, display.height);

    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);

    looper.start();
}());

function onWindowResize() {
    level.player.camera.aspect = display.ratio;
    level.player.camera.updateProjectionMatrix();

    renderer.setSize(display.width, display.height);
}

function draw() {
    renderer.render(level.scene, level.player.camera);
}

function update() {
    level.player.update();
}
