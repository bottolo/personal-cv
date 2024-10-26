import { Image, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type * as THREE from "three";

interface ProjectData {
	id: number;
	image: string;
	title: string;
}

const projects: ProjectData[] = [
	{ id: 1, image: "/project1.png", title: "Project 1" },
	{ id: 2, image: "/project2.png", title: "Project 2" },
	{ id: 3, image: "/project3.png", title: "Project 3" },
	{ id: 4, image: "/project4.png", title: "Project 4" },
];

const Carousel = () => {
	const groupRef = useRef<THREE.Group>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const [isRotating, setIsRotating] = useState(true);

	const imageRadius = 10; // Increased radius for images
	const cylinderRadius = 7; // Smaller radius for cylinder
	const angleStep = (2 * Math.PI) / projects.length;

	useFrame((state) => {
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
						{/* Front-facing image */}
						<Image
							url={project.image}
							transparent={true}
							scale={[7, 3, 5]}
							onClick={() => {
								setActiveIndex(index);
								setIsRotating(false);
								if (groupRef.current) {
									groupRef.current.rotation.y = angle;
								}
							}}
						/>
						{/* Back-facing image */}
						<Image
							url={project.image}
							transparent={true}
							scale={[7, 3, 5]}
							rotation={[0, Math.PI, 0]}
							onClick={() => {
								setActiveIndex(index);
								setIsRotating(false);
								if (groupRef.current) {
									groupRef.current.rotation.y = angle;
								}
							}}
						/>
					</group>
				);
			})}

			{/* Transparent cylinder */}
			<mesh>
				<cylinderGeometry
					args={[cylinderRadius, cylinderRadius, 6, 32, 1, true]}
				/>
				<meshPhysicalMaterial
					transparent={true}
					opacity={0.1}
					roughness={0}
					metalness={0.5}
					color="#ffffff"
				/>
			</mesh>
		</group>
	);
};

export const Projects = () => {
	return (
		<div className="h-screen w-full">
			<Canvas>
				<PerspectiveCamera makeDefault position={[0, 0, 25]} fov={50} />
				<ambientLight intensity={0.7} />
				<pointLight position={[10, 10, 10]} intensity={1.5} />
				<Carousel />
				<OrbitControls
					enableZoom={false}
					enablePan={false}
					minPolarAngle={Math.PI / 2}
					maxPolarAngle={Math.PI / 2}
					rotateSpeed={0.5}
				/>
			</Canvas>

			<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
				<p className="text-lg">Click on a project to focus</p>
			</div>
		</div>
	);
};
