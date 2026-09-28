'use client';

import { useEffect, useRef, useState } from 'react';

type WaterRippleImageProps = {
  src: string;
  mobileSrc?: string;
  blueish?: number;
  scale?: number;
  illumination?: number;
  surfaceDistortion?: number;
  waterDistortion?: number;
  /** Fraction of the height (0 = top, 1 = bottom) where the water starts. */
  waterLine?: number;
  className?: string;
};

// Keeps the fragment shader cheap on large/high-DPR screens.
const MAX_PIXELS = 2_500_000;
const MOBILE_QUERY = '(max-width: 767px)';

const VERT = `
attribute vec2 a_position;
varying vec2 vUv;
void main() {
  vUv = .5 * (a_position + 1.);
  gl_Position = vec4(a_position, 0., 1.);
}
`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

varying vec2 vUv;
uniform sampler2D u_image;
uniform float u_time;
uniform float u_ratio;
uniform float u_img_ratio;
uniform float u_blueish;
uniform float u_scale;
uniform float u_illumination;
uniform float u_surface_distortion;
uniform float u_water_distortion;
uniform float u_water_line;

vec3 mod289(vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec2 mod289(vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec3 permute(vec3 x) { return mod289(((x * 34.) + 1.) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1., 0.) : vec2(0., 1.);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0., i1.y, 1.)) + i.x + vec3(0., i1.x, 1.));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.);
  m = m * m;
  m = m * m;
  vec3 x = 2. * fract(p * C.www) - 1.;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130. * dot(m, g);
}

mat2 rotate2D(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

float surface_noise(vec2 uv, float t, float scale) {
  vec2 n = vec2(.1);
  vec2 N = vec2(.1);
  mat2 m = rotate2D(.5);
  for (int j = 0; j < 10; j++) {
    uv *= m;
    n *= m;
    vec2 q = uv * scale + float(j) + n + (.5 + .5 * float(j)) * (mod(float(j), 2.) - 1.) * t;
    n += sin(q);
    N += cos(q) / scale;
    scale *= 1.2;
  }
  return N.x + N.y + .1;
}

void main() {
  vec2 uv = vUv;
  uv.y = 1. - uv.y;
  uv.x *= u_ratio;

  float t = .002 * u_time;
  float outer_noise = snoise((.3 + .1 * sin(t)) * uv + vec2(0., .2 * t));
  float surf = surface_noise(2. * uv + outer_noise * .2, t, u_scale);
  surf *= pow(uv.y, .3);
  surf = pow(surf, 2.);

  // object-fit: cover, slightly zoomed so the distortion never samples past the edges
  vec2 img_uv = vUv - .5;
  if (u_ratio > u_img_ratio) {
    img_uv.y *= u_img_ratio / u_ratio;
  } else {
    img_uv.x *= u_ratio / u_img_ratio;
  }
  img_uv *= .98;
  img_uv += .5;
  img_uv.y = 1. - img_uv.y;

  // uv.y runs 0 (top) to 1 (bottom): ripple only below the water line, feathered in
  float mask = smoothstep(u_water_line, u_water_line + .2, uv.y);
  img_uv += mask * (u_water_distortion * outer_noise + u_surface_distortion * surf);

  vec3 color = texture2D(u_image, img_uv).rgb;
  color *= 1. + mask * u_illumination * surf;
  color += mask * u_illumination * vec3(1. - u_blueish, 1., 1.) * surf;

  gl_FragColor = vec4(color, 1.);
}
`;

function compileShader(gl: WebGLRenderingContext, source: string, type: number) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('createShader failed');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile error: ${info}`);
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vs = compileShader(gl, VERT, gl.VERTEX_SHADER);
  const fs = compileShader(gl, FRAG, gl.FRAGMENT_SHADER);
  const program = gl.createProgram();
  if (!program) throw new Error('createProgram failed');
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`Program link error: ${info}`);
  }
  return program;
}

export default function WaterRippleImage({
  src,
  mobileSrc,
  blueish = 0.3,
  scale = 7,
  illumination = 0.12,
  surfaceDistortion = 0.03,
  waterDistortion = 0.015,
  waterLine = 0.5,
  className = '',
}: WaterRippleImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      powerPreference: 'low-power',
    });
    if (!gl) return;

    let program: WebGLProgram;
    try {
      program = createProgram(gl);
    } catch (err) {
      console.error(err);
      return;
    }
    gl.useProgram(program);

    const uniform = (name: string) => gl.getUniformLocation(program, name);
    const uTime = uniform('u_time');
    const uRatio = uniform('u_ratio');
    const uImgRatio = uniform('u_img_ratio');
    gl.uniform1f(uniform('u_blueish'), blueish);
    gl.uniform1f(uniform('u_scale'), scale);
    gl.uniform1f(uniform('u_illumination'), illumination);
    gl.uniform1f(uniform('u_surface_distortion'), surfaceDistortion);
    gl.uniform1f(uniform('u_water_distortion'), waterDistortion);
    gl.uniform1f(uniform('u_water_line'), waterLine);
    gl.uniform1i(uniform('u_image'), 0);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPosition = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const start = performance.now();
    let texture: WebGLTexture | null = null;
    let hasImage = false;
    let visible = true;
    let disposed = false;
    let frame = 0;

    const draw = () => {
      gl.uniform1f(uTime, performance.now() - start);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = () => {
      frame = 0;
      if (!visible || !hasImage) return;
      draw();
      frame = requestAnimationFrame(loop);
    };

    const play = () => {
      if (!frame && visible && hasImage) frame = requestAnimationFrame(loop);
    };

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(MAX_PIXELS / (width * height)));
      const w = Math.round(width * dpr);
      const h = Math.round(height * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform1f(uRatio, w / h);
      // Resizing clears the buffer; repaint now to avoid a black flash.
      if (hasImage) draw();
    };

    const image = new Image();
    image.decoding = 'async';
    image.onload = () => {
      if (disposed) return;
      texture = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
      gl.uniform1f(uImgRatio, image.naturalWidth / image.naturalHeight);
      hasImage = true;
      resize();
      setReady(true);
      play();
    };
    image.src = mobileSrc && window.matchMedia(MOBILE_QUERY).matches ? mobileSrc : src;

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      play();
    });
    intersectionObserver.observe(canvas);

    resize();

    return () => {
      disposed = true;
      image.onload = null;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, [src, mobileSrc, blueish, scale, illumination, surfaceDistortion, waterDistortion, waterLine]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none h-full w-full transition-opacity duration-[1200ms] ease-out ${
        ready ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    />
  );
}
