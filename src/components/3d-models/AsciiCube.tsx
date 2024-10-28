import { AsciiRenderer } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { memo, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const GEOMETRIES = Object.freeze([
	{ type: "BoxGeometry", args: [3, 3, 3] },
	{ type: "TorusGeometry", args: [1.5, 0.5, 16, 32] },
	{ type: "TetrahedronGeometry", args: [2, 0] },
	{ type: "OctahedronGeometry", args: [2, 0] },
	{ type: "DodecahedronGeometry", args: [2, 0] },
	{ type: "IcosahedronGeometry", args: [2, 0] },
	{ type: "TorusKnotGeometry", args: [1.5, 0.5, 128, 16] },
]);

const geometryInstances = GEOMETRIES.map(
	({ type, args }) => new THREE[type](...args),
);

const SpinningGeometry = memo(function SpinningGeometry() {
	const groupRef = useRef<THREE.Group>();
	const meshRef = useRef<THREE.Mesh>();
	const [geometryIndex, setGeometryIndex] = useState(0);
	const [hovered, setHovered] = useState(false);
	const rotationRef = useRef({ x: 0, y: 0 });

	useFrame((state, delta) => {
		rotationRef.current.y += delta * 0.5;
		rotationRef.current.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;

		if (meshRef.current) {
			meshRef.current.rotation.y = rotationRef.current.y;
			meshRef.current.rotation.x = rotationRef.current.x;
		}
	});

	const variants = {
		idle: {
			scale: 1,
		},
		hover: {
			scale: 1.1,
			transition: {
				duration: 0.3,
				ease: "easeInOut",
			},
		},
	};

	return (
		<group
			ref={groupRef}
			onClick={() => setGeometryIndex((prev) => (prev + 1) % GEOMETRIES.length)}
			onPointerOver={() => setHovered(true)}
			onPointerOut={() => setHovered(false)}
		>
			<motion.mesh
				ref={meshRef}
				geometry={geometryInstances[geometryIndex]}
				variants={variants}
				initial="idle"
				animate={hovered ? "hover" : "idle"}
			>
				<meshBasicMaterial color="white" />
			</motion.mesh>
		</group>
	);
});

const Lights = memo(function Lights() {
	return (
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
	);
});

const AsciiRendererConfig = memo(function AsciiRendererConfig() {
	return (
		<AsciiRenderer
			invert={false}
			fgColor="white"
			bgColor="transparent"
			resolution={0.3}
			characters=" .:-+*=%@#"
		/>
	);
});

export const AsciiCube = memo(function AsciiCube() {
	const cameraSettings = useMemo(
		() => ({
			position: [0, 0, 10] as [number, number, number],
			fov: 30,
		}),
		[],
	);

	const canvasStyle = useMemo(
		() => ({
			userSelect: "none" as const,
			cursor: "pointer",
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
			dpr={Math.min(window.devicePixelRatio, 2)}
			performance={{ min: 0.5 }}
		>
			<Lights />
			<SpinningGeometry />
			<AsciiRendererConfig />
		</Canvas>
	);
});
