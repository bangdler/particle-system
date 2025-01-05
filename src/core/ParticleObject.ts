import {
  Blending,
  BufferAttribute,
  BufferGeometry,
  Points,
  ShaderMaterial,
  Texture,
  UniformsLib,
  UniformsUtils
} from 'three';
import Particle from './Particle.js';
import { particleFragmentShader, particleVertexShader } from './shaders.js';
import { ParticleObjectParameter } from './types/particleSystem.js';

export default class ParticleObject {
  mesh: Points = new Points();
  private geometry: BufferGeometry = new BufferGeometry();
  private material: ShaderMaterial = new ShaderMaterial();
  private texture: Texture;
  private blending: Blending;
  private depthComparison: boolean;

  constructor({ texture, blending, depthComparison }: ParticleObjectParameter) {
    this.texture = texture;
    this.blending = blending;
    this.depthComparison = depthComparison;
  }

  private setGeometry(particleArray: Particle[]) {
    this.geometry = new BufferGeometry();

    const particleCount = particleArray.length;
    const startTimes = new Float32Array(particleCount);
    const lives = new Float32Array(particleCount);
    const offsetTimes = new Float32Array(particleCount);
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const accelerations = new Float32Array(particleCount * 3);
    const angles = new Float32Array(particleCount);
    const angleVelocities = new Float32Array(particleCount);
    const startColors = new Float32Array(particleCount * 3);
    const endColors = new Float32Array(particleCount * 3);
    const sizesArray = new Float32Array(particleCount * 3);
    const centerVelocities = new Float32Array(particleCount * 3);
    const startOpacities = new Float32Array(particleCount);
    const endOpacities = new Float32Array(particleCount);

    particleArray.forEach((particle, i) => {
      startTimes[i] = particle.startTime;
      lives[i] = particle.life;
      offsetTimes[i] = particle.offsetTime;
      particle.position.toArray(positions, i * 3);
      particle.velocity.toArray(velocities, i * 3);
      particle.acceleration.toArray(accelerations, i * 3);
      angleVelocities[i] = particle.angleVelocity;
      angles[i] = particle.angle;
      particle.startColor.toArray(startColors, i * 3);
      particle.endColor.toArray(endColors, i * 3);
      sizesArray[i * 3] = particle.sizes[0];
      sizesArray[i * 3 + 1] = particle.sizes[1];
      sizesArray[i * 3 + 2] = particle.sizes[2];
      particle.centerVelocity.toArray(centerVelocities, i * 3);
      startOpacities[i] = particle.startOpacity;
      endOpacities[i] = particle.endOpacity;
    });

    this.geometry.setAttribute('startTime', new BufferAttribute(startTimes, 1));
    this.geometry.setAttribute('life', new BufferAttribute(lives, 1));
    this.geometry.setAttribute(
      'offsetTime',
      new BufferAttribute(offsetTimes, 1)
    );

    this.geometry.setAttribute('position', new BufferAttribute(positions, 3));
    this.geometry.setAttribute('velocity', new BufferAttribute(velocities, 3));
    this.geometry.setAttribute(
      'acceleration',
      new BufferAttribute(accelerations, 3)
    );
    this.geometry.setAttribute('angle', new BufferAttribute(angles, 1));
    this.geometry.setAttribute(
      'angleVelocity',
      new BufferAttribute(angleVelocities, 1)
    );
    this.geometry.setAttribute(
      'startColor',
      new BufferAttribute(startColors, 3)
    );
    this.geometry.setAttribute('endColor', new BufferAttribute(endColors, 3));
    this.geometry.setAttribute('sizes', new BufferAttribute(sizesArray, 3));
    this.geometry.setAttribute(
      'centerVelocity',
      new BufferAttribute(centerVelocities, 3)
    );
    this.geometry.setAttribute(
      'startOpacity',
      new BufferAttribute(startOpacities, 1)
    );
    this.geometry.setAttribute(
      'endOpacity',
      new BufferAttribute(endOpacities, 1)
    );
  }

  private setMaterial() {
    this.setTexture(1, 1);
    this.material = new ShaderMaterial({
      uniforms: UniformsUtils.merge([
        UniformsLib['common'],
        UniformsLib['fog'],
        {
          time: { value: 0.0 },
          map: { value: this.texture },
          uvTransform: { value: this.texture.matrix }
        }
      ]),
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,
      blending: this.blending,
      depthTest: true,
      depthWrite: this.depthComparison,
      alphaToCoverage: this.depthComparison,
      fog: true
    });
    this.material.visible = false;
  }

  // sprite sheet 이미지를 사용하는 경우
  private setTexture(horizontalTileNum: number, verticalTileNum: number) {
    this.texture.repeat.set(1 / horizontalTileNum, 1 / verticalTileNum);
  }

  create(particleArray: Particle[]) {
    this.geometry.dispose();
    this.material.dispose();

    this.setGeometry(particleArray);
    this.setMaterial();

    this.mesh.geometry = this.geometry;
    this.mesh.material = this.material;
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 1;
  }
}
