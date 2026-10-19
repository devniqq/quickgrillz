"use client"

import { Environment, Lightformer } from "@react-three/drei"

export function StudioLighting() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <directionalLight position={[-4, -2, 3]} intensity={0.5} color="#ffd9a0" />
      <Environment resolution={256} frames={1}>
        <color attach="background" args={["#2a2520"]} />
        <Lightformer form="rect" intensity={2} position={[0, 0, 6]} scale={[14, 6, 1]} />
        <Lightformer form="rect" intensity={1.2} color="#ffd38a" position={[0, 2, -6]} rotation-y={Math.PI} scale={[14, 4, 1]} />
        <Lightformer form="rect" intensity={5} position={[0, 5, -1]} rotation-x={Math.PI / 2} scale={[10, 3, 1]} />
        <Lightformer form="rect" intensity={2.5} position={[-6, 1, 1]} rotation-y={Math.PI / 2} scale={[12, 1.2, 1]} />
        <Lightformer form="rect" intensity={2.5} position={[6, 1, 1]} rotation-y={-Math.PI / 2} scale={[12, 1.2, 1]} />
        <Lightformer form="ring" intensity={3} color="#ffe2a8" position={[0, 0.5, 7]} scale={4} />
        <Lightformer form="rect" intensity={1.5} color="#ffb36b" position={[0, -4, 2]} rotation-x={-Math.PI / 2} scale={[8, 2, 1]} />
      </Environment>
    </>
  )
}
