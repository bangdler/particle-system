import {
  AnimationClip,
  BooleanKeyframeTrack,
  Color,
  InterpolateSmooth,
  MathUtils,
  NumberKeyframeTrack,
  Object3D,
  Raycaster,
  Vector3,
} from 'three';

export const getRandomValue = (base: number, spread: number): number => {
  return base + spread * MathUtils.randFloat(-1, 1);
};

export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomVector3 = (base: Vector3, spread: Vector3): Vector3 => {
  const randomVector3 = new Vector3(
    Math.random() - 0.5,
    Math.random() - 0.5,
    Math.random() - 0.5,
  );
  return new Vector3().addVectors(
    base,
    new Vector3().multiplyVectors(spread, randomVector3),
  );
};

export const getRandomColorOnBase = (base: Color, spread: number): Color => {
  const randomR = base.r + MathUtils.randFloatSpread(spread);
  const randomG = base.g + MathUtils.randFloatSpread(spread);
  const randomB = base.b + MathUtils.randFloatSpread(spread);
  return new Color(randomR, randomG, randomB);
};

export const getRandomColor = (): Color => {
  const r = Math.random();
  const g = Math.random();
  const b = Math.random();

  return new Color(r, g, b);
};

export const vectorLerp = (t: number, a: Vector3, b: Vector3): Vector3 => {
  const c = a.clone();
  return c.lerp(b, t);
};

export const createAnimationClip = (animationDuration: number, fps: number) => {
  const timeArray =
    animationDuration === 0
      ? [0]
      : Array.from({ length: animationDuration * fps }, (_, i) =>
          parseFloat(String(i / fps)),
        );

  const particleTimeKF = new NumberKeyframeTrack(
    `PARTICLE_OBJECT.material[uniforms].time[value]`,
    timeArray,
    timeArray,
    InterpolateSmooth,
  );
  const particleVisibleKF = new BooleanKeyframeTrack(
    'PARTICLE_OBJECT.material.visible',
    [0],
    [1],
  );

  const emitterVisibleKF = new BooleanKeyframeTrack(
    '.material.visible',
    [0],
    [0],
  );

  const clip = new AnimationClip('effect', animationDuration, [
    particleTimeKF,
    particleVisibleKF,
    emitterVisibleKF,
  ]);

  return clip;
};

// 한방향으로 ray를 쐈을 때 교차점이 홀수개이면 내부에 있다고 판단
export const isPointInsideMesh = (point: Vector3, mesh: Object3D) => {
  const raycaster = new Raycaster();

  const direction = new Vector3(1, 0, 0); // +X

  // Count the number of intersections
  raycaster.set(point, direction);
  const intersects = raycaster.intersectObject(mesh, false);

  // 삼각형 면이 접하는 모서리 부분에 교차점이 생기는 경우 동일한 지점에 중복 교차점이 카운팅 되는 문제가 있음.
  // 거리를 기반으로 거리가 0.001 오차로 같은 경우에는 필터링
  intersects.forEach((intersect, i) => {
    intersects.forEach((compared, j) => {
      if (i === j) return;
      if (Math.abs(intersect.distance - compared.distance) < 0.001) {
        intersects.splice(j, 1);
      }
    });
  });
  return intersects.length % 2 !== 0;
};
