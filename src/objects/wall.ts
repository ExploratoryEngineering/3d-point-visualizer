import * as THREE from "three";
import { MeshBasicMaterial } from "three";
import { config } from "./../config/config";

export class Wall {
  material: MeshBasicMaterial;
  scale: number = 4;

  constructor(
    private length: number,
    color = 0xFEFEFE,
    private height = 2.25) {
    this.material = new THREE.MeshLambertMaterial({ color: color });
  }

  build(x = 0, y = 0, rotate = 0): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(this.length * config.scale, 1, this.height * config.scale);
    const wallMesh = new THREE.Mesh(geometry, this.material);

    wallMesh.rotateZ(rotate);
    wallMesh.castShadow = true;
    wallMesh.position.set(x * config.scale, y * config.scale, this.height / 2 * config.scale);

    return wallMesh;
  }
}
