import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { Carousel3D } from "./components/Carousel3D.tsx";
import { Details } from "./components/Details.tsx";
import type { Project } from "./projects.tsx";

// Example components for each project

interface ShowcaseProps {
	className?: string;
}
export const Showcase = ({ className }: ShowcaseProps) => {
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);

	return (
		<>
			<div className={className}>
				<Canvas>
					<PerspectiveCamera makeDefault position={[0, 0, 12]} fov={40} />
					<ambientLight intensity={0.7} />
					<pointLight position={[10, 10, 10]} intensity={1.5} />
					<Carousel3D
						onProjectSelect={(project: Project) => setSelectedProject(project)}
					/>
					<OrbitControls
						enableZoom={false}
						enablePan={false}
						minPolarAngle={Math.PI / 2}
						maxPolarAngle={Math.PI / 2}
						rotateSpeed={0.3}
					/>
				</Canvas>
			</div>

			{selectedProject && (
				<Details
					project={selectedProject}
					onClose={() => setSelectedProject(null)}
				/>
			)}
		</>
	);
};
