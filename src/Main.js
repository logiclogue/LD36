var GameLoop = require('scrixel-gameloop');
var THREE = require('three');
var Display = require('./Display');
var Box = require('./Box');


var box = new Box();
var camera;
var scene;
var renderer;
var mesh = box.mesh;
var display;

(function () {
    var loopFunctions = new GameLoop.LoopFunctions();
    var looper = new GameLoop.Looper(loopFunctions);
    display = new Display();

    loopFunctions.draw = draw;
    loopFunctions.update = update;

    camera = new THREE.PerspectiveCamera(70, display.ratio, 1, 1000);
    camera.position.z = 400;

    scene = new THREE.Scene();
    var box2 = new Box();
    box2.y = 200;

    scene.add(mesh);
    scene.add(box2.mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(display.pixelRatio);
    renderer.setSize(display.width, display.height);

    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);

    looper.start();
}());

function onWindowResize() {
    camera.aspect = display.ratio;
    camera.updateProjectionMatrix();

    renderer.setSize(display.width, height);
}

function draw() {
    renderer.render(scene, camera);
}

function update() {
    //mesh.rotation.x += 0.005;
    //mesh.rotation.y += 0.05;
}
