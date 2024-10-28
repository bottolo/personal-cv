import { useFrame } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { memo, useRef, useState } from "react";
import * as THREE from "three";
import { asciiGeometryAnimation } from "../../../../../animations/ascii-geometry-animation.ts";
import { GEOMETRIES } from "./ascii-geometries-config.ts";

interface GeometryProps {
	type: string;
	args: any[]; // Type of the geometry
}
const geometryInstances = GEOMETRIES.map(
	({ type, args }: GeometryProps) => new THREE[type](...args),
);

export const SpinningGeometry = memo(function SpinningGeometry() {
	const groupRef = useRef<THREE.Group>();
	const [geometryIndex, setGeometryIndex] = useState(0);
	const [previousIndex, setPreviousIndex] = useState(0);
	const [transitioning, setTransitioning] = useState(false);
	const [showNext, setShowNext] = useState(true);
	const rotation = useRef({ x: 0, y: 0 });

	useFrame((state, delta) => {
		rotation.current.y += delta * 0.5;
		rotation.current.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;

		if (groupRef.current) {
			groupRef.current.rotation.x = rotation.current.x;
			groupRef.current.rotation.y = rotation.current.y;
		}
	});

	const handleGeometryChange = () => {
		if (!transitioning) {
			setPreviousIndex(geometryIndex);
			setTransitioning(true);
			setShowNext(false);

			setTimeout(() => {
				setGeometryIndex((prev) => (prev + 1) % GEOMETRIES.length);
				setShowNext(true);

				setTimeout(() => {
					setTransitioning(false);
				}, 300);
			}, 300);
		}
	};

	return (
		<group ref={groupRef} onClick={handleGeometryChange}>
			{transitioning && !showNext && (
				<motion.mesh
					geometry={geometryInstances[previousIndex]}
					initial="initial"
					animate="exit"
					variants={asciiGeometryAnimation}
				>
					<meshBasicMaterial color="white" transparent />
				</motion.mesh>
			)}

			{showNext && (
				<motion.mesh
					geometry={geometryInstances[geometryIndex]}
					initial={transitioning ? "enter" : "initial"}
					animate="initial"
					variants={asciiGeometryAnimation}
				>
					<meshBasicMaterial color="white" />
				</motion.mesh>
			)}
		</group>
	);
});
