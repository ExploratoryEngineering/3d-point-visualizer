import * as THREE from "three";

const sensorBuilder = {
  create: (color = 0xFFFFFF, lightColor = 0xFFFFFF): THREE.PointLight => {
    const sensorBulb = new THREE.PointLight(lightColor, .54, 100, 2);
    const bulbGeometry = new THREE.SphereBufferGeometry(0.15, 16, 8);
    const bulbMat = new THREE.MeshStandardMaterial({
      emissive: 0xffffee,
      emissiveIntensity: .77,
      color: color,
    });

    sensorBulb.add(new THREE.Mesh(bulbGeometry, bulbMat));
    sensorBulb.castShadow = true;

    return sensorBulb;
  },
};

export default sensorBuilder;
