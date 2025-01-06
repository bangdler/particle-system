import { AdditiveBlending, NormalBlending } from 'three';
import { Model } from './type';

const INITIAL_PARAMETERS: Model = {
  particleCount: 100,
  particleLife: 3,
  emitterLife: 10,
  flowMode: true,
  trail: false,

  boxSize: [0.3, 0.3, 0.3],
  centerVelocityBase: 0,
  centerVelocitySpread: 0,
  velocityBase: [0, 0, 0],
  velocitySpread: [0, 0, 0],
  accelerationBase: [0, 0, 0],
  accelerationSpread: [0, 0, 0],
  angle: 0,
  angleVelocityBase: 0,
  angleVelocitySpread: 0,
  sizes: [1, 1, 1],
  startColors: ['#000000'],
  endColors: ['#000000'],
  startOpacity: 1,
  endOpacity: 0,

  texture: 'smoke',
  blending: NormalBlending,
  depthComparison: false,
};

// const fountain: Model = {
//   name: 'fountain',
//   parameters: {
//     texture: 'star1',
//     flowMode: true,
//     particlesPerSecond: 100,
//     particleLife: 3,
//     emitterLife: 10,
//     velocityBase: [0, 6, 0],
//     velocitySpread: [4, 1, 4],
//     accelerationBase: [0, -2, 0],
//     angleVelocitySpread: 360,
//     sizes: [0.5, 0.7, 1],
//     startColors: ['#eb2a2a'],
//     endColors: ['#e8c6c6'],
//   },
// };

export const fire: Model = {
  ...INITIAL_PARAMETERS,
  texture: 'fire',
  particleCount: 200,
  velocityBase: [0, 2.5, 0],
  velocitySpread: [0.1, 0, 0.1],
  accelerationBase: [0, -0.3, 0],
  angleVelocitySpread: 360,
  sizes: [1.5, 2.5, 1],
  startColors: ['#ffff80'],
  endColors: ['#ff8080'],
};

// const smoke: Model = {
//   name: 'smoke',
//   parameters: {
//     texture: 'smoke2',
//     flowMode: true,
//     particlesPerSecond: 100,
//     particleLife: 2,
//     emitterLife: 10,
//     velocityBase: [0, 1, 0],
//     velocitySpread: [0.3, 0, 0.3],
//     accelerationBase: [-0.1, -0.1, -0.1],
//     angleVelocitySpread: 360,
//     sizes: [1, 1, 2],
//     startColors: ['#333333'],
//     endColors: ['#808080'],
//   },
//   emitterInfo: {
//     type: 'CUBE',
//     geometryParameter: [0.3, 0.3, 0.3],
//   },
// };

// const fog: Model = {
//   name: 'fog',
//   parameters: {
//     texture: 'smoke2',
//     flowMode: false,
//     particlesPerSecond: 20,
//     particleLife: 5,
//     emitterLife: 5,
//     sizes: [70, 70, 70],
//     startColors: ['#eeeeee'],
//     endColors: ['#eeeeee'],
//     startOpacity: 0.5,
//     endOpacity: 0.5,
//     blending: AdditiveBlending,
//   },
//   emitterInfo: {
//     type: 'CUBE',
//     geometryParameter: [30, 10, 30],
//   },
// };

// const snow: Model = {
//   name: 'snow',
//   parameters: {
//     texture: 'snowflake1',
//     flowMode: true,
//     particlesPerSecond: 100,
//     particleLife: 2,
//     emitterLife: 10,
//     velocityBase: [0, -1, 0],
//     velocitySpread: [2, 0.5, 2],
//     accelerationBase: [0, -0.5, 0],
//     angleVelocitySpread: 180,
//     sizes: [0.3, 0.3, 0.3],
//     startColors: ['#ebe9e9'],
//     endColors: ['#ebe9e9'],
//   },
//   emitterInfo: {
//     type: 'CUBE',
//     geometryParameter: [5, 0.5, 5],
//   },
// };

// const fireBall: Model = {
//   name: 'fireBall',
//   parameters: {
//     texture: 'fire1',
//     flowMode: false,
//     particlesPerSecond: 150,
//     particleLife: 3,
//     emitterLife: 10,
//     velocityBase: [0, 0, 0],
//     velocitySpread: [0, 0, 0],
//     angleVelocitySpread: 30,
//     sizes: [1.4, 1.6, 1.5],
//     startColors: ['#cc0000'],
//     endColors: ['#e8cd8d'],
//     startOpacity: 0.6,
//     endOpacity: 0.6,
//     blending: AdditiveBlending,
//   },
//   emitterInfo: {
//     type: 'SPHERE',
//     geometryParameter: [0.5, 16, 16],
//   },
// };

// const firework: Model = {
//   name: 'firework',
//   parameters: {
//     texture: 'spark1',
//     flowMode: false,
//     particlesPerSecond: 100,
//     particleLife: 2,
//     emitterLife: 10,
//     centerVelocityBase: 1,
//     centerVelocitySpread: 0.2,
//     angleVelocitySpread: 60,
//     sizes: [0.1, 1, 0.5],
//     startColors: ['#0700cc'],
//     endColors: ['#cc0000'],
//     blending: AdditiveBlending,
//     trail: true,
//   },
//   emitterInfo: {
//     type: 'SPHERE',
//     geometryParameter: [0.5, 16, 16],
//   },
// };

// const rain: Model = {
//   name: 'rain',
//   parameters: {
//     texture: 'waterDrop2',
//     flowMode: true,
//     particlesPerSecond: 200,
//     particleLife: 4,
//     emitterLife: 10,
//     velocityBase: [0, -1, 0],
//     velocitySpread: [0, -0.5, 0],
//     accelerationBase: [0, -1, 0],
//     angle: 180,
//     sizes: [0.1, 0.1, 0.1],
//     startColors: ['#808080'],
//     endColors: ['#808080'],
//   },
//   emitterInfo: {
//     type: 'CUBE',
//     geometryParameter: [5, 0.5, 5],
//   },
// };

// const starTunnel: Model = {
//   name: 'starTunnel',
//   parameters: {
//     texture: 'star1',
//     flowMode: true,
//     particlesPerSecond: 100,
//     particleLife: 4,
//     emitterLife: 10,
//     velocityBase: [0, 0, 1],
//     velocitySpread: [0, 0, 0.2],
//     sizes: [0.2, 0.5, 0.2],
//     blending: AdditiveBlending,
//     startColors: ['#eb2a2a'],
//     endColors: ['#e8c6c6'],
//   },
//   emitterInfo: {
//     type: 'TORUS',
//     geometryParameter: [0.5, 0.2, 16],
//   },
// };

// const BASIC_MODEL = {
//   fountain,
//   smoke,
//   fog,
//   fire,
//   snow,
//   fireBall,
//   firework,
//   rain,
//   starTunnel,
// };
// export default BASIC_MODEL;
