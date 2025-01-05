// 파티클 초기 값을 결정하는 객체
import { Color, Object3D, Vector3, Box3, MathUtils } from 'three';
import {
  InitializerParameter,
  ParticleParameter,
  Sizes,
} from './types/particleSystem';
import { getRandomInt, getRandomValue, getRandomVector3 } from './utils';

export class Initializer {
  initialBox: Object3D;
  private boundingBox: Box3 = new Box3();
  private velocityBase: Vector3;
  private velocitySpread: Vector3;
  private accelerationBase: Vector3;
  private accelerationSpread: Vector3;
  private angle: number;
  private angleVelocityBase: number;
  private angleVelocitySpread: number;
  private centerVelocityBase: number;
  private centerVelocitySpread: number;
  private sizes: Sizes;
  private startColors: Color[];
  private endColors: Color[];
  private startOpacity: number;
  private endOpacity: number;

  constructor({
    initialBox,
    velocityBase,
    velocitySpread,
    accelerationBase,
    accelerationSpread,
    angle,
    angleVelocityBase,
    angleVelocitySpread,
    centerVelocityBase,
    centerVelocitySpread,
    sizes,
    startColors,
    endColors,
    startOpacity,
    endOpacity,
  }: InitializerParameter) {
    this.initialBox = initialBox;
    this.boundingBox.setFromObject(this.initialBox);

    this.velocityBase = velocityBase;
    this.velocitySpread = velocitySpread;
    this.accelerationBase = accelerationBase;
    this.accelerationSpread = accelerationSpread;

    this.angle = angle;
    this.angleVelocityBase = angleVelocityBase;
    this.angleVelocitySpread = angleVelocitySpread;
    this.centerVelocityBase = centerVelocityBase;
    this.centerVelocitySpread = centerVelocitySpread;

    this.sizes = sizes;
    this.startColors = startColors;
    this.endColors = endColors;
    this.startOpacity = startOpacity;
    this.endOpacity = endOpacity;
  }

  getInitPosition(): Vector3 {
    const randomWolrdPoint = new Vector3(
      MathUtils.randFloat(this.boundingBox.min.x, this.boundingBox.max.x),
      MathUtils.randFloat(this.boundingBox.min.y, this.boundingBox.max.y),
      MathUtils.randFloat(this.boundingBox.min.z, this.boundingBox.max.z),
    );

    const randomLocalPoint = randomWolrdPoint
      .clone()
      .applyMatrix4(this.initialBox.matrixWorld.clone().invert());

    return randomLocalPoint;
  }

  getCenterPosition(): Vector3 {
    const randomWorldCenter = this.boundingBox.getCenter(new Vector3());

    const randomLocalPoint = randomWorldCenter
      .clone()
      .applyMatrix4(this.initialBox.matrixWorld.clone().invert());

    return randomLocalPoint;
  }

  getInitialParams(): Omit<ParticleParameter, 'startTime' | 'life'> {
    const position = this.getInitPosition();
    const center = this.getCenterPosition();
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
        getRandomValue(this.centerVelocityBase, this.centerVelocitySpread),
      );

    const startColor =
      this.startColors[getRandomInt(0, this.startColors.length - 1)];
    const endColor = this.endColors[getRandomInt(0, this.endColors.length - 1)];

    return {
      startPosition: position,
      startVelocity: getRandomVector3(this.velocityBase, this.velocitySpread),
      startAcceleration: getRandomVector3(
        this.accelerationBase,
        this.accelerationSpread,
      ),
      startAngle: this.angle,
      startAngleVelocity: getRandomValue(
        this.angleVelocityBase,
        this.angleVelocitySpread,
      ),
      startColor,
      endColor,
      sizes: this.sizes,
      centerVelocity,
      startOpacity: hasNoCenterDirection ? 0 : this.startOpacity,
      endOpacity: hasNoCenterDirection ? 0 : this.endOpacity,
    };
  }
}
