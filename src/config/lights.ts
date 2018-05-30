import * as THREE from "three";

const lights = [];
lights[0] = new THREE.PointLight(0xffffff, .20, 0);

lights[0].position.set(0, 0, 450);

export default lights;
