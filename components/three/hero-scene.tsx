"use client"

import { Float, Sparkles } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, type ReactNode } from "react"
import * as THREE from "three"
import { frontTeeth } from "@/lib/grillz"
import { GrillzModel } from "./grillz-model"
import { StudioLighting } from "./studio-lighting"

const HERO_TEETH = [...frontTeeth("top", 8), ...frontTeeth("bottom", 6)]

function PointerRig({ children }: { children: ReactNode }) {
  const group = useRef<THREE.Group>(null)
  const intro = useRef(0)

  useFrame((state, delta) => {
    if (!group.current) return
    intro.current = THREE.MathUtils.damp(intro.current, 1, 2.2, delta)
    const t = state.clock.elapsedTime
    const targetY = state.pointer.x * 0.55 + Math.sin(t * 0.4) * 0.25
    const targetX = -state.pointer.y * 0.25 + 0.12
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 3, delta)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 3, delta)
    const s = 0.4 + intro.current * 0.6
    group.current.scale.setScalar(s)
    group.current.position.y = (1 - intro.current) * -0.6
  })

  return <group ref={group}>{children}</group>
}

export default function HeroScene({ color, isGold }: { color: string; isGold: boolean }) {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0.15, 4.8], fov: 32 }} gl={{ antialias: true, alpha: true }}>
      <StudioLighting />
      <Float speed={1.3} rotationIntensity={0.25} floatIntensity={0.5}>
        <PointerRig>
          <GrillzModel selected={HERO_TEETH} materialColor={color} karat="18k" isGold={isGold} style="solid" />
        </PointerRig>
      </Float>
      <Sparkles count={60} scale={[7, 3.5, 3]} size={2.2} speed={0.35} opacity={0.8} color="#f7d58a" />
    </Canvas>
  )
}
