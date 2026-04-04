"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, Center } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

// ===== 3D MODEL FOR PRELOADER =====
function PreloaderModel({ phase }: { phase: number }) {
  const { scene } = useGLTF("/models/cyborg_with_thermal_katana.glb");
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const mat = child.material as THREE.MeshStandardMaterial;
        if (mat.isMeshStandardMaterial) {
          if (mat.emissive && mat.emissiveIntensity > 0.05) {
            mat.emissiveIntensity = Math.max(mat.emissiveIntensity, 4);
            mat.toneMapped = false;
          }
          mat.envMapIntensity = 1.5;
          mat.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    // Slow rotation
    groupRef.current.rotation.y = -0.5 + time * 0.15;

    // Phase-based opacity
    const targetOpacity = phase >= 2 ? 1 : 0;
    groupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const mat = child.material as THREE.MeshStandardMaterial;
        if (!mat.transparent) mat.transparent = true;
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, 0.03);
      }
    });

    // Subtle bob
    groupRef.current.position.y = Math.sin(time * 0.5) * 0.02;
  });

  if (!scene) return null;

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene} scale={0.055} />
      </Center>
    </group>
  );
}

// ===== SCANNING BEAM =====
function ScanBeam({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <motion.div
      initial={{ top: "20%" }}
      animate={{ top: ["20%", "80%", "20%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-0 right-0 h-[1px] z-30 pointer-events-none"
      style={{
        background: "linear-gradient(90deg, transparent 0%, #ff2a2a 30%, #ff2a2a 70%, transparent 100%)",
        boxShadow: "0 0 15px 3px rgba(255, 42, 42, 0.3)",
      }}
    />
  );
}

// ===== MAIN PRELOADER =====
interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [visible, setVisible] = useState(true);
  const hasCompleted = useRef(false);

  useEffect(() => {
    if (hasCompleted.current) return;

    // Phase 1: System Init (0-0.8s)
    setPhase(1);
    setStatusText("INITIALIZING SYSTEM...");

    const t1 = setTimeout(() => {
      // Phase 2: Core Activation (0.8-2s)
      setPhase(2);
      setStatusText("LOADING NEURAL CORE...");
    }, 800);

    const t2 = setTimeout(() => {
      setStatusText("CALIBRATING INTERFACE...");
    }, 1500);

    const t3 = setTimeout(() => {
      // Phase 3: Scan (2-3.2s)
      setPhase(3);
      setStatusText("SYNCING MODULES...");
    }, 2000);

    const t4 = setTimeout(() => {
      setStatusText("ANALYZING SYSTEM...");
    }, 2800);

    const t5 = setTimeout(() => {
      // Phase 4: Ready (3.2-4s)
      setPhase(4);
      setStatusText("SYSTEM READY");
    }, 3200);

    const t6 = setTimeout(() => {
      // Phase 5: Exit — slide up
      hasCompleted.current = true;
      setVisible(false);
      setTimeout(() => onComplete?.(), 1000);
    }, 4000);

    // Progress counter
    const duration = 3800;
    const startTime = Date.now();
    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      const raw = Math.min(elapsed / duration, 1);
      const eased = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
      setProgress(Math.round(eased * 100));
      if (raw < 1) requestAnimationFrame(animateProgress);
    };
    setTimeout(() => requestAnimationFrame(animateProgress), 300);

    return () => {
      [t1, t2, t3, t4, t5, t6].forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] overflow-hidden"
          style={{ background: "#030303" }}
        >
          {/* Red center glow — pulses with phase */}
          <motion.div
            animate={{
              opacity: phase >= 2 ? 0.12 : 0.04,
              scale: phase >= 4 ? 1.3 : 1,
            }}
            transition={{ duration: 1.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, rgba(255, 30, 30, 0.15) 0%, transparent 70%)",
            }}
          />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,42,42,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,42,42,0.3) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Scanning beam */}
          <ScanBeam active={phase === 3} />

          {/* HUD corner brackets */}
          <div className="absolute top-6 left-6">
            <div className="w-[30px] h-[1px] bg-[#ff2a2a]/20" />
            <div className="w-[1px] h-[30px] bg-[#ff2a2a]/20" />
          </div>
          <div className="absolute top-6 right-6 flex flex-col items-end">
            <div className="w-[30px] h-[1px] bg-[#ff2a2a]/20" />
            <div className="w-[1px] h-[30px] bg-[#ff2a2a]/20 self-end" />
          </div>
          <div className="absolute bottom-6 left-6">
            <div className="w-[1px] h-[30px] bg-[#ff2a2a]/20" />
            <div className="w-[30px] h-[1px] bg-[#ff2a2a]/20" />
          </div>
          <div className="absolute bottom-6 right-6 flex flex-col items-end">
            <div className="w-[1px] h-[30px] bg-[#ff2a2a]/20 self-end" />
            <div className="w-[30px] h-[1px] bg-[#ff2a2a]/20" />
          </div>

          {/* 3D Model Canvas — center */}
          <div className="absolute inset-0 z-10">
            <Canvas
              camera={{ position: [0, 0.3, 2.5], fov: 45 }}
              dpr={1}
              gl={{ antialias: true, alpha: true, toneMapping: 4, toneMappingExposure: 1.2 }}
              style={{ background: "transparent" }}
            >
              <ambientLight intensity={0.15} color="#1a0000" />
              <directionalLight position={[3, 5, 4]} intensity={1} color="#ffffff" />
              <pointLight position={[2, 0, 3]} intensity={1.5} color="#ff2a2a" distance={10} />
              <pointLight position={[-2, 1, 2]} intensity={0.4} color="#ff0000" distance={8} />
              <pointLight position={[0, -2, 2]} intensity={0.3} color="#ff1a1a" distance={6} />

              <Suspense fallback={null}>
                <Environment preset="night" />
                <PreloaderModel phase={phase} />
              </Suspense>
            </Canvas>
          </div>

          {/* UI Overlay — on top of 3D */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-between py-12 pointer-events-none">
            {/* Top: Status indicators */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-[5px] h-[5px] rounded-full"
                  style={{ background: phase >= 2 ? "#ff2a2a" : "#333" }}
                />
                <span className="text-[9px] text-white/15 uppercase tracking-[3px] font-sans">
                  Neural Core
                </span>
              </div>
              <div className="flex items-center gap-2">
                <motion.span
                  animate={{ opacity: phase >= 3 ? [0.3, 1, 0.3] : 0.2 }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                  className="w-[5px] h-[5px] rounded-full"
                  style={{ background: phase >= 3 ? "#ff2a2a" : "#333" }}
                />
                <span className="text-[9px] text-white/15 uppercase tracking-[3px] font-sans">
                  Interface
                </span>
              </div>
              <div className="flex items-center gap-2">
                <motion.span
                  animate={{ opacity: phase >= 4 ? [0.3, 1, 0.3] : 0.2 }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                  className="w-[5px] h-[5px] rounded-full"
                  style={{ background: phase >= 4 ? "#ff2a2a" : "#333" }}
                />
                <span className="text-[9px] text-white/15 uppercase tracking-[3px] font-sans">
                  Modules
                </span>
              </div>
            </div>

            {/* Center: Counter + Status */}
            <div className="flex flex-col items-center">
              {/* Progress number */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex items-baseline"
              >
                <span
                  className="text-[80px] sm:text-[100px] font-instrument-serif text-white/90 tabular-nums tracking-tighter leading-none"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {progress}
                </span>
                <span className="text-[22px] font-instrument-serif text-[#ff2a2a]/40 ml-1">
                  %
                </span>
              </motion.div>

              {/* Status text */}
              <motion.p
                key={statusText}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-[10px] uppercase tracking-[5px] font-sans mt-4"
                style={{ color: phase >= 4 ? "#ff2a2a" : "rgba(255,255,255,0.2)" }}
              >
                {statusText}
              </motion.p>

              {/* Progress bar */}
              <div className="mt-6 w-[200px] h-[1px] bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full origin-left"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #ff2a2a, rgba(255,255,255,0.3))",
                  }}
                />
              </div>
            </div>

            {/* Bottom */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-[8px] text-white/8 uppercase tracking-[4px] font-sans"
            >
              Shreshth Srivastava &mdash; Portfolio v2.0
            </motion.p>
          </div>

          {/* Flicker overlay on phase transitions */}
          <AnimatePresence>
            {(phase === 2 || phase === 4) && (
              <motion.div
                initial={{ opacity: 0.15 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0 z-50 bg-[#ff2a2a] pointer-events-none mix-blend-overlay"
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
