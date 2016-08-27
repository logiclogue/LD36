var GameLoop = require('scrixel-gameloop');
var THREE = require('three');
var Display = require('./Display');
var Box = require('./Box');
var Player = require('./Player');


var box;
var scene;
var renderer;
var display;
var player;

(function () {
    var loopFunctions = new GameLoop.LoopFunctions();
    var looper = new GameLoop.Looper(loopFunctions);
    display = new Display();

    loopFunctions.draw = draw;
    loopFunctions.update = update;

    scene = new THREE.Scene();
    player = new Player();
    box = new Box();
    var box2 = new Box();

    box.z -= 200;
    box2.y = 200;
    player.z = 0;

    scene.add(box.mesh);
    scene.add(box2.mesh);
    scene.add(player.mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(display.pixelRatio);
    renderer.setSize(display.width, display.height);

    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);

    looper.start();
}());

function onWindowResize() {
    player.camera.aspect = display.ratio;
    player.camera.updateProjectionMatrix();

    renderer.setSize(display.width, height);
}

function draw() {
    renderer.render(scene, player.camera);
}

function update() {
    //box.mesh.rotation.x += 0.005;
    //box.mesh.rotation.y += 0.05;
}
