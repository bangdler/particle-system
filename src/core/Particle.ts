import { Color, Vector3 } from 'three';
import { ParticleParameter, Sizes } from './types/particleSystem';

export default class Particle {
  startTime: number;
  life: number;
  position: Vector3;
  velocity: Vector3;
  acceleration: Vector3;
  angle: number;
  angleVelocity: number;
  startColor: Color;
  endColor: Color;
  sizes: Sizes;
  centerVelocity: Vector3;
  startOpacity: number;
  endOpacity: number;

  constructor({
    life,
    startTime,
    startPosition,
    startVelocity,
    startAcceleration,
    startAngle,
    startAngleVelocity,
    startColor,
    endColor,
    sizes,
    centerVelocity,
    startOpacity,
    endOpacity,
  }: ParticleParameter) {
    this.life = life;
    this.startTime = startTime;
    this.position = startPosition;
    this.velocity = startVelocity;
    this.acceleration = startAcceleration;
    this.angle = startAngle;
    this.angleVelocity = startAngleVelocity;
    this.startColor = startColor;
    this.endColor = endColor;
    this.sizes = sizes;
    this.centerVelocity = centerVelocity;
    this.startOpacity = startOpacity;
    this.endOpacity = endOpacity;
  }
}
