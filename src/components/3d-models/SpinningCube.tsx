import { AsciiRenderer } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

const GEOMETRIES = [
	{ type: "BoxGeometry", args: [3, 3, 3] },
	{ type: "TorusGeometry", args: [1.5, 0.5, 16, 32] },
	{ type: "TetrahedronGeometry", args: [2, 0] },
	{ type: "OctahedronGeometry", args: [2, 0] },
	{ type: "DodecahedronGeometry", args: [2, 0] },
	{ type: "IcosahedronGeometry", args: [2, 0] },
	{ type: "TorusKnotGeometry", args: [1.5, 0.5, 128, 16] },
];

const SpinningGeometry = () => {
	const meshRef = useRef<THREE.Mesh>(null);
	const [geometryIndex, setGeometryIndex] = useState(0);

	useFrame((state, delta) => {
		if (meshRef.current) {
			meshRef.current.rotation.y += delta * 0.5;
			meshRef.current.rotation.x =
				Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
		}
	});

	const handleClick = () => {
		setGeometryIndex((prev) => (prev + 1) % GEOMETRIES.length);
	};

	const currentGeometry = GEOMETRIES[geometryIndex];

	return (
		<mesh ref={meshRef} rotation={[0, Math.PI * 0.25, 0]} onClick={handleClick}>
			<primitive
				object={new THREE[currentGeometry.type](...currentGeometry.args)}
			/>
			<meshStandardMaterial color="white" />
		</mesh>
	);
};

export const AsciiBox = () => {
	return (
		<Canvas
			camera={{ position: [0, 0, 10], fov: 30 }}
			style={{
				userSelect: "none",
				cursor: "pointer",
				backgroundColor: "transparent",
				width: "100%",
				height: "100%",
			}}
		>
			<ambientLight intensity={0.5} />
			<spotLight
				position={[10, 10, 10]}
				angle={0.15}
				penumbra={1}
				intensity={1}
			/>
			<pointLight position={[-10, -10, -10]} intensity={0.5} />

			<SpinningGeometry />

			<AsciiRenderer
				invert={false}
				fgColor="white"
				bgColor="transparent"
				resolution={0.3}
				characters=" .:-+*=%@#"
			/>
		</Canvas>
	);
};
