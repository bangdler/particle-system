import { Blending } from 'three';

export type ColorHex = `#${string}`;
export type VectorBase = [number, number, number];
export interface Model {
  particleCount: number;
  particleLife: number;
  emitterLife: number;
  flowMode: boolean;
  trail: boolean;
  repeat: boolean;

  boxSize: VectorBase;
  velocityBase: VectorBase;
  velocitySpread: VectorBase;
  accelerationBase: VectorBase;
  accelerationSpread: VectorBase;
  angle: number;
  angleVelocityBase: number;
  angleVelocitySpread: number;
  centerVelocityBase: number;
  centerVelocitySpread: number;
  sizes: VectorBase;
  startColors: ColorHex[];
  endColors: ColorHex[];
  startOpacity: number;
  endOpacity: number;

  texture: string;
  blending: Blending;
  depthComparison: boolean;
}
