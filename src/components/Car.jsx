import { useGLTF } from "@react-three/drei"

const Car = () => {
    const car = useGLTF('./DeLorean-LowPoly/scene.gltf')
    return (
        {/*The position and its scale are messed up for the lowpoly delorean may need to fix this later
            forgot the tool I used to use for orientating 3d models, it was MeshMixer I believe */},
        <mesh scale={0.3} position={[0, -0.4, 3.8]}>
            <primitive
                object={car.scene}
            />
        </mesh>
    )
}

export default Car