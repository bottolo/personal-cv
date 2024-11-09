import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import {
	COLORS,
	createHologramGradient,
} from "../../../../global-utils/colors.ts";
import type { Project } from "../../utils/projects.ts";

export const ProjectCard = memo(
	({
		project,
		index,
		isHovered,
		onSelect,
		onHoverStart,
		onHoverEnd,
	}: {
		project: Project;
		index: number;
		isHovered: boolean;
		onSelect: () => void;
		onHoverStart: () => void;
		onHoverEnd: () => void;
	}) => {
		const selectedImage = useMemo(
			() => project.images[Math.floor(Math.random() * project.images.length)],
			[project.images],
		);

		return (
			<motion.div
				animate={{
					y: index % 2 === 0 ? [0, -8, 0] : [-8, 0, -8],
				}}
				transition={{
					y: {
						duration: 2,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
						delay: index * 0.2,
					},
				}}
			>
				{/* Card content with hover effects */}
				<motion.div
					className="w-52 h-64 relative cursor-none"
					style={{
						background: createHologramGradient(
							"135deg",
							project.color || COLORS.palette.blue.primary,
							[0.1, 0.05],
						),
						boxShadow: `
                            0 0 20px ${COLORS.effects.glitch.overlay},
                            inset 0 0 15px ${COLORS.effects.scanLine}
                        `,
					}}
					animate={{
						scale: isHovered ? 1.05 : 1,
						borderRadius: isHovered ? "1rem" : "0rem",
					}}
					transition={{
						scale: { duration: 0.3 },
						borderRadius: { duration: 0.3 },
					}}
					onClick={onSelect}
					onHoverStart={onHoverStart}
					onHoverEnd={onHoverEnd}
				>
					{/* Rest of the card content remains the same */}
					{/* Image container */}
					<motion.div
						className="absolute inset-x-0 top-0 h-32 overflow-hidden rounded-t-2xl"
						initial={false}
						animate={{
							opacity: isHovered ? 0.9 : 0.6,
						}}
					>
						<img
							src={selectedImage.src}
							alt={selectedImage.alt}
							className="w-full h-full object-cover"
						/>
						<motion.div
							className="absolute inset-0"
							style={{
								backgroundImage: `
                                    repeating-linear-gradient(
                                        0deg,
                                        transparent,
                                        transparent 2px,
                                        ${COLORS.effects.scanLine} 3px,
                                        transparent 3px
                                    )
                                `,
								backgroundSize: "100% 4px",
								opacity: 0.2,
							}}
							animate={{ y: [0, 4] }}
							transition={{
								repeat: Number.POSITIVE_INFINITY,
								duration: 0.2,
								ease: "linear",
							}}
						/>
					</motion.div>

					{/* Content */}
					<div className="absolute inset-x-0 bottom-0 h-32 p-4 flex flex-col">
						<motion.h3
							className="text-sm font-mono font-bold mb-2"
							style={{
								color: COLORS.text.primary,
								textShadow: `0 0 10px ${project.color || COLORS.palette.blue.primary}`,
							}}
							animate={{
								opacity: isHovered ? 1 : 0.8,
								scale: isHovered ? 1.05 : 1,
							}}
						>
							{project.title}
						</motion.h3>

						<motion.p
							className="text-xs font-mono leading-relaxed"
							style={{ color: COLORS.text.secondary }}
							animate={{
								opacity: isHovered ? 0.9 : 0.6,
							}}
						>
							{project.shortDescription}
						</motion.p>
					</div>

					{/* Glitch overlay */}
					{isHovered && (
						<motion.div
							className="absolute inset-0 pointer-events-none"
							style={{
								background: createHologramGradient(
									"45deg",
									project.color || COLORS.palette.blue.primary,
									[0.1, 0.05],
								),
								mixBlendMode: "overlay",
							}}
							initial={{ opacity: 0 }}
							animate={{ opacity: [0.2, 0.3, 0.2] }}
							transition={{
								duration: 1,
								repeat: Number.POSITIVE_INFINITY,
							}}
						/>
					)}

					{/* Border glow */}
					<motion.div
						className="absolute inset-0 rounded-none pointer-events-none"
						style={{
							border: `1px solid ${project.color || COLORS.palette.blue.primary}40`,
						}}
						animate={{
							boxShadow: isHovered
								? `0 0 20px ${project.color || COLORS.palette.blue.primary}40`
								: "none",
						}}
					/>
				</motion.div>
			</motion.div>
		);
	},
);
