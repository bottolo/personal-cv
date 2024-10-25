import { AsciiRenderer } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";

const SpinningCube = () => {
	const meshRef = useRef<THREE.Mesh>(null);

	useFrame((state, delta) => {
		if (meshRef.current) {
			meshRef.current.rotation.y += delta * 0.5;
			meshRef.current.rotation.x =
				Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
		}
	});

	return (
		<mesh ref={meshRef} rotation={[0, Math.PI * 0.25, 0]}>
			<boxGeometry args={[3, 3, 3]} />
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

			<SpinningCube />

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
