import { AmbientLight, Clock, Mesh, MeshStandardMaterial, PlaneGeometry, Scene, SpotLight, TextureLoader } from "three";

const TEXTURE_PATH = "https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657168/blog/vaporwave-threejs-textures/grid.png";
const DISPLACEMENT_PATH = "https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657200/blog/vaporwave-threejs-textures/displacement.png";
const METALNESS_PATH = "https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657200/blog/vaporwave-threejs-textures/metalness.png";

const textureLoader = new TextureLoader();
const gridTexture = textureLoader.load(TEXTURE_PATH);
const terrainTexture = textureLoader.load(DISPLACEMENT_PATH);
const metalnessTexture = textureLoader.load(METALNESS_PATH);

const scene = new Scene();

const Grid = () => {
    const geometry = new PlaneGeometry(1, 2, 24, 24);
    const material = new MeshStandardMaterial({
        map: gridTexture,
        displacementMap: terrainTexture,
        displacementScale: 0.4, // Controls how spiky the mountains are
        metalnessMap: metalnessTexture,
        // TODO: Play with the metalness and roughness values as they impact the way light bounces off the grid
        metalness: 0.96,
        roughness:0.5,
    });

    // Two planes are being used in sucession of one another in order to render them one after the other
    // The implementation is plane 1 is followed by plane 2, when both planes move 2 units in the z axis
    // they return to their original positions. But since now plane
    // This is implemented in the tick function
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

    // TODO: Maybe remove from here and move to App.jsx
    // TODO: Change to another color and probably bump intensity to 100 (this causes the meshlines to change colors)
    const ambientLight = new AmbientLight("#800080", 100);
    scene.add(ambientLight);
    
    // Spotlight behind of the scene
    // Right now is at 900 intensity in order to give more solid and vibrant colors to the lines on the grid
    // TODO: Tweak the spotlight values to see if there's no need to have it turned up all the way to 900 intensity
    const spotlight = new SpotLight("#800080", 900, 0, Math.PI * 0.1, 0.25);
    spotlight.position.set(0.5, 0.75, 2.2);
    // Target the spotlight to a specific point to the left of the scene
    spotlight.target.position.x = -0.25;
    spotlight.target.position.y = 0.25;
    spotlight.target.position.z = 0.25;
    scene.add(spotlight);
    scene.add(spotlight.target);

    // Spotlight infront of the scene this is used to simulate the sun that will be added later
    // TODO: Change the color of the light when the Sun is added
    const secondSpotlight = new SpotLight("#800080", 30, 0, Math.PI * 0.1, 0.25);
    secondSpotlight.position.set(0, 1.0, -4.2);
    secondSpotlight.target.position.x = 0;
    secondSpotlight.target.position.y = 0;
    secondSpotlight.target.position.z = 0;

    //Add the lights to the scene
    scene.add(secondSpotlight);
    scene.add(secondSpotlight.target);
    
    const clock = new Clock();
    //For now the grid moves automatically so I can actually show something happening in the screen
    //TODO: This needs updated so that it moves with the "scroll" wheel and the swipe motion on mobile devices
    const tick = () => {
        const elapsedTime = clock.getElapsedTime();
        // This will be removed but maybe it could be used for lines in the Sun?
        // Graph visualization of the math being done here https://www.desmos.com/calculator/71bclmgmub
        // In simple terms the plane will keep moving until it reaches the z coordinate "2", in which case 2 modulus 2 equals 0 so the position resets again
        plane.position.z = (elapsedTime * 0.15) % 2;
        // The same logic applies to the second plane but it is simply translated/moved by -2
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
