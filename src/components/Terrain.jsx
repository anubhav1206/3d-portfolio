import { useGLTF } from "@react-three/drei"

const Terrain = () => {
    const terrain = useGLTF('./Mountains/scene.gltf')
    return (
        <mesh>
            {/*Lines aren't showing without hemisphereLights*/}
            <hemisphereLight
            color={[255, 4, 244]}
            intensity={0.04}
            />
            {/*Floor isn't coloring without directionalLight*/}
            <directionalLight
            color={[255, 255, 255]}
            intensity={0.04}
            />
            <primitive
                object={terrain.scene}
            />
        </mesh>
    )
}

export default Terrain