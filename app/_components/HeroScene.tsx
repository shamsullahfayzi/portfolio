"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// The portrait is rebuilt out of ~32,000 particles. Each one remembers its home spot in the photo; the cursor
// pushes and swirls them out of the picture like liquid and they flow back. Scrolling away dissolves the portrait.
// Idea from "Liquid Sculpture Hero" by gughigug on 21st.dev (image particles displaced by the cursor, then returning home),
// rebuilt here as a small R3F shader instead of a GPGPU simulation so it stays light.

const COLS = 160;
const ROWS = 200; // 4:5 portrait
const PLANE_H = 2; // world height of the portrait; width = 1.6
const FOV = 40;
// The canvas extends PAD beyond the stage on every side (see .hero-3d), so particles pushed out of the frame stay visible.
// The portrait fills FIT of the stage; the camera is placed so it keeps that size on the larger canvas.
const PAD = 0.35;
const FIT = 0.8;
const VIEW_H = (PLANE_H / FIT) * (1 + 2 * PAD); // world height visible at z = 0
const CAM_Z = VIEW_H / (2 * Math.tan((FOV * Math.PI) / 360));

const VERT = /* glsl */ `
  attribute vec3 aColor;
  attribute float aSeed;
  uniform float uTime;
  uniform float uIntro;
  uniform float uPush;
  uniform float uPresence;
  uniform float uDisperse;
  uniform float uSize;
  uniform float uRadius;
  uniform vec2 uMouse;
  varying vec3 vColor;
  varying float vGlow;

  float hash(float n) { return fract(sin(n) * 43758.5453); }

  void main() {
    vec3 home = position;

    // Intro: every particle flies in from a scattered start, staggered by its seed.
    float a = aSeed * 6.2831;
    float b = hash(aSeed * 91.7) * 3.1416;
    vec3 start = vec3(cos(a) * sin(b), sin(a) * sin(b), cos(b)) * (1.1 + aSeed * 1.5);
    float t = clamp((uIntro - aSeed * 0.45) / 0.55, 0.0, 1.0);
    t = 1.0 - pow(1.0 - t, 3.0);
    vec3 p = mix(start, home, t);

    // Idle: the picture breathes.
    p.z += sin(uTime * 0.9 + home.x * 4.0 + home.y * 3.0) * 0.012;

    // Cursor: push away, swirl sideways, lift out of the plane.
    vec2 d = p.xy - uMouse;
    float dist = length(d);
    float f = smoothstep(uRadius, 0.0, dist);
    f = f * f * uPresence;
    vec2 dir = d / (dist + 0.0001);
    vec2 sw = vec2(-dir.y, dir.x);
    float wob = sin(uTime * 2.0 + aSeed * 20.0);
    p.xy += (dir * 0.55 + sw * 0.35 * wob) * f * uPush * (0.4 + aSeed);
    p.z += f * uPush * (0.3 + aSeed * 0.9);

    // Scrolling away: the portrait drifts apart.
    p += (vec3(p.xy, 0.0) * 0.9 + vec3(0.0, 0.0, aSeed)) * uDisperse * (0.4 + aSeed);

    vColor = aColor;
    vGlow = f;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (1.0 + f * 1.3 + uDisperse * 0.6) * (${CAM_Z.toFixed(2)} / -mv.z);
  }
`;

const FRAG = /* glsl */ `
  varying vec3 vColor;
  varying float vGlow;
  uniform float uDisperse;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    float a = smoothstep(0.5, 0.3, r);
    vec3 col = vColor + vGlow * 0.22;
    gl_FragColor = vec4(col, a * (1.0 - uDisperse));
  }
`;

type Particles = { pos: Float32Array; col: Float32Array; seed: Float32Array };

/** Reads the photo into a grid and turns each pixel into a particle: colour from the pixel, depth from a subject bulge + brightness. */
function sample(img: HTMLImageElement): Particles {
  const c = document.createElement("canvas");
  c.width = COLS;
  c.height = ROWS;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  // The source is square; crop to 4:5 around the subject (right of centre).
  const sw = img.naturalWidth * 0.8;
  ctx.drawImage(img, img.naturalWidth * 0.2, 0, sw, img.naturalHeight, 0, 0, COLS, ROWS);
  const px = ctx.getImageData(0, 0, COLS, ROWS).data;

  const n = COLS * ROWS;
  const pos = new Float32Array(n * 3);
  const col = new Float32Array(n * 3);
  const seed = new Float32Array(n);
  const w = PLANE_H * (COLS / ROWS);

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const i = y * COLS + x;
      const r = px[i * 4] / 255;
      const g = px[i * 4 + 1] / 255;
      const b = px[i * 4 + 2] / 255;
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      const u = x / (COLS - 1) - 0.5; // -0.5..0.5
      const v = 0.5 - y / (ROWS - 1);
      // Subject bulge: the figure sits right of centre and rises toward the viewer.
      const bulge = Math.exp(-(((u - 0.1) / 0.28) ** 2 + ((v + 0.02) / 0.42) ** 2));
      pos[i * 3] = u * w + (Math.random() - 0.5) * 0.004;
      pos[i * 3 + 1] = v * PLANE_H + (Math.random() - 0.5) * 0.004;
      pos[i * 3 + 2] = bulge * 0.45 + lum * 0.12;
      // A touch of contrast so the colours stay punchy as dots.
      col[i * 3] = Math.min(1, (r - 0.5) * 1.12 + 0.52);
      col[i * 3 + 1] = Math.min(1, (g - 0.5) * 1.12 + 0.52);
      col[i * 3 + 2] = Math.min(1, (b - 0.5) * 1.12 + 0.52);
      seed[i] = Math.random();
    }
  }
  return { pos, col, seed };
}

function Portrait({
  data,
  boxRef,
  pointer,
  animate,
  onReady,
}: {
  data: Particles;
  boxRef: React.RefObject<HTMLDivElement | null>;
  pointer: React.RefObject<{ x: number; y: number; inside: boolean }>;
  animate: boolean;
  onReady: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const intro = useRef(0);
  const mouse = useRef(new THREE.Vector2(9, 9));
  const presence = useRef(0);
  const seen = useRef(false); // has the cursor been over the page yet

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(data.pos, 3));
    g.setAttribute("aColor", new THREE.BufferAttribute(data.col, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(data.seed, 1));
    return g;
  }, [data]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntro: { value: 0 },
      uPush: { value: 0.85 },
      uPresence: { value: 0 },
      uDisperse: { value: 0 },
      uSize: { value: 2.6 },
      uRadius: { value: 0.46 },
      uMouse: { value: new THREE.Vector2(9, 9) },
    }),
    [],
  );

  useEffect(() => {
    onReady();
  }, [onReady]);

  useFrame((state, dt) => {
    const m = mat.current;
    const g = group.current;
    if (!m || !g) return;
    const u = m.uniforms;
    const time = animate ? state.clock.elapsedTime : 0;

    if (animate) intro.current = Math.min(1.6, intro.current + dt * 0.8);
    u.uTime.value = time;
    u.uIntro.value = intro.current;
    u.uSize.value = 2.35 * state.gl.getPixelRatio();
    u.uDisperse.value = Math.min(1, Math.max(0, (window.scrollY - 40) / (window.innerHeight * 0.85)));

    // Cursor position in the portrait's own coordinates; eased, so the push trails the pointer like liquid.
    const el = boxRef.current;
    const p = pointer.current;
    if (el && p.inside) {
      const r = el.getBoundingClientRect();
      const nx = (p.x - r.left) / r.width;
      const ny = (p.y - r.top) / r.height;
      const mx = (nx - 0.5) * VIEW_H;
      const my = -(ny - 0.5) * VIEW_H;
      if (!seen.current) {
        // First time the cursor appears: start the push where it is, not flying in from off-screen.
        seen.current = true;
        mouse.current.set(mx, my);
      }
      mouse.current.x = THREE.MathUtils.damp(mouse.current.x, mx, 9, dt);
      mouse.current.y = THREE.MathUtils.damp(mouse.current.y, my, 9, dt);
      const near = nx > -0.15 && nx < 1.15 && ny > -0.15 && ny < 1.15;
      presence.current = THREE.MathUtils.damp(presence.current, near ? 1 : 0, 5, dt);
    } else {
      presence.current = THREE.MathUtils.damp(presence.current, 0, 5, dt);
    }
    u.uMouse.value.copy(mouse.current);
    u.uPresence.value = presence.current;

    // Slight tilt toward the cursor so the relief reads as depth.
    const tx = p.inside ? (p.x / window.innerWidth) * 2 - 1 : 0;
    const ty = p.inside ? (p.y / window.innerHeight) * 2 - 1 : 0;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, tx * 0.22 + Math.sin(time * 0.5) * 0.05, 3, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -ty * 0.14, 3, dt);
  });

  return (
    <group ref={group}>
      <points geometry={geometry} frustumCulled={false}>
        <shaderMaterial ref={mat} vertexShader={VERT} fragmentShader={FRAG} uniforms={uniforms} transparent depthWrite={false} />
      </points>
    </group>
  );
}

/** The hero portrait made of particles. Mounts only on demand; the still photo stays underneath until this has drawn. */
export default function HeroScene({ photo, fine, reduce, onReady }: { photo: string; fine: boolean; reduce: boolean; onReady: () => void }) {
  const box = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: -9999, y: -9999, inside: false });
  const [data, setData] = useState<Particles | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!photo) return;
    const img = new Image();
    img.onload = () => setData(sample(img));
    img.src = photo;
  }, [photo]);

  // Stop rendering when scrolled out of view.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!fine || reduce) return;
    const move = (e: PointerEvent) => {
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;
      pointer.current.inside = true;
    };
    const leave = () => {
      pointer.current.inside = false;
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [fine, reduce]);

  const animate = !reduce && visible;

  return (
    <div ref={box} className="hero-3d-box">
      {data && (
        <Canvas
          flat
          camera={{ position: [0, 0, CAM_Z], fov: FOV }}
          dpr={[1, fine ? 2 : 1.5]}
          frameloop={animate ? "always" : "demand"}
          gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        >
          <Portrait data={data} boxRef={box} pointer={pointer} animate={animate} onReady={onReady} />
        </Canvas>
      )}
    </div>
  );
}
