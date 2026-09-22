import { type Engine } from "core/Engines/engine";
import { UniversalCamera } from "core/Cameras/universalCamera";
import { DirectionalLight } from "core/Lights/directionalLight";
import { HemisphericLight } from "core/Lights/hemisphericLight";
import { PointLight } from "core/Lights/pointLight";
import { StandardMaterial } from "core/Materials/standardMaterial";
import { NoiseProceduralTexture } from "core/Materials/Textures/Procedurals/noiseProceduralTexture";
import { DynamicTexture } from "core/Materials/Textures/dynamicTexture";
import { Color3 } from "core/Maths/math.color";
import { Vector3 } from "core/Maths/math.vector";
import { MeshBuilder } from "core/Meshes/meshBuilder";
import { type AbstractMesh } from "core/Meshes/abstractMesh";
import { type Mesh } from "core/Meshes/mesh";
import { TransformNode } from "core/Meshes/transformNode";
import { Scene } from "core/scene";
import { AdvancedDynamicTexture } from "gui/2D/advancedDynamicTexture";
import { Control } from "gui/2D/controls/control";
import { Button } from "gui/2D/controls/button";
import { InputText } from "gui/2D/controls/inputText";
import { Rectangle } from "gui/2D/controls/rectangle";
import { StackPanel } from "gui/2D/controls/stackPanel";
import { TextBlock } from "gui/2D/controls/textBlock";

// eslint-disable-next-line @typescript-eslint/naming-convention, no-restricted-syntax
export const createScene = async function (engine: Engine, canvas: HTMLCanvasElement): Promise<Scene> {
    const scene = new Scene(engine);
    scene.clearColor = new Color3(0.025, 0.04, 0.075).toColor4(1);
    scene.fogMode = Scene.FOGMODE_EXP2;
    scene.fogDensity = 0.016;
    scene.fogColor = new Color3(0.025, 0.04, 0.075);

    const camera = new UniversalCamera("forestCamera", new Vector3(-60, 4.2, -43), scene);
    camera.minZ = 0.2;
    camera.maxZ = 180;
    camera.fov = 1.05;
    camera.inertia = 0.08;
    camera.speed = 0;
    camera.attachControl(canvas, true);

    const flashlight = new PointLight("player flashlight", camera.position.clone(), scene);
    flashlight.diffuse = new Color3(0.78, 0.9, 1);
    flashlight.specular = new Color3(0.9, 0.95, 1);
    flashlight.range = 34;
    flashlight.intensity = 2.2;

    const skyLight = new HemisphericLight("skyLight", new Vector3(0, 1, 0), scene);
    skyLight.intensity = 0.18;
    skyLight.diffuse = new Color3(0.18, 0.22, 0.38);
    skyLight.groundColor = new Color3(0.025, 0.035, 0.02);

    const sun = new DirectionalLight("cold moon", new Vector3(-0.5, -1, 0.35), scene);
    sun.position = new Vector3(80, 140, -100);
    sun.intensity = 0.3;
    sun.diffuse = new Color3(0.32, 0.4, 0.7);

    const material = (name: string, diffuseColor: Color3, specularColor = new Color3(0.08, 0.08, 0.08)) => {
        const result = new StandardMaterial(name, scene);
        result.diffuseColor = diffuseColor;
        result.specularColor = specularColor;
        return result;
    };

    const grass = material("mossy forest floor", new Color3(0.055, 0.12, 0.05));
    const dirt = material("packed earth", new Color3(0.25, 0.18, 0.1));
    const rock = material("mountain rock", new Color3(0.09, 0.12, 0.14));
    const snow = material("mountain snow", new Color3(0.28, 0.34, 0.4));
    const trunk = material("pine trunks", new Color3(0.22, 0.12, 0.06));
    const needles = material("deep pine needles", new Color3(0.05, 0.2, 0.1));
    const needlesLight = material("young pine needles", new Color3(0.12, 0.32, 0.14));
    const wood = material("weathered timber", new Color3(0.28, 0.16, 0.09));
    const roof = material("rusted roofs", new Color3(0.18, 0.1, 0.07));
    const windowGlow = material("warm windows", new Color3(0.85, 0.24, 0.07));
    windowGlow.emissiveColor = new Color3(0.75, 0.08, 0.015);
    const metal = material("old metal", new Color3(0.16, 0.18, 0.16));
    const playerColors = [new Color3(0.1, 0.65, 1), new Color3(0.85, 0.16, 0.12), new Color3(0.36, 0.9, 0.36), new Color3(0.8, 0.3, 0.9)];
    const plaid = material("lumberjack plaid", new Color3(0.45, 0.05, 0.035));
    const denim = material("lumberjack denim", new Color3(0.06, 0.1, 0.2));
    const skin = material("lumberjack skin", new Color3(0.55, 0.27, 0.14));
    const beard = material("lumberjack beard", new Color3(0.06, 0.035, 0.02));
    const leather = material("lumberjack boots and belt", new Color3(0.08, 0.035, 0.015));
    const axeWood = material("axe handle", new Color3(0.34, 0.16, 0.05));
    const axeHead = material("axe head", new Color3(0.38, 0.42, 0.45));
    const gunMetal = material("nightmare gun metal", new Color3(0.08, 0.09, 0.1));
    const pickupMetal = material("pickup metal", new Color3(0.25, 0.28, 0.3));
    const bandageMaterial = material("bandage cloth", new Color3(0.72, 0.68, 0.55));
    const medkitMaterial = material("medkit casing", new Color3(0.72, 0.08, 0.08));
    const adrenalineMaterial = material("adrenaline injector", new Color3(0.82, 0.55, 0.08));
    adrenalineMaterial.emissiveColor = new Color3(0.35, 0.16, 0.01);
    const batteryMaterial = material("battery casing", new Color3(0.08, 0.32, 0.36));
    batteryMaterial.emissiveColor = new Color3(0.02, 0.16, 0.18);
    const bearFur = material("the thin bear fur", new Color3(0.035, 0.025, 0.02));
    const bearMuzzle = material("the broken jaw", new Color3(0.12, 0.045, 0.04));
    const monsterEye = material("the bear eyes", new Color3(1, 0.015, 0.005));
    monsterEye.emissiveColor = new Color3(1, 0, 0);
    const revivePingMaterial = material("revive ping", new Color3(0.9, 0.02, 0.01));
    revivePingMaterial.emissiveColor = new Color3(1, 0, 0);
    const bloodMaterial = material("old blood stains", new Color3(0.16, 0.008, 0.006));
    bloodMaterial.specularColor = new Color3(0.02, 0.005, 0.005);
    const generatorMaterial = material("generator casing", new Color3(0.12, 0.14, 0.15));
    const generatorLight = material("generator status light", new Color3(0.9, 0.24, 0.02));
    generatorLight.emissiveColor = new Color3(1, 0.08, 0);
    const escapeMaterial = material("red escape car", new Color3(0.72, 0.025, 0.018), new Color3(0.3, 0.06, 0.04));
    const batteryPingMaterial = material("battery ping", new Color3(0.02, 0.72, 0.85));
    batteryPingMaterial.emissiveColor = new Color3(0, 0.42, 0.65);
    const dustMaterial = material("dusty abandoned cloth", new Color3(0.19, 0.17, 0.14));
    const debrisMaterial = material("abandoned debris", new Color3(0.12, 0.075, 0.045));
    const posterTexture = new DynamicTexture("hidden poster texture", { width: 256, height: 128 }, scene, false);
    posterTexture.hasAlpha = false;
    posterTexture.getContext().fillStyle = "#d4af37";
    posterTexture.getContext().fillRect(0, 0, 256, 128);
    posterTexture.drawText("DEAD REFLEX", 28, 58, "bold 24px monospace", "#241815", "#d4af37", true);
    posterTexture.drawText("STUDIOS", 66, 92, "bold 24px monospace", "#241815", "#d4af37", true);
    const posterMaterial = material("golden studio poster", new Color3(0.83, 0.69, 0.22));
    posterMaterial.diffuseTexture = posterTexture;
    const walkieMaterial = material("walkie talkie casing", new Color3(0.08, 0.1, 0.11));
    walkieMaterial.emissiveColor = new Color3(0.02, 0.08, 0.08);

    const forestTexture = new NoiseProceduralTexture("forest floor texture", 256, scene);
    forestTexture.octaves = 4;
    forestTexture.persistence = 0.72;
    forestTexture.brightness = 0.32;
    forestTexture.animationSpeedFactor = 0.08;
    grass.diffuseTexture = forestTexture;
    const forestFloor = MeshBuilder.CreateGround("400 x 400 forest floor", { width: 400, height: 400, subdivisions: 32 }, scene);
    forestFloor.material = grass;
    const rainMaterial = material("rain streaks", new Color3(0.25, 0.45, 0.65));
    rainMaterial.alpha = 0.35;
    const rainStreaks: Mesh[] = [];
    for (let index = 0; index < 80; index++) {
        const streak = MeshBuilder.CreateBox(`rain streak ${index}`, { width: 0.025, height: 2.2, depth: 0.025 }, scene);
        streak.material = rainMaterial;
        streak.position = new Vector3((Math.random() - 0.5) * 170, 8 + Math.random() * 18, (Math.random() - 0.5) * 170);
        streak.rotation.z = -0.12;
        streak.isVisible = false;
        rainStreaks.push(streak);
    }

    const waterTexture = new NoiseProceduralTexture("river water texture", 128, scene);
    waterTexture.octaves = 3;
    waterTexture.persistence = 0.65;
    waterTexture.brightness = 0.5;
    waterTexture.animationSpeedFactor = 1.8;
    const waterMaterial = material("river water", new Color3(0.03, 0.16, 0.2), new Color3(0.7, 0.85, 0.9));
    waterMaterial.diffuseTexture = waterTexture;
    waterMaterial.alpha = 0.78;
    waterMaterial.specularPower = 96;
    const riverBanks = [
        [new Vector3(-146, 0.08, -190), new Vector3(-132, 0.08, -130), new Vector3(-104, 0.08, -70), new Vector3(-82, 0.08, -10), new Vector3(-58, 0.08, 52), new Vector3(-35, 0.08, 115), new Vector3(-14, 0.08, 180)],
        [new Vector3(-128, 0.08, -190), new Vector3(-113, 0.08, -130), new Vector3(-85, 0.08, -70), new Vector3(-63, 0.08, -10), new Vector3(-39, 0.08, 52), new Vector3(-16, 0.08, 115), new Vector3(5, 0.08, 180)],
    ];
    const river = MeshBuilder.CreateRibbon("forest river", { pathArray: riverBanks, closeArray: false, closePath: false, sideOrientation: 2 }, scene);
    river.material = waterMaterial;
    const rippleMaterial = material("river foam", new Color3(0.25, 0.52, 0.55));
    rippleMaterial.alpha = 0.4;
    const riverRipples: Mesh[] = [];
    for (let index = 0; index < 12; index++) {
        const ripple = MeshBuilder.CreateBox(`river flowing ripple ${index}`, { width: 0.45, height: 0.025, depth: 5 + (index % 3) * 1.5 }, scene);
        ripple.position = new Vector3(-137 + index * 10.5, 0.13, -178 + index * 31);
        ripple.rotation.y = -0.35;
        ripple.material = rippleMaterial;
        riverRipples.push(ripple);
    }

    const createMountain = (name: string, position: Vector3, diameter: number, height: number, mountainMaterial: StandardMaterial) => {
        const mountain = MeshBuilder.CreateCylinder(name, { diameterTop: 8, diameterBottom: diameter, height, tessellation: 8 }, scene);
        mountain.position = position;
        mountain.material = mountainMaterial;
        return mountain;
    };

    createMountain("mountain ridge", new Vector3(0, 38, 105), 185, 76, rock);
    createMountain("snow capped peak", new Vector3(-16, 76, 105), 62, 48, snow);
    createMountain("far ridge", new Vector3(105, 27, 145), 150, 54, rock);

    const createTree = (x: number, z: number, scale: number, light = false) => {
        const height = 8 * scale;
        const treeTrunk = MeshBuilder.CreateCylinder("pine trunk", { diameter: 1.1 * scale, height }, scene);
        treeTrunk.position = new Vector3(x, height / 2, z);
        treeTrunk.material = trunk;
        for (let layer = 0; layer < 3; layer++) {
            const cone = MeshBuilder.CreateCylinder("pine boughs", { diameterTop: 0.15 * scale, diameterBottom: (5.5 - layer * 1.1) * scale, height: 4.5 * scale, tessellation: 8 }, scene);
            cone.position = new Vector3(x, height * 0.45 + layer * 2.1 * scale, z);
            cone.material = light ? needlesLight : needles;
        }
    };

    const treePositions = [
        [-165, -145, 1.2], [-132, -104, 0.9], [-92, -148, 1.35], [-48, -126, 0.85], [12, -154, 1.15],
        [61, -133, 0.95], [115, -154, 1.3], [164, -122, 0.9], [-176, -45, 1.1], [-143, -18, 0.8],
        [147, -34, 1.2], [178, 18, 1.05], [-175, 72, 0.9], [161, 82, 1.15], [-122, 126, 1.3],
        [116, 117, 0.9], [-75, 154, 1.05], [71, 151, 1.25], [-18, -82, 0.75], [83, -74, 0.8],
    ];
    treePositions.forEach(([x, z, scale], index) => createTree(x, z, scale, index % 4 === 0));

    const watcherShadow = material("watcher silhouette", new Color3(0.015, 0.018, 0.022));
    watcherShadow.alpha = 0.38;
    const watcherEyeMaterial = material("watcher eye", new Color3(1, 0.08, 0.04));
    watcherEyeMaterial.emissiveColor = new Color3(1, 0.12, 0.04);
    watcherEyeMaterial.alpha = 0.9;
    // The watcher state is local to this scene and does not need a public interface.
    // eslint-disable-next-line jsdoc/require-jsdoc
    const watcherRoots: Array<{ root: TransformNode; home: Vector3; phase: number; eyes: AbstractMesh[] }> = [];

    /**
     * Creates a distant watcher silhouette that subtly pressures the player.
     * @param position The spawn position for the watcher.
     */
    const createWatcher = (position: Vector3) => {
        const root = new TransformNode(`watcher ${watcherRoots.length + 1}`, scene);
        root.position = position;
        const torso = MeshBuilder.CreateBox(`watcher torso ${watcherRoots.length + 1}`, { width: 1.6, height: 4.4, depth: 1.1 }, scene);
        torso.parent = root;
        torso.position = new Vector3(0, 2.2, 0);
        torso.material = watcherShadow;
        const head = MeshBuilder.CreateSphere(`watcher head ${watcherRoots.length + 1}`, { diameter: 1.5, segments: 10 }, scene);
        head.parent = root;
        head.position = new Vector3(0, 5.2, 0.15);
        head.material = watcherShadow;
        const leftEye = MeshBuilder.CreateSphere(`watcher eye left ${watcherRoots.length + 1}`, { diameter: 0.38, segments: 8 }, scene);
        leftEye.parent = root;
        leftEye.position = new Vector3(-0.35, 5.38, 0.9);
        leftEye.material = watcherEyeMaterial;
        const rightEye = MeshBuilder.CreateSphere(`watcher eye right ${watcherRoots.length + 1}`, { diameter: 0.38, segments: 8 }, scene);
        rightEye.parent = root;
        rightEye.position = new Vector3(0.35, 5.38, 0.9);
        rightEye.material = watcherEyeMaterial;
        watcherRoots.push({ root, home: position.clone(), phase: watcherRoots.length * 0.9, eyes: [leftEye, rightEye] });
    };
    [
        new Vector3(-158, 2.2, -145),
        new Vector3(-112, 2.8, 165),
        new Vector3(-40, 2.5, 170),
        new Vector3(110, 2.8, 166),
        new Vector3(156, 2.4, -154),
        new Vector3(170, 2.6, 64),
        new Vector3(-170, 2.8, 62),
        new Vector3(30, 2.5, -166),
    ].forEach((position) => createWatcher(position));

    const createBloodStain = (index: number, x: number, z: number, scale: number) => {
        const stain = MeshBuilder.CreateCylinder(`blood stain ${index}`, { diameter: scale, height: 0.025, tessellation: 16 }, scene);
        stain.position = new Vector3(x, 0.045, z);
        stain.rotation.y = index * 0.73;
        stain.material = bloodMaterial;
        for (let splatter = 0; splatter < 3; splatter++) {
            const spot = MeshBuilder.CreateSphere(`blood splatter ${index}-${splatter}`, { diameter: scale * (0.12 + splatter * 0.04), segments: 8 }, scene);
            spot.position = new Vector3(x + Math.cos(index + splatter) * scale * 0.55, 0.06, z + Math.sin(index * 1.7 + splatter) * scale * 0.55);
            spot.scaling.y = 0.08;
            spot.material = bloodMaterial;
        }
    };

    [
        [-64, -31, 4.2], [-27, -54, 2.8], [16, -42, 5.5], [54, -12, 3.5], [84, 37, 4.8],
        [103, 55, 2.6], [39, 54, 3.8], [-14, 23, 2.4], [-75, 64, 5.1], [-124, -4, 3.2],
        [128, -64, 4.4], [-151, 102, 2.7],
    ].forEach(([x, z, scale], index) => createBloodStain(index, x, z, scale));

    const birdMaterial = material("forest bird feathers", new Color3(0.08, 0.07, 0.06));
    const rabbitMaterial = material("forest rabbit fur", new Color3(0.34, 0.26, 0.2));

    /**
     * Describes one roaming creature in the forest.
     */
    interface IWildlifeEntry {
        /** The transform node that owns the creature mesh. */
        root: TransformNode;
        /** Wing meshes for flying creatures. */
        wings: Mesh[];
        /** The resting location for the creature. */
        home: Vector3;
        /** Whether the creature is currently fleeing from danger. */
        fleeing: boolean;
        /** Animation phase used to sway behavior. */
        phase: number;
        /** Movement speed for the creature. */
        speed: number;
    }

    /**
     * Tracks the birds and rabbits roaming the forest and their flee state.
     */
    const wildlife: IWildlifeEntry[] = [];

    /**
     * Creates a bird that flies through the forest and can flee from danger.
     * @param index The bird index used to build unique mesh names.
     * @param position The spawn position for the bird.
     */
    const createBird = (index: number, position: Vector3) => {
        const root = new TransformNode(`wild bird ${index}`, scene);
        root.position = position;
        const body = MeshBuilder.CreateSphere(`bird ${index} body`, { diameter: 1.2, segments: 8 }, scene);
        body.scaling = new Vector3(1.5, 0.7, 0.75);
        body.parent = root;
        body.material = birdMaterial;
        const head = MeshBuilder.CreateSphere(`bird ${index} head`, { diameter: 0.7, segments: 8 }, scene);
        head.position = new Vector3(0.75, 0.15, 0);
        head.parent = root;
        head.material = birdMaterial;
        const wings: Mesh[] = [];
        for (const side of [-1, 1]) {
            const wing = MeshBuilder.CreateBox(`bird ${index} wing`, { width: 1.6, height: 0.12, depth: 0.7 }, scene);
            wing.position = new Vector3(0, 0, side * 0.55);
            wing.rotation.x = side * 0.2;
            wing.parent = root;
            wing.material = birdMaterial;
            wings.push(wing);
        }
        wildlife.push({ root, wings, home: position.clone(), fleeing: false, phase: index * 1.7, speed: 11 });
    };

    /**
     * Creates a rabbit that wanders the woods and reacts to danger.
     * @param index The rabbit index used to build unique mesh names.
     * @param position The spawn position for the rabbit.
     */
    const createRabbit = (index: number, position: Vector3) => {
        const root = new TransformNode(`wild rabbit ${index}`, scene);
        root.position = position;
        const body = MeshBuilder.CreateSphere(`rabbit ${index} body`, { diameter: 1.4, segments: 10 }, scene);
        body.scaling = new Vector3(1.25, 0.85, 0.9);
        body.parent = root;
        body.material = rabbitMaterial;
        const head = MeshBuilder.CreateSphere(`rabbit ${index} head`, { diameter: 0.85, segments: 10 }, scene);
        head.position = new Vector3(0.85, 0.35, 0);
        head.parent = root;
        head.material = rabbitMaterial;
        for (const side of [-1, 1]) {
            const ear = MeshBuilder.CreateCylinder(`rabbit ${index} ear`, { diameter: 0.22, height: 1.1, tessellation: 8 }, scene);
            ear.position = new Vector3(0.92, 1.05, side * 0.25);
            ear.parent = root;
            ear.material = rabbitMaterial;
        }
        wildlife.push({ root, wings: [], home: position.clone(), fleeing: false, phase: index * 2.3, speed: 7 });
    };
    [[-92, 10, -72], [-12, 13, -8], [67, 11, 42], [-137, 15, 84], [142, 12, -55]].forEach(([x, y, z], index) => createBird(index, new Vector3(x, y, z)));
    [[-83, 0.7, -48], [-22, 0.7, 19], [62, 0.7, 6], [116, 0.7, 70], [-132, 0.7, 58], [145, 0.7, -6]].forEach(([x, y, z], index) => createRabbit(index, new Vector3(x, y, z)));

    const generatorPositions = [new Vector3(-118, 0, -72), new Vector3(34, 0, 38), new Vector3(88, 0, 68)];
    const generators: Mesh[] = [];
    const generatorPings: Mesh[] = [];
    /** Describes the visual and effect components that belong to one generator. */
    interface IGeneratorParts {
        /** The main generator body mesh. */
        body: Mesh;
        /** The exhaust pipe mesh. */
        pipe: Mesh;
        /** The status light mesh for the generator. */
        status: Mesh;
        /** The proximity ping mesh for the generator. */
        ping: Mesh;
    }
    /** Tracks the runtime parts for each generator so repairs and pings can be repositioned safely. */
    const generatorParts: IGeneratorParts[] = [];
    for (let index = 0; index < generatorPositions.length; index++) {
        const position = generatorPositions[index];
        const body = MeshBuilder.CreateBox(`generator ${index + 1}`, { width: 4, height: 3, depth: 2.5 }, scene);
        body.position = position.add(new Vector3(0, 1.5, 0));
        body.material = generatorMaterial;
        generators.push(body);
        const pipe = MeshBuilder.CreateCylinder(`generator ${index + 1} exhaust`, { diameter: 0.45, height: 2.5, tessellation: 10 }, scene);
        pipe.position = position.add(new Vector3(1.25, 3.4, 0));
        pipe.material = metal;
        const status = MeshBuilder.CreateSphere(`generator ${index + 1} status`, { diameter: 0.45 }, scene);
        status.position = position.add(new Vector3(0, 2.2, -1.3));
        status.material = generatorLight;
        const ping = MeshBuilder.CreateTorus(`generator ${index + 1} ping`, { diameter: 6, thickness: 0.16, tessellation: 24 }, scene);
        ping.position = position.add(new Vector3(0, 0.15, 0));
        ping.rotation.x = Math.PI / 2;
        ping.material = generatorLight;
        generatorPings.push(ping);
        generatorParts.push({ body, pipe, status, ping });
    }

    const createHouse = (name: string, x: number, z: number, rotation: number, scale: number) => {
        const body = MeshBuilder.CreateBox(`${name} cabin`, { width: 13 * scale, height: 7 * scale, depth: 10 * scale }, scene);
        body.position = new Vector3(x, 3.5 * scale, z);
        body.rotation.y = rotation;
        body.material = wood;
        const roofMesh = MeshBuilder.CreateCylinder(`${name} roof`, { diameter: 15 * scale, height: 11 * scale, tessellation: 4 }, scene);
        roofMesh.position = new Vector3(x, 8 * scale, z);
        roofMesh.rotation = new Vector3(0, Math.PI / 4 + rotation, 0);
        roofMesh.scaling.y = 0.65;
        roofMesh.material = roof;
        const door = MeshBuilder.CreateBox(`${name} door`, { width: 2 * scale, height: 4 * scale, depth: 0.2 * scale }, scene);
        door.position = new Vector3(x, 2 * scale, z - 5.1 * scale);
        door.rotation.y = rotation;
        door.material = metal;
        door.metadata = { locked: true };
        const glow = MeshBuilder.CreateBox(`${name} window`, { width: 2 * scale, height: 1.8 * scale, depth: 0.2 * scale }, scene);
        glow.position = new Vector3(x - 3 * scale, 4.1 * scale, z - 5.1 * scale);
        glow.rotation.y = rotation;
        glow.material = windowGlow;
        const table = MeshBuilder.CreateBox(`${name} abandoned table`, { width: 5 * scale, height: 1.3 * scale, depth: 2.2 * scale }, scene);
        table.position = new Vector3(x + 3 * scale, 1.2 * scale, z + 1.5 * scale);
        table.rotation.y = rotation - 0.18;
        table.material = debrisMaterial;
        const collapsedChair = MeshBuilder.CreateBox(`${name} collapsed chair`, { width: 1.4 * scale, height: 2.8 * scale, depth: 1.4 * scale }, scene);
        collapsedChair.position = new Vector3(x - 3 * scale, 1.1 * scale, z + 2.4 * scale);
        collapsedChair.rotation.z = 0.45;
        collapsedChair.rotation.y = rotation;
        collapsedChair.material = debrisMaterial;
        const hangingCloth = MeshBuilder.CreatePlane(`${name} hanging cloth`, { width: 3 * scale, height: 2.5 * scale }, scene);
        hangingCloth.position = new Vector3(x + 1 * scale, 4.6 * scale, z + 4.8 * scale);
        hangingCloth.rotation.y = rotation;
        hangingCloth.material = dustMaterial;
        for (let index = 0; index < 3; index++) {
            const debris = MeshBuilder.CreateBox(`${name} floor debris ${index}`, { width: 0.7 * scale, height: 0.35 * scale, depth: 0.45 * scale }, scene);
            debris.position = new Vector3(x - 2 * scale + index * scale, 0.2 * scale, z - 1.5 * scale);
            debris.rotation.y = index * 0.8;
            debris.material = debrisMaterial;
        }
        return door;
    };

    const lockedDoors: Mesh[] = [createHouse("ranger cabin", -48, -20, 0.1, 1.15), createHouse("pine clearing home", 28, 28, -0.35, 0.85)];
    const houseCenters = [new Vector3(-48, 0, -20), new Vector3(28, 0, 28)];
    const hiddenPoster = MeshBuilder.CreatePlane("hidden poster 6 7", { width: 3.2, height: 1.6 }, scene);
    hiddenPoster.position = new Vector3(34.3, 3.1, 32.6);
    hiddenPoster.rotation.y = -0.35;
    hiddenPoster.material = posterMaterial;

    const path = MeshBuilder.CreateGround("dirt path to the outpost", { width: 7, height: 120 }, scene);
    path.position = new Vector3(91, 0.03, -47);
    path.rotation.y = 0.35;
    path.material = dirt;

    const outpostBase = MeshBuilder.CreateBox("abandoned outpost foundation", { width: 16, height: 1.2, depth: 14 }, scene);
    outpostBase.position = new Vector3(94, 0.6, 58);
    outpostBase.material = dirt;
    const tower = MeshBuilder.CreateBox("abandoned watch tower", { width: 8, height: 18, depth: 8 }, scene);
    tower.position = new Vector3(94, 9.6, 58);
    tower.material = wood;
    const platform = MeshBuilder.CreateBox("collapsed outpost platform", { width: 13, height: 0.8, depth: 13 }, scene);
    platform.position = new Vector3(94, 19, 58);
    platform.rotation.z = -0.08;
    platform.material = wood;
    const mast = MeshBuilder.CreateCylinder("outpost radio mast", { diameter: 0.55, height: 16 }, scene);
    mast.position = new Vector3(94, 27, 58);
    mast.rotation.z = 0.1;
    mast.material = metal;
    const antenna = MeshBuilder.CreateCylinder("fallen antenna", { diameter: 0.4, height: 12 }, scene);
    antenna.position = new Vector3(100, 22, 57);
    antenna.rotation = new Vector3(0.15, 0, -0.75);
    antenna.material = metal;
    const warning = MeshBuilder.CreateBox("outpost warning board", { width: 5, height: 3, depth: 0.25 }, scene);
    warning.position = new Vector3(94, 10, 53.8);
    warning.material = roof;

    const createLantern = (name: string, position: Vector3, color: Color3, intensity: number) => {
        const lantern = MeshBuilder.CreateSphere(`${name} lantern`, { diameter: 1.2 }, scene);
        lantern.position = position;
        const lanternMaterial = material(`${name} glow`, color);
        lanternMaterial.emissiveColor = color;
        lantern.material = lanternMaterial;
        const light = new PointLight(`${name} light`, position, scene);
        light.diffuse = color;
        light.intensity = intensity;
        light.range = 28;
    };

    createLantern("outpost red beacon", new Vector3(94, 15, 53), new Color3(1, 0.04, 0.01), 2.5);
    createLantern("ranger cabin lantern", new Vector3(-48, 5, -25), new Color3(1, 0.18, 0.02), 1.4);

    const createPickup = (name: string, position: Vector3, pickupMaterial: StandardMaterial, shape: "box" | "cylinder" | "sphere", size: Vector3) => {
        const pickup = shape === "box"
            ? MeshBuilder.CreateBox(name, { width: size.x, height: size.y, depth: size.z }, scene)
            : shape === "cylinder"
              ? MeshBuilder.CreateCylinder(name, { diameter: size.x, height: size.y, tessellation: 12 }, scene)
              : MeshBuilder.CreateSphere(name, { diameter: size.x, segments: 12 }, scene);
        pickup.position = position;
        pickup.material = pickupMaterial;
        return pickup;
    };

    createPickup("flashlight pickup", new Vector3(-105, 0.9, -63), pickupMetal, "cylinder", new Vector3(0.55, 1.8, 0.55));
    createPickup("flashlight pickup 2", new Vector3(83, 0.9, 42), pickupMetal, "cylinder", new Vector3(0.55, 1.8, 0.55));
    createPickup("bandage pickup", new Vector3(-110, 0.55, -66), bandageMaterial, "box", new Vector3(1.5, 0.45, 1));
    createPickup("bandage pickup 2", new Vector3(87, 0.55, 48), bandageMaterial, "box", new Vector3(1.5, 0.45, 1));
    createPickup("battery pickup", new Vector3(-96, 0.45, -58), batteryMaterial, "cylinder", new Vector3(0.45, 0.9, 0.45));
    createPickup("battery pickup 2", new Vector3(78, 0.45, 52), batteryMaterial, "cylinder", new Vector3(0.45, 0.9, 0.45));
    createPickup("battery pickup 3", new Vector3(44, 0.45, 16), batteryMaterial, "cylinder", new Vector3(0.45, 0.9, 0.45));
    createPickup("axe pickup", new Vector3(5, 0.8, -72), axeHead, "box", new Vector3(0.55, 1.8, 0.2));
    createPickup("walkie talkie pickup", new Vector3(-105, 0.8, -63), walkieMaterial, "box", new Vector3(0.75, 1.1, 0.45));
    createPickup("walkie talkie pickup 2", new Vector3(69, 0.8, 31), walkieMaterial, "box", new Vector3(0.75, 1.1, 0.45));
    createPickup("walkie talkie pickup 3", new Vector3(108, 0.8, 72), walkieMaterial, "box", new Vector3(0.75, 1.1, 0.45));
    createPickup("canned food pickup", new Vector3(35, 0.7, 24), metal, "cylinder", new Vector3(0.75, 1.2, 0.75));
    createPickup("canned food pickup 2", new Vector3(-126, 0.7, -82), metal, "cylinder", new Vector3(0.75, 1.2, 0.75));
    createPickup("medkit pickup", new Vector3(-72, 0.55, 18), medkitMaterial, "box", new Vector3(1.2, 0.6, 0.9));
    createPickup("medkit pickup 2", new Vector3(72, 0.55, -38), medkitMaterial, "box", new Vector3(1.2, 0.6, 0.9));
    createPickup("adrenaline pickup", new Vector3(-12, 0.65, 72), adrenalineMaterial, "cylinder", new Vector3(0.35, 1.1, 0.35));
    createPickup("adrenaline pickup 2", new Vector3(118, 0.65, -12), adrenalineMaterial, "cylinder", new Vector3(0.35, 1.1, 0.35));

    const playerRoots: TransformNode[] = [];
    const createPlayer = (playerNumber: number, position: Vector3) => {
        const color = playerColors[playerNumber - 1];
        const playerRoot = new TransformNode(`player ${playerNumber}`, scene);
        playerRoot.position = position;
        playerRoots.push(playerRoot);
        const shirt = MeshBuilder.CreateBox(`player ${playerNumber} plaid shirt`, { width: 2.2, height: 2, depth: 1.25 }, scene);
        shirt.position = new Vector3(0, 2.2, 0);
        shirt.parent = playerRoot;
        shirt.material = plaid;
        const pants = MeshBuilder.CreateBox(`player ${playerNumber} jeans`, { width: 1.8, height: 1.8, depth: 1.1 }, scene);
        pants.position = new Vector3(0, 0.8, 0);
        pants.parent = playerRoot;
        pants.material = denim;
        const head = MeshBuilder.CreateSphere(`player ${playerNumber} head`, { diameter: 1.35, segments: 12 }, scene);
        head.position = new Vector3(0, 3.8, 0);
        head.parent = playerRoot;
        head.material = skin;
        const beardMesh = MeshBuilder.CreateCylinder(`player ${playerNumber} beard`, { diameterTop: 0.35, diameterBottom: 0.85, height: 0.75, tessellation: 8 }, scene);
        beardMesh.position = new Vector3(0, 3.55, -0.48);
        beardMesh.parent = playerRoot;
        beardMesh.rotation.x = Math.PI / 2;
        beardMesh.material = beard;
        const hat = MeshBuilder.CreateCylinder(`player ${playerNumber} lumberjack hat`, { diameterTop: 1.7, diameterBottom: 2.1, height: 0.55, tessellation: 12 }, scene);
        hat.position = new Vector3(0, 4.55, 0);
        hat.parent = playerRoot;
        hat.material = leather;
        const hatBand = MeshBuilder.CreateCylinder(`player ${playerNumber} hat band`, { diameter: 1.78, height: 0.18, tessellation: 12 }, scene);
        hatBand.position = new Vector3(0, 4.42, 0);
        hatBand.parent = playerRoot;
        hatBand.material = plaid;
        for (const side of [-1, 1]) {
            const boot = MeshBuilder.CreateBox(`player ${playerNumber} boot`, { width: 0.7, height: 0.8, depth: 1.25 }, scene);
            boot.position = new Vector3(side * 0.55, 0.15, -0.12);
            boot.parent = playerRoot;
            boot.material = leather;
        }
        const axeHandle = MeshBuilder.CreateCylinder(`player ${playerNumber} axe handle`, { diameter: 0.16, height: 3.2 }, scene);
        axeHandle.position = new Vector3(1.45, 1.8, 0.15);
        axeHandle.parent = playerRoot;
        axeHandle.rotation.z = -0.3;
        axeHandle.material = axeWood;
        const axeBlade = MeshBuilder.CreateBox(`player ${playerNumber} axe blade`, { width: 0.85, height: 0.95, depth: 0.14 }, scene);
        axeBlade.position = new Vector3(1.82, 3.1, 0.15);
        axeBlade.parent = playerRoot;
        axeBlade.rotation.z = -0.3;
        axeBlade.material = axeHead;
        const sidearm = MeshBuilder.CreateBox(`player ${playerNumber} nightmare sidearm`, { width: 0.28, height: 0.3, depth: 1.35 }, scene);
        sidearm.position = new Vector3(-1.25, 2.15, -0.5);
        sidearm.parent = playerRoot;
        sidearm.rotation.x = Math.PI / 2;
        sidearm.material = gunMetal;
        const spawnRing = MeshBuilder.CreateTorus(`player ${playerNumber} spawn ring`, { diameter: 5, thickness: 0.18, tessellation: 24 }, scene);
        spawnRing.position = new Vector3(0, 0.1, 0);
        spawnRing.parent = playerRoot;
        const playerMaterial = material(`player ${playerNumber} marker`, color);
        spawnRing.material = playerMaterial;
        createLantern(`player ${playerNumber}`, position.add(new Vector3(0, 2.6, 0)), color, 0.8);
        return playerRoot;
    };

    createPlayer(1, new Vector3(-60, 0, -43));
    createPlayer(2, new Vector3(-52, 0, -43));
    createPlayer(3, new Vector3(-60, 0, -51));
    createPlayer(4, new Vector3(-52, 0, -51));
    playerRoots[0].getChildMeshes().forEach((mesh) => {
        mesh.isVisible = false;
    });

    const monster = new TransformNode("WILDA BEAR", scene);
    monster.position = new Vector3(112, 0, -25);
    const monsterTorso = MeshBuilder.CreateCylinder("bear narrow torso", { diameterTop: 2.2, diameterBottom: 3.5, height: 8, tessellation: 10 }, scene);
    monsterTorso.position = new Vector3(0, 5.5, 0);
    monsterTorso.parent = monster;
    monsterTorso.material = bearFur;
    const monsterHead = MeshBuilder.CreateSphere("bear skull", { diameter: 3.5, segments: 12 }, scene);
    monsterHead.scaling = new Vector3(0.8, 1.05, 0.82);
    monsterHead.position = new Vector3(0, 10.2, 0);
    monsterHead.parent = monster;
    monsterHead.material = bearFur;
    for (const side of [-1, 1]) {
        const ear = MeshBuilder.CreateSphere("bear ear", { diameter: 1.2, segments: 10 }, scene);
        ear.position = new Vector3(side * 1.15, 11.45, 0);
        ear.parent = monster;
        ear.material = bearFur;
        const leg = MeshBuilder.CreateCylinder("bear long leg", { diameter: 0.95, height: 5, tessellation: 8 }, scene);
        leg.position = new Vector3(side * 0.9, 2.1, 0);
        leg.parent = monster;
        leg.material = bearFur;
        const arm = MeshBuilder.CreateCylinder("bear long arm", { diameter: 0.75, height: 7, tessellation: 8 }, scene);
        arm.position = new Vector3(side * 2.05, 5.5, 0);
        arm.rotation.z = side * 0.2;
        arm.parent = monster;
        arm.material = bearFur;
        const eye = MeshBuilder.CreateSphere("bear glowing eye", { diameter: 0.28, segments: 8 }, scene);
        eye.position = new Vector3(side * 0.52, 10.45, -1.5);
        eye.parent = monster;
        eye.material = monsterEye;
    }
    const upperJaw = MeshBuilder.CreateBox("bear upper jaw", { width: 1.8, height: 0.7, depth: 1.7 }, scene);
    upperJaw.position = new Vector3(0, 9.35, -1.1);
    upperJaw.parent = monster;
    upperJaw.material = bearMuzzle;
    const lowerJaw = MeshBuilder.CreateBox("bear broken lower jaw", { width: 1.65, height: 0.55, depth: 1.45 }, scene);
    lowerJaw.position = new Vector3(0, 8.35, -1.2);
    lowerJaw.rotation.x = -0.35;
    lowerJaw.parent = monster;
    lowerJaw.material = bearMuzzle;

    const revivePings: Mesh[] = [];
    const trackingPings: Mesh[] = [];
    for (let index = 0; index < playerRoots.length; index++) {
        const ping = MeshBuilder.CreateTorus(`player ${index + 1} revive ping`, { diameter: 4.5, thickness: 0.2, tessellation: 24 }, scene);
        ping.position = playerRoots[index].position.add(new Vector3(0, 0.2, 0));
        ping.rotation.x = Math.PI / 2;
        ping.material = revivePingMaterial;
        ping.isVisible = false;
        revivePings.push(ping);
        const trackingPing = MeshBuilder.CreateTorus(`player ${index + 1} tracking ping`, { diameter: 3.8, thickness: 0.14, tessellation: 24 }, scene);
        trackingPing.position = playerRoots[index].position.add(new Vector3(0, 0.25, 0));
        trackingPing.rotation.x = Math.PI / 2;
        trackingPing.material = batteryPingMaterial;
        trackingPing.isVisible = false;
        trackingPings.push(trackingPing);
    }
    const monsterPing = MeshBuilder.CreateSphere("WILDA BEAR warning ping", { diameter: 0.6 }, scene);
    monsterPing.position = monster.position.add(new Vector3(0, 12, 0));
    monsterPing.material = monsterEye;

    let gameStarted = false;
    const settings = { sprint: true, revive: true, pickupE: true, fControl: true };
    const modeOptions = ["THE LONG NIGHT", "NIGHTMARE", "THE LAST STAND", "THE HUNT"] as const;
    let selectedMode: (typeof modeOptions)[number] = modeOptions[0];
    const languageOptions = ["ENGLISH", "SPANISH", "FRENCH", "GERMAN", "PORTUGUESE"] as const;
    const languageStorageKey = "dead-woods-language";
    let selectedLanguage: (typeof languageOptions)[number] = languageOptions[0];
    try {
        const savedLanguage = window.localStorage.getItem(languageStorageKey);
        if (savedLanguage && languageOptions.includes(savedLanguage as (typeof languageOptions)[number])) {
            selectedLanguage = savedLanguage as (typeof languageOptions)[number];
        }
    } catch {
        selectedLanguage = languageOptions[0];
    }
    let inventoryVisible = true;
    const achievementStorageKey = "dead-woods-achievements";
    const achievementStats = {
        wins: 0,
        revives: 0,
        escapedTogether: false,
        againstTheOdds: false,
        lastOneOut: false,
        generatorWhisperer: false,
        blackoutSurvivor: false,
        silentRunning: false,
        axeWork: false,
        packRat: false,
        longDistanceCall: false,
        forestRemembers: false,
        hardModeSurvivor: false,
        closeCall: false,
        deadQuiet: false,
        markedPrey: false,
        sevenSeconds: false,
        allHands: false,
        goldenDiscovery: false,
        lastStand: false,
        luckyGameplay: false,
        medkitUse: false,
        adrenalineUse: false,
        rainyGame: false,
    };
    try {
        const savedAchievements = JSON.parse(window.localStorage.getItem(achievementStorageKey) ?? "{}");
        achievementStats.wins = Number(savedAchievements.wins) || 0;
        achievementStats.revives = Number(savedAchievements.revives) || 0;
        achievementStats.escapedTogether = Boolean(savedAchievements.escapedTogether);
        achievementStats.againstTheOdds = Boolean(savedAchievements.againstTheOdds);
        achievementStats.lastOneOut = Boolean(savedAchievements.lastOneOut);
        achievementStats.generatorWhisperer = Boolean(savedAchievements.generatorWhisperer);
        achievementStats.blackoutSurvivor = Boolean(savedAchievements.blackoutSurvivor);
        achievementStats.silentRunning = Boolean(savedAchievements.silentRunning);
        achievementStats.axeWork = Boolean(savedAchievements.axeWork);
        achievementStats.packRat = Boolean(savedAchievements.packRat);
        achievementStats.longDistanceCall = Boolean(savedAchievements.longDistanceCall);
        achievementStats.forestRemembers = Boolean(savedAchievements.forestRemembers);
        achievementStats.hardModeSurvivor = Boolean(savedAchievements.hardModeSurvivor);
        achievementStats.closeCall = Boolean(savedAchievements.closeCall);
        achievementStats.deadQuiet = Boolean(savedAchievements.deadQuiet);
        achievementStats.markedPrey = Boolean(savedAchievements.markedPrey);
        achievementStats.sevenSeconds = Boolean(savedAchievements.sevenSeconds);
        achievementStats.allHands = Boolean(savedAchievements.allHands);
        achievementStats.goldenDiscovery = Boolean(savedAchievements.goldenDiscovery);
        achievementStats.lastStand = Boolean(savedAchievements.lastStand);
        achievementStats.luckyGameplay = Boolean(savedAchievements.luckyGameplay);
        achievementStats.medkitUse = Boolean(savedAchievements.medkitUse);
        achievementStats.adrenalineUse = Boolean(savedAchievements.adrenalineUse);
        achievementStats.rainyGame = Boolean(savedAchievements.rainyGame);
    } catch {
        achievementStats.wins = 0;
        achievementStats.revives = 0;
    }
    const saveAchievements = () => {
        try {
            window.localStorage.setItem(achievementStorageKey, JSON.stringify(achievementStats));
        } catch {
            return;
        }
    };
    const identityStorageKey = "dead-woods-identity";
    const bannedUsersStorageKey = "dead-woods-banned-users";
    const adminDirectoryStorageKey = "dead-woods-admin-directory";
    const moderationStorageKey = "dead-woods-moderation";
    const reservedCeoUsername = "dudeslays94";
    let playerUsername = "Ranger";
    let adminRole: "PLAYER" | "ADMIN" | "CEO" = "PLAYER";
    let adminOnboardingComplete = false;
    let rejectedUsernameAttempt = false;
    const bannedUsers: string[] = [];
    const bannedUserExpirations: Record<string, number> = {};
    const adminDirectory: string[] = [];
    const authorizedAdmins: string[] = [];
    const playerStats = { rounds: 0, wins: 0, revives: 0 };
    const playerHistory: string[] = [];
    const adminReports: string[] = [];
    try {
        const savedIdentity = JSON.parse(window.localStorage.getItem(identityStorageKey) ?? "{}");
        playerUsername = typeof savedIdentity.username === "string" ? savedIdentity.username : playerUsername;
        adminRole = savedIdentity.role === "CEO" || savedIdentity.role === "ADMIN" ? savedIdentity.role : "PLAYER";
        adminOnboardingComplete = Boolean(savedIdentity.onboardingComplete);
        const savedBannedUsers = JSON.parse(window.localStorage.getItem(bannedUsersStorageKey) ?? "[]");
        if (Array.isArray(savedBannedUsers)) {
            bannedUsers.push(...savedBannedUsers.filter((username): username is string => typeof username === "string"));
        }
        const savedAdminDirectory = JSON.parse(window.localStorage.getItem(adminDirectoryStorageKey) ?? "[]");
        if (Array.isArray(savedAdminDirectory)) {
            adminDirectory.push(...savedAdminDirectory.filter((username): username is string => typeof username === "string"));
        }
        const savedModeration = JSON.parse(window.localStorage.getItem(moderationStorageKey) ?? "{}");
        if (Array.isArray(savedModeration.authorizedAdmins)) {
            authorizedAdmins.push(...savedModeration.authorizedAdmins.filter((username): username is string => typeof username === "string"));
        }
        if (Array.isArray(savedModeration.reports)) {
            adminReports.push(...savedModeration.reports.filter((report): report is string => typeof report === "string"));
        }
        if (savedModeration.bannedUserExpirations && typeof savedModeration.bannedUserExpirations === "object") {
            Object.assign(bannedUserExpirations, savedModeration.bannedUserExpirations);
        }
        playerStats.rounds = Number(savedModeration.stats?.rounds) || 0;
        playerStats.wins = Number(savedModeration.stats?.wins) || 0;
        playerStats.revives = Number(savedModeration.stats?.revives) || 0;
        if (Array.isArray(savedModeration.history)) {
            playerHistory.push(...savedModeration.history.filter((entry): entry is string => typeof entry === "string"));
        }
    } catch {
        playerUsername = "Ranger";
        adminRole = "PLAYER";
    }
    if (playerUsername.toLowerCase() === reservedCeoUsername && adminRole !== "CEO") {
        playerUsername = "Ranger";
        adminRole = "PLAYER";
        adminOnboardingComplete = false;
    }
    const saveIdentity = () => {
        try {
            window.localStorage.setItem(identityStorageKey, JSON.stringify({ username: playerUsername, role: adminRole, onboardingComplete: adminOnboardingComplete }));
            window.localStorage.setItem(bannedUsersStorageKey, JSON.stringify(bannedUsers));
            window.localStorage.setItem(adminDirectoryStorageKey, JSON.stringify(adminDirectory));
            window.localStorage.setItem(moderationStorageKey, JSON.stringify({ authorizedAdmins, reports: adminReports, stats: playerStats, history: playerHistory, bannedUserExpirations }));
        } catch {
            return;
        }
    };
    const isUserBanned = (username: string) => {
        const normalizedUsername = username.toLowerCase();
        const expiration = bannedUserExpirations[normalizedUsername];
        if (expiration && expiration <= Date.now()) {
            delete bannedUserExpirations[normalizedUsername];
            const index = bannedUsers.indexOf(normalizedUsername);
            if (index !== -1) {
                bannedUsers.splice(index, 1);
            }
            saveIdentity();
            return false;
        }
        return bannedUsers.includes(normalizedUsername);
    };
    const ui = AdvancedDynamicTexture.CreateFullscreenUI("survival inventory");
    const inventory = new Rectangle("inventory panel");
    inventory.width = "270px";
    inventory.height = "235px";
    inventory.cornerRadius = 8;
    inventory.thickness = 2;
    inventory.color = "#7f4032";
    inventory.background = "#090b12d9";
    inventory.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
    inventory.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
    inventory.left = "-22px";
    inventory.top = "-22px";
    ui.addControl(inventory);

    const inventoryContents = new StackPanel("inventory contents");
    inventoryContents.paddingTop = "12px";
    inventoryContents.paddingLeft = "14px";
    inventoryContents.paddingRight = "14px";
    inventory.addControl(inventoryContents);
    const inventoryTitle = new TextBlock("inventory title", "SURVIVAL PACK");
    inventoryTitle.height = "28px";
    inventoryTitle.color = "#efb27e";
    inventoryTitle.fontSize = 18;
    inventoryTitle.fontWeight = "bold";
    inventoryTitle.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    inventoryContents.addControl(inventoryTitle);
    const inventoryItems = new TextBlock("inventory items", "AXE          1\nFLASHLIGHT   2\nBATTERIES    0/3\nBANDAGES     3\nENERGY       100%\nCANNED FOOD  4");
    inventoryItems.height = "205px";
    inventoryItems.color = "#d7d4ca";
    inventoryItems.fontSize = 15;
    inventoryItems.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    inventoryItems.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    inventoryContents.addControl(inventoryItems);
    const energyBar = new Rectangle("player energy bar");
    energyBar.width = "250px";
    energyBar.height = "18px";
    energyBar.cornerRadius = 3;
    energyBar.thickness = 1;
    energyBar.color = "#c7a16b";
    energyBar.background = "#120e0b";
    energyBar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    energyBar.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
    energyBar.left = "24px";
    energyBar.top = "-24px";
    const energyBarFill = new Rectangle("player energy fill");
    energyBarFill.width = "100%";
    energyBarFill.height = "100%";
    energyBarFill.thickness = 0;
    energyBarFill.background = "#d28b35";
    energyBarFill.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    energyBar.addControl(energyBarFill);
    ui.addControl(energyBar);

    const objectivePanel = new Rectangle("objective panel");
    objectivePanel.width = "390px";
    objectivePanel.height = "92px";
    objectivePanel.cornerRadius = 5;
    objectivePanel.thickness = 1;
    objectivePanel.color = "#54717a";
    objectivePanel.background = "#071018d9";
    objectivePanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    objectivePanel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    objectivePanel.left = "22px";
    objectivePanel.top = "22px";
    const objectiveText = new TextBlock("objective text", "OBJECTIVE\nFind the generators");
    objectiveText.paddingLeft = "14px";
    objectiveText.paddingTop = "10px";
    objectiveText.color = "#dce8e3";
    objectiveText.fontSize = 16;
    objectiveText.fontWeight = "bold";
    objectiveText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    objectiveText.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    objectivePanel.addControl(objectiveText);
    ui.addControl(objectivePanel);

    const interactionPrompt = new TextBlock("interaction prompt", "");
    interactionPrompt.width = "520px";
    interactionPrompt.height = "32px";
    interactionPrompt.color = "#f1d49d";
    interactionPrompt.fontSize = 17;
    interactionPrompt.fontWeight = "bold";
    interactionPrompt.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    interactionPrompt.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
    interactionPrompt.top = "-72px";
    ui.addControl(interactionPrompt);

    const jumpscareOverlay = new Rectangle("bear jumpscare overlay");
    jumpscareOverlay.width = "100%";
    jumpscareOverlay.height = "100%";
    jumpscareOverlay.background = "#4d0000";
    jumpscareOverlay.alpha = 0.9;
    jumpscareOverlay.thickness = 0;
    jumpscareOverlay.isVisible = false;
    const jumpscareText = new TextBlock("bear jumpscare text", "THE BEAR FOUND YOU");
    jumpscareText.color = "#ffb0a0";
    jumpscareText.fontSize = 42;
    jumpscareText.fontWeight = "bold";
    jumpscareOverlay.addControl(jumpscareText);
    ui.addControl(jumpscareOverlay);

    const showJumpscare = () => {
        jumpscareOverlay.isVisible = true;
        playJumpScare();
        window.setTimeout(() => {
            jumpscareOverlay.isVisible = false;
        }, 850);
    };

    const makeMenuButton = (name: string, text: string, callback: () => void) => {
        const button = Button.CreateSimpleButton(name, text);
        button.width = "280px";
        button.height = "46px";
        button.color = "#e7b6a1";
        button.background = "#160d12e8";
        button.thickness = 1;
        button.cornerRadius = 3;
        button.paddingTop = "5px";
        button.paddingBottom = "5px";
        button.onPointerClickObservable.add(callback);
        return button;
    };

    const titleScreen = new Rectangle("dead woods title screen");
    titleScreen.width = "100%";
    titleScreen.height = "100%";
    titleScreen.background = "#030509e8";
    titleScreen.thickness = 0;
    titleScreen.isPointerBlocker = true;
    const titleContent = new StackPanel("dead woods title content");
    titleContent.width = "420px";
    titleContent.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    titleScreen.addControl(titleContent);
    const studioText = new TextBlock("studio title", "DEAD REFLEX STUDIOS PRESENTS");
    studioText.height = "34px";
    studioText.color = "#b52e2e";
    studioText.fontSize = 17;
    studioText.fontWeight = "bold";
    titleContent.addControl(studioText);
    const treeSilhouette = new TextBlock("tree silhouettes", "/\\  /\\  /\\  /\\  /\\  /\\");
    treeSilhouette.height = "32px";
    treeSilhouette.color = "#000000";
    treeSilhouette.fontSize = 21;
    titleContent.addControl(treeSilhouette);
    const gameTitle = new TextBlock("game title", "DEAD WOODS");
    gameTitle.height = "86px";
    gameTitle.color = "#c43030";
    gameTitle.fontSize = 52;
    gameTitle.fontWeight = "bold";
    titleContent.addControl(gameTitle);
    const titleSubtitle = new TextBlock("game subtitle", "THE FOREST REMEMBERS");
    titleSubtitle.height = "34px";
    titleSubtitle.color = "#756267";
    titleSubtitle.fontSize = 14;
    titleContent.addControl(titleSubtitle);
    const gameDescription = new TextBlock("game description", "MULTIPLAYER  |  FIRST PERSON  |  HORROR");
    gameDescription.height = "28px";
    gameDescription.color = "#d7d4ca";
    gameDescription.fontSize = 13;
    titleContent.addControl(gameDescription);
    const identityStatus = new TextBlock("identity status", `${playerUsername}  [${adminRole}]`);
    identityStatus.height = "26px";
    identityStatus.color = adminRole === "CEO" ? "#f4cf55" : adminRole === "ADMIN" ? "#8fd3ff" : "#756267";
    identityStatus.fontSize = 14;
    identityStatus.fontWeight = "bold";
    titleContent.addControl(identityStatus);
    const modeStatus = new TextBlock("mode status", "MODE  THE LONG NIGHT");
    modeStatus.height = "28px";
    modeStatus.color = "#efb27e";
    modeStatus.fontSize = 15;
    modeStatus.fontWeight = "bold";
    titleContent.addControl(modeStatus);
    const findServerButton = makeMenuButton("find server", "FIND SERVER", () => {
        resetRound();
        gameStarted = true;
        stopTitleMusic();
        titleScreen.isVisible = false;
        settingsScreen.isVisible = false;
        inventory.isVisible = inventoryVisible;
        energyBar.isVisible = true;
    });
    titleContent.addControl(findServerButton);
    const modeButton = makeMenuButton("select mode", "CHANGE MODE", () => {
        const currentIndex = modeOptions.indexOf(selectedMode);
        selectedMode = modeOptions[(currentIndex + 1) % modeOptions.length];
        modeStatus.text = `MODE  ${selectedMode}`;
    });
    titleContent.addControl(modeButton);
    const adminScreen = new Rectangle("admin control screen");
    const adminButton = makeMenuButton("open admin menu", "ADMIN CONTROL", () => {
        adminScreen.isVisible = true;
        titleScreen.isVisible = false;
    });
    adminButton.isVisible = adminRole !== "PLAYER";
    titleContent.addControl(adminButton);
    const achievementsTitle = new TextBlock("achievements title", "ACHIEVEMENTS");
    achievementsTitle.height = "28px";
    achievementsTitle.color = "#d7d4ca";
    achievementsTitle.fontSize = 16;
    achievementsTitle.fontWeight = "bold";
    titleContent.addControl(achievementsTitle);
    const winOneAchievement = new TextBlock("win one achievement", "WIN 1 GAME");
    winOneAchievement.height = "22px";
    winOneAchievement.fontSize = 14;
    titleContent.addControl(winOneAchievement);
    const winTenAchievement = new TextBlock("win ten achievement", "WIN 10 GAMES");
    winTenAchievement.height = "22px";
    winTenAchievement.fontSize = 14;
    titleContent.addControl(winTenAchievement);
    const reviveTenAchievement = new TextBlock("revive ten achievement", "REVIVE 10 PLAYERS");
    reviveTenAchievement.height = "22px";
    reviveTenAchievement.fontSize = 14;
    titleContent.addControl(reviveTenAchievement);
    const extraAchievements = new TextBlock("extra achievements", "");
    extraAchievements.height = "168px";
    extraAchievements.color = "#756267";
    extraAchievements.fontSize = 12;
    extraAchievements.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    titleContent.addControl(extraAchievements);
    const updateAchievements = () => {
        const completeColor = "#f4cf55";
        const incompleteColor = "#756267";
        winOneAchievement.text = achievementStats.wins >= 1 ? "WIN 1 GAME - ACHIEVEMENT COMPLETE" : `WIN 1 GAME (${achievementStats.wins}/1)`;
        winTenAchievement.text = achievementStats.wins >= 10 ? "WIN 10 GAMES - ACHIEVEMENT COMPLETE" : `WIN 10 GAMES (${achievementStats.wins}/10)`;
        reviveTenAchievement.text = achievementStats.revives >= 10 ? "REVIVE 10 PLAYERS - ACHIEVEMENT COMPLETE" : `REVIVE 10 PLAYERS (${achievementStats.revives}/10)`;
        winOneAchievement.color = achievementStats.wins >= 1 ? completeColor : incompleteColor;
        winTenAchievement.color = achievementStats.wins >= 10 ? completeColor : incompleteColor;
        reviveTenAchievement.color = achievementStats.revives >= 10 ? completeColor : incompleteColor;
        const achievementLine = (label: string, complete: boolean) => `${complete ? "[X]" : "[ ]"} ${label}`;
        extraAchievements.text = [
            achievementLine("NO ONE LEFT BEHIND", achievementStats.escapedTogether),
            achievementLine("AGAINST THE ODDS", achievementStats.againstTheOdds),
            achievementLine("THE LAST ONE OUT", achievementStats.lastOneOut),
            achievementLine("GENERATOR WHISPERER", achievementStats.generatorWhisperer),
            achievementLine("BLACKOUT SURVIVOR", achievementStats.blackoutSurvivor),
            achievementLine("SILENT RUNNING", achievementStats.silentRunning),
            achievementLine("AXE WORK", achievementStats.axeWork),
            achievementLine("PACK RAT", achievementStats.packRat),
            achievementLine("LONG-DISTANCE CALL", achievementStats.longDistanceCall),
            achievementLine("THE FOREST REMEMBERS", achievementStats.forestRemembers),
            achievementLine("HARD MODE SURVIVOR", achievementStats.hardModeSurvivor),
            achievementLine("CLOSE CALL", achievementStats.closeCall),
            achievementLine("DEAD QUIET", achievementStats.deadQuiet),
            achievementLine("MARKED PREY", achievementStats.markedPrey),
            achievementLine("SEVEN SECONDS", achievementStats.sevenSeconds),
            achievementLine("ALL HANDS", achievementStats.allHands),
            achievementLine("GOLDEN DISCOVERY", achievementStats.goldenDiscovery),
            achievementLine("LAST STAND", achievementStats.lastStand),
            achievementLine("LUCKY GAMEPLAY", achievementStats.luckyGameplay),
            achievementLine("MEDICAL ATTENTION", achievementStats.medkitUse),
            achievementLine("ADRENALINE JUNKIE", achievementStats.adrenalineUse),
            achievementLine("A RAINY GAME", achievementStats.rainyGame),
        ].join("\n");
    };
    updateAchievements();
    const friendsButton = makeMenuButton("open friends", "FRIENDS LIST", () => {
        friendsScreen.isVisible = true;
        titleScreen.isVisible = false;
    });
    titleContent.addControl(friendsButton);
    const settingsButton = makeMenuButton("open settings", "SETTINGS", () => {
        settingsScreen.isVisible = true;
        titleScreen.isVisible = false;
    });
    titleContent.addControl(settingsButton);
    const quitButton = makeMenuButton("quit game", "QUIT", () => {
        gameStarted = false;
        inventory.isVisible = false;
        quitOverlay.isVisible = false;
        titleScreen.isVisible = true;
        saveAchievements();
        startTitleMusic();
        quitNotice.text = "GAME SAVED";
    });
    titleContent.addControl(quitButton);
    const quitNotice = new TextBlock("quit notice", "");
    quitNotice.height = "30px";
    quitNotice.color = "#8e4444";
    quitNotice.fontSize = 14;
    titleContent.addControl(quitNotice);

    const settingsScreen = new Rectangle("dead woods settings screen");
    settingsScreen.width = "100%";
    settingsScreen.height = "100%";
    settingsScreen.background = "#030509f2";
    settingsScreen.thickness = 0;
    settingsScreen.isVisible = false;
    const settingsContent = new StackPanel("settings content");
    settingsContent.width = "420px";
    settingsContent.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    settingsScreen.addControl(settingsContent);
    const settingsTitle = new TextBlock("settings title", "SETTINGS");
    settingsTitle.height = "58px";
    settingsTitle.color = "#c43030";
    settingsTitle.fontSize = 32;
    settingsTitle.fontWeight = "bold";
    settingsContent.addControl(settingsTitle);
    const settingStatus = new TextBlock("setting status", "");
    settingStatus.height = "116px";
    settingStatus.color = "#d7d4ca";
    settingStatus.fontSize = 16;
    settingsContent.addControl(settingStatus);
    const updateSettingStatus = () => {
        settingStatus.text = `LANGUAGE     ${selectedLanguage}\nSPRINT       ${settings.sprint ? "ON" : "OFF"}\nREVIVE       ${settings.revive ? "ON" : "OFF"}\nPICKUP E     ${settings.pickupE ? "ON" : "OFF"}\nF CONTROL    ${settings.fControl ? "ON" : "OFF"}`;
    };
    const languageButton = makeMenuButton("select language", "CHANGE LANGUAGE", () => {
        const currentIndex = languageOptions.indexOf(selectedLanguage);
        selectedLanguage = languageOptions[(currentIndex + 1) % languageOptions.length];
        try {
            window.localStorage.setItem(languageStorageKey, selectedLanguage);
        } catch {
            // Language selection still applies for the current session if storage is unavailable.
        }
        updateSettingStatus();
    });
    settingsContent.addControl(languageButton);
    const addSettingButton = (label: string, key: keyof typeof settings) => {
        const button = makeMenuButton(`toggle ${key}`, `TOGGLE ${label}`, () => {
            settings[key] = !settings[key];
            updateSettingStatus();
        });
        settingsContent.addControl(button);
    };
    addSettingButton("SPRINT", "sprint");
    addSettingButton("REVIVE", "revive");
    addSettingButton("PICKUP E", "pickupE");
    addSettingButton("F CONTROL", "fControl");
    const backButton = makeMenuButton("settings back", "BACK", () => {
        settingsScreen.isVisible = false;
        titleScreen.isVisible = true;
    });
    settingsContent.addControl(backButton);
    updateSettingStatus();

    const blockedUsernamePattern = /(?:fuck|shit|bitch|asshole|slur|dick|piss|porn|sex|nazi|hate|kill)/i;
    const normalizeUsername = (username: string) => username
        .toLowerCase()
        .replace(/[4@]/g, "a")
        .replace(/[3]/g, "e")
        .replace(/[1!]/g, "i")
        .replace(/[0]/g, "o")
        .replace(/[$5]/g, "s")
        .replace(/[^a-z]/g, "");
    const friendsScreen = new Rectangle("dead woods friends screen");
    friendsScreen.width = "100%";
    friendsScreen.height = "100%";
    friendsScreen.background = "#030509f2";
    friendsScreen.thickness = 0;
    friendsScreen.isVisible = false;
    const friendsContent = new StackPanel("friends content");
    friendsContent.width = "420px";
    friendsContent.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    friendsScreen.addControl(friendsContent);
    const friendsTitle = new TextBlock("friends title", "FRIENDS LIST");
    friendsTitle.height = "58px";
    friendsTitle.color = "#c43030";
    friendsTitle.fontSize = 32;
    friendsTitle.fontWeight = "bold";
    friendsContent.addControl(friendsTitle);
    const usernameInput = new InputText("friend username");
    usernameInput.width = "280px";
    usernameInput.height = "42px";
    usernameInput.color = "#e7d7d1";
    usernameInput.background = "#160d12";
    usernameInput.placeholderText = "USERNAME";
    friendsContent.addControl(usernameInput);
    const friendsStatus = new TextBlock("friends status", "NO FRIENDS ADDED");
    friendsStatus.height = "76px";
    friendsStatus.color = "#d7d4ca";
    friendsStatus.fontSize = 15;
    friendsContent.addControl(friendsStatus);
    const addFriendButton = makeMenuButton("add friend", "ADD FRIEND", () => {
        const username = usernameInput.text.trim();
        const normalizedUsername = normalizeUsername(username);
        if (!/^[a-zA-Z0-9_-]{3,20}$/.test(username) || blockedUsernamePattern.test(normalizedUsername) || isUserBanned(username)) {
            rejectedUsernameAttempt = true;
            friendsStatus.text = "USERNAME REJECTED";
            return;
        }
        friendsStatus.text = `FRIEND ADDED\n${username}`;
        usernameInput.text = "";
    });
    friendsContent.addControl(addFriendButton);
    const friendsBackButton = makeMenuButton("friends back", "BACK", () => {
        friendsScreen.isVisible = false;
        titleScreen.isVisible = true;
    });
    friendsContent.addControl(friendsBackButton);

    adminScreen.width = "100%";
    adminScreen.height = "100%";
    adminScreen.background = "#030509f5";
    adminScreen.thickness = 0;
    adminScreen.isVisible = false;
    const adminContent = new StackPanel("admin control content");
    adminContent.width = "460px";
    adminContent.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    adminScreen.addControl(adminContent);
    const adminTitle = new TextBlock("admin title", "ADMIN CONTROL");
    adminTitle.height = "58px";
    adminTitle.color = adminRole === "CEO" ? "#f4cf55" : "#8fd3ff";
    adminTitle.fontSize = 32;
    adminTitle.fontWeight = "bold";
    adminContent.addControl(adminTitle);
    const banWarning = new TextBlock("ban warning", "CEO BAN MODE: TYPE CEO TO CONFIRM");
    banWarning.height = "36px";
    banWarning.color = "#ff6b5e";
    banWarning.fontSize = 15;
    banWarning.fontWeight = "bold";
    banWarning.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    banWarning.isVisible = adminRole === "CEO";
    adminContent.addControl(banWarning);
    const adminDirectoryText = new TextBlock("admin directory", "");
    adminDirectoryText.height = "100px";
    adminDirectoryText.color = "#d7d4ca";
    adminDirectoryText.fontSize = 15;
    adminDirectoryText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    adminContent.addControl(adminDirectoryText);
    const updateAdminDirectory = () => {
        adminDirectoryText.text = `ADMINS\n${adminDirectory.length > 0 ? adminDirectory.map((username) => `${username}  [${username === playerUsername && adminRole === "CEO" ? "CEO" : "ADMIN"}]`).join("\n") : "NO ADMINS REGISTERED"}`;
    };
    updateAdminDirectory();
    const reportListText = new TextBlock("admin report list", "");
    reportListText.height = "120px";
    reportListText.color = "#f1d49d";
    reportListText.fontSize = 13;
    reportListText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    adminContent.addControl(reportListText);
    const updateReportList = () => {
        reportListText.text = `REPORTS\n${adminReports.length > 0 ? adminReports.slice(-5).join("\n") : "NO REPORTS"}`;
    };
    updateReportList();
    const authorizationText = new TextBlock("authorization status", "");
    authorizationText.height = "38px";
    authorizationText.color = "#d7d4ca";
    authorizationText.fontSize = 13;
    authorizationText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    adminContent.addControl(authorizationText);
    const updateAuthorizationText = () => {
        authorizationText.text = adminRole === "CEO" ? `AUTHORIZED ADMINS\n${authorizedAdmins.length > 0 ? authorizedAdmins.join(", ") : "NONE"}` : "ADMINS CAN ONLY SUBMIT REPORTS";
    };
    updateAuthorizationText();
    const banUsernameInput = new InputText("ban username");
    banUsernameInput.width = "280px";
    banUsernameInput.height = "42px";
    banUsernameInput.color = "#e7d7d1";
    banUsernameInput.background = "#160d12";
    banUsernameInput.placeholderText = "USERNAME TO BAN";
    adminContent.addControl(banUsernameInput);
    const banDurationOptions = ["1 DAY", "1 WEEK", "2 WEEKS", "1 MONTH"] as const;
    let selectedBanDuration: (typeof banDurationOptions)[number] = banDurationOptions[0];
    const banDurationButton = makeMenuButton("ban duration", `DURATION  ${selectedBanDuration}`, () => {
        const currentIndex = banDurationOptions.indexOf(selectedBanDuration);
        selectedBanDuration = banDurationOptions[(currentIndex + 1) % banDurationOptions.length];
        if (banDurationButton.textBlock) {
            banDurationButton.textBlock.text = `DURATION  ${selectedBanDuration}`;
        }
    });
    banDurationButton.isVisible = adminRole === "CEO";
    adminContent.addControl(banDurationButton);
    const banConfirmationInput = new InputText("ban confirmation");
    banConfirmationInput.width = "280px";
    banConfirmationInput.height = "42px";
    banConfirmationInput.color = "#e7d4d1";
    banConfirmationInput.background = "#300e12";
    banConfirmationInput.placeholderText = "TYPE CEO TO CONFIRM";
    banConfirmationInput.isVisible = adminRole === "CEO";
    adminContent.addControl(banConfirmationInput);
    const reportCommentInput = new InputText("admin report comment");
    reportCommentInput.width = "280px";
    reportCommentInput.height = "42px";
    reportCommentInput.color = "#e7d7d1";
    reportCommentInput.background = "#160d12";
    reportCommentInput.placeholderText = "REPORT COMMENT";
    adminContent.addControl(reportCommentInput);
    const moderationStatus = new TextBlock("moderation status", "");
    moderationStatus.height = "40px";
    moderationStatus.color = "#d7d4ca";
    moderationStatus.fontSize = 14;
    adminContent.addControl(moderationStatus);
    const banButton = makeMenuButton("ban username", "BAN USERNAME", () => {
        const username = banUsernameInput.text.trim().toLowerCase();
        if (adminRole !== "CEO") {
            const comment = reportCommentInput.text.trim();
            if (adminRole !== "ADMIN" || !comment) {
                moderationStatus.text = "ADMINS CAN ONLY SUBMIT A REPORT WITH A COMMENT";
            } else {
                adminReports.push(`${playerUsername} reported ${username}: ${comment}`);
                saveIdentity();
                updateReportList();
                moderationStatus.text = "REPORT SENT TO CEO";
                reportCommentInput.text = "";
            }
        } else if (banConfirmationInput.text.trim() !== "CEO") {
            moderationStatus.text = "TYPE CEO AT THE TOP TO CONFIRM THIS BAN";
        } else if (!/^[a-zA-Z0-9_-]{3,20}$/.test(username) || blockedUsernamePattern.test(normalizeUsername(username))) {
            moderationStatus.text = "USERNAME REJECTED";
        } else if (username === playerUsername.toLowerCase()) {
            moderationStatus.text = "YOU CANNOT BAN YOURSELF";
        } else if (adminDirectory.some((admin) => admin.toLowerCase() === username) && authorizedAdmins.includes(username)) {
            moderationStatus.text = "AUTHORIZED ADMINS CANNOT BE BANNED";
        } else if (!bannedUsers.includes(username)) {
            bannedUsers.push(username);
            const durationDays = selectedBanDuration === "1 DAY" ? 1 : selectedBanDuration === "1 WEEK" ? 7 : selectedBanDuration === "2 WEEKS" ? 14 : 30;
            bannedUserExpirations[username] = Date.now() + durationDays * 24 * 60 * 60 * 1000;
            saveIdentity();
            moderationStatus.text = `${username} BANNED FOR ${selectedBanDuration}`;
            banUsernameInput.text = "";
            banConfirmationInput.text = "";
        } else {
            moderationStatus.text = "USERNAME ALREADY BANNED";
        }
    });
    adminContent.addControl(banButton);
    const authorizationInput = new InputText("authorize admin");
    authorizationInput.width = "280px";
    authorizationInput.height = "42px";
    authorizationInput.color = "#e7d7d1";
    authorizationInput.background = "#160d12";
    authorizationInput.placeholderText = "ADMIN TO AUTHORIZE";
    authorizationInput.isVisible = adminRole === "CEO";
    adminContent.addControl(authorizationInput);
    const authorizeButton = makeMenuButton("authorize admin", "AUTHORIZE ADMIN", () => {
        const username = authorizationInput.text.trim().toLowerCase();
        if (adminRole !== "CEO") {
            moderationStatus.text = "CEO ACCESS REQUIRED";
        } else if (adminDirectory.some((admin) => admin.toLowerCase() === username) && !authorizedAdmins.includes(username)) {
            authorizedAdmins.push(username);
            saveIdentity();
            updateAuthorizationText();
            moderationStatus.text = `${username} AUTHORIZED`;
        } else {
            moderationStatus.text = "ADMIN NOT FOUND OR ALREADY AUTHORIZED";
        }
    });
    authorizeButton.isVisible = adminRole === "CEO";
    adminContent.addControl(authorizeButton);
    const playerStatsText = new TextBlock("player stats history", "");
    playerStatsText.height = "100px";
    playerStatsText.color = "#d7d4ca";
    playerStatsText.fontSize = 13;
    playerStatsText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    playerStatsText.isVisible = adminRole === "CEO";
    adminContent.addControl(playerStatsText);
    const updatePlayerStats = () => {
        playerStatsText.text = adminRole === "CEO" ? `PLAYER STATS: ${playerUsername}\nROUNDS ${playerStats.rounds}  WINS ${playerStats.wins}  REVIVES ${playerStats.revives}\nHISTORY\n${playerHistory.slice(-3).join("\n") || "NO HISTORY"}` : "";
    };
    updatePlayerStats();
    const adminBackButton = makeMenuButton("admin back", "BACK", () => {
        adminScreen.isVisible = false;
        titleScreen.isVisible = true;
    });
    adminContent.addControl(adminBackButton);

    const adminSetupScreen = new Rectangle("admin setup screen");
    adminSetupScreen.width = "100%";
    adminSetupScreen.height = "100%";
    adminSetupScreen.background = "#030509f7";
    adminSetupScreen.thickness = 0;
    adminSetupScreen.isPointerBlocker = true;
    const adminSetupContent = new StackPanel("admin setup content");
    adminSetupContent.width = "440px";
    adminSetupContent.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    adminSetupScreen.addControl(adminSetupContent);
    const adminSetupTitle = new TextBlock("admin setup title", "WELCOME TO DEAD WOODS");
    adminSetupTitle.height = "58px";
    adminSetupTitle.color = "#c43030";
    adminSetupTitle.fontSize = 28;
    adminSetupTitle.fontWeight = "bold";
    adminSetupContent.addControl(adminSetupTitle);
    const adminSetupStatus = new TextBlock("admin setup status", "Choose a username. Are you an admin?");
    adminSetupStatus.height = "58px";
    adminSetupStatus.color = "#d7d4ca";
    adminSetupStatus.fontSize = 16;
    adminSetupContent.addControl(adminSetupStatus);
    const playerUsernameInput = new InputText("player username");
    playerUsernameInput.width = "280px";
    playerUsernameInput.height = "42px";
    playerUsernameInput.color = "#e7d7d1";
    playerUsernameInput.background = "#160d12";
    playerUsernameInput.placeholderText = "YOUR USERNAME";
    playerUsernameInput.text = playerUsername;
    adminSetupContent.addControl(playerUsernameInput);
    const completeSetup = (role: "PLAYER" | "ADMIN" | "CEO") => {
        const username = playerUsernameInput.text.trim();
        const normalizedUsername = normalizeUsername(username);
        if (username.toLowerCase() === reservedCeoUsername && role !== "CEO") {
            rejectedUsernameAttempt = true;
            adminSetupStatus.text = "ONLY THE CEO MAY USE THAT USERNAME.";
            return;
        }
        if (!/^[a-zA-Z0-9_-]{3,20}$/.test(username) || blockedUsernamePattern.test(normalizedUsername)) {
            rejectedUsernameAttempt = true;
            adminSetupStatus.text = "USERNAME REJECTED. USE 3-20 SAFE CHARACTERS.";
            return;
        }
        playerUsername = username;
        adminRole = role;
        adminOnboardingComplete = true;
        if (role !== "PLAYER" && !adminDirectory.includes(playerUsername)) {
            adminDirectory.push(playerUsername);
        }
        if (rejectedUsernameAttempt) {
            adminReports.push(`AI REPORT: ${playerUsername} previously attempted an inappropriate username.`);
            rejectedUsernameAttempt = false;
        }
        saveIdentity();
        updateReportList();
        updateAdminDirectory();
        identityStatus.text = `${playerUsername}  [${adminRole}]`;
        identityStatus.color = adminRole === "CEO" ? "#f4cf55" : adminRole === "ADMIN" ? "#8fd3ff" : "#756267";
        adminButton.isVisible = adminRole !== "PLAYER";
        adminTitle.text = adminRole === "CEO" ? "CEO CONTROL" : "ADMIN CONTROL";
        adminTitle.color = adminRole === "CEO" ? "#f4cf55" : "#8fd3ff";
        banWarning.isVisible = adminRole === "CEO";
        banDurationButton.isVisible = adminRole === "CEO";
        banConfirmationInput.isVisible = adminRole === "CEO";
        authorizationInput.isVisible = adminRole === "CEO";
        authorizeButton.isVisible = adminRole === "CEO";
        playerStatsText.isVisible = adminRole === "CEO";
        updateAuthorizationText();
        updatePlayerStats();
        adminSetupScreen.isVisible = false;
    };
    const playerSetupButton = makeMenuButton("player setup", "NO, I AM A PLAYER", () => completeSetup("PLAYER"));
    adminSetupContent.addControl(playerSetupButton);
    const adminSetupButton = makeMenuButton("admin setup", "YES, I AM AN ADMIN", () => {
        adminSetupStatus.text = "ENTER ADMIN CODE";
        playerSetupButton.isVisible = false;
        adminSetupButton.isVisible = false;
        adminCodeInput.isVisible = true;
        adminCodeConfirm.isVisible = true;
    });
    adminSetupContent.addControl(adminSetupButton);
    const adminCodeInput = new InputText("admin code");
    adminCodeInput.width = "280px";
    adminCodeInput.height = "42px";
    adminCodeInput.color = "#e7d7d1";
    adminCodeInput.background = "#160d12";
    adminCodeInput.placeholderText = "ADMIN CODE";
    adminCodeInput.isVisible = false;
    adminSetupContent.addControl(adminCodeInput);
    const adminCodeConfirm = makeMenuButton("confirm admin code", "CONFIRM CODE", () => {
        const code = adminCodeInput.text.trim();
        if (code === "156913") {
            completeSetup("ADMIN");
        } else if (code === "dudeslayes") {
            completeSetup("CEO");
            adminTitle.text = "CEO CONTROL";
        } else {
            adminSetupStatus.text = "INVALID ADMIN CODE";
        }
    });
    adminCodeConfirm.isVisible = false;
    adminSetupContent.addControl(adminCodeConfirm);

    const reportScreen = new Rectangle("dead woods report screen");
    reportScreen.width = "100%";
    reportScreen.height = "100%";
    reportScreen.background = "#030509f5";
    reportScreen.thickness = 0;
    reportScreen.isVisible = false;
    const reportContent = new StackPanel("report content");
    reportContent.width = "420px";
    reportContent.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    reportScreen.addControl(reportContent);
    const reportTitle = new TextBlock("report title", "REPORT PLAYER");
    reportTitle.height = "58px";
    reportTitle.color = "#c43030";
    reportTitle.fontSize = 32;
    reportTitle.fontWeight = "bold";
    reportContent.addControl(reportTitle);
    const reportedPlayerInput = new InputText("reported player name");
    reportedPlayerInput.width = "280px";
    reportedPlayerInput.height = "42px";
    reportedPlayerInput.color = "#e7d7d1";
    reportedPlayerInput.background = "#160d12";
    reportedPlayerInput.placeholderText = "PLAYER NAME";
    reportContent.addControl(reportedPlayerInput);
    const reportReasonInput = new InputText("report reason");
    reportReasonInput.width = "280px";
    reportReasonInput.height = "64px";
    reportReasonInput.color = "#e7d7d1";
    reportReasonInput.background = "#160d12";
    reportReasonInput.placeholderText = "REASON";
    reportContent.addControl(reportReasonInput);
    const reportStatus = new TextBlock("report status", "");
    reportStatus.height = "38px";
    reportStatus.color = "#d7d4ca";
    reportStatus.fontSize = 14;
    reportContent.addControl(reportStatus);
    const submitReportButton = makeMenuButton("submit report", "SUBMIT REPORT", () => {
        reportStatus.text = "REPORT SUBMITTED";
        reportScreen.isVisible = false;
        titleScreen.isVisible = true;
        gameStarted = false;
        inventory.isVisible = false;
    });
    reportContent.addControl(submitReportButton);
    const reportBackButton = makeMenuButton("report back", "BACK", () => {
        reportScreen.isVisible = false;
        titleScreen.isVisible = true;
    });
    reportContent.addControl(reportBackButton);

    const reportButton = makeMenuButton("report player", "REPORT PLAYER", () => {
        reportScreen.isVisible = true;
        titleScreen.isVisible = false;
    });
    reportButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    reportButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
    reportButton.left = "24px";
    reportButton.top = "-24px";
    titleScreen.addControl(reportButton);

    const roundResultOverlay = new Rectangle("round result overlay");
    roundResultOverlay.width = "100%";
    roundResultOverlay.height = "100%";
    roundResultOverlay.background = "#030509f2";
    roundResultOverlay.thickness = 0;
    roundResultOverlay.isVisible = false;
    const roundResultContent = new StackPanel("round result content");
    roundResultContent.width = "420px";
    roundResultContent.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    roundResultOverlay.addControl(roundResultContent);
    const roundResultText = new TextBlock("round result text", "");
    roundResultText.height = "100px";
    roundResultText.color = "#c43030";
    roundResultText.fontSize = 42;
    roundResultText.fontWeight = "bold";
    roundResultContent.addControl(roundResultText);
    const returnToStartButton = makeMenuButton("return to start", "RETURN TO START", () => {
        roundResultOverlay.isVisible = false;
        titleScreen.isVisible = true;
        inventory.isVisible = false;
        gameStarted = false;
    });
    roundResultContent.addControl(returnToStartButton);

    const quitOverlay = new Rectangle("quit overlay");
    quitOverlay.width = "100%";
    quitOverlay.height = "100%";
    quitOverlay.background = "#00000000";
    quitOverlay.thickness = 0;
    quitOverlay.isVisible = false;
    quitOverlay.isPointerBlocker = false;
    const quitContent = new StackPanel("quit content");
    quitContent.width = "220px";
    quitContent.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    quitContent.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    quitContent.top = "36px";
    quitOverlay.addControl(quitContent);
    const quitText = new TextBlock("quit text", "QUIT");
    quitText.height = "48px";
    quitText.color = "white";
    quitText.fontSize = 28;
    quitText.fontWeight = "bold";
    quitContent.addControl(quitText);
    const quitToStartButton = makeMenuButton("quit to start", "QUIT", () => {
        quitOverlay.isVisible = false;
        titleScreen.isVisible = true;
        inventory.isVisible = false;
        gameStarted = false;
    });
    quitToStartButton.color = "white";
    quitToStartButton.background = "#000000aa";
    quitContent.addControl(quitToStartButton);
    const resumeButton = makeMenuButton("resume game", "RESUME", () => {
        quitOverlay.isVisible = false;
    });
    resumeButton.color = "white";
    resumeButton.background = "#000000aa";
    quitContent.addControl(resumeButton);
    ui.addControl(titleScreen);
    ui.addControl(settingsScreen);
    ui.addControl(friendsScreen);
    ui.addControl(adminScreen);
    adminSetupScreen.isVisible = !adminOnboardingComplete;
    ui.addControl(adminSetupScreen);
    ui.addControl(reportScreen);
    ui.addControl(roundResultOverlay);
    ui.addControl(quitOverlay);
    inventory.isVisible = false;
    energyBar.isVisible = false;

    const batteries = scene.meshes.filter((mesh) => mesh.name.startsWith("battery pickup"));
    const bandages = scene.meshes.filter((mesh) => mesh.name.startsWith("bandage pickup"));
    const food = scene.meshes.filter((mesh) => mesh.name.startsWith("canned food pickup"));
    const walkies = scene.meshes.filter((mesh) => mesh.name.startsWith("walkie talkie pickup"));
    const medkits = scene.meshes.filter((mesh) => mesh.name.startsWith("medkit pickup"));
    const objectiveCandidates = [
        new Vector3(-142, 0, -112), new Vector3(-118, 0, -72), new Vector3(-92, 0, 48), new Vector3(-62, 0, 86),
        new Vector3(-18, 0, -92), new Vector3(34, 0, 38), new Vector3(64, 0, -48), new Vector3(88, 0, 68),
        new Vector3(124, 0, 108), new Vector3(144, 0, -64), new Vector3(12, 0, 118), new Vector3(-132, 0, 96),
    ];
    const survivorSpawns = [new Vector3(-60, 0, -43), new Vector3(-52, 0, -43), new Vector3(-60, 0, -51), new Vector3(-52, 0, -51)];
    const randomizeObjectivePositions = () => {
        const shuffledCandidates = [...objectiveCandidates].sort(() => Math.random() - 0.5);
        const chosenPositions: Vector3[] = [];
        for (const candidate of shuffledCandidates) {
            if (survivorSpawns.some((spawn) => Vector3.Distance(spawn, candidate) < 28)) {
                continue;
            }
            if (chosenPositions.some((chosen) => Vector3.Distance(chosen, candidate) < 24)) {
                continue;
            }
            chosenPositions.push(candidate.clone());
            if (chosenPositions.length === generators.length + batteries.length) {
                break;
            }
        }
        if (chosenPositions.length < generators.length + batteries.length) {
            return;
        }
        generators.forEach((generator, index) => {
            const position = chosenPositions[index];
            const parts = generatorParts[index];
            parts.body.position.copyFrom(position.add(new Vector3(0, 1.5, 0)));
            parts.pipe.position.copyFrom(position.add(new Vector3(1.25, 3.4, 0)));
            parts.status.position.copyFrom(position.add(new Vector3(0, 2.2, -1.3)));
            parts.ping.position.copyFrom(position.add(new Vector3(0, 0.15, 0)));
        });
        batteries.forEach((battery, index) => {
            const position = chosenPositions[generators.length + index];
            battery.position.copyFrom(position.add(new Vector3(0, 0.45, 0)));
            batteryPings[index].position.copyFrom(position.add(new Vector3(0, 0.15, 0)));
        });
    };
    const batteryPings: Mesh[] = [];
    batteries.forEach((battery, index) => {
        battery.isVisible = false;
        const ping = MeshBuilder.CreateTorus(`battery ${index + 1} ping`, { diameter: 3.5, thickness: 0.14, tessellation: 20 }, scene);
        ping.position = battery.position.add(new Vector3(0, 0.15, 0));
        ping.rotation.x = Math.PI / 2;
        ping.material = batteryPingMaterial;
        ping.isVisible = false;
        batteryPings.push(ping);
    });
    medkits.forEach((medkit) => (medkit.isVisible = true));
    const escapePosition = new Vector3(-55, 0, 5);
    const escapeVehicle = MeshBuilder.CreateBox("escape vehicle", { width: 8, height: 2.2, depth: 4 }, scene);
    escapeVehicle.position = escapePosition.add(new Vector3(0, 1.5, 0));
    escapeVehicle.material = escapeMaterial;
    const escapeCab = MeshBuilder.CreateBox("escape vehicle cab", { width: 4, height: 2, depth: 3.5 }, scene);
    escapeCab.position = escapePosition.add(new Vector3(1.4, 3.4, 0));
    escapeCab.material = escapeMaterial;
    for (const side of [-1, 1]) {
        const wheel = MeshBuilder.CreateCylinder("escape vehicle wheel", { diameter: 1.8, height: 0.5, tessellation: 12 }, scene);
        wheel.position = escapePosition.add(new Vector3(side * 2.6, 0.8, 1.9));
        wheel.rotation.x = Math.PI / 2;
        wheel.material = metal;
    }
    const escapePing = MeshBuilder.CreateTorus("escape vehicle ping", { diameter: 10, thickness: 0.2, tessellation: 24 }, scene);
    escapePing.position = escapePosition.add(new Vector3(0, 0.15, 0));
    escapePing.rotation.x = Math.PI / 2;
    escapePing.material = batteryPingMaterial;
    escapePing.isVisible = false;
    const batterySlots = ["EMPTY", "EMPTY", "EMPTY"];
    const generatorOn = [false, false, false];
    const generatorHold = [0, 0, 0];
    const keys = new Set<string>();
    const bandagesByPlayer = [bandages.length + 1, 0, 0, 0];
    const reviveUsed = [false, false, false, false];
    let reviveProgress = 0;
    let reviveTarget = -1;
    let foodCount = food.length + 2;
    let walkieCount = 0;
    let energy = 15;
    const playerDead = [false, false, false, false];
    const playerEscaped = [false, false, false, false];
    const gunAmmo = [2, 2, 2, 2];
    let inventoryDropped = false;
    let gameWon = false;
    let monsterModeWon = false;
    let winningPlayer = -1;
    let spectatorIndex = 1;
    let roundOver = false;
    let roundOverTimer = -1;
    let modeTimer = 0;
    let huntEventTimer = 0;
    let monsterAbilityLevel = 1;
    let monsterAbilityCooldown = 0;
    let monsterRageTimer = 0;
    let monsterShadowTimer = 0;
    let monsterTrackTimer = 0;
    let monsterStunTimer = 0;
    let weatherIndex = 0;
    let rainyRound = false;
    let medkitCount = 0;
    const weatherNames = ["CLEAR", "MIST", "RAIN", "STORM"];
    let axeCount = lockedDoors.length;
    let flashlightOn = true;
    let flashlightCharge = 100;
    let sprintedThisRound = false;
    let generatorWhispererThisRound = true;
    let doorsOpenedThisRound = 0;
    let closeCallThisRound = false;
    let forestPosterFoundThisRound = false;
    const longRangePlayers = new Set<number>();
    let growlCooldown = 0;
    let monsterDangerLevel = 0;
    let swingTimer = 0;
    let eatTimer = 0;
    let footstepCooldown = 0;
    let pantCooldown = 0;
    let audioContext: AudioContext | undefined;
    let ambientSource: AudioBufferSourceNode | undefined;
    let waterSource: AudioBufferSourceNode | undefined;
    const generatorMotorOscillators: Array<OscillatorNode | undefined> = [];
    let audioStarted = false;
    const startAudio = () => {
        if (audioStarted) {
            void audioContext?.resume();
            return;
        }
        try {
            audioContext = new AudioContext();
            const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 2, audioContext.sampleRate);
            const data = buffer.getChannelData(0);
            for (let index = 0; index < data.length; index++) {
                data[index] = (Math.random() * 2 - 1) * 0.12;
            }
            ambientSource = audioContext.createBufferSource();
            ambientSource.buffer = buffer;
            ambientSource.loop = true;
            const filter = audioContext.createBiquadFilter();
            filter.type = "lowpass";
            filter.frequency.value = 850;
            const ambientGain = audioContext.createGain();
            ambientGain.gain.value = 0.035;
            ambientSource.connect(filter).connect(ambientGain).connect(audioContext.destination);
            ambientSource.start();
            const waterBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 3, audioContext.sampleRate);
            const waterData = waterBuffer.getChannelData(0);
            for (let index = 0; index < waterData.length; index++) {
                waterData[index] = (Math.random() * 2 - 1) * 0.2;
            }
            waterSource = audioContext.createBufferSource();
            waterSource.buffer = waterBuffer;
            waterSource.loop = true;
            const waterFilter = audioContext.createBiquadFilter();
            waterFilter.type = "bandpass";
            waterFilter.frequency.value = 1100;
            waterFilter.Q.value = 0.7;
            const waterGain = audioContext.createGain();
            waterGain.gain.value = 0.025;
            waterSource.connect(waterFilter).connect(waterGain).connect(audioContext.destination);
            waterSource.start();
            audioStarted = true;
            window.setInterval(() => {
                if (!audioContext) {
                    return;
                }
                const oscillator = audioContext.createOscillator();
                const gain = audioContext.createGain();
                oscillator.type = "sine";
                oscillator.frequency.setValueAtTime(1600 + Math.random() * 500, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(2400 + Math.random() * 400, audioContext.currentTime + 0.08);
                gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.045, audioContext.currentTime + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.18);
                oscillator.connect(gain).connect(audioContext.destination);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.2);
            }, 7500);
        } catch {
            audioContext = undefined;
        }
    };
    const playGrowl = () => {
        if (!audioContext) {
            return;
        }
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        oscillator.type = "sawtooth";
        oscillator.frequency.setValueAtTime(74, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(38, audioContext.currentTime + 0.8);
        gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.16, audioContext.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.9);
        oscillator.connect(gain).connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 1);
    };
    const playPowerUp = () => {
        if (!audioContext) {
            return;
        }
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        oscillator.type = "square";
        oscillator.frequency.setValueAtTime(90, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(520, audioContext.currentTime + 0.8);
        gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.11, audioContext.currentTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1);
        oscillator.connect(gain).connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 1.05);
    };
    const monsterAbilities = ["ROAR", "RAGE", "SHADOW", "TRACK", "POUNCE", "FRENZY", "EARTHSHAKE"];
    const unlockMonsterAbility = () => {
        monsterAbilityLevel = Math.min(monsterAbilities.length, monsterAbilityLevel + 1);
        playPowerUp();
    };
    const playBatteryDing = () => {
        if (!audioContext) {
            return;
        }
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(720, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1180, audioContext.currentTime + 0.12);
        gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.12, audioContext.currentTime + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.3);
        oscillator.connect(gain).connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.35);
    };
    const playGunshot = () => {
        if (!audioContext) {
            return;
        }
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        oscillator.type = "square";
        oscillator.frequency.value = 92;
        gain.gain.setValueAtTime(0.12, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.16);
        oscillator.connect(gain).connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.18);
    };
    const startGeneratorMotor = (index: number) => {
        if (!audioContext || generatorMotorOscillators[index]) {
            return;
        }
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        oscillator.type = "sawtooth";
        oscillator.frequency.value = 52 + index * 7;
        gain.gain.value = 0.035;
        oscillator.connect(gain).connect(audioContext.destination);
        oscillator.start();
        generatorMotorOscillators[index] = oscillator;
    };
    const playFootstep = (insideHouse: boolean, running: boolean) => {
        if (!audioContext) {
            return;
        }
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        oscillator.type = insideHouse ? "square" : "triangle";
        oscillator.frequency.value = insideHouse ? (running ? 105 : 135) : (running ? 68 : 88);
        gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(insideHouse ? 0.055 : 0.035, audioContext.currentTime + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.1);
        oscillator.connect(gain).connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.12);
    };
    const playPant = () => {
        if (!audioContext) {
            return;
        }
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(180, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(95, audioContext.currentTime + 0.45);
        gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.09, audioContext.currentTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.5);
        oscillator.connect(gain).connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.55);
    };
    const playJumpScare = () => {
        if (!audioContext) {
            return;
        }
        const currentTime = audioContext.currentTime;
        const scareOscillator = audioContext.createOscillator();
        const scareGain = audioContext.createGain();
        scareOscillator.type = "square";
        scareOscillator.frequency.setValueAtTime(110, currentTime);
        scareOscillator.frequency.exponentialRampToValueAtTime(42, currentTime + 0.5);
        scareGain.gain.setValueAtTime(0.3, currentTime);
        scareGain.gain.exponentialRampToValueAtTime(0.0001, currentTime + 0.6);
        scareOscillator.connect(scareGain).connect(audioContext.destination);
        scareOscillator.start(currentTime);
        scareOscillator.stop(currentTime + 0.65);

        const growlOscillator = audioContext.createOscillator();
        const growlGain = audioContext.createGain();
        growlOscillator.type = "sawtooth";
        growlOscillator.frequency.setValueAtTime(68, currentTime);
        growlOscillator.frequency.exponentialRampToValueAtTime(26, currentTime + 0.9);
        growlGain.gain.setValueAtTime(0.0001, currentTime);
        growlGain.gain.exponentialRampToValueAtTime(0.28, currentTime + 0.08);
        growlGain.gain.exponentialRampToValueAtTime(0.0001, currentTime + 1.05);
        growlOscillator.connect(growlGain).connect(audioContext.destination);
        growlOscillator.start(currentTime);
        growlOscillator.stop(currentTime + 1.1);
    };
    let titleMusicGain: GainNode | undefined;
    const titleMusicOscillators: OscillatorNode[] = [];
    const startTitleMusic = () => {
        startAudio();
        if (!audioContext || titleMusicGain) {
            return;
        }
        titleMusicGain = audioContext.createGain();
        titleMusicGain.gain.value = 0.06;
        titleMusicGain.connect(audioContext.destination);
        for (const frequency of [45, 67.5]) {
            const oscillator = audioContext.createOscillator();
            oscillator.type = "sine";
            oscillator.frequency.value = frequency;
            oscillator.connect(titleMusicGain);
            oscillator.start();
            titleMusicOscillators.push(oscillator);
        }
    };
    const stopTitleMusic = () => {
        if (!audioContext || !titleMusicGain) {
            return;
        }
        titleMusicGain.gain.setTargetAtTime(0.0001, audioContext.currentTime, 0.2);
        for (const oscillator of titleMusicOscillators) {
            oscillator.stop(audioContext.currentTime + 0.8);
        }
        titleMusicOscillators.length = 0;
        titleMusicGain = undefined;
    };
    titleScreen.onPointerDownObservable.add(startTitleMusic);
    window.addEventListener("keydown", (event) => {
        startAudio();
        keys.add(event.key.toLowerCase());
        if (event.key.toLowerCase() === "l" && gameStarted && !roundOver) {
            if (flashlightCharge > 0) {
                flashlightOn = !flashlightOn;
            }
        }
        if (event.key.toLowerCase() === "escape" && gameStarted && !roundOver) {
            quitOverlay.isVisible = !quitOverlay.isVisible;
        }
        if (event.key.toLowerCase() === "tab" && gameStarted) {
            event.preventDefault();
            inventoryVisible = !inventoryVisible;
            inventory.isVisible = inventoryVisible;
        }
    });
    window.addEventListener("keyup", (event) => keys.delete(event.key.toLowerCase()));
    window.addEventListener("pointerdown", startAudio, { once: true });
    window.addEventListener("contextmenu", (event) => event.preventDefault());
    window.addEventListener("pointerdown", (event) => {
        if (event.button !== 2 || !gameStarted || roundOver || selectedMode !== "NIGHTMARE" || playerDead[0] || gunAmmo[0] <= 0) {
            return;
        }
        event.preventDefault();
        gunAmmo[0]--;
        playGunshot();
        const toMonster = monster.position.add(new Vector3(0, 5, 0)).subtract(camera.position);
        const distance = toMonster.length();
        if (distance <= 60 && Vector3.Dot(camera.getForwardRay(1).direction, toMonster.normalize()) > 0.86) {
            monsterStunTimer = 7;
        }
    });

    const collectNearby = (items: AbstractMesh[], playerPosition: Vector3, callback: (item: AbstractMesh) => void) => {
        for (const item of items) {
            if (item.isVisible && Vector3.Distance(item.position, playerPosition) < 5) {
                callback(item);
                return;
            }
        }
    };

    const dropPlayerInventory = (position: Vector3) => {
        const createDrop = (name: string, offset: Vector3, pickupMaterial: StandardMaterial, shape: "box" | "cylinder") => {
            const drop = shape === "box"
                ? MeshBuilder.CreateBox(name, { width: 0.8, height: 0.35, depth: 0.8 }, scene)
                : MeshBuilder.CreateCylinder(name, { diameter: 0.45, height: 0.8, tessellation: 12 }, scene);
            drop.position = position.add(offset);
            drop.material = pickupMaterial;
        };
        let dropIndex = 0;
        if (axeCount > 0) {
            createDrop("dropped axe", new Vector3(1.2, 0.5, 0), axeHead, "box");
            dropIndex++;
        }
        for (let index = 0; index < 2; index++) {
            createDrop(`dropped flashlight ${index}`, new Vector3(-1 + index * 0.8, 0.5, 0.7), pickupMetal, "cylinder");
            dropIndex++;
        }
        for (let index = 0; index < batterySlots.filter((slot) => slot === "BATTERY").length; index++) {
            createDrop(`dropped battery ${index}`, new Vector3(-1 + (index % 3) * 0.8, 0.5, -0.8), batteryMaterial, "cylinder");
            dropIndex++;
        }
        for (let index = 0; index < bandagesByPlayer[0]; index++) {
            createDrop(`dropped bandage ${index}`, new Vector3(-1 + (index % 3) * 0.8, 0.25, 1.5 + Math.floor(index / 3) * 0.7), bandageMaterial, "box");
            dropIndex++;
        }
        for (let index = 0; index < foodCount; index++) {
            createDrop(`dropped canned food ${index}`, new Vector3(-1 + (index % 3) * 0.8, 0.6, -1.5 - Math.floor(index / 3) * 0.7), metal, "cylinder");
            dropIndex++;
        }
        if (dropIndex > 0) {
            inventoryDropped = true;
        }
        axeCount = 0;
        bandagesByPlayer[0] = 0;
        foodCount = 0;
        batterySlots.fill("EMPTY");
    };

    const finishRound = () => {
        roundOver = true;
        gameStarted = false;
        inventory.isVisible = false;
        rainStreaks.forEach((streak) => (streak.isVisible = false));
        if (playerEscaped[0] && !playerDead[0]) {
            achievementStats.wins++;
            const escapedPlayers = playerEscaped.filter(Boolean).length;
            achievementStats.escapedTogether ||= escapedPlayers === playerRoots.length;
            achievementStats.againstTheOdds ||= escapedPlayers === 1 && playerDead.slice(1).every(Boolean);
            achievementStats.lastOneOut ||= escapedPlayers === 1 && playerDead.slice(1).some(Boolean);
            achievementStats.generatorWhisperer ||= generatorWhispererThisRound;
            achievementStats.blackoutSurvivor ||= flashlightCharge <= 0;
            achievementStats.silentRunning ||= !sprintedThisRound;
            achievementStats.axeWork ||= doorsOpenedThisRound === lockedDoors.length;
            achievementStats.packRat ||= walkieCount > 0 && foodCount < food.length + 2 && bandagesByPlayer[0] < bandages.length + 1 && axeCount < lockedDoors.length;
            achievementStats.longDistanceCall ||= longRangePlayers.size === playerRoots.length - 1;
            achievementStats.forestRemembers ||= forestPosterFoundThisRound;
            achievementStats.hardModeSurvivor ||= !settings.sprint && !settings.revive && !settings.pickupE;
            achievementStats.closeCall ||= closeCallThisRound;
            saveAchievements();
            updateAchievements();
        }
        roundResultText.text = monsterModeWon ? "THE BEAR WINS" : playerEscaped[0] && !playerDead[0] ? "YOU ESCAPED" : "YOU DIED";
        roundResultOverlay.isVisible = true;
    };

    const resetRound = () => {
        const spawnPositions = [new Vector3(-60, 0, -43), new Vector3(-52, 0, -43), new Vector3(-60, 0, -51), new Vector3(-52, 0, -51)];
        playerRoots.forEach((root, index) => {
            root.position.copyFrom(spawnPositions[index]);
            root.setEnabled(true);
        });
        playerRoots[0].getChildMeshes().forEach((mesh) => (mesh.isVisible = selectedMode !== "THE HUNT"));
        for (let index = 1; index < playerRoots.length; index++) {
            playerRoots[index].getChildMeshes().forEach((mesh) => (mesh.isVisible = selectedMode !== "THE HUNT"));
        }
        scene.meshes.filter((mesh) => mesh.name.includes("nightmare sidearm")).forEach((mesh) => (mesh.isVisible = selectedMode === "NIGHTMARE"));
        playerDead.fill(false);
        playerEscaped.fill(false);
        reviveUsed.fill(false);
        revivePings.forEach((ping) => (ping.isVisible = false));
        generatorOn.fill(false);
        generatorHold.fill(0);
        randomizeObjectivePositions();
        weatherIndex = Math.floor(Math.random() * weatherNames.length);
        rainyRound = weatherIndex >= 2;
        rainStreaks.forEach((streak) => (streak.isVisible = rainyRound));
        if (rainyRound) {
            achievementStats.rainyGame = true;
            saveAchievements();
            updateAchievements();
        }
        generatorPings.forEach((ping) => (ping.isVisible = true));
        batteries.forEach((battery) => (battery.isVisible = false));
        batteryPings.forEach((ping) => (ping.isVisible = false));
        batterySlots.fill("EMPTY");
        escapePing.isVisible = false;
        monster.position.copyFrom(new Vector3(112, 0, -25));
        monster.scaling.setAll(1);
        bandagesByPlayer[0] = bandages.length + 1;
        medkitCount = 0;
        medkits.forEach((medkit) => (medkit.isVisible = true));
        foodCount = food.length + 2;
        walkieCount = 0;
        energy = 15;
        flashlightOn = true;
        flashlightCharge = 100;
        axeCount = lockedDoors.length;
        sprintedThisRound = false;
        generatorWhispererThisRound = true;
        doorsOpenedThisRound = 0;
        closeCallThisRound = false;
        longRangePlayers.clear();
        forestPosterFoundThisRound = false;
        monsterDangerLevel = 0;
        gameWon = false;
        monsterModeWon = false;
        winningPlayer = -1;
        roundOver = false;
        roundOverTimer = -1;
        modeTimer = 0;
        huntEventTimer = 0;
        monsterAbilityLevel = selectedMode === "NIGHTMARE" ? monsterAbilities.length : 1;
        monsterAbilityCooldown = 0;
        monsterRageTimer = 0;
        monsterShadowTimer = 0;
        monsterTrackTimer = 0;
        monsterStunTimer = 0;
        gunAmmo.fill(2);
        trackingPings.forEach((ping) => (ping.isVisible = false));
        inventoryDropped = false;
        roundResultOverlay.isVisible = false;
        quitOverlay.isVisible = false;
        camera.position.copyFrom(spawnPositions[0].add(new Vector3(0, 4.2, 0)));
    };

    scene.onBeforeRenderObservable.add(() => {
        const player = playerRoots[0];
        const delta = scene.getEngine().getDeltaTime() / 1000;
        for (const [index, ripple] of riverRipples.entries()) {
            ripple.position.z += delta * (10 + (index % 3) * 2);
            if (ripple.position.z > 190) {
                ripple.position.z = -190;
            }
            ripple.position.x = -146 + ((ripple.position.z + 190) / 380) * 132;
        }
        if (rainyRound) {
            for (const [index, streak] of rainStreaks.entries()) {
                streak.position.y -= delta * 28;
                if (streak.position.y < 0) {
                    streak.position.y = 24;
                    streak.position.x = player.position.x + (index % 10 - 5) * 12;
                    streak.position.z = player.position.z + (Math.floor(index / 10) - 4) * 12;
                }
            }
        }
        if (!gameStarted) {
            return;
        }
        if (selectedMode === "THE LAST STAND") {
            modeTimer += delta;
            monsterDangerLevel = Math.min(5, Math.floor(modeTimer / 45));
        }
        flashlight.position.copyFrom(camera.position);
        flashlight.intensity = flashlightOn && flashlightCharge > 0 ? 2.2 : 0;
        const wildlifeTime = performance.now() / 1000;
        for (const animal of wildlife) {
            const distance = Vector3.Distance(animal.root.position, player.position);
            if (distance < 18) {
                animal.fleeing = true;
            }
            if (animal.fleeing) {
                const escapeDirection = animal.root.position.subtract(player.position);
                escapeDirection.y = 0;
                if (escapeDirection.lengthSquared() > 0) {
                    escapeDirection.normalize().scaleInPlace(animal.speed * delta);
                    animal.root.position.addInPlace(escapeDirection);
                    animal.root.rotation.y = Math.atan2(escapeDirection.x, escapeDirection.z);
                }
                if (animal.wings.length > 0) {
                    animal.root.position.y += delta * 4;
                    for (const wing of animal.wings) {
                        wing.rotation.x = Math.sin(wildlifeTime * 18 + animal.phase) * 0.8;
                    }
                } else {
                    animal.root.position.y = 0.7 + Math.abs(Math.sin(wildlifeTime * 9 + animal.phase)) * 0.7;
                }
            } else if (animal.wings.length > 0) {
                for (const wing of animal.wings) {
                    wing.rotation.x = Math.sin(wildlifeTime * 3 + animal.phase) * 0.15;
                }
            }
        }
        const actionTime = performance.now() / 1000;
        swingTimer = Math.max(0, swingTimer - delta);
        eatTimer = Math.max(0, eatTimer - delta);
        let watcherPressure = 0;
        for (const watcher of watcherRoots) {
            const toPlayer = player.position.subtract(watcher.root.position);
            const distance = toPlayer.length();
            watcher.root.position.x = watcher.home.x + Math.sin(actionTime * 0.95 + watcher.phase) * 2.4;
            watcher.root.position.z = watcher.home.z + Math.cos(actionTime * 0.8 + watcher.phase) * 2.4;
            watcher.root.position.y = Math.sin(actionTime * 1.9 + watcher.phase) * 0.25 + watcher.home.y;
            const facing = new Vector3(toPlayer.x, 0, toPlayer.z);
            if (facing.lengthSquared() > 0) {
                watcher.root.rotation.y = Math.atan2(facing.x, facing.z) + Math.sin(actionTime * 1.3 + watcher.phase) * 0.2;
            }
            const pulse = 0.4 + (Math.sin(actionTime * 3.2 + watcher.phase) + 1) * 0.3;
            for (const eye of watcher.eyes) {
                eye.scaling.x = 1 + pulse * 0.12;
                eye.scaling.y = 1 + pulse * 0.12;
                eye.scaling.z = 1 + pulse * 0.18;
            }
            if (distance < 90) {
                watcherPressure += (1 - distance / 90) * 0.22;
            }
        }
        watcherPressure = Math.min(1, watcherPressure);
        let targetIndex = -1;
        let targetDistance = Number.POSITIVE_INFINITY;
        for (let index = 0; index < playerRoots.length; index++) {
            if (selectedMode === "THE HUNT" && index === 0) {
                continue;
            }
            if (!playerDead[index] && !playerEscaped[index]) {
                const distance = Vector3.Distance(monster.position, playerRoots[index].position);
                if (selectedMode === "THE HUNT" && monsterTrackTimer <= 0 && distance > 18) {
                    continue;
                }
                if (distance < targetDistance) {
                    targetIndex = index;
                    targetDistance = distance;
                }
            }
        }
        if (!gameWon && targetIndex !== -1 && selectedMode !== "THE HUNT" && monsterStunTimer <= 0) {
            if (targetIndex === 0 && targetDistance < 10 && !playerDead[0]) {
                closeCallThisRound = true;
            }
            growlCooldown -= delta;
            if (targetDistance < 48 + monsterDangerLevel * 14 && growlCooldown <= 0) {
                playGrowl();
                growlCooldown = Math.max(1.2, 4 - monsterDangerLevel * 0.7);
            }
            const direction = playerRoots[targetIndex].position.subtract(monster.position);
            direction.y = 0;
            if (direction.lengthSquared() > 0) {
                const objectivesComplete = generatorOn.every(Boolean) && batterySlots.every((slot) => slot === "BATTERY");
                const nightmareFrenzy = selectedMode === "NIGHTMARE" ? 2.2 : 1;
                const monsterSpeed = (14 + monsterDangerLevel * 5) * (selectedMode === "NIGHTMARE" ? 1.35 : 1) * nightmareFrenzy * (objectivesComplete ? 2.75 : 1);
                direction.normalize().scaleInPlace(Math.min(monsterSpeed * delta, targetDistance));
                monster.position.addInPlace(direction);
                monster.rotation.y = Math.atan2(direction.x, direction.z);
                monster.position.y = Math.abs(Math.sin(actionTime * 16)) * 0.18;
                monster.rotation.x = Math.sin(actionTime * 16) * 0.035;
                const enteringHouse = houseCenters.some((houseCenter) => Vector3.Distance(monster.position, houseCenter) < 14);
                const crouchTarget = enteringHouse ? 0.58 : 1;
                monster.scaling.y += (crouchTarget - monster.scaling.y) * Math.min(1, delta * 8);
                const crouchHeight = enteringHouse ? 0.12 : 0;
                monster.position.y += (crouchHeight - monster.position.y) * Math.min(1, delta * 8);
            }
            if (targetDistance < 4 + monsterDangerLevel * 0.5) {
                if (!playerDead[targetIndex]) {
                    playerDead[targetIndex] = true;
                    playerRoots[targetIndex].setEnabled(false);
                    revivePings[targetIndex].isVisible = true;
                    if (targetIndex === 0) {
                        showJumpscare();
                        if (reviveUsed[targetIndex] && !inventoryDropped) {
                            dropPlayerInventory(playerRoots[targetIndex].position);
                        }
                    }
                }
            }
        }
        monsterAbilityCooldown = Math.max(0, monsterAbilityCooldown - delta);
        monsterRageTimer = Math.max(0, monsterRageTimer - delta);
        monsterShadowTimer = Math.max(0, monsterShadowTimer - delta);
        monsterTrackTimer = Math.max(0, monsterTrackTimer - delta);
        monsterStunTimer = Math.max(0, monsterStunTimer - delta);
        if (selectedMode === "THE HUNT") {
            const huntMovement = new Vector3((keys.has("d") ? 1 : 0) - (keys.has("a") ? 1 : 0), 0, (keys.has("s") ? 1 : 0) - (keys.has("w") ? 1 : 0));
            if (huntMovement.lengthSquared() > 0) {
                huntMovement.normalize().scaleInPlace((monsterRageTimer > 0 ? 22 : 12) * delta);
                monster.position.addInPlace(huntMovement);
                monster.rotation.y = Math.atan2(huntMovement.x, huntMovement.z);
                monster.position.x = Math.max(-188, Math.min(188, monster.position.x));
                monster.position.z = Math.max(-188, Math.min(188, monster.position.z));
            }
            if (keys.has("q") && monsterAbilityLevel >= 1 && monsterAbilityCooldown <= 0) {
                monsterAbilityCooldown = 5;
                for (let index = 0; index < playerRoots.length; index++) {
                    if (!playerDead[index]) {
                        const distance = Vector3.Distance(monster.position, playerRoots[index].position);
                        if (distance < 26) {
                            const escapeDirection = playerRoots[index].position.subtract(monster.position);
                            escapeDirection.y = 0;
                            if (escapeDirection.lengthSquared() > 0) {
                                escapeDirection.normalize().scaleInPlace(7);
                                playerRoots[index].position.addInPlace(escapeDirection);
                            }
                        }
                    }
                }
                playGrowl();
            }
            if (keys.has("e") && monsterAbilityLevel >= 2 && monsterAbilityCooldown <= 0) {
                monsterAbilityCooldown = 10;
                monsterRageTimer = 6;
            }
            if (keys.has("r") && monsterAbilityLevel >= 3 && monsterAbilityCooldown <= 0) {
                monsterAbilityCooldown = 12;
                monsterShadowTimer = 5;
            }
            if (keys.has("t") && monsterAbilityLevel >= 4 && monsterAbilityCooldown <= 0) {
                monsterAbilityCooldown = 12;
                monsterTrackTimer = 6;
                playPowerUp();
            }
            if (keys.has("f") && monsterAbilityLevel >= 7 && monsterAbilityCooldown <= 0) {
                monsterAbilityCooldown = 14;
                for (let index = 1; index < playerRoots.length; index++) {
                    if (!playerDead[index] && Vector3.Distance(monster.position, playerRoots[index].position) < 18) {
                        playerDead[index] = true;
                        playerRoots[index].setEnabled(false);
                        revivePings[index].isVisible = true;
                    }
                }
            }
            if (keys.has(" ") && targetIndex !== -1 && targetDistance < (monsterAbilityLevel >= 4 ? 9 : 6) && monsterAbilityCooldown <= 0) {
                monsterAbilityCooldown = monsterAbilityLevel >= 6 ? 0.45 : 0.8;
                playerDead[targetIndex] = true;
                playerRoots[targetIndex].setEnabled(false);
                revivePings[targetIndex].isVisible = true;
            }
            if (playerDead.slice(1).every(Boolean) && !monsterModeWon) {
                monsterModeWon = true;
                roundOverTimer = 2;
            }
            for (const mesh of monster.getChildMeshes()) {
                mesh.isVisible = monsterShadowTimer <= 0;
            }
            if (monsterTrackTimer > 0) {
                monster.rotation.x = Math.sin(actionTime * 18) * 0.12;
                monster.scaling.y = 1 + Math.sin(actionTime * 14) * 0.08;
            } else {
                monster.rotation.x = 0;
                monster.scaling.y = 1;
            }
            for (let index = 1; index < playerRoots.length; index++) {
                const tracked = monsterTrackTimer > 0 && !playerDead[index];
                for (const mesh of playerRoots[index].getChildMeshes()) {
                    mesh.isVisible = tracked;
                }
                trackingPings[index].position.copyFrom(playerRoots[index].position.add(new Vector3(0, 0.25, 0)));
                trackingPings[index].isVisible = tracked;
            }
            huntEventTimer += delta;
            if (huntEventTimer >= 18) {
                huntEventTimer = 0;
                const nextGenerator = generatorOn.findIndex((isOn) => !isOn);
                if (nextGenerator !== -1) {
                    generatorOn[nextGenerator] = true;
                    generatorPings[nextGenerator].isVisible = false;
                    unlockMonsterAbility();
                } else {
                    const nextBattery = batterySlots.indexOf("EMPTY");
                    if (nextBattery !== -1) {
                        batterySlots[nextBattery] = "BATTERY";
                        unlockMonsterAbility();
                    }
                }
            }
        }
        monsterPing.position = monster.position.add(new Vector3(0, 12, 0));
        const nearestGenerator = generatorOn.reduce((closest, isOn, index) => {
            if (isOn) {
                return closest;
            }
            const distance = Vector3.Distance(generators[index].position, player.position);
            return distance < closest.distance ? { index, distance } : closest;
        }, { index: -1, distance: Number.POSITIVE_INFINITY });
        if (settings.fControl && keys.has("f") && nearestGenerator.index !== -1 && nearestGenerator.distance < 8) {
            generatorHold[nearestGenerator.index] += delta;
            const generatorRepairDuration = selectedMode === "NIGHTMARE" ? 13 : 10;
            if (generatorHold[nearestGenerator.index] >= generatorRepairDuration) {
                generatorOn[nearestGenerator.index] = true;
                generatorPings[nearestGenerator.index].isVisible = false;
                monsterDangerLevel++;
                playPowerUp();
                startGeneratorMotor(nearestGenerator.index);
            }
        } else if (nearestGenerator.index !== -1) {
            if (generatorHold[nearestGenerator.index] > 0) {
                generatorWhispererThisRound = false;
            }
            generatorHold[nearestGenerator.index] = Math.max(0, generatorHold[nearestGenerator.index] - delta * 2);
        }
        generators.forEach((generator, index) => {
            if (generatorOn[index] || generatorHold[index] > 0) {
                generator.rotation.y += delta * (generatorOn[index] ? 2.4 : 0.8);
                generator.position.y = Math.abs(Math.sin(actionTime * 12 + index)) * 0.08;
            }
        });
        if (generatorOn.every(Boolean)) {
            batteries.forEach((battery, index) => {
                battery.isVisible = true;
                batteryPings[index].isVisible = true;
            });
        }
        if (settings.fControl && keys.has("f") && generatorOn.every(Boolean)) {
            collectNearby(batteries, player.position, (item) => {
                const slot = batterySlots.indexOf("EMPTY");
                if (slot !== -1) {
                    batterySlots[slot] = "BATTERY";
                    item.isVisible = false;
                    playBatteryDing();
                    const batteryIndex = batteries.indexOf(item);
                    if (batteryIndex !== -1) {
                        batteryPings[batteryIndex].isVisible = false;
                    }
                }
            });
        }
        if (batterySlots.every((slot) => slot === "BATTERY")) {
            escapePing.isVisible = true;
        }
        if (settings.fControl && keys.has("f") && escapePing.isVisible && Vector3.Distance(escapeVehicle.position, player.position) < 10 && !gameWon) {
            gameWon = true;
            winningPlayer = 0;
            for (let index = 0; index < playerRoots.length; index++) {
                playerEscaped[index] = !playerDead[index];
            }
            roundOverTimer = 6;
        }
        if (settings.fControl && keys.has("f") && axeCount > 0) {
            for (const door of lockedDoors) {
                if (door.isVisible && Vector3.Distance(door.position, player.position) < 8) {
                    door.isVisible = false;
                    door.metadata.locked = false;
                    axeCount--;
                    doorsOpenedThisRound++;
                    swingTimer = 0.6;
                    break;
                }
            }
        }
        const sprinting = settings.sprint && keys.has("shift") && energy > 0;
        sprintedThisRound ||= sprinting;
        const speed = (sprinting ? 16 : 8) * delta;
        const movement = new Vector3((keys.has("d") ? 1 : 0) - (keys.has("a") ? 1 : 0), 0, (keys.has("s") ? 1 : 0) - (keys.has("w") ? 1 : 0));
        const walking = selectedMode !== "THE HUNT" && movement.lengthSquared() > 0 && player.isEnabled() && !playerEscaped[0];
        if (walking) {
            movement.normalize().scaleInPlace(speed);
            player.position.addInPlace(movement);
            player.position.x = Math.max(-188, Math.min(188, player.position.x));
            player.position.z = Math.max(-188, Math.min(188, player.position.z));
            const energyDrain = selectedMode === "NIGHTMARE" ? 1.35 : 1;
            energy = Math.max(0, energy - delta * (sprinting ? 1.875 : 1) * energyDrain);
        } else {
            energy = Math.min(15, energy + delta * 1.4);
        }
        if (flashlightOn && flashlightCharge > 0) {
            flashlightCharge = Math.max(0, flashlightCharge - delta * (selectedMode === "NIGHTMARE" ? 1.35 : 0.9));
        }
        footstepCooldown -= delta;
        pantCooldown -= delta;
        if (walking) {
            const stepSpeed = sprinting ? 18 : 11;
            player.rotation.z = Math.sin(actionTime * stepSpeed) * 0.025;
            if (footstepCooldown <= 0) {
                const insideHouse = houseCenters.some((houseCenter) => Vector3.Distance(player.position, houseCenter) < 14);
                playFootstep(insideHouse, sprinting);
                footstepCooldown = sprinting ? 0.28 : 0.48;
            }
        } else {
            player.rotation.z = 0;
        }
        if (energy <= 0 && walking && pantCooldown <= 0) {
            playPant();
            pantCooldown = 1.2;
        }
        if (swingTimer > 0) {
            player.rotation.x = Math.sin((0.6 - swingTimer) * 18) * 0.2;
        } else if (eatTimer > 0 || reviveProgress > 0) {
            player.rotation.x = Math.sin(actionTime * 10) * 0.06;
        } else {
            player.rotation.x = 0;
        }
        if (settings.pickupE && keys.has("e")) {
            collectNearby(walkies, player.position, (item) => {
                walkieCount++;
                item.isVisible = false;
            });
            collectNearby(food, player.position, (item) => {
                if (foodCount > 0) {
                    foodCount--;
                    energy = 15;
                    item.isVisible = false;
                    eatTimer = 1;
                }
            });
            collectNearby(medkits, player.position, (item) => {
                medkitCount++;
                item.isVisible = false;
            });
        }
        if (!forestPosterFoundThisRound && Vector3.Distance(hiddenPoster.position, player.position) < 6) {
            forestPosterFoundThisRound = true;
        }
        const reviveIndex = playerDead.findIndex((isDead, index) => index !== 0 && isDead && !reviveUsed[index] && Vector3.Distance(playerRoots[index].position, player.position) < 8);
        if (settings.revive && keys.has("r") && player.isEnabled() && bandagesByPlayer[0] > 0 && reviveIndex !== -1) {
            if (reviveTarget !== reviveIndex) {
                reviveTarget = reviveIndex;
                reviveProgress = 0;
            }
            reviveProgress += delta;
            const reviveDuration = medkitCount > 0 ? 3 : 6;
            if (reviveProgress >= reviveDuration) {
                if (medkitCount > 0) {
                    medkitCount--;
                    achievementStats.medkitUse = true;
                    saveAchievements();
                    updateAchievements();
                }
                bandagesByPlayer[0]--;
                reviveUsed[reviveIndex] = true;
                playerDead[reviveIndex] = false;
                playerRoots[reviveIndex].setEnabled(true);
                revivePings[reviveIndex].isVisible = false;
                achievementStats.revives++;
                saveAchievements();
                updateAchievements();
                reviveProgress = 0;
                reviveTarget = -1;
            }
        } else {
            reviveProgress = 0;
            reviveTarget = -1;
        }
        if (selectedMode === "THE HUNT") {
            camera.position = monster.position.add(new Vector3(0, 7, -14));
            camera.setTarget(monster.position.add(new Vector3(0, 6, 0)));
        } else if (playerDead[0] || playerEscaped[0]) {
            const nextSpectator = playerDead.findIndex((isDead, index) => !isDead && index !== 0);
            if (nextSpectator !== -1) {
                spectatorIndex = nextSpectator;
                const baseSpectatorPosition = playerRoots[spectatorIndex].position.add(new Vector3(0, 5, -10));
                camera.position = baseSpectatorPosition.add(new Vector3(Math.sin(actionTime * 2.1) * watcherPressure * 0.55, Math.cos(actionTime * 2.7) * watcherPressure * 0.24, 0));
                camera.setTarget(playerRoots[spectatorIndex].position.add(new Vector3(0, 2.5, 0)));
            }
        } else {
            const basePlayerPosition = player.position.add(new Vector3(0, 4.2, 0));
            camera.position = basePlayerPosition.add(new Vector3(Math.sin(actionTime * 2.4) * watcherPressure * 0.28, Math.cos(actionTime * 2.1) * watcherPressure * 0.12, Math.cos(actionTime * 1.7) * watcherPressure * 0.1));
        }
        if (!gameWon && playerDead.every(Boolean) && roundOverTimer < 0) {
            roundOverTimer = 6;
        }
        if (roundOverTimer >= 0 && !roundOver) {
            roundOverTimer -= delta;
            if (roundOverTimer <= 0) {
                finishRound();
            }
        }
        const downedPlayers = playerDead.map((isDead, index) => isDead ? `P${index + 1}` : "").filter(Boolean).join(", ") || "NONE";
        const escapedPlayers = playerEscaped.filter(Boolean).length;
        const activeGeneratorCount = generatorOn.filter(Boolean).length;
        const nearestBattery = batteries.find((battery) => battery.isVisible && Vector3.Distance(battery.position, player.position) < 5);
        const nearestWalkie = walkies.find((walkie) => walkie.isVisible && Vector3.Distance(walkie.position, player.position) < 5);
        const nearestFood = food.find((item) => item.isVisible && Vector3.Distance(item.position, player.position) < 5);
        const nearestDoor = lockedDoors.find((door) => door.isVisible && Vector3.Distance(door.position, player.position) < 8);
        const generatorNearby = nearestGenerator.index !== -1 && nearestGenerator.distance < 8;
        const modeLabel = selectedMode === "THE LAST STAND" ? `THE LAST STAND  ${Math.floor(modeTimer)}s` : selectedMode;
        if (monsterModeWon) {
            objectiveText.text = `${modeLabel}\nTHE BEAR HUNT IS OVER`;
        } else if (selectedMode === "THE HUNT") {
            objectiveText.text = `${modeLabel}\nHunt survivors  ABILITIES ${monsterAbilityLevel}/${monsterAbilities.length}`;
        } else if (gameWon) {
            objectiveText.text = `${modeLabel}\nOBJECTIVE COMPLETE`;
        } else if (activeGeneratorCount < generators.length) {
            objectiveText.text = `${modeLabel}\nPower generators (${activeGeneratorCount}/${generators.length})`;
        } else if (batterySlots.some((slot) => slot === "EMPTY")) {
            objectiveText.text = `${modeLabel}\nRecover batteries (${batterySlots.filter((slot) => slot !== "EMPTY").length}/3)`;
        } else {
            objectiveText.text = `${modeLabel}\nInstall the batteries and escape`;
        }
                interactionPrompt.text = selectedMode === "THE HUNT"
                        ? `SPACE ATTACK   Q ROAR   ${monsterAbilityLevel >= 2 ? "E RAGE" : "E LOCKED"}   ${monsterAbilityLevel >= 3 ? "R SHADOW" : "R LOCKED"}   ${monsterAbilityLevel >= 4 ? "T TRACK" : "T LOCKED"}   ${monsterAbilityLevel >= 7 ? "F EARTHSHAKE" : "F LOCKED"}`
                        : selectedMode === "NIGHTMARE" && gunAmmo[0] > 0
                            ? `RIGHT CLICK  SHOOT  ${gunAmmo[0]}/2   ${monsterStunTimer > 0 ? `STUNNED ${Math.ceil(monsterStunTimer)}s` : ""}`
                        : generatorNearby
                            ? `HOLD F  REPAIR GENERATOR  ${Math.min(100, Math.round((generatorHold[nearestGenerator.index] / (selectedMode === "NIGHTMARE" ? 13 : 10)) * 100))}%`
                            : nearestBattery
                                ? "HOLD F  COLLECT BATTERY"
                                : nearestDoor
                                    ? "HOLD F  BREAK OPEN DOOR"
                                    : nearestWalkie || nearestFood
                                        ? "PRESS E  SEARCH SUPPLIES"
                                        : "";
        const escapeStatus = gameWon ? `P${winningPlayer + 1} WINS ${escapedPlayers}/4` : batterySlots.every((slot) => slot === "BATTERY") ? "PINGED" : "LOCKED";
                const voiceRange = walkieCount > 0 && keys.has("q") ? 120 : 18;
                const nearbyPlayer = playerRoots.findIndex((root, index) => index !== 0 && !playerDead[index] && Vector3.Distance(root.position, player.position) < voiceRange);
                if (walkieCount > 0 && keys.has("q")) {
                    for (let index = 1; index < playerRoots.length; index++) {
                        if (!playerDead[index] && Vector3.Distance(playerRoots[index].position, player.position) < voiceRange) {
                            longRangePlayers.add(index);
                        }
                    }
                }
                const voiceStatus = playerDead[0] || playerEscaped[0]
                        ? `SPECTATING P${spectatorIndex + 1}`
                        : walkieCount > 0 && keys.has("q")
                            ? nearbyPlayer === -1 ? "LONG RANGE READY" : `LONG RANGE P${nearbyPlayer + 1}`
                            : nearbyPlayer === -1 ? "MUTED" : `OPEN P${nearbyPlayer + 1}`;
        const reviveDuration = medkitCount > 0 ? 3 : 6;
        const reviveStatus = reviveProgress > 0 ? `HOLD ${Math.ceil(reviveDuration - reviveProgress)}s P${reviveTarget + 1}` : "READY";
            const energyPercent = Math.round((energy / 15) * 100);
            energyBarFill.width = `${energyPercent}%`;
            energyBarFill.background = energy <= 0 ? "#862d2d" : "#d28b35";
            inventoryItems.text = selectedMode === "THE HUNT"
                ? `MODE         THE HUNT\nABILITIES    ${monsterAbilityLevel}/${monsterAbilities.length}\nUNLOCKED     ${monsterAbilities.slice(0, monsterAbilityLevel).join(", ")}\nCOOLDOWN     ${monsterAbilityCooldown.toFixed(1)}s\nSURVIVORS    ${playerDead.slice(1).filter(Boolean).length}/${playerRoots.length - 1}`
                : `MODE         ${selectedMode}\nWEATHER      ${weatherNames[weatherIndex]}\nGUN          ${selectedMode === "NIGHTMARE" ? `${gunAmmo[0]}/2 SHOTS` : "NONE"}\nMEDKITS      ${medkitCount}\nAXE          ${axeCount}\nFLASHLIGHT   ${flashlightOn ? "ON" : "OFF"} ${Math.round(flashlightCharge)}%\nWALKIE       ${walkieCount}\nGENERATORS   ${activeGeneratorCount}/3\nBATTERIES    ${batterySlots.filter((slot) => slot !== "EMPTY").length}/3\nBANDAGES     ${bandagesByPlayer[0]}\nREVIVE       ${reviveStatus}\nENERGY       ${energyPercent}%\nCANNED FOOD  ${foodCount}\nREVIVE PING  ${downedPlayers}\nESCAPE       ${escapeStatus}\nVOICE        ${voiceStatus}`;
    });

    return scene;
};
