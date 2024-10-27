import { useTexture } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { memo, useRef } from "react";
import * as THREE from "three";

interface Image3DProps {
	url: string;
	scale: [number, number, number];
	rotation?: [number, number, number];
	onClick?: () => void;
	isActive?: boolean;
}

export const Image3D = memo(
	({
		url,
		scale,
		rotation = [0, 0, 0],
		onClick,
		isActive = false,
	}: Image3DProps) => {
		const texture = useTexture(url);

		const segments = 32;
		const geometry = useRef(
			(() => {
				const geo = new THREE.PlaneGeometry(1, 1, segments, 1);
				const arc = Math.PI / 6;
				const position = geo.attributes.position;

				for (let i = 0; i <= segments; i++) {
					const x = position.getX(i);
					const angle = x * arc;
					const z = Math.sin(angle) * 0.1;
					position.setZ(i, z);
					position.setZ(i + (segments + 1), z);
				}
				geo.computeVertexNormals();
				return geo;
			})(),
		).current;

		return (
			<motion.mesh
				rotation={rotation}
				onClick={onClick}
				geometry={geometry}
				animate={{
					scale: isActive
						? [scale[0] * 1.1, scale[1] * 1.1, scale[2] * 1.1]
						: scale,
					z: isActive ? 0.5 : 0,
				}}
				transition={{
					type: "spring",
					stiffness: 200,
					damping: 20,
				}}
			>
				<meshBasicMaterial
					map={texture}
					transparent={true}
					side={THREE.DoubleSide}
					opacity={isActive ? 1 : 0.8}
				/>
			</motion.mesh>
		);
	},
);

Image3D.displayName = "Image3D";
