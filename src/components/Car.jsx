import { useGLTF } from "@react-three/drei"
import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const Car = () => {
    //useGLTF loads the .gltf file for the car
    const car = useGLTF('./DeLorean-LowPoly/scene.gltf')

    //This will allows us to edit the cameras position later on.
    const { camera } = useThree()

    //This will allows us to reference the mesh in order to change its position.
    const meshRef = useRef()

    //Need to research the name of this, essentially the second argument will be used as a function that when called will set the value for the first argument
    //So calling setWKeyHeld(true) will set wKeyHeld to true
    const [wKeyHeld, setWKeyHeld] = useState(false)
    const [sKeyHeld, setSKeyHeld] = useState(false)

    /*
    event is depricated but I couldn't find an alternate solution. (Even something as big as React can suffer from bad documentation...)
    There are more complex solutions to this but for my purposes this suffices,
    since all I want is for the car to move back and forth, nothing else.
    */
    //Here I simply have an event handler for when a key is down and I simply check if its the "w" or the "s" key, and set the variable to true accordingly.*/}
    const handleKeyDown = (event) => {
        if (event.key == 'w') {
            setWKeyHeld(true);
          }
        else if (event.key == "s"){
            setSKeyHeld(true);
        }     
      }

    //Same as above but to handle when the key is no longer pressed, it simply sets the corresponding variables to false.
    const handleKeyUp = (event) => {
        if (event.key == 'w') {
            setWKeyHeld(false);
          }
        else if (event.key == "s"){
            setSKeyHeld(false);
        }        
      }

    //Add the event listeners to the webpage, and attach the corresponding handlers to the keydown and keyup events.
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
    });

    //Anything inside useFrame is updated with each frame, I'm not entirely sure at how many frames does the project currently run.
    //In this case we want to update the mesh and camera's positions relative to the x axis.
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
        /*The position and its scale are messed up for the lowpoly delorean may need to fix this later
            forgot the tool I used to use for orientating 3d models, it was MeshMixer I believe */
        //Here is where we call the mesh (3d model) of the car, by adding ref={meshRef} this now allows to reference the mesh
        //in order to update its position.
        <mesh scale={0.25} position={[0, -0.33, 3.1]} ref={meshRef}>
            <primitive
                object={car.scene}
            />
        </mesh>
    )
}

export default Car