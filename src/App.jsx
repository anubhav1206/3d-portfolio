import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Terrain, Car, Grid } from "./components"

//Need to rename this to something else
function ShowScene() {
  return (
    <>
      <OrbitControls target={[0, 0, 0]} maxPolarAngle={1.52} maxAzimuthAngle={1.52}/>
      <PerspectiveCamera makeDefault fov={50} position={[0, 0.06, 1]}/>

      {/*This changes the color of the background*/}
      <color args={[0, 0, 0]} attach="background" />
      {/*This is creating a new spotlight, may need to be changed later!*/}
      {/*<spotLight
        color={[255, 4, 244]}
        intensity={0}
        angle={0.2}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />*/}
      {/*Keeping cube for now to have a refference to 0,0,0 coordinates */}
      {/*<mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={"red"} />
    </mesh>*/}
      <Grid />
    </>
  );
}

const App= () => {
  return (
      <Suspense fallback={null}>
        <Canvas shadows>
          <fog attach="fog" color="black" near={1} far={2.5} />
          <ShowScene />
        </Canvas>
      </Suspense>
  )
}

export default App
