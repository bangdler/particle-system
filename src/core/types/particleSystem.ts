import ParticleObject from '../ParticleObject';
import { Initializer } from './../Initializer';
import { Blending, Color, Object3D, Texture, Vector3 } from 'three';

// Core Type
export type Sizes = [number, number, number];

export interface ParticleParameter {
  life: number;
  startTime: number;
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
  age: number;
  particleCount: number;
  particleLife: number;
  emitterLife: number;
  flowMode: boolean;
  trail: boolean;
  initializer: Initializer;
  particleObject: ParticleObject;
}

export interface ParticleObjectParameter {
  texture: Texture;
  blending: Blending;
  depthComparison: boolean;
}

export interface InitializerParameter {
  initialBox: Object3D;

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
