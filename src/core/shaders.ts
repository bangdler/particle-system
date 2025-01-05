import { ShaderChunk } from 'three';

export const particleVertexShader = `
${ShaderChunk.common}
${ShaderChunk.fog_pars_vertex}
${ShaderChunk.clipping_planes_pars_vertex}

uniform float time;
attribute float life;
attribute float startTime;
attribute float offsetTime;
attribute vec3 velocity;
attribute vec3 acceleration;
attribute float angle;
attribute float angleVelocity;
attribute vec3 startColor;
attribute vec3 endColor;
attribute vec3 sizes;
attribute vec3 centerVelocity;
attribute float startOpacity;
attribute float endOpacity;
varying vec4  vColor;
varying float vAngle;
varying float vSize;

// 0, 1을 지나면서 최대값이 1인 포물선
float parabola( float x, float k ){
    return pow( 4.0*x*(1.0-x), k );
}

void main() {
    float age = (time - startTime - offsetTime);    // shader 가동 후 경과 시간
    float curAge = mod(age, life);                  // 생명주기 내에서 현재 나이 (생명주기를 넘어갈 경우 초기화를 위해 나머지 mod 사용)
    float percentLife = curAge / life;              // 생명주기 대비 현재 나이 (0~1)
    float opacity = mix(startOpacity, endOpacity, percentLife);
    float isVisible = step(0.0, age);
    float afterMid = step(0.5, percentLife);
    const float scale = 300.0;

    vColor = vec4(mix(startColor, endColor, percentLife), opacity * isVisible);
    
    vAngle = angle * PI / 180.0 + angleVelocity * PI / 180.0 * curAge;

    // 생명퍼센트가 0, 0.5, 1 일 때 크기를 보간
    // 0.5를 기준으로 두번의 보간을 수행. mix 사용 시 0~1범위이므로 선형적으로 범위를 늘려줘야 한다.
    vSize = afterMid * mix(sizes.y - (sizes.z - sizes.y), sizes.z, percentLife) 
            + (1.0 - afterMid) * mix(sizes.x, sizes.y + (sizes.y - sizes.x), percentLife);

    vec3 localPosition = position;
    if(isVisible >= 1.0) {
        localPosition = position + velocity * curAge 
        + acceleration * curAge * curAge
        + centerVelocity * curAge;
    } 
   
    // 처음 입자 방향과 지금 방향이 같은지
    // float isTowardCenter = step(0.0, dot2(normalize(localPosition), normalize(position)));
 
    vec4 mvPosition = modelViewMatrix * vec4( localPosition, 1.0 );
    ${ShaderChunk.clipping_planes_vertex}
    ${ShaderChunk.fog_vertex}

    gl_PointSize = vSize;
    bool isPerspective = isPerspectiveMatrix( projectionMatrix );
    if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );

    gl_Position = projectionMatrix * mvPosition;
}
`;

export const particleFragmentShader = `
${ShaderChunk.common}
${ShaderChunk.fog_pars_fragment}
${ShaderChunk.alphatest_pars_fragment}
${ShaderChunk.clipping_planes_pars_fragment}

uniform mat3 uvTransform;
uniform vec3 diffuse;
uniform float opacity;

uniform sampler2D map;

varying vec4 vColor;
varying float vAngle;

vec2 rotateUVAroundCenter(vec2 uv, float angle, vec2 center) {
    // 중심으로 이동
    uv -= center;

    float s = sin(angle);
    float c = cos(angle);
    mat2 rotationMatrix = mat2(c, -s, s, c);
    uv = rotationMatrix * uv;

    // 중심으로 다시 이동
    uv += center;

    return uv;
}

void main() {
    // sheet 애니메이션의 경우 텍스쳐를 이동하기 위한 uvTransform 을 넘겨준다.
	vec2 transformedUV = ( uvTransform * vec3( gl_PointCoord.x , gl_PointCoord.y , 1 ) ).xy;
    vec2 transformedCenter =  ( uvTransform * vec3( 0.5 , 0.5 , 1 ) ).xy;
    vec4 diffuseColor = vec4( diffuse, opacity );
    ${ShaderChunk.clipping_planes_fragment}

    gl_FragColor = vColor * diffuseColor;
    
    vec2 rotatedUV = rotateUVAroundCenter(transformedUV, vAngle, transformedCenter);
    vec4 rotatedTexture = texture2D( map,  rotatedUV );
    gl_FragColor = gl_FragColor * rotatedTexture;
    ${ShaderChunk.alphatest_fragment}
    ${ShaderChunk.fog_fragment}
}`;
