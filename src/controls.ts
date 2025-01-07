import { Emitter } from './core/Emitter';
import { fire } from './model/basicModel';
import { createParticleEmitter } from './model/model';
import { Model } from './model/type';
import { scene } from './scene';
import './style.css';

const models: Record<string, Model> = {
  Fire: fire,
}; // 예시 모델 목록

let curEmitter: null | Emitter = null;
const addModel = (modelName: string) => {
  if (curEmitter) {
    scene.remove(curEmitter.particleObject.mesh);
  }
  const model = models[modelName];
  const particleEmitter = createParticleEmitter(model);
  particleEmitter.init();
  particleEmitter.run();
  scene.add(particleEmitter.particleObject.mesh);
  curEmitter = particleEmitter;
};

const createButton = (modelName: string): HTMLButtonElement => {
  const button = document.createElement('button');
  button.textContent = `Add ${modelName}`;
  button.dataset.model = modelName;
  return button;
};

export const initControls = () => {
  const controlsDiv = document.getElementById('controls');

  if (!controlsDiv) return;

  controlsDiv.addEventListener('click', e => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON') {
      const modelName = target.dataset.model;
      if (modelName) {
        addModel(modelName);
      }
    }
  });

  Object.keys(models).forEach(model => {
    const button = createButton(model);
    controlsDiv.appendChild(button);
  });
};
