"use client"

import { ContactShadows, OrbitControls, Sparkles } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import type { KaratId, StyleId, ToothId } from "@/lib/grillz"
import { GrillzModel } from "./grillz-model"
import { StudioLighting } from "./studio-lighting"

type Props = {
  selected: ToothId[]
  color: string
  karat: KaratId
  isGold: boolean
  style: StyleId
  onToggle: (id: ToothId) => void
}

export default function ConfiguratorScene({ selected, color, karat, isGold, style, onToggle }: Props) {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0.35, 4.6], fov: 34 }} gl={{ antialias: true, alpha: true }}>
      <StudioLighting />
      <group rotation={[0.12, 0, 0]}>
        <GrillzModel
          selected={selected}
          materialColor={color}
          karat={karat}
          isGold={isGold}
          style={style}
          interactive
          onToggle={onToggle}
        />
      </group>
      {style === "iced" && (
        <Sparkles count={50} scale={[4, 1.6, 2]} size={3} speed={0.6} color="#ffffff" />
      )}
      <ContactShadows position={[0, -0.95, 0]} opacity={0.55} scale={8} blur={2.6} far={2} />
      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={7}
        minPolarAngle={Math.PI * 0.28}
        maxPolarAngle={Math.PI * 0.68}
        minAzimuthAngle={-Math.PI * 0.6}
        maxAzimuthAngle={Math.PI * 0.6}
        enableDamping
        makeDefault
      />
    </Canvas>
  )
}
