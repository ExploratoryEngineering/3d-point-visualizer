
import OrbitControls from "orbit-controls-es6";
import * as THREE from "three";
THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1);

import camera from "./config/camera";
import lights from "./config/lights";

import renderer from "./config/renderer";
import floor from "./objects/floor";
import officeWalls from "./objects/office";
import sensorBulb from "./objects/sensor";

// Set scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFEFEFE);

// Add lights
lights.forEach((light) => scene.add(light));

// Add sensors
scene.add(sensorBulb);

// Add floors
scene.add(floor);
officeWalls.forEach((wall) => {
  scene.add(wall);
});

// Mouse and keyboard controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = true;
controls.maxDistance = 1500;
controls.minDistance = 0;
controls.enableRotate = true;

const updateSensorLocation = function (vector: THREE.Vector3) {
  document.getElementById("sensor-location").innerText = `X: ${vector.x.toFixed(2)}, Y: ${vector.y.toFixed(2)}, Z: ${vector.z.toFixed(2)}`;
};

let sineNumber = 0;
const animate = function () {
  requestAnimationFrame(animate);

  sensorBulb.translateY(0.007);
  sensorBulb.position.add(new THREE.Vector3(0, 0, Math.sin(sineNumber) / 100));
  updateSensorLocation(sensorBulb.position);
  sineNumber += .01;

  renderer.render(scene, camera);
};

animate();
