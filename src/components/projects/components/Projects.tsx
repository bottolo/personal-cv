import { AnimatePresence, motion } from "framer-motion";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { NoiseEffect } from "../../../global-utils/NoiseEffect.tsx";
import { cn } from "../../../global-utils/cn.ts";
import { HOLOGRAM_COLORS } from "../../../global-utils/colors.ts";
import type { Position } from "../../../global-utils/position.ts";
import { PROJECTS, type Project } from "../utils/projects.ts";
import Details from "./Details.tsx";
import { Radar } from "./Radar.tsx";

const POSITION_RANGE = 40;
const SCALE_MULTIPLIER = 8;
const POSITION_UPDATE_INTERVAL = 3000;

const staticStyles = {
	container:
		"relative w-full h-full flex items-center justify-center overflow-hidden",
	loadingContainer: "w-96 h-64 mx-auto flex items-center justify-center",
	loadingText: "opacity-50",
	sphereBase: "absolute",
	sphereContent:
		"w-full h-full flex items-center justify-center overflow-hidden",
	sphereText: "font-mono font-bold text-center px-2 text-sm tracking-wider",
} as const;

const sphereStyles = {
	normal: {
		background: `linear-gradient(135deg, ${HOLOGRAM_COLORS.sphere.gradient.start}, ${HOLOGRAM_COLORS.sphere.gradient.end})`,
		boxShadow: `0 5px 15px ${HOLOGRAM_COLORS.sphere.glow.outer},
                    inset -2px -2px 6px ${HOLOGRAM_COLORS.sphere.glow.inner},
                    inset 2px 2px 6px ${HOLOGRAM_COLORS.sphere.highlight}`,
	},
	hovered: {
		background: HOLOGRAM_COLORS.primary,
		boxShadow: `0 10px 30px ${HOLOGRAM_COLORS.sphere.glow.outer},
                    inset -2px -2px 10px ${HOLOGRAM_COLORS.sphere.glow.inner},
                    inset 2px 2px 10px ${HOLOGRAM_COLORS.sphere.highlight}`,
	},
} as const;

const sphereAnimationConfig = {
	transition: {
		x: { type: "spring", stiffness: 50, damping: 20 },
		y: { type: "spring", stiffness: 50, damping: 20 },
		width: { type: "spring", stiffness: 300, damping: 30 },
		height: { type: "spring", stiffness: 300, damping: 30 },
		borderRadius: { duration: 0.2 },
		scale: { type: "spring", stiffness: 300, damping: 30 },
	},
} as const;

const generateRandomPosition = (): Position => ({
	x: Math.random() * POSITION_RANGE - POSITION_RANGE / 2,
	y: Math.random() * POSITION_RANGE - POSITION_RANGE / 2,
});

const Sphere = memo(
	({
		project,
		position,
		isHovered,
		onSelect,
		onHoverStart,
		onHoverEnd,
	}: {
		project: Project;
		position: Position;
		isHovered: boolean;
		onSelect: () => void;
		onHoverStart: () => void;
		onHoverEnd: () => void;
	}) => {
		const sphereStyle = useMemo(
			() => ({
				...sphereStyles[isHovered ? "hovered" : "normal"],
				cursor: "none",
				zIndex: 1,
			}),
			[isHovered],
		);

		return (
			<motion.div
				className={staticStyles.sphereBase}
				initial={false}
				animate={{
					x: position.x * SCALE_MULTIPLIER,
					y: position.y * SCALE_MULTIPLIER,
					width: isHovered ? 160 : 96,
					height: isHovered ? 76 : 96,
					borderRadius: isHovered ? "50px" : "100%",
					scale: isHovered ? 1.1 : 1,
				}}
				transition={sphereAnimationConfig.transition}
				onClick={onSelect}
				onHoverStart={onHoverStart}
				onHoverEnd={onHoverEnd}
				style={sphereStyle}
			>
				<motion.div
					className={staticStyles.sphereContent}
					initial={{ opacity: 0 }}
					animate={{ opacity: isHovered ? 1 : 0 }}
					transition={{ duration: 0.2, delay: isHovered ? 0.1 : 0 }}
				>
					<motion.span
						className={staticStyles.sphereText}
						style={{ color: HOLOGRAM_COLORS.text.primary }}
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{
							opacity: isHovered ? 1 : 0,
							scale: isHovered ? 1 : 0.8,
							textShadow: HOLOGRAM_COLORS.glow.medium,
						}}
						transition={{ duration: 0.2, delay: 0.15 }}
					>
						{project.title}
					</motion.span>
				</motion.div>
			</motion.div>
		);
	},
);

const Projects = () => {
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [hoveredId, setHoveredId] = useState<number | null>(null);
	const [positions, setPositions] = useState<Position[]>([]);
	const [isReady, setIsReady] = useState(false);

	const getPosition = useCallback(
		(index: number): Position => {
			if (!positions[index]) return { x: 0, y: 0 };
			if (!hoveredId) return positions[index];

			const basePos = positions[index];
			const hoveredIndex = PROJECTS.findIndex((p) => p.id === hoveredId);
			const hoveredPos = positions[hoveredIndex];

			if (!hoveredPos || hoveredId === PROJECTS[index].id) return basePos;

			return basePos;
		},
		[positions, hoveredId],
	);

	useEffect(() => {
		const initialPositions = PROJECTS.map(() => generateRandomPosition());
		setPositions(initialPositions);
		setIsReady(true);
	}, []);

	useEffect(() => {
		if (hoveredId) return;

		const interval = setInterval(() => {
			setPositions((currentPositions) => {
				const randomIndex = Math.floor(Math.random() * PROJECTS.length);
				return Object.assign([], currentPositions, {
					[randomIndex]: generateRandomPosition(),
				});
			});
		}, POSITION_UPDATE_INTERVAL);

		return () => clearInterval(interval);
	}, [hoveredId]);

	if (!isReady) {
		return (
			<div className={staticStyles.loadingContainer}>
				<motion.div
					animate={{ opacity: [0.3, 0.6, 0.3] }}
					transition={{
						duration: 1.5,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
					style={{ color: HOLOGRAM_COLORS.text.secondary }}
					className={staticStyles.loadingText}
				>
					Loading...
				</motion.div>
			</div>
		);
	}

	return (
		<div className={cn(staticStyles.container)}>
			<Radar />
			<NoiseEffect opacity={0.01} />

			<AnimatePresence>
				{!selectedProject &&
					PROJECTS.map((project, index) => (
						<Sphere
							key={project.id}
							project={project}
							position={getPosition(index)}
							isHovered={hoveredId === project.id}
							onSelect={() => setSelectedProject(project)}
							onHoverStart={() => setHoveredId(project.id)}
							onHoverEnd={() => setHoveredId(null)}
						/>
					))}
			</AnimatePresence>

			<AnimatePresence>
				{selectedProject && (
					<Details
						project={selectedProject}
						onClose={() => setSelectedProject(null)}
					/>
				)}
			</AnimatePresence>
		</div>
	);
};

export default memo(Projects);
