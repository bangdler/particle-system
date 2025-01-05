import { Material, Object3D, Points } from 'three';
import { Emitter } from './Emitter';
import { EmitterObject } from './EmitterObject';
import ParticleObject from './ParticleObject';
import { ParticleSystemParameter } from './types/particleSystem';
import { createAnimationClip } from './utils';

export class ParticleSystem {
  constructor() {}

  static create(
    emitterObj: Object3D,
    {
      particlesPerSecond,
      particleLife,
      emitterLife,
      flowMode,
      velocityBase,
      velocitySpread,
      accelerationBase,
      accelerationSpread,
      centerVelocityBase,
      centerVelocitySpread,
      angle,
      angleVelocityBase,
      angleVelocitySpread,
      angleAccelerationBase,
      angleAccelerationSpread,
      sizes,
      startColors,
      endColors,
      startOpacity,
      endOpacity,
      texture,
      blending,
      depthComparison,
      trail
    }: ParticleSystemParameter
  ) {
    const emitterObject = new EmitterObject({ mesh: emitterObj });

    const emitter = new Emitter({
      emitterObject,
      particlesPerSecond,
      particleLife,
      emitterLife,
      flowMode,
      velocityBase,
      velocitySpread,
      accelerationBase,
      accelerationSpread,
      centerVelocityBase,
      centerVelocitySpread,
      angle,
      angleVelocityBase,
      angleVelocitySpread,
      angleAccelerationBase,
      angleAccelerationSpread,
      sizes,
      startColors,
      endColors,
      startOpacity,
      endOpacity
    });

    const particleObj = new ParticleObject({
      texture,
      blending,
      depthComparison
    });

    if (trail) {
      emitter.createTrailParticleArray();
    } else {
      emitter.createParticleArray();
    }

    particleObj.create(emitter.particleArray);

    emitterObject.mesh.add(particleObj.mesh);

    const clip = createAnimationClip(emitter.emitterLife, emitter.fps);
    emitterObject.mesh.animations = [clip];

    return emitterObject.mesh;
  }

  static update(
    originEmitterObj: Object3D,
    {
      particlesPerSecond,
      particleLife,
      emitterLife,
      flowMode,
      velocityBase,
      velocitySpread,
      accelerationBase,
      accelerationSpread,
      centerVelocityBase,
      centerVelocitySpread,
      angle,
      angleVelocityBase,
      angleVelocitySpread,
      angleAccelerationBase,
      angleAccelerationSpread,
      sizes,
      startColors,
      endColors,
      startOpacity,
      endOpacity,
      texture,
      blending,
      depthComparison,
      trail
    }: ParticleSystemParameter
  ) {
    const originParticleMesh = originEmitterObj.children[0] as Points;

    // 기존 자식 points 제거
    originEmitterObj.clear();

    // 기존 points dispose
    const originParticleMaterial = originParticleMesh.material as Material;
    originParticleMaterial.dispose();
    originParticleMesh.geometry.dispose();

    const emitterObject = new EmitterObject({ mesh: originEmitterObj });

    const emitter = new Emitter({
      emitterObject,
      particlesPerSecond,
      particleLife,
      emitterLife,
      flowMode,
      velocityBase,
      velocitySpread,
      angle,
      accelerationBase,
      accelerationSpread,
      centerVelocityBase,
      centerVelocitySpread,
      angleVelocityBase,
      angleVelocitySpread,
      angleAccelerationBase,
      angleAccelerationSpread,
      sizes,
      startColors,
      endColors,
      startOpacity,
      endOpacity
    });

    const particleObj = new ParticleObject({
      texture,
      blending,
      depthComparison
    });

    if (trail) {
      emitter.createTrailParticleArray();
    } else {
      emitter.createParticleArray();
    }

    particleObj.create(emitter.particleArray);

    // 새로운 particleMesh 추가
    emitterObject.mesh.add(particleObj.mesh);

    const clip = createAnimationClip(emitterLife, 60);
    emitterObject.mesh.animations = [clip];

    return emitterObject.mesh;
  }
}
