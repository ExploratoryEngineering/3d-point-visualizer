import * as THREE from "three";

const geometry = new THREE.PlaneBufferGeometry(120, 60);
const material = new THREE.MeshStandardMaterial({
  roughness: 0.8,
  color: 0xAAAAAA,
  metalness: 0.2,
  bumpScale: 0.0005,
 });

const plane = new THREE.Mesh(geometry, material);
plane.receiveShadow = false;

export default plane;
