import { config } from "./config/config";

import OrbitControls from "orbit-controls-es6";
import * as THREE from "three";
THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1);

import camera from "./config/camera";
import lights from "./config/lights";

import renderer from "./config/renderer";
import floor from "./objects/floor";
import officeWalls from "./objects/office";
import plane from "./objects/plane";
import sensorBuilder from "./objects/sensor";

import { WebsocketKeepAliveMessage, WebsocketTagMessage } from "./helpers/Websocket";
import TagService from "./services/TagService";

// Set scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xDEDEDE);

// Add lights
lights.forEach((light) => scene.add(light));

// Add sensors
const sensors: THREE.PointLight[] = [];

TagService.getTags().then((tags) => {
  tags.forEach((tag) => {
    const sensor = sensorBuilder.create(0xfefefe, 0xFFFFFF);
    // Hiding point underneath the floor until data received
    sensor.position.set(0, 0, -2);
    sensors.push(sensor);
    scene.add(sensor);
  });
});

// Add initial plane
scene.add(plane);

let officeRendered = false;

const toggleOffice = () => {
  if (officeRendered) {
    officeWalls.forEach((wall) => {
      scene.remove(wall);
    });
    scene.remove(floor);
    scene.add(plane);
  } else {
    scene.remove(plane);
    scene.add(floor);
    officeWalls.forEach((wall) => {
      scene.add(wall);
    });
  }
  officeRendered = !officeRendered;
};

// Mouse and keyboard controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = true;
controls.maxDistance = 1500;
controls.minDistance = 0;
controls.enableRotate = true;

const updateSensorLocation = function (tagMessage: WebsocketTagMessage) {
  document.getElementById("sensor-location").innerText = `Sensor [${tagMessage.name}] X: ${tagMessage.coord.x.toFixed(2)}, Y: ${tagMessage.coord.y.toFixed(2)}, Z: ${tagMessage.coord.z.toFixed(2)}`;
};

TagService.initiateStreamForTagById("1", {
  onmessage: (message) => {
    try {
      const data: WebsocketKeepAliveMessage | WebsocketTagMessage = JSON.parse(message.data);

      if ((data as WebsocketKeepAliveMessage).type) {
        console.log("Keepalive");
      } else {
        const sensorData: WebsocketTagMessage = data as WebsocketTagMessage;

        const { coord: { x, y } } = sensorData;
        let { coord: { z } } = sensorData;

        if (z < 0) {
          z = 15;
        }

        sensors[0].position.set(config.scale * ((y / 1000) - 1), -1 * config.scale * (x / 1000), config.scale * (z / 1000));
        updateSensorLocation(sensorData);
      }
    } catch (e) {
      console.error(e);
    }
  },
  onerror: (err) => {
    document.getElementById("sensor-location").innerText = `Error with websocket. Server is most likely down.`;
  },
  onclose: () => {
    document.getElementById("sensor-location").innerText = `Closed websocket. No more data incoming.`;
  },
  onopen: () => {
    document.getElementById("sensor-location").innerText = `Connected to websocket. Awaiting data.`;
  },
});

const animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();

document.getElementById("toggle").onclick = toggleOffice;
