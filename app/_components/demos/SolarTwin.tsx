"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/** Renders text as a dot-matrix LED face: draw it tiny, then paint one round dot per pixel. */
function useLedTexture(text: string) {
  return useMemo(() => {
    const cols = 64;
    const rows = 16;
    const cell = 8;
    const small = document.createElement("canvas");
    small.width = cols;
    small.height = rows;
    const sctx = small.getContext("2d")!;
    sctx.fillStyle = "#000";
    sctx.fillRect(0, 0, cols, rows);
    sctx.fillStyle = "#fff";
    sctx.font = "bold 12px monospace";
    sctx.textAlign = "center";
    sctx.textBaseline = "middle";
    sctx.fillText(text, cols / 2, rows / 2 + 1);
    const px = sctx.getImageData(0, 0, cols, rows).data;

    const big = document.createElement("canvas");
    big.width = cols * cell;
    big.height = rows * cell;
    const ctx = big.getContext("2d")!;
    ctx.fillStyle = "#120c04";
    ctx.fillRect(0, 0, big.width, big.height);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        ctx.fillStyle = px[(y * cols + x) * 4] > 110 ? "#ffb02e" : "#2a1d0a";
        ctx.beginPath();
        ctx.arc(x * cell + cell / 2, y * cell + cell / 2, cell * 0.36, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const tex = new THREE.CanvasTexture(big);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }, [text]);
}

function Sign({ text, brightness, on, sway }: { text: string; brightness: number; on: boolean; sway: boolean }) {
  const tex = useLedTexture(text);
  const group = useRef<THREE.Group>(null);
  const lit = on ? 0.25 + 0.75 * brightness : 0.05;

  useFrame((state) => {
    if (sway && group.current) group.current.rotation.y = -0.35 + Math.sin(state.clock.elapsedTime * 0.6) * 0.45;
  });

  const face = (
    <>
      <planeGeometry args={[2.9, 0.72]} />
      <meshBasicMaterial map={tex} color={new THREE.Color(lit, lit, lit)} toneMapped={false} />
    </>
  );

  return (
    <group ref={group} rotation={[0, -0.35, 0]}>
      {/* car roof */}
      <mesh position={[0, -0.78, 0]}>
        <boxGeometry args={[4.4, 0.22, 2.1]} />
        <meshStandardMaterial color="#2a2825" roughness={0.85} />
      </mesh>
      {/* sign body */}
      <RoundedBox args={[3.2, 1, 0.55]} radius={0.12} smoothness={4} position={[0, -0.1, 0]}>
        <meshStandardMaterial color="#e9e4d8" roughness={0.5} />
      </RoundedBox>
      <mesh position={[0, -0.1, 0.282]}>{face}</mesh>
      <mesh position={[0, -0.1, -0.282]} rotation={[0, Math.PI, 0]}>
        {face}
      </mesh>
      {/* solar panel */}
      <mesh position={[0, 0.5, 0]} rotation={[-0.22, 0, 0]}>
        <boxGeometry args={[2.8, 0.06, 0.95]} />
        <meshStandardMaterial color="#14214a" metalness={0.6} roughness={0.25} />
      </mesh>
      {/* feet */}
      {[-1.2, 1.2].map((x) => (
        <mesh key={x} position={[x, -0.66, 0]}>
          <boxGeometry args={[0.5, 0.12, 0.7]} />
          <meshStandardMaterial color="#121110" />
        </mesh>
      ))}
    </group>
  );
}

export default function SolarTwin({
  text,
  brightness,
  on,
  interactive,
  reduce,
}: {
  text: string;
  brightness: number;
  on: boolean;
  interactive: boolean;
  reduce: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0.7, 5.2], fov: 34 }}
      dpr={[1, interactive ? 2 : 1.5]}
      frameloop={reduce ? "demand" : "always"}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y" }}
      aria-label="3D model of the solar taxi roof sign"
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <Sign text={text} brightness={brightness} on={on} sway={!interactive && !reduce} />
      {interactive && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={1.1}
          maxPolarAngle={1.9}
          autoRotate={!reduce}
          autoRotateSpeed={0.8}
        />
      )}
    </Canvas>
  );
}
