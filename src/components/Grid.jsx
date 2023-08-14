import { AmbientLight, Clock, Fog, Mesh, MeshStandardMaterial, PlaneGeometry, Scene, SpotLight, TextureLoader } from "three";


const TEXTURE_PATH = "https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657168/blog/vaporwave-threejs-textures/grid.png";
const DISPLACEMENT_PATH = "https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657200/blog/vaporwave-threejs-textures/displacement.png";
const METALNESS_PATH = "https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657200/blog/vaporwave-threejs-textures/metalness.png";

const textureLoader = new TextureLoader()
const gridTexture = textureLoader.load(TEXTURE_PATH);
const terrainTexture = textureLoader.load(DISPLACEMENT_PATH);
const metalnessTexture = textureLoader.load(METALNESS_PATH);

const scene = new Scene();

const Grid = () => {
    const geometry = new PlaneGeometry(1, 2, 24, 24);
    const material = new MeshStandardMaterial({
        map: gridTexture,
        displacementMap: terrainTexture,
        displacementScale: 0.4,

        metalnessMap: metalnessTexture,

        metalness: 0.96,

        roughness:0.5,
    });

    const plane = new Mesh(geometry, material);
    plane.rotation.x = -Math.PI * 0.5;
    plane.position.y = 0.0;
    plane.position.z = 0.15;

    const secondPlane = new Mesh(geometry, material);
    secondPlane.rotation.x = -Math.PI * 0.5;
    secondPlane.position.y = 0.0;
    secondPlane.position.z = -1.85;

    scene.add(plane);
    scene.add(secondPlane);

    const ambientLight = new AmbientLight("#ffffff", 10);
    scene.add(ambientLight);

    const spotlight = new SpotLight("#d53c3d", 20, 25, Math.PI * 0.1, 0.25);
    spotlight.position.set(0.5, 0.75, 2.2);
    // Target the spotlight to a specific point to the left of the scene
    spotlight.target.position.x = -0.25;
    spotlight.target.position.y = 0.25;
    spotlight.target.position.z = 0.25;
    scene.add(spotlight);
    scene.add(spotlight.target);

    // Left Spotlight aiming to the right
    const secondSpotlight = new SpotLight("#d53c3d", 20, 25, Math.PI * 0.1, 0.25);
    secondSpotlight.position.set(-0.5, 0.75, 2.2);
    // Target the spotlight to a specific point to the right side of the scene
    secondSpotlight.target.position.x = 0.25;
    secondSpotlight.target.position.y = 0.25;
    secondSpotlight.target.position.z = 0.25;
    scene.add(secondSpotlight);
    scene.add(secondSpotlight.target);
    
    const clock = new Clock();

    const tick = () => {
        const elapsedTime = clock.getElapsedTime();

        plane.position.z = (elapsedTime * 0.15) % 2;
        secondPlane.position.z = ((elapsedTime * 0.15) % 2) - 2;

        // Call tick again on the next frame
        window.requestAnimationFrame(tick);
    }

    tick();

    return (
        <mesh>
            <primitive
                object={scene}
            />
        </mesh>
    )
}

export default Grid