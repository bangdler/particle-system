import { Clock, ShaderMaterial } from 'three';
import { Initializer } from './Initializer';
import Particle from './Particle';
import ParticleObject from './ParticleObject';
import { EmitterParameter } from './types/particleSystem';

// TODO: 상수 분리
const trailConfig = {
  number: 10,
  sizeReduction: 0.9,
  offset: 0.02,
  opacityReduction: 0.7,
};

export class Emitter {
  particleObject: ParticleObject;
  private particleArray: Particle[] = [];
  private age: number = 0;
  private emitterLife: number;
  private fps: number = 60;
  private particleCount: number;
  private particleLife: number;
  private flowMode: boolean;
  private trail: boolean;
  private initializer: Initializer;
  private clock: Clock = new Clock();
  private animationId: number | null = null;

  constructor({
    particleCount,
    particleLife,
    emitterLife,
    flowMode,
    trail,
    initializer,
    particleObject,
  }: EmitterParameter) {
    this.particleCount = particleCount;
    this.particleLife = particleLife;
    this.emitterLife = emitterLife;
    this.flowMode = flowMode;
    this.trail = trail;
    this.initializer = initializer;
    this.particleObject = particleObject;
  }

  // flowmode 일때는 초당 개수, 아닐 때는 전체 개수로 설정
  createParticleArray() {
    this.particleArray = [];

    const totalFrame = this.particleLife * this.fps;

    const numOfOneFrameParticle = this.particleCount / this.fps;

    const totalNum = this.flowMode
      ? numOfOneFrameParticle * totalFrame
      : this.particleCount;

    for (let i = 0; i < totalNum; i++) {
      // 파티클이 연속적으로 생성되어야 할 때, 프레임 별로 파티클을 나누고, 프레임만큼 시작 시간을 지연시킨다.
      const startTime = this.flowMode
        ? Math.floor(i / numOfOneFrameParticle) / this.fps
        : 0;

      const newParticle = new Particle({
        startTime,
        life: this.particleLife,
        ...this.initializer.getInitialParams(),
      });
      this.particleArray[i] = newParticle;
    }
  }

  private createTrailParticle(startTime: number): Particle[] {
    const trailParticles = Array.from(
      { length: trailConfig.number },
      (_, idx) => {
        const params = this.initializer.getInitialParams();
        params.sizes.map(size => size * trailConfig.sizeReduction ** idx);
        params.startOpacity *= trailConfig.opacityReduction ** idx;
        params.endOpacity *= trailConfig.opacityReduction ** idx;

        return new Particle({
          life: this.particleLife,
          startTime: startTime + idx * trailConfig.offset,
          ...params,
        });
      },
    );
    return trailParticles;
  }

  createTrailParticleArray() {
    this.particleArray = [];

    const totalFrame = this.particleLife * this.fps;

    const numOfOneFrameParticle = this.particleCount / this.fps;

    const totalNum = this.flowMode
      ? numOfOneFrameParticle * totalFrame
      : this.particleCount;

    for (let i = 0; i < totalNum; i++) {
      // 파티클이 연속적으로 생성되어야 할 때, 프레임 별로 파티클을 나누고, 프레임만큼 시작 시간을 지연시킨다.
      const startTime = this.flowMode
        ? Math.floor(i / numOfOneFrameParticle) / this.fps
        : 0;
      const newParticles = this.createTrailParticle(startTime);
      this.particleArray = [...this.particleArray, ...newParticles];
    }
  }

  init() {
    // particle array 생성
    if (this.trail) {
      this.createTrailParticleArray();
    } else {
      this.createParticleArray();
    }

    // 렌더를 위한 particle object 생성
    this.particleObject.create(this.particleArray);
  }

  run() {
    if (this.age < this.emitterLife) {
      const dt = this.clock.getDelta();
      (
        this.particleObject.mesh.material as ShaderMaterial
      ).uniforms.time.value += dt;

      this.age += dt;

      this.animationId = requestAnimationFrame(this.run);
    }
  }

  stop() {
    if (!this.animationId) return;
    cancelAnimationFrame(this.animationId);
  }
}
