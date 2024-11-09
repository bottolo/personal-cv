import { AnimatePresence, motion } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import { NoiseEffect } from "../../../../global-utils/NoiseEffect.tsx";
import { cn } from "../../../../global-utils/cn.ts";
import { COLORS } from "../../../../global-utils/colors.ts";
import { PROJECTS, type Project } from "../../utils/projects.ts";
import Details from "../details/Details.tsx";
import { ProjectCard } from "./ProjectCard.tsx";

const staticStyles = {
	container:
		"relative w-full h-full flex items-center justify-center overflow-hidden",
	carouselContainer:
		"relative w-full h-full flex items-center justify-center overflow-hidden",
	projectsContainer:
		"flex items-center h-full space-x-14 px-12 overflow-x-auto scrollbar-none",
	scrollTrigger: "absolute inset-y-0 w-32 z-20",
};

const SCROLL_SPEED = 5;

const Projects = () => {
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [hoveredId, setHoveredId] = useState<number | null>(null);
	const [isScrolling, setIsScrolling] = useState<"left" | "right" | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const scrollInterval = useRef<number>();

	// Handle scroll animation
	useEffect(() => {
		if (!isScrolling || !containerRef.current) {
			if (scrollInterval.current) {
				cancelAnimationFrame(scrollInterval.current);
			}
			return;
		}

		const scroll = () => {
			if (containerRef.current) {
				containerRef.current.scrollLeft +=
					isScrolling === "right" ? SCROLL_SPEED : -SCROLL_SPEED;
				scrollInterval.current = requestAnimationFrame(scroll);
			}
		};

		scrollInterval.current = requestAnimationFrame(scroll);

		return () => {
			if (scrollInterval.current) {
				cancelAnimationFrame(scrollInterval.current);
			}
		};
	}, [isScrolling]);

	return (
		<div className={cn(staticStyles.container)}>
			{!selectedProject && (
				<p className="absolute right-2 top-2 font-mono text-[0.6rem] opacity-30 bg-transparent">
					projects.amount = {PROJECTS.length}
				</p>
			)}

			<NoiseEffect opacity={0.02} />

			{/* Grid background */}
			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					backgroundImage: `
                        linear-gradient(to right,
                            ${COLORS.grid.line} 1px,
                            transparent 1px
                        ),
                        linear-gradient(to bottom,
                            ${COLORS.grid.line} 1px,
                            transparent 1px
                        )
                    `,
					backgroundSize: "20px 20px",
					opacity: 0.3,
				}}
			/>

			{/* Projects carousel */}
			<AnimatePresence>
				{!selectedProject && (
					<motion.div
						className={staticStyles.carouselContainer}
						initial={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 50 }}
						transition={{ duration: 0.3 }}
					>
						{/* Scroll trigger areas */}
						<div
							className={cn(staticStyles.scrollTrigger, "left-0 cursor-none")}
							onMouseEnter={() => setIsScrolling("left")}
							onMouseLeave={() => setIsScrolling(null)}
							style={{
								background: `linear-gradient(to right, ${COLORS.palette.blue.primary}20, transparent)`,
							}}
						/>
						<div
							className={cn(staticStyles.scrollTrigger, "right-0 cursor-none")}
							onMouseEnter={() => setIsScrolling("right")}
							onMouseLeave={() => setIsScrolling(null)}
							style={{
								background: `linear-gradient(to left, ${COLORS.palette.blue.primary}20, transparent)`,
							}}
						/>

						{/* Scrollable container */}
						<div
							ref={containerRef}
							className={staticStyles.projectsContainer}
							style={{
								msOverflowStyle: "none",
								scrollbarWidth: "none",
							}}
						>
							{PROJECTS.map((project, index) => (
								<ProjectCard
									key={project.id}
									project={project}
									index={index}
									isHovered={hoveredId === project.id}
									onSelect={() => setSelectedProject(project)}
									onHoverStart={() => setHoveredId(project.id)}
									onHoverEnd={() => setHoveredId(null)}
								/>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Project Details */}
			<AnimatePresence>
				{selectedProject && (
					<motion.div
						className="absolute inset-0"
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 50 }}
						transition={{ duration: 0.3 }}
					>
						<Details
							project={selectedProject}
							onClose={() => setSelectedProject(null)}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default memo(Projects);
