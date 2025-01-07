import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const scene = new THREE.Scene();

export const initScene = () => {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 5;
  const renderer = new THREE.WebGLRenderer();
  const canvas = renderer.domElement;
  const controls = new OrbitControls(camera, canvas);
  const container = document.querySelector<HTMLDivElement>('#scene')!;

  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(canvas);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);

  const animate = () => {
    renderer.render(scene, camera);
    controls.update();
  };

  renderer.setAnimationLoop(animate);
};
