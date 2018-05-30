import * as THREE from "three";

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 50;
camera.position.y = 50;
camera.up.set(0, 0, 1);
camera.position.z = 75;
camera.rotateX(90);
camera.lookAt(new THREE.Vector3(0, 0, 0));

export default camera;
