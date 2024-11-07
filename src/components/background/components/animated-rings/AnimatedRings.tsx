import { Environment } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
	Bloom,
	ChromaticAberration,
	EffectComposer,
	Glitch,
	Scanline,
} from "@react-three/postprocessing";
import { BlendFunction, KernelSize, Resolution } from "postprocessing";
import { Suspense, memo, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { cn } from "../../../../global-utils/cn.ts";
import { useDialogueStore } from "../../../../store/dialogue-store.ts";
import { Cube } from "../../../3d-models/Cube.tsx";
import { Dodecahedron } from "../../../3d-models/Dodecahedron.tsx";
import { Sphere } from "../../../3d-models/Sphere.tsx";
import { Tetrahedron } from "../../../3d-models/Tetrahedron.tsx";
import { Halottolo } from "../../../3d-models/halottolo.tsx";

const commonMaterialOptions = {
	emissive: "#612dc7",
	emissiveIntensity: 0.5,
};

const wireframeMaterial = {
	...commonMaterialOptions,
	color: "#ffffff",
	wireframe: true,
	opacity: 0.8,
};

const solidMaterial = {
	...commonMaterialOptions,
	color: "#8d35e0",
	wireframe: false,
	opacity: 1,
};

// Scene component to enable React.memo
const Scene = memo(() => {
	const sphereGeometry = useMemo(() => new THREE.SphereGeometry(1, 32, 32), []);
	const cubeGeometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);

	return (
		<>
			<Environment preset="night" />
			<fog attach="fog" args={["#4c1d95", 5, 50]} />
			<ambientLight intensity={5} />
			<directionalLight position={[-10, 5, 10]} intensity={1} castShadow />

			<Suspense fallback={null}>
				<Halottolo
					rotationOptions={{
						speed: 0.1,
					}}
					rotation={[1.9, 1.25, -0.5]}
					position={[-3.5, 1, 3]}
				/>
			</Suspense>

			<Dodecahedron
				position={[-3, 1, 3]}
				materialOptions={wireframeMaterial}
				scale={2}
			/>

			<Tetrahedron
				position={[-5.4, 1, 7]}
				materialOptions={{
					...solidMaterial,
					opacity: 0.2,
				}}
				scale={0.3}
			/>

			<instancedMesh count={3} geometry={sphereGeometry}>
				<Sphere
					position={[50, 30, -30]}
					materialOptions={{
						...wireframeMaterial,
						opacity: 1,
						emissiveIntensity: 1,
					}}
					scale={60}
				/>
				<Sphere
					position={[-10, -20, -15]}
					rotation={[0, 0.3, 3]}
					materialOptions={solidMaterial}
					scale={5}
				/>
				<Sphere
					position={[-5, 20, -10]}
					rotation={[0, 0.3, 3]}
					materialOptions={{
						...wireframeMaterial,
						opacity: 1,
					}}
					scale={5}
				/>
			</instancedMesh>

			<instancedMesh count={2} geometry={cubeGeometry}>
				<Cube
					position={[-25, 30, -30]}
					rotation={[0, 0.5, 6]}
					materialOptions={{
						...solidMaterial,
						opacity: 0.8,
					}}
					scale={25}
				/>
				<Cube
					position={[40, -50, -10]}
					rotation={[0, 0.5, 6]}
					materialOptions={{
						...solidMaterial,
						opacity: 0.5,
					}}
					scale={40}
				/>
			</instancedMesh>
		</>
	);
});

const CAMERA_POSITIONS = {
	firstChoice: {
		position: new THREE.Vector3(8, 20, 0),
		target: new THREE.Vector3(-3.5, 1, 3),
	},
	secondChoice: {
		position: new THREE.Vector3(-5, 0, 8),
		target: new THREE.Vector3(-5, 1, 7),
	},
	thirdChoice: {
		position: new THREE.Vector3(15, 15, -30),
		target: new THREE.Vector3(-10, -20, 15),
	},
	default: {
		position: new THREE.Vector3(-5, 2, 10.5),
		target: new THREE.Vector3(-3.5, 1, 3),
	},
};

// Camera controller component
const CameraController = () => {
	const { camera } = useThree();
	const { currentDialogue } = useDialogueStore();
	const targetPosition = useRef(CAMERA_POSITIONS.default.position.clone());
	const targetLookAt = useRef(CAMERA_POSITIONS.default.target.clone());

	useEffect(() => {
		if (currentDialogue) {
			const cameraConfig =
				CAMERA_POSITIONS[currentDialogue.id] ||
				Object.entries(CAMERA_POSITIONS).find(
					([key]) => key === currentDialogue.name,
				)?.[1] ||
				CAMERA_POSITIONS.default;

			targetPosition.current.copy(cameraConfig.position);
			targetLookAt.current.copy(cameraConfig.target);
		} else {
			targetPosition.current.copy(CAMERA_POSITIONS.default.position);
			targetLookAt.current.copy(CAMERA_POSITIONS.default.target);
		}
	}, [currentDialogue]);

	useFrame(() => {
		// Smooth camera position movement
		camera.position.lerp(targetPosition.current, 0.02);

		// Smooth camera look-at movement
		const currentLookAt = new THREE.Vector3();
		camera.getWorldDirection(currentLookAt);
		const targetDirection = targetLookAt.current
			.clone()
			.sub(camera.position)
			.normalize();

		const newDirection = currentLookAt.lerp(targetDirection, 0.02);
		camera.lookAt(camera.position.clone().add(newDirection));
	});

	return null;
};

interface AnimatedRingsProps {
	className?: string;
}

export const AnimatedRings = ({ className }: AnimatedRingsProps) => {
	return (
		<div
			className={cn(className, "fixed inset-0 overflow-hidden blur-[0.1rem]")}
		>
			<Canvas
				shadows
				camera={{ position: [-5, 2, 10.5], fov: 120 }}
				dpr={[1, 2]} // Limit pixel ratio
				performance={{ min: 0 }} // Enable automatic performance optimization
			>
				<color attach="background" args={["#371d95"]} />
				<Scene />
				<CameraController />
				<EffectComposer multisampling={0}>
					{/* Disable multisampling for better performance */}
					<Bloom
						intensity={15}
						kernelSize={KernelSize.VERY_LARGE} // Reduced from LARGE
						luminanceThreshold={0.9}
						luminanceSmoothing={0.05}
						mipmapBlur={true}
						resolutionX={Resolution.AUTO_SIZE}
						resolutionY={Resolution.AUTO_SIZE}
					/>
					<ChromaticAberration offset={[0.002, 0.002]} />
					<Scanline
						blendFunction={BlendFunction.OVERLAY} // blend mode
						density={1.75}
					/>
					<Glitch
						delay={[1.5, 3.5]} // min and max glitch delay
						duration={[0.1, 0.2]} // min and max glitch duration
						strength={[0.01, 0.1]} // min and max glitch strength
						active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
						ratio={1} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
					/>
				</EffectComposer>
			</Canvas>
		</div>
	);
};
