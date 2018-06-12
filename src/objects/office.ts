import * as THREE from "three";
import { Wall } from "./wall";

const wallMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const walls: THREE.Mesh[] = [];

const XOFFSET = 4.5;
const YOFFSET = -3;

walls[0] = new Wall(3.5).build(XOFFSET, YOFFSET);
walls[1] = new Wall(4).build(1.75 + XOFFSET, 2 + YOFFSET, Math.PI / 2);
walls[2] = new Wall(3.5).build(XOFFSET, 4 + YOFFSET);
walls[3] = new Wall(4).build(XOFFSET - 1.75, - 2 + YOFFSET, Math.PI / 2);
walls[4] = new Wall(5).build(XOFFSET - 4.25, - 4 + YOFFSET);
walls[5] = new Wall(2).build(XOFFSET - 6.75, - 3 + YOFFSET, Math.PI / 2);
walls[6] = new Wall(3.5).build(XOFFSET - 8.5, - 2 + YOFFSET);
walls[7] = new Wall(6).build(XOFFSET - 10.25, 1 + YOFFSET, Math.PI / 2);
walls[8] = new Wall(3.5).build(XOFFSET - 8.5, 4 + YOFFSET);
walls[9] = new Wall(3).build(XOFFSET - 6.75, 5.5 + YOFFSET, Math.PI / 2);
walls[10] = new Wall(3).build(XOFFSET - 1.75, 5.5 + YOFFSET, Math.PI / 2);

export default walls;
