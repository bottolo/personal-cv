import { AsciiRenderer } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// Memoize geometry definitions
const GEOMETRIES = Object.freeze([
	{ type: "BoxGeometry", args: [3, 3, 3] },
	{ type: "TorusGeometry", args: [1.5, 0.5, 16, 32] },
	{ type: "TetrahedronGeometry", args: [2, 0] },
	{ type: "OctahedronGeometry", args: [2, 0] },
	{ type: "DodecahedronGeometry", args: [2, 0] },
	{ type: "IcosahedronGeometry", args: [2, 0] },
	{ type: "TorusKnotGeometry", args: [1.5, 0.5, 128, 16] },
]);

// Pre-create geometries to avoid recreation on each render
const geometryInstances = GEOMETRIES.map(
	({ type, args }) => new THREE[type](...args),
);

// Memoize material
const material = new THREE.MeshStandardMaterial({ color: "white" });

const SpinningGeometry = memo(() => {
	const meshRef = useRef<THREE.Mesh>(null);
	const [geometryIndex, setGeometryIndex] = useState(0);

	// Optimize rotation values with useRef to avoid re-renders
	const rotationRef = useRef({ x: 0, y: 0 });

	useFrame((state, delta) => {
		if (meshRef.current) {
			rotationRef.current.y += delta * 0.5;
			rotationRef.current.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;

			meshRef.current.rotation.y = rotationRef.current.y;
			meshRef.current.rotation.x = rotationRef.current.x;
		}
	});

	const handleClick = useCallback(() => {
		setGeometryIndex((prev) => (prev + 1) % GEOMETRIES.length);
	}, []);

	// Memoize initial rotation
	const initialRotation = useMemo(() => [0, Math.PI * 0.25, 0], []);

	return (
		<mesh
			ref={meshRef}
			rotation={initialRotation}
			onClick={handleClick}
			geometry={geometryInstances[geometryIndex]}
			material={material}
		/>
	);
});

SpinningGeometry.displayName = "SpinningGeometry";

// Memoize light setup
const Lights = memo(() => (
	<>
		<ambientLight intensity={0.5} />
		<spotLight
			position={[10, 10, 10]}
			angle={0.15}
			penumbra={1}
			intensity={1}
		/>
		<pointLight position={[-10, -10, -10]} intensity={0.5} />
	</>
));

Lights.displayName = "Lights";

// Memoize ASCII renderer configuration
const AsciiRendererConfig = memo(() => (
	<AsciiRenderer
		invert={false}
		fgColor="white"
		bgColor="transparent"
		resolution={0.3}
		characters=" .:-+*=%@#"
	/>
));

AsciiRendererConfig.displayName = "AsciiRendererConfig";

// Main component
export const AsciiCube = memo(() => {
	// Memoize camera settings
	const cameraSettings = useMemo(
		() => ({
			position: [0, 0, 10] as [number, number, number],
			fov: 30,
		}),
		[],
	);

	// Memoize canvas style
	const canvasStyle = useMemo(
		() => ({
			userSelect: "none" as const,
			cursor: "none" as const,
			backgroundColor: "transparent",
			width: "100%",
			height: "100%",
		}),
		[],
	);

	return (
		<Canvas
			camera={cameraSettings}
			style={canvasStyle}
			dpr={Math.min(window.devicePixelRatio, 2)} // Limit DPR for better performance
			performance={{ min: 0.5 }} // Allow frame rate to drop for better performance
		>
			<Lights />
			<SpinningGeometry />
			<AsciiRendererConfig />
		</Canvas>
	);
});

AsciiCube.displayName = "AsciiBox";
