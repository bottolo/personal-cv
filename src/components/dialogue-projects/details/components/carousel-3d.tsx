import { useFrame } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { memo, useCallback, useRef } from "react";
import type * as THREE from "three";
import { type Project, projects } from "../../utils/projects.tsx";
import { Image3d } from "./image-3d.tsx";

interface Carousel3DProps {
	onProjectSelect: (project: Project) => void;
}

export const Carousel3d = memo(({ onProjectSelect }: Carousel3DProps) => {
	const groupRef = useRef<THREE.Group>(null);
	const rotationRef = useRef(0);
	const targetRotationRef = useRef(0);
	const isRotatingRef = useRef(true);
	const activeIndexRef = useRef(0);

	const imageRadius = 4;
	const cylinderRadius = 3;
	const angleStep = (2 * Math.PI) / projects.length;

	const handleProjectSelect = useCallback(
		(project: Project, index: number) => {
			isRotatingRef.current = false;
			activeIndexRef.current = index;
			targetRotationRef.current = angleStep * index;
			onProjectSelect(project);
		},
		[angleStep, onProjectSelect],
	);

	useFrame(() => {
		if (!groupRef.current) return;

		if (isRotatingRef.current) {
			rotationRef.current += 0.005;
		} else {
			const diff = targetRotationRef.current - rotationRef.current;
			if (Math.abs(diff) > 0.01) {
				rotationRef.current += diff * 0.1;
			}
		}

		groupRef.current.rotation.y = rotationRef.current;
	});

	return (
		<motion.group
			ref={groupRef}
			initial={{ scale: 0, rotateX: Math.PI / 4 }}
			animate={{ scale: 1, rotateX: 0 }}
			transition={{
				type: "spring",
				stiffness: 100,
				damping: 20,
				duration: 1,
			}}
		>
			{projects.map((project, index) => {
				const angle = angleStep * index;
				const x = imageRadius * Math.sin(angle);
				const z = imageRadius * Math.cos(angle);

				return (
					<motion.group
						key={project.id}
						position={[x, 0, z]}
						rotation={[0, angle + Math.PI, 0]}
						initial={{ opacity: 0, y: -2 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							delay: index * 0.1,
							type: "spring",
							stiffness: 100,
							damping: 20,
						}}
					>
						<Image3d
							url={project.image}
							scale={[5, 5, 5]}
							rotation={[0, Math.PI, 0]}
							isActive={activeIndexRef.current === index}
							onClick={() => handleProjectSelect(project, index)}
						/>
					</motion.group>
				);
			})}

			<motion.mesh
				initial={{ scaleY: 0 }}
				animate={{ scaleY: 1 }}
				transition={{
					delay: 0.5,
					type: "spring",
					stiffness: 100,
					damping: 20,
				}}
			>
				<cylinderGeometry
					args={[cylinderRadius, cylinderRadius, 3, 16, 1, true]}
				/>
				<meshPhysicalMaterial
					transparent={true}
					opacity={0.3}
					roughness={0}
					metalness={0.5}
					color="purple"
				/>
			</motion.mesh>
		</motion.group>
	);
});

Carousel3d.displayName = "Carousel3d";
