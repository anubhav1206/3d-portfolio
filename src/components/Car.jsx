import { useGLTF } from "@react-three/drei"
import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const Car = () => {
    const car = useGLTF('./DeLorean-LowPoly/scene.gltf')
    const { camera } = useThree()
    const meshRef = useRef()
    const [wKeyHeld, setWKeyHeld] = useState(false)
    const [sKeyHeld, setSKeyHeld] = useState(false)

    {/*event is depricated but I couldn't find an alternate solution.
        There are more complex solutions to this but for my purposes this suffices,
        since all I want is for the car to move back and forth, nothing else.*/}

    const handleKeyDown = (event) => {
        if (event.key == 'w') {
            setWKeyHeld(true);
          }
        else if (event.key == "s"){
            setSKeyHeld(true);
        }     
      }
    
    const handleKeyUp = (event) => {
        if (event.key == 'w') {
            setWKeyHeld(false);
          }
        else if (event.key == "s"){
            setSKeyHeld(false);
        }        
      }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
    });

    useFrame(() => {
        // Rotate the mesh around the x-axis
        //meshRef.current.rotation.z += 0.01;
        if (wKeyHeld) {
            meshRef.current.position.x -= 0.02;
            camera.position.x -= 0.02;
        }
        else if (sKeyHeld) {
            meshRef.current.position.x += 0.02;
            camera.position.x += 0.02;
        }
        
    });
    
    return (
        {/*The position and its scale are messed up for the lowpoly delorean may need to fix this later
            forgot the tool I used to use for orientating 3d models, it was MeshMixer I believe */},
        <mesh scale={0.25} position={[0, -0.33, 3.1]} ref={meshRef}>
            <primitive
                object={car.scene}
            />
        </mesh>
    )
}

export default Car