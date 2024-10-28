import { motion } from "framer-motion";
import { glowingAnimation } from "../../animations/glowing-animation.ts";
import type { Project } from "../utils/projects.tsx";

interface DetailsProps {
	project: Project;
	onClose: () => void;
}
export const Details = ({ project, onClose }: DetailsProps) => {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
			<div className="w-full max-w-2xl">
				<div className="relative">
					{/* Glowing border effect */}
					<motion.div
						variants={glowingAnimation}
						animate="animate"
						className="absolute inset-[-1px] rounded-none border border-white/20 bg-white/10 backdrop-blur-lg -z-10 shadow-xl shadow-blue-500/20"
						style={{
							transform: "scale(1.02)",
						}}
					/>

					{/* Main content container */}
					<div className="relative bg-gradient-to-br from-blue-950/80 to-purple-950/80 backdrop-blur-sm text-blue-300 shadow-lg border border-white/10">
						{/* Header */}
						<div className="border-b border-white/10 p-4 flex justify-between items-center">
							<h2 className="text-xl font-mono">{project.title}</h2>
							<button
								type={"button"}
								onClick={onClose}
								className="p-2 hover:bg-white/5 transition-colors duration-200 font-mono rounded-none shadow-md shadow-blue-500/20"
							>
								close
							</button>
						</div>

						{/* Content area */}
						<div className="p-4">
							<p className="text-blue-300/70 mb-4 font-mono text-sm">
								{project.description}
							</p>

							{/* Scrollable content area */}
							<div className="font-mono text-sm max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500/20 scrollbar-track-transparent">
								{project.content}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
