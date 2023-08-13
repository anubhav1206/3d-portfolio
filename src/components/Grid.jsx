import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { AmbientLight, Clock, Fog, Mesh, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry, Scene, SpotLight, TextureLoader, WebGLRenderer } from "three";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader.js";

const TEXTURE_PATH = "https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657168/blog/vaporwave-threejs-textures/grid.png";
const DISPLACEMENT_PATH = "https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657200/blog/vaporwave-threejs-textures/displacement.png";
const METALNESS_PATH = "https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657200/blog/vaporwave-threejs-textures/metalness.png";

const textureLoader = new TextureLoader()
const gridTexture = textureLoader.load(TEXTURE_PATH);
const terrainTexture = textureLoader.load(DISPLACEMENT_PATH);
const metalnessTexture = textureLoader.load(METALNESS_PATH);

const canvas = document.querySelector("canvas");

const scene = new Scene();

const fog = new Fog("#000000", 1, 2.5);
scene.fog = fog;

const Grid = () => {
    console.log(canvas);
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
    
    // Sizes
    const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

    // Camera
    const camera = new PerspectiveCamera(
        75,
        sizes.width / sizes.height,
        0.01,
        20
    );
    camera.position.x = 0;
    camera.position.y = 0.06;
    camera.position.z = 1.1;
    
    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    
    const renderer = new WebGLRenderer({
        canvas: canvas,
    });
    
    const effectComposer = new EffectComposer(renderer);
    effectComposer.setSize(sizes.width, sizes.height);
    effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const renderPass = new RenderPass(scene, camera);
    effectComposer.addPass(renderPass);

    const rgbShiftPass = new ShaderPass(RGBShiftShader);
    rgbShiftPass.uniforms["amount"].value = 0.0015;

    effectComposer.addPass(rgbShiftPass);

    const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
    effectComposer.addPass(gammaCorrectionPass);

    const clock = new Clock();

    const tick = () => {
        const elapsedTime = clock.getElapsedTime();
        // Update controls
        controls.update();

        plane.position.z = (elapsedTime * 0.15) % 2;
        secondPlane.position.z = ((elapsedTime * 0.15) % 2) - 2;

        // Render
        renderer.render(scene, camera);
        effectComposer.render();

        // Call tick again on the next frame
        window.requestAnimationFrame(tick);
    }

    tick();

    return (
        <mesh scale={3}>
            <primitive
                object={scene}
            />
        </mesh>
    )
}

export default Grid