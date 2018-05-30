import OrbitControls from "orbit-controls-es6";
import * as THREE from "three";
import camera from "./config/camera";
import lights from "./config/lights";
import renderer from "./config/renderer";
import floor from "./models/floor";
import walls from "./models/office";

THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFEFEFE);

floor.receiveShadow = true;
lights.forEach((light) => scene.add(light));

const bulbGeometry = new THREE.SphereBufferGeometry(0.02, 16, 8);
const bulbLight = new THREE.PointLight(0x0000FF, 1, 100, 2);
const bulbMat = new THREE.MeshStandardMaterial({
  emissive: 0xffffee,
  emissiveIntensity: .77,
  color: 0x000000,
});
bulbLight.add(new THREE.Mesh(bulbGeometry, bulbMat));
bulbLight.position.set(0, 0, 2);
bulbLight.castShadow = true;
scene.add(bulbLight);

scene.add(floor);
walls.forEach((wall) => {
  scene.add(wall);
});

renderer.shadowMap.enabled = true;

scene.add(lights[0]);
scene.add(lights[1]);
scene.add(lights[2]);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = true;
controls.maxDistance = 1500;
controls.minDistance = 0;
controls.enableRotate = true;

let sineNumber = 0;
const updateSensorLocation = function (vector: THREE.Vector3) {
  document.getElementById("sensor-location").innerText = `X: ${vector.x.toFixed(2)}, Y: ${vector.y.toFixed(2)}, Z: ${vector.z.toFixed(2)}`;
};

const animate = function () {
  requestAnimationFrame(animate);

  bulbLight.translateY(0.007);
  bulbLight.position.add(new THREE.Vector3(0, 0, Math.sin(sineNumber) / 100));
  updateSensorLocation(bulbLight.position);
  sineNumber += .01;

  renderer.render(scene, camera);
};

animate();
