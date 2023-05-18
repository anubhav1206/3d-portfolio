import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Terrain } from "./components"

function CarShow() {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      {/*This changes the color of the background*/}
      <color args={[0, 0, 0]} attach="background" />

      {/*This is creating a new spotlight, may need to be changed later!*/}
      <spotLight
        color={[255, 4, 244]}
        intensity={0}
        angle={0.2}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={"red"} />
      </mesh>
      <Terrain />
    </>
  );
}

const App= () => {
  return (
      <Suspense fallback={null}>
        <Canvas shadows>
          <CarShow />
        </Canvas>
      </Suspense>
  )
}

export default App
