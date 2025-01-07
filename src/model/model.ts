import {
  BoxGeometry,
  Color,
  Mesh,
  MeshStandardMaterial,
  Texture,
  TextureLoader,
  Vector3,
} from 'three';
import { ColorHex, Model, VectorBase } from './type';
import { Initializer } from '../core/Initializer';
import ParticleObject from '../core/ParticleObject';
import { Emitter } from '../core/Emitter';

export const createParticleEmitter = (model: Model) => {
  const velocityBase = transformVectorBaseToVector3(model.velocityBase);
  const velocitySpread = transformVectorBaseToVector3(model.velocitySpread);
  const accelerationBase = transformVectorBaseToVector3(model.accelerationBase);
  const accelerationSpread = transformVectorBaseToVector3(
    model.accelerationSpread,
  );
  const startColors = transformHexColorsToColors(model.startColors);
  const endColors = transformHexColorsToColors(model.endColors);
  const texture = transformTextureNameToTexture(model.texture);

  const initialBox = new Mesh(
    new BoxGeometry(model.boxSize[0], model.boxSize[1], model.boxSize[2]),
    new MeshStandardMaterial(),
  );

  const initializer = new Initializer({
    initialBox,
    velocityBase,
    velocitySpread,
    accelerationBase,
    accelerationSpread,
    angle: model.angle,
    angleVelocityBase: model.angleVelocityBase,
    angleVelocitySpread: model.angleVelocitySpread,
    centerVelocityBase: model.centerVelocityBase,
    centerVelocitySpread: model.centerVelocitySpread,
    sizes: model.sizes,
    startColors,
    endColors,
    startOpacity: model.startOpacity,
    endOpacity: model.endOpacity,
  });

  const particleObj = new ParticleObject({
    texture,
    blending: model.blending,
    depthComparison: model.depthComparison,
  });

  const emitter = new Emitter({
    particleCount: model.particleCount,
    particleLife: model.particleLife,
    emitterLife: model.emitterLife,
    flowMode: model.flowMode,
    trail: model.trail,
    repeat: model.repeat,
    particleObject: particleObj,
    initializer,
  });

  return emitter;
};

const transformVectorBaseToVector3 = (vectorBase: VectorBase): Vector3 => {
  return new Vector3(vectorBase[0], vectorBase[1], vectorBase[2]);
};

const transformHexColorsToColors = (colors: ColorHex[]): Color[] => {
  return colors.map(color => new Color(color));
};

const textureLoader = new TextureLoader();
const transformTextureNameToTexture = (textureName: string): Texture => {
  const path = `/${textureName}.png`;
  return textureLoader.load(path);
};
