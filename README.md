## ThreeJs Particle System

threeJs를 활용하여 간단한 2D Particle Effect를 생성할 수 있습니다.

Points를 활용하여 drawcall이 1회 발생하며, ShaderMaterial를 활용하여 gpu를 통해 각 입자 효과를 나타냅니다.

## Usage

기본적으로 threeJs Scene이 필요합니다. (참고 https://github.com/mrdoob/three.js/)

6개의 기본 모델(fire, firework, fog, fountain, smoke, snow)가 존재하며,

각 모델을 불러 particle emitter를 생성, scene에 추가 및 실행합니다.
```typescript
import { fire, firework, fog, fountain, smoke, snow } from './model/basicModel';

const particleEmitter = createParticleEmitter(fire);
particleEmitter.init();
scene.add(particleEmitter.particleObject.mesh);
particleEmitter.run();
```

## Clone Repo & 실행

```bash
git clone https://github.com/bangdler/particle-system.git

// 해당 폴더
npm install

npm run dev
```