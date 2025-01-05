import { Color, Vector3 } from 'three';
import { EmitterObject } from './EmitterObject';
import Particle from './Particle';
import { EmitterParameter, Sizes } from './types/particleSystem';
import { getRandomValue, getRandomVector3 } from './utils';

export class Emitter {
  particleArray: Particle[] = [];
  emitterLife: number;
  fps: number = 30;
  emitterObject: EmitterObject;

  private particlesPerSecond: number;
  private particleLife: number;
  private flowMode: boolean;
  private velocityBase: Vector3;
  private velocitySpread: Vector3;
  private accelerationBase: Vector3;
  private accelerationSpread: Vector3;
  private angle: number;
  private angleVelocityBase: number;
  private angleVelocitySpread: number;
  private centerVelocityBase: number;
  private centerVelocitySpread: number;
  // private angleAccelerationBase: number;
  // private angleAccelerationSpread: number;
  private sizes: Sizes;
  private startColors: Color[];
  private endColors: Color[];
  private startOpacity: number;
  private endOpacity: number;

  constructor({
    particlesPerSecond,
    particleLife,
    emitterLife,
    flowMode,
    emitterObject,
    velocityBase,
    velocitySpread,
    accelerationBase,
    accelerationSpread,
    angle,
    angleVelocityBase,
    angleVelocitySpread,
    centerVelocityBase,
    centerVelocitySpread,
    // angleAccelerationBase,
    // angleAccelerationSpread,
    sizes,
    startColors,
    endColors,
    startOpacity,
    endOpacity
  }: EmitterParameter) {
    this.emitterObject = emitterObject;
    this.particlesPerSecond = particlesPerSecond;
    this.particleLife = particleLife;
    this.emitterLife = emitterLife;

    this.flowMode = flowMode;
    this.velocityBase = velocityBase;
    this.velocitySpread = velocitySpread;
    this.accelerationBase = accelerationBase;
    this.accelerationSpread = accelerationSpread;

    this.angle = angle;
    this.angleVelocityBase = angleVelocityBase;
    this.angleVelocitySpread = angleVelocitySpread;
    // this.angleAccelerationBase = angleAccelerationBase;
    // this.angleAccelerationSpread = angleAccelerationSpread;

    this.centerVelocityBase = centerVelocityBase;
    this.centerVelocitySpread = centerVelocitySpread;

    this.sizes = sizes;
    this.startColors = startColors;
    this.endColors = endColors;
    this.startOpacity = startOpacity;
    this.endOpacity = endOpacity;
  }

  private createParticle(
    offsetTime: number,
    startColor: Color,
    endColor: Color
  ): Particle {
    const position = this.emitterObject.getInitPosition();
    const center = this.emitterObject.getCenterPosition();
    const direction = new Vector3().subVectors(position, center);
    // 중심점과 입자 위치가 같은 경우 중심속도가 있어도 움직이지 않는 문제가 있어 opacity 0으로 수정
    const hasNoCenterDirection =
      this.centerVelocityBase !== 0 &&
      direction.x === 0 &&
      direction.y === 0 &&
      direction.z === 0;
    const centerVelocity = direction
      .normalize()
      .multiplyScalar(
        getRandomValue(this.centerVelocityBase, this.centerVelocitySpread)
      );

    const particle = new Particle({
      life: this.particleLife,
      offsetTime: offsetTime,
      startPosition: position,
      startVelocity: getRandomVector3(this.velocityBase, this.velocitySpread),
      startAcceleration: getRandomVector3(
        this.accelerationBase,
        this.accelerationSpread
      ),
      startAngle: this.angle,
      startAngleVelocity: getRandomValue(
        this.angleVelocityBase,
        this.angleVelocitySpread
      ),
      startColor,
      endColor,
      sizes: this.sizes,
      centerVelocity,
      startOpacity: hasNoCenterDirection ? 0 : this.startOpacity,
      endOpacity: hasNoCenterDirection ? 0 : this.endOpacity
    });
    return particle;
  }

  createParticleArray() {
    this.particleArray = [];

    this.emitterObject.setBoundingBox();

    const totalFrame = this.particleLife * this.fps;

    const numOfOneFrameParticle = this.particlesPerSecond / this.fps;

    const totalNum = this.flowMode
      ? numOfOneFrameParticle * totalFrame
      : this.particlesPerSecond;

    for (let i = 0; i < totalNum; i++) {
      // 파티클이 연속적으로 생성되어야 할 때, 프레임 별로 파티클을 나누고, 프레임만큼 시작 시간을 지연시킨다.
      const offsetTime = this.flowMode
        ? Math.floor(i / numOfOneFrameParticle) / this.fps
        : 0;

      const startColorIdx = i % this.startColors.length;
      const endColorIdx = i % this.endColors.length;

      const newParticle = this.createParticle(
        offsetTime,
        this.startColors[startColorIdx],
        this.endColors[endColorIdx]
      );
      this.particleArray[i] = newParticle;
    }
  }

  private createTrailParticle(
    offsetTime: number,
    startColor: Color,
    endColor: Color
  ): Particle[] {
    const position = this.emitterObject.getInitPosition();
    const center = this.emitterObject.getCenterPosition();
    const direction = new Vector3().subVectors(position, center);
    const hasNoCenterDirection =
      this.centerVelocityBase !== 0 &&
      direction.x === 0 &&
      direction.y === 0 &&
      direction.z === 0;

    const centerVelocity = direction
      .normalize()
      .multiplyScalar(
        getRandomValue(this.centerVelocityBase, this.centerVelocitySpread)
      );

    const startVelocity = getRandomVector3(
      this.velocityBase,
      this.velocitySpread
    );
    const startAcceleration = getRandomVector3(
      this.accelerationBase,
      this.accelerationSpread
    );
    const startAngleVelocity = getRandomValue(
      this.angleVelocityBase,
      this.angleVelocitySpread
    );

    // TODO: 상수 분리
    const trailConfig = {
      number: 10,
      sizeReduction: 0.9,
      offset: 0.02,
      opacityReduction: 0.7
    };

    const trailParticles = Array.from(
      { length: trailConfig.number },
      (_, idx) => {
        const sizes = this.sizes.map(
          (size) => size * trailConfig.sizeReduction ** idx
        ) as Sizes;

        return new Particle({
          life: this.particleLife,
          offsetTime: offsetTime + idx * trailConfig.offset,
          startPosition: position,
          startVelocity,
          startAcceleration,
          startAngle: this.angle,
          startAngleVelocity,
          startColor,
          endColor,
          sizes,
          centerVelocity,
          startOpacity: hasNoCenterDirection
            ? 0
            : this.startOpacity * trailConfig.opacityReduction ** idx,
          endOpacity: hasNoCenterDirection
            ? 0
            : this.endOpacity * trailConfig.opacityReduction ** idx
        });
      }
    );
    return trailParticles;
  }

  createTrailParticleArray() {
    this.particleArray = [];

    this.emitterObject.setBoundingBox();

    const totalFrame = this.particleLife * this.fps;

    const numOfOneFrameParticle = this.particlesPerSecond / this.fps;

    const totalNum = this.flowMode
      ? numOfOneFrameParticle * totalFrame
      : this.particlesPerSecond;

    for (let i = 0; i < totalNum; i++) {
      // 파티클이 연속적으로 생성되어야 할 때, 프레임 별로 파티클을 나누고, 프레임만큼 시작 시간을 지연시킨다.
      const offsetTime = this.flowMode
        ? Math.floor(i / numOfOneFrameParticle) / this.fps
        : 0;

      const startColorIdx = i % this.startColors.length;
      const endColorIdx = i % this.endColors.length;

      const newParticles = this.createTrailParticle(
        offsetTime,
        this.startColors[startColorIdx],
        this.endColors[endColorIdx]
      );
      this.particleArray = [...this.particleArray, ...newParticles];
    }
  }
}
