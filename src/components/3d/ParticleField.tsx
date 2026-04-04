"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "@/lib/scroll-store";

interface ParticleFieldProps {
  count?: number;
}

export default function ParticleField({ count = 300 }: ParticleFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        x: (Math.random() - 0.5) * 30,
        y: (Math.random() - 0.5) * 25,
        z: (Math.random() - 0.5) * 40 - 10,
        vx: (Math.random() - 0.5) * 0.003,
        vy: (Math.random() - 0.5) * 0.003,
        scale: 0.015 + Math.random() * 0.035,
        speed: 0.5 + Math.random() * 1,
      });
    }
    return data;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;
    const sp = scrollState.progress;

    for (let i = 0; i < count; i++) {
      const p = particles[i];

      const x = p.x + Math.sin(time * 0.15 * p.speed + i) * 0.8 + p.vx * time * 60;
      const y = p.y + Math.cos(time * 0.1 * p.speed + i * 0.5) * 0.5 + p.vy * time * 60 - sp * 8;
      const z = p.z + sp * 15;

      dummy.position.set(
        ((x % 30) + 30) % 30 - 15,
        ((y % 25) + 25) % 25 - 12.5,
        z
      );

      const pulse = p.scale * (1 + Math.sin(time * 0.3 + i) * 0.2);
      dummy.scale.setScalar(pulse);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#ff2222" transparent opacity={0.35} />
    </instancedMesh>
  );
}
