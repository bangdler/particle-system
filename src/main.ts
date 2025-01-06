import { fire } from './basicModel';
import { createParticleEmitter } from './model';
import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//   </div>
// `;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document
  .querySelector<HTMLDivElement>('#app')!
  .appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  renderer.render(scene, camera);
  controls.update();
}
renderer.setAnimationLoop(animate);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);


const fireParticle = createParticleEmitter(fire);
console.log(fireParticle);
fireParticle.init();
// fireParticle.run();
scene.add(fireParticle.particleObject.mesh);
