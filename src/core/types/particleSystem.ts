import { Blending, Color, Object3D, Texture, Vector3 } from 'three';
import { EmitterObject } from '../EmitterObject';

// Core Type
export type Sizes = [number, number, number];

export interface ParticleParameter {
  life: number;
  offsetTime: number;
  startPosition: Vector3;
  startVelocity: Vector3;
  startAcceleration: Vector3;
  startAngle: number;
  startAngleVelocity: number;
  startColor: Color;
  endColor: Color;
  sizes: Sizes;
  centerVelocity: Vector3;
  startOpacity: number;
  endOpacity: number;
}

export interface EmitterParameter {
  particlesPerSecond: number;
  particleLife: number;
  emitterLife: number;
  flowMode: boolean;
  emitterObject: EmitterObject;
  velocityBase: Vector3;
  velocitySpread: Vector3;
  accelerationBase: Vector3;
  accelerationSpread: Vector3;
  angle: number;
  angleVelocityBase: number;
  angleVelocitySpread: number;
  centerVelocityBase: number;
  centerVelocitySpread: number;
  angleAccelerationBase: number;
  angleAccelerationSpread: number;
  sizes: Sizes;
  startColors: Color[];
  endColors: Color[];
  startOpacity: number;
  endOpacity: number;
}

export interface EmitterObjectParameter {
  mesh: Object3D;
}

export interface ParticleObjectParameter {
  texture: Texture;
  blending: Blending;
  depthComparison: boolean;
}

export interface ParticleSystemParameter
  extends Omit<EmitterParameter, 'emitterObject'>,
    ParticleObjectParameter {
  trail: boolean;
}
