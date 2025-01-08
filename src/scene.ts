import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const scene = new THREE.Scene();

export const initScene = () => {
  const container = document.querySelector<HTMLDivElement>('#scene')!;

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 2, 5);

  // 렌더러 설정
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const canvas = renderer.domElement;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // 조명 설정
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 10, 7.5);
  //   directionalLight.castShadow = true;
  scene.add(directionalLight);

  // 그리드 헬퍼 추가 (선택사항)
  const gridHelper = new THREE.GridHelper(20, 20, 0x888888, 0x888888);
  scene.add(gridHelper);

  const controls = new OrbitControls(camera, canvas);

  container.appendChild(canvas);

  const animate = () => {
    renderer.render(scene, camera);
    controls.update();
  };

  renderer.setAnimationLoop(animate);
};
