"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { eye, modelState, pointer, resolveTarget } from "./eye-store";

// Meshopt + WebP optimized (gltf-transform); useGLTF decodes meshopt out of the box.
const MODEL_URL = "/models/robotic_eye.opt.glb";
const MAX_ANGLE = THREE.MathUtils.degToRad(35);
const GAZE_DEPTH = 3;
const IDLE_AFTER_MS = 2800;

function makeGlowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, "rgba(255,42,31,0.55)");
  grad.addColorStop(0.35, "rgba(255,42,31,0.18)");
  grad.addColorStop(1, "rgba(255,42,31,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export default function OpticEye() {
  const { scene } = useGLTF(MODEL_URL);
  const { camera, size } = useThree();

  const outer = useRef<THREE.Group>(null);
  const gaze = useRef<THREE.Group>(null);
  const glow = useRef<THREE.Mesh>(null);
  const keyLight = useRef<THREE.PointLight>(null);

  const ledCurrent = useRef(1);
  const snapped = useRef(false);
  const saccade = useRef({ yaw: 0, pitch: 0, next: 0 });
  const leds = useRef<THREE.MeshStandardMaterial[]>([]);

  const { normScale, offset, facing } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const dims = box.getSize(new THREE.Vector3());
    const s = 1 / Math.max(dims.x, dims.y, dims.z);

    // The LED ring sits on the optic's face: point the vector from the model's
    // center to the LEDs at the camera (+Z) instead of hard-coding an axis.
    const ledBox = new THREE.Box3();
    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      if (mats.some((m) => m.name === "Light")) ledBox.expandByObject(child);
    });
    const q = new THREE.Quaternion();
    if (!ledBox.isEmpty()) {
      const dir = ledBox.getCenter(new THREE.Vector3()).sub(center);
      if (dir.lengthSq() > 1e-8) q.setFromUnitVectors(dir.normalize(), new THREE.Vector3(0, 0, 1));
    }
    return { normScale: s, offset: center.multiplyScalar(-s), facing: q };
  }, [scene]);

  const glowTexture = useMemo(() => makeGlowTexture(), []);

  useEffect(() => {
    const found: THREE.MeshStandardMaterial[] = [];
    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      for (const m of mats) {
        if (!(m instanceof THREE.MeshStandardMaterial)) continue;
        m.envMapIntensity = 1.25;
        // The export ships the dome glass as opaque black, which hides the LED ring behind it.
        if (m.name === "Glass") {
          m.transparent = true;
          m.opacity = 0.22;
          m.depthWrite = false;
          m.envMapIntensity = 2;
        }
        if (m.name === "White_Plastic") {
          m.opacity = 0.28;
          m.depthWrite = false;
        }
        if (m.name === "Light") {
          m.toneMapped = false;
          found.push(m);
        }
      }
    });
    leds.current = found;
    modelState.loaded = true;
    modelState.progress = 1;
  }, [scene]);

  useEffect(() => () => glowTexture.dispose(), [glowTexture]);

  useFrame((state, delta) => {
    const o = outer.current;
    const g = gaze.current;
    if (!o || !g) return;
    const dt = Math.min(delta, 0.1);
    const now = performance.now();
    const time = state.clock.elapsedTime;

    const cam = camera as THREE.PerspectiveCamera;
    const visibleH = 2 * cam.position.z * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2));
    const wpp = visibleH / size.height;

    // --- docking ---
    const t = resolveTarget();
    const tx = (t.cx - size.width / 2) * wpp;
    const ty = -(t.cy - size.height / 2) * wpp;
    const ts = t.visible ? t.size * wpp : 0.0001;

    if (!snapped.current && t.visible) {
      o.position.set(tx, ty, 0);
      o.scale.setScalar(ts);
      snapped.current = true;
    } else {
      o.position.x = THREE.MathUtils.damp(o.position.x, tx, 5, dt);
      o.position.y = THREE.MathUtils.damp(o.position.y, ty, 5, dt);
      o.scale.setScalar(THREE.MathUtils.damp(o.scale.x, ts, 5, dt));
    }

    // --- gaze ---
    let targetYaw: number;
    let targetPitch: number;
    let lambda: number;
    const active = now - pointer.lastMove < IDLE_AFTER_MS || eye.locked;

    if (active) {
      const px = (pointer.x - size.width / 2) * wpp;
      const py = -(pointer.y - size.height / 2) * wpp;
      const dx = px - o.position.x;
      const dy = py - o.position.y;
      targetYaw = Math.atan2(dx, GAZE_DEPTH);
      targetPitch = Math.atan2(dy, Math.hypot(dx, GAZE_DEPTH));
      lambda = eye.locked ? 14 : 7;
    } else {
      if (now > saccade.current.next) {
        saccade.current.yaw = (Math.random() - 0.5) * 0.7;
        saccade.current.pitch = (Math.random() - 0.5) * 0.4;
        saccade.current.next = now + 1400 + Math.random() * 2000;
      }
      targetYaw = saccade.current.yaw;
      targetPitch = saccade.current.pitch;
      lambda = 16;
    }

    targetYaw = THREE.MathUtils.clamp(targetYaw, -MAX_ANGLE, MAX_ANGLE);
    targetPitch = THREE.MathUtils.clamp(targetPitch, -MAX_ANGLE, MAX_ANGLE);

    const tremor = Math.sin(time * 23) * 0.0025;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetYaw, lambda, dt) + tremor;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -targetPitch, lambda, dt);

    eye.yaw = THREE.MathUtils.radToDeg(g.rotation.y);
    eye.pitch = THREE.MathUtils.radToDeg(-g.rotation.x);

    // --- LEDs ---
    const blink = (time % 7.3) < 0.12 ? 0.15 : 1;
    const lockBoost = eye.locked ? 1.6 + Math.sin(time * 10) * 0.4 : 1;
    ledCurrent.current = THREE.MathUtils.damp(ledCurrent.current, t.led * lockBoost, 4, dt);
    const led = ledCurrent.current * blink;
    eye.led = led;
    // three.js materials are mutable scene objects; per-frame mutation is the intended API.
    // eslint-disable-next-line react-hooks/immutability
    for (const m of leds.current) m.emissiveIntensity = 4.5 * led;

    if (glow.current) {
      (glow.current.material as THREE.MeshBasicMaterial).opacity = 0.28 * Math.min(led, 2);
    }
    if (keyLight.current) keyLight.current.intensity = 3 * led;
  });

  return (
    <group ref={outer}>
      <mesh ref={glow} position={[0, 0, -0.45]} scale={1.9} renderOrder={-1}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={glowTexture}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
      <pointLight ref={keyLight} position={[0, 0, 1.4]} color="#ff2a1f" distance={4} decay={2} />
      <group ref={gaze}>
        <group quaternion={facing}>
          <primitive object={scene} scale={normScale} position={offset} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_URL);
