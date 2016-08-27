var GameLoop = require('scrixel-gameloop');
var THREE = require('three');
var Display = require('./Display');
var sprites = require('../build/sprites.json').font;


var camera;
var scene;
var renderer;
var mesh;
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

    var texture = new THREE.TextureLoader().load(sprites[0][0]);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;

    var geometry = new THREE.BoxBufferGeometry(200, 200, 200);
    var material = new THREE.MeshBasicMaterial({
        map: texture
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

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
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.05;
}
