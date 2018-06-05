import * as THREE from "three";
import images from "../../images/*";

const geometry = new THREE.PlaneBufferGeometry(60, 60);
const material = new THREE.MeshStandardMaterial({
  roughness: 0.8,
  color: 0xffffff,
  metalness: 0.2,
  bumpScale: 0.0005,
 });

const textureLoader = new THREE.TextureLoader();
textureLoader.load(images["hardwood2_diffuse.jpg"], function (map) {
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.anisotropy = 4;
  map.repeat.set(10, 24);
  material.map = map;
  material.needsUpdate = true;
});
textureLoader.load(images["hardwood2_bump.jpg"], function (map) {
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.anisotropy = 4;
  map.repeat.set(10, 24);
  material.bumpMap = map;
  material.needsUpdate = true;
});
textureLoader.load(images["hardwood2_roughness.jpg"], function (map) {
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.anisotropy = 4;
  map.repeat.set(10, 24);
  material.roughnessMap = map;
  material.needsUpdate = true;
});

const floor = new THREE.Mesh(geometry, material);
floor.receiveShadow = true;

export default floor;
