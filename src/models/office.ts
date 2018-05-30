import { Wall } from "./wall";
import * as THREE from "three";

const wallMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const walls: THREE.Mesh[] = [];

const XOFFSET = 4;

walls[0] = new Wall(3.5).build(XOFFSET);
walls[1] = new Wall(4).build(1.75 + XOFFSET, 2, Math.PI / 2);
walls[2] = new Wall(3.5).build(XOFFSET, 4);
walls[3] = new Wall(4).build(XOFFSET - 1.75, - 2, Math.PI / 2);
walls[4] = new Wall(5).build(XOFFSET - 4.25, - 4);
walls[5] = new Wall(2).build(XOFFSET - 6.75, - 3, Math.PI / 2);
walls[6] = new Wall(3.5).build(XOFFSET - 8.5, - 2);
walls[7] = new Wall(6).build(XOFFSET - 10.25, 1, Math.PI / 2);
walls[8] = new Wall(3.5).build(XOFFSET - 8.5, 4);
walls[9] = new Wall(3).build(XOFFSET - 6.75, 5.5, Math.PI / 2);
walls[10] = new Wall(3).build(XOFFSET - 1.75, 5.5, Math.PI / 2);

export default walls;