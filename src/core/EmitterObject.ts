import { Box3, MathUtils, Mesh, Object3D, Vector3 } from 'three';
import { EmitterObjectParameter } from './types/particleSystem';
import { isPointInsideMesh } from './utils';

export class EmitterObject {
  mesh: Object3D;
  private boundingBox: Box3 = new Box3();

  constructor({ mesh }: EmitterObjectParameter) {
    this.mesh = mesh;
    this.setBoundingBox();
  }

  setBoundingBox() {
    const cloneMesh = this.mesh.clone().clear();
    this.boundingBox.setFromObject(cloneMesh);
  }

  getInitPosition(): Vector3 {
    // 이미터 geometry의 임의의 vertex
    let point = this.getVertexFromEmitterGeometry();

    let isInside = false;
    // TODO: 계속해서 외부의 점이 생성되는 경우 해결방법 최적화 필요
    for (let i = 0; i < 10; i++) {
      // mesh 의 현재 boundingBox 내에서 랜덤한 점 구하기
      const randomWolrdPoint = new Vector3(
        MathUtils.randFloat(this.boundingBox.min.x, this.boundingBox.max.x),
        MathUtils.randFloat(this.boundingBox.min.y, this.boundingBox.max.y),
        MathUtils.randFloat(this.boundingBox.min.z, this.boundingBox.max.z)
      );

      // 플레인 지오메트리의 경우 내부 판별이 필요 없음
      if (this.mesh.userData.emitterType === 'PLANE') {
        isInside = true;
        point = randomWolrdPoint;
        break;
      }

      if (isPointInsideMesh(randomWolrdPoint, this.mesh)) {
        isInside = true;
        point = randomWolrdPoint;
        break;
      }
    }

    const randomLocalPoint = isInside
      ? point.clone().applyMatrix4(this.mesh.matrixWorld.clone().invert())
      : point;
    return randomLocalPoint;
  }

  getCenterPosition(): Vector3 {
    const randomWorldCenter = this.boundingBox.getCenter(new Vector3());

    const randomLocalPoint = randomWorldCenter
      .clone()
      .applyMatrix4(this.mesh.matrixWorld.clone().invert());

    const firstEmitterVertex = this.getVertexFromEmitterGeometry(0);

    // 콘 모양 이미터의 경우 꼭지점이 중심
    if (this.mesh.userData.emitterType === 'CONE') return firstEmitterVertex;

    return randomLocalPoint;
  }

  getVertexFromEmitterGeometry(index?: number) {
    const vertex = new Vector3();
    if (!(this.mesh instanceof Mesh)) return vertex;

    const positionAttribute = this.mesh.geometry.getAttribute('position');
    const vertexIdx =
      index ?? Math.floor(Math.random() * positionAttribute.count);

    vertex.fromBufferAttribute(positionAttribute, vertexIdx);

    return vertex;
  }
}
