import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Terrain, Car, Grid } from "./components"

//Need to rename this to something else
function ShowScene() {
  return (
    <>
      {/*The cameras movement is limited so that it doesn't clip through the floor or the mountains, nor that the user is able to look from above and disabled zoom as this can also clip through things*/}
      <OrbitControls target={[0, 0, 0]} minPolarAngle={Math.PI / 2.3} maxPolarAngle={Math.PI / 2.1} minAzimuthAngle={-Math.PI / 19} maxAzimuthAngle={Math.PI / 19} enableZoom={false}/>
      {/*The camera position may need to change, but this will depend on the car used and the "billboards" that get added*/}
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
      {/*Uncomment if need cube at the 0,0,0 coordinates for position and size reference*/}
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
          {/*Adds fog at the end of the grid, will probably need to change color later to match that of the Sun at the end of the track*/}
          <fog attach="fog" color="black" near={1} far={2.5} />
          <ShowScene />
        </Canvas>
      </Suspense>
  )
}

export default App
