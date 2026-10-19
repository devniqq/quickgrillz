"use client"

import { RoundedBox } from "@react-three/drei"
import { useFrame, type ThreeEvent } from "@react-three/fiber"
import { useMemo, useRef, useState } from "react"
import * as THREE from "three"
import { ALL_TEETH, type Arch, type KaratId, type StyleId, type ToothId, type ToothLayout } from "@/lib/grillz"

type Materials = {
  enamel: THREE.Material
  enamelHover: THREE.Material
  metal: THREE.MeshStandardMaterial
  metalFacet: THREE.MeshStandardMaterial
  stone: THREE.Material
  gum: THREE.Material
}

type GrillzModelProps = {
  selected: ToothId[]
  materialColor: string
  karat?: KaratId
  isGold?: boolean
  style: StyleId
  interactive?: boolean
  onToggle?: (id: ToothId) => void
}

const PALE_GOLD = new THREE.Color("#efe6cc")
const KARAT_PALENESS: Record<KaratId, number> = { "10k": 0.38, "14k": 0.16, "18k": 0 }

export function GrillzModel({
  selected,
  materialColor,
  karat = "14k",
  isGold = true,
  style,
  interactive = false,
  onToggle,
}: GrillzModelProps) {
  const materials = useMemo<Materials>(() => {
    const metalBase = {
      metalness: 1,
      roughness: 0.14,
      envMapIntensity: 1.6,
      color: new THREE.Color(materialColor),
    }
    return {
      enamel: new THREE.MeshPhysicalMaterial({
        color: "#f4efe4",
        roughness: 0.32,
        clearcoat: 0.7,
        clearcoatRoughness: 0.25,
        sheen: 0.4,
      }),
      enamelHover: new THREE.MeshPhysicalMaterial({
        color: "#ffe6a6",
        roughness: 0.3,
        clearcoat: 0.8,
        emissive: new THREE.Color("#5a3d00"),
        emissiveIntensity: 0.35,
      }),
      metal: new THREE.MeshStandardMaterial(metalBase),
      metalFacet: new THREE.MeshStandardMaterial({ ...metalBase, roughness: 0.04, flatShading: true }),
      stone: new THREE.MeshStandardMaterial({
        color: "#ffffff",
        metalness: 0.85,
        roughness: 0,
        envMapIntensity: 3.2,
        flatShading: true,
      }),
      gum: new THREE.MeshPhysicalMaterial({ color: "#7a2537", roughness: 0.55, sheen: 0.6, sheenColor: "#ff8fa3" }),
    }
    // Materials are created once; color is animated in useFrame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const target = useMemo(() => {
    const c = new THREE.Color(materialColor)
    if (isGold) c.lerp(PALE_GOLD, KARAT_PALENESS[karat])
    return c
  }, [materialColor, karat, isGold])

  useFrame((_, delta) => {
    const t = 1 - Math.exp(-6 * delta)
    materials.metal.color.lerp(target, t)
    materials.metalFacet.color.lerp(target, t)
  })

  const selectedSet = useMemo(() => new Set(selected), [selected])

  return (
    <group position={[0, 0, 0.6]}>
      <Gum arch="top" material={materials.gum} />
      <Gum arch="bottom" material={materials.gum} />
      {ALL_TEETH.map((tooth) => (
        <Tooth
          key={tooth.id}
          layout={tooth}
          active={selectedSet.has(tooth.id)}
          style={style}
          materials={materials}
          interactive={interactive}
          onToggle={onToggle}
        />
      ))}
    </group>
  )
}

function Gum({ arch, material }: { arch: Arch; material: THREE.Material }) {
  const geometry = useMemo(() => {
    const teeth = ALL_TEETH.filter((t) => t.arch === arch).sort((a, b) => a.index - b.index)
    const points = teeth.map((t) => {
      const edge = arch === "top" ? t.y + t.height / 2 - 0.02 : t.y - t.height / 2 + 0.02
      return new THREE.Vector3(t.x * 0.985, edge, t.z - 0.02)
    })
    const curve = new THREE.CatmullRomCurve3(points)
    return new THREE.TubeGeometry(curve, 160, 0.13, 20, false)
  }, [arch])

  return <mesh geometry={geometry} material={material} />
}

type ToothProps = {
  layout: ToothLayout
  active: boolean
  style: StyleId
  materials: Materials
  interactive: boolean
  onToggle?: (id: ToothId) => void
}

function Tooth({ layout, active, style, materials, interactive, onToggle }: ToothProps) {
  const shell = useRef<THREE.Group>(null)
  const progress = useRef(active ? 1 : 0)
  const [hovered, setHovered] = useState(false)
  const { width, height, depth } = layout

  useFrame((_, delta) => {
    if (!shell.current) return
    progress.current = THREE.MathUtils.damp(progress.current, active ? 1 : 0, 9, delta)
    const p = progress.current
    shell.current.visible = p > 0.02
    const hoverBoost = hovered && interactive ? 0.03 : 0
    shell.current.scale.setScalar(0.82 + p * 0.24 + hoverBoost)
  })

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    if (!interactive) return
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = "pointer"
  }
  const handlePointerOut = () => {
    if (!interactive) return
    setHovered(false)
    document.body.style.cursor = ""
  }
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    if (!interactive || e.delta > 6) return
    e.stopPropagation()
    onToggle?.(layout.id)
  }

  const stones = useMemo(() => {
    if (style !== "iced") return []
    const cols = width > 0.3 ? 3 : 2
    const rows = Math.max(3, Math.round(height / 0.11))
    const list: [number, number][] = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = -width * 0.28 + (c * width * 0.56) / (cols - 1)
        const y = -height * 0.36 + (r * height * 0.72) / (rows - 1)
        list.push([x, y])
      }
    }
    return list
  }, [style, width, height])

  const radius = Math.min(width, depth) * 0.3

  return (
    <group position={[layout.x, layout.y, layout.z]} rotation={[0, layout.rotY, 0]}>
      <RoundedBox
        args={[width * 0.94, height, depth]}
        radius={radius}
        smoothness={4}
        material={hovered && !active && interactive ? materials.enamelHover : materials.enamel}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      />
      <group ref={shell} visible={active}>
        <RoundedBox
          args={[width * 0.95, height * 0.96, depth * 1.02]}
          radius={radius}
          smoothness={style === "diamondcut" ? 1 : 4}
          material={style === "diamondcut" ? materials.metalFacet : materials.metal}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={handleClick}
        />
        {style === "openface" && (
          <RoundedBox
            args={[width * 0.56, height * 0.58, 0.03]}
            radius={0.012}
            position={[0, -height * 0.02, depth * 0.51]}
            material={materials.enamel}
          />
        )}
        {stones.map(([x, y], i) => (
          <mesh key={i} position={[x, y, depth * 0.52]} rotation={[0.4, 0.6, 0]} material={materials.stone}>
            <octahedronGeometry args={[0.042, 0]} />
          </mesh>
        ))}
      </group>
    </group>
  )
}
