var GameLoop = require('scrixel-gameloop');
var THREE = require('three');


var camera;
var scene;
var renderer;
var mesh;

(function () {
    var loopFunctions = new GameLoop.LoopFunctions();
    var looper = new GameLoop.Looper(loopFunctions);

    loopFunctions.draw = draw;
    loopFunctions.update = update;

    var ratio = window.innerWidth / window.innerHeight;

    camera = new THREE.PerspectiveCamera(70, ratio, 1, 1000);
    camera.position.z = 400;

    scene = new THREE.Scene();

    var texture = new THREE.TextureLoader().load('res/sprites/font.png');

    var geometry = new THREE.BoxBufferGeometry(200, 200, 200);
    var material = new THREE.MeshBasicMaterial({
        map: texture
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);

    looper.start();
}());

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function draw() {
    renderer.render(scene, camera);
}

function update() {
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.05;
}
