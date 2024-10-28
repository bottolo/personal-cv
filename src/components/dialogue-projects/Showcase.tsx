import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { Details } from "./details/Details.tsx";
import { Carousel3d } from "./details/components/carousel-3d.tsx";
import type { Project } from "./utils/projects.tsx";

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
					<Carousel3d
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
