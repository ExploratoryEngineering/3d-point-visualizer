import * as THREE from "three";

const sensorBulb = new THREE.PointLight(0xFFFFFF, 1, 100, 2);
const bulbGeometry = new THREE.SphereBufferGeometry(0.02, 16, 8);
const bulbMat = new THREE.MeshStandardMaterial({
  emissive: 0xffffee,
  emissiveIntensity: .77,
  color: 0x000000,
});
sensorBulb.add(new THREE.Mesh(bulbGeometry, bulbMat));
sensorBulb.position.set(0, 0, 2);
sensorBulb.castShadow = true;

export default sensorBulb;
