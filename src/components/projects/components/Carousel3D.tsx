import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type * as THREE from "three";
import { type Project, projects } from "../projects.tsx";
import { Image3D } from "./Image3D.tsx";

interface Carousel3DProps {
	onProjectSelect: (project: Project) => void;
}

export const Carousel3D = ({ onProjectSelect }: Carousel3DProps) => {
	const groupRef = useRef<THREE.Group>(null);
	const [_activeIndex, setActiveIndex] = useState(0);
	const [isRotating, setIsRotating] = useState(true);

	const imageRadius = 3.5;
	const cylinderRadius = 3;
	const angleStep = (2 * Math.PI) / projects.length;

	useFrame((_state) => {
		if (groupRef.current && isRotating) {
			groupRef.current.rotation.y += 0.005;
		}
	});

	return (
		<group ref={groupRef}>
			{projects.map((project, index) => {
				const angle = angleStep * index;
				const x = imageRadius * Math.sin(angle);
				const z = imageRadius * Math.cos(angle);

				return (
					<group
						key={project.id}
						position={[x, 0, z]}
						rotation={[0, angle + Math.PI, 0]}
					>
						<Image3D
							url={project.image}
							scale={[10, 5, 5]}
							onClick={() => {
								setActiveIndex(index);
								setIsRotating(false);
								if (groupRef.current) {
									groupRef.current.rotation.y = angle;
								}
								onProjectSelect(project);
							}}
						/>
						<Image3D
							url={project.image}
							scale={[10, 5, 5]}
							rotation={[0, Math.PI, 0]}
							onClick={() => {
								setActiveIndex(index);
								setIsRotating(false);
								if (groupRef.current) {
									groupRef.current.rotation.y = angle;
								}
								onProjectSelect(project);
							}}
						/>
					</group>
				);
			})}

			<mesh>
				<cylinderGeometry
					args={[cylinderRadius, cylinderRadius, 3, 8, 1, true]}
				/>
				<meshPhysicalMaterial
					transparent={true}
					opacity={0.3}
					roughness={0}
					metalness={0.5}
					color="purple"
				/>
			</mesh>
		</group>
	);
};
