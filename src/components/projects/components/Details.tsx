import { motion } from "framer-motion";
import { memo } from "react";
import { NoiseEffect } from "../../../global-utils/NoiseEffect.tsx";
import { HOLOGRAM_COLORS } from "../../../global-utils/colors.ts";
import type { Project } from "../utils/projects.ts";

interface DetailsProps {
	project: Project;
	onClose: () => void;
}

const Details = memo(({ project, onClose }: DetailsProps) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="absolute inset-0 flex items-center justify-center"
			style={{ zIndex: 50 }}
		>
			{/* Main Container */}
			<div className="relative w-full h-full bg-gradient-to-br from-blue-950/80 to-purple-950/80 backdrop-blur-sm border border-blue-400/20 overflow-hidden">
				{/* Hologram Effects Container */}
				<div className="absolute inset-0 pointer-events-none">
					{/* Scanning line effect */}
					<motion.div
						className="absolute w-full h-1 blur-sm"
						style={{ backgroundColor: `${HOLOGRAM_COLORS.primary}40` }}
						animate={{
							top: ["-10%", "110%"],
						}}
						transition={{
							duration: 2.5,
							repeat: Number.POSITIVE_INFINITY,
							ease: "linear",
						}}
					/>

					{/* Grid pattern */}
					<div
						className="absolute inset-0 opacity-10"
						style={{
							backgroundImage: `
                linear-gradient(0deg, transparent 24%, ${HOLOGRAM_COLORS.accent}30 25%, ${HOLOGRAM_COLORS.accent}30 26%, transparent 27%, transparent 74%, ${HOLOGRAM_COLORS.accent}30 75%, ${HOLOGRAM_COLORS.accent}30 76%, transparent 77%, transparent),
                linear-gradient(90deg, transparent 24%, ${HOLOGRAM_COLORS.accent}30 25%, ${HOLOGRAM_COLORS.accent}30 26%, transparent 27%, transparent 74%, ${HOLOGRAM_COLORS.accent}30 75%, ${HOLOGRAM_COLORS.accent}30 76%, transparent 77%, transparent)
              `,
							backgroundSize: "50px 50px",
						}}
					/>
				</div>

				{/* Content Container */}
				<div className="relative flex h-full">
					{/* Left side - Info */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						className="w-2/5 h-full flex flex-col relative border-r"
						style={{ borderColor: HOLOGRAM_COLORS.border.normal }}
					>
						<div className="h-full overflow-y-auto p-8 custom-scrollbar">
							<div className="space-y-6">
								<motion.h2
									className="text-3xl font-mono font-bold"
									style={{ color: HOLOGRAM_COLORS.text.primary }}
									animate={{
										opacity: [0.7, 1, 0.7],
										textShadow: [
											HOLOGRAM_COLORS.glow.weak,
											HOLOGRAM_COLORS.glow.medium,
											HOLOGRAM_COLORS.glow.weak,
										],
									}}
									transition={{
										duration: 2,
										repeat: Number.POSITIVE_INFINITY,
										ease: "easeInOut",
									}}
								>
									{project.title}
								</motion.h2>

								<motion.p
									className="text-lg leading-relaxed font-mono"
									style={{
										color: HOLOGRAM_COLORS.text.secondary,
										textShadow: HOLOGRAM_COLORS.glow.weak,
									}}
								>
									{project.description}
								</motion.p>

								<div className="space-y-2">
									<h3
										className="font-mono"
										style={{ color: HOLOGRAM_COLORS.text.primary }}
									>
										Technologies
									</h3>
									<div className="flex flex-wrap gap-2">
										{project.technologies.map((tech) => (
											<motion.span
												key={tech}
												className="px-3 py-1 rounded font-mono text-sm"
												style={{
													backgroundColor: HOLOGRAM_COLORS.bg.surface,
													borderColor: HOLOGRAM_COLORS.border.normal,
													color: HOLOGRAM_COLORS.text.primary,
												}}
												animate={{
													boxShadow: [
														HOLOGRAM_COLORS.glow.weak,
														HOLOGRAM_COLORS.glow.medium,
														HOLOGRAM_COLORS.glow.weak,
													],
												}}
												transition={{
													duration: 2,
													repeat: Number.POSITIVE_INFINITY,
													ease: "easeInOut",
													delay: Math.random(),
												}}
											>
												{tech}
											</motion.span>
										))}
									</div>
								</div>

								{project.links && (
									<div className="flex gap-4">
										{project.links.github && (
											<motion.a
												href={project.links.github}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center px-4 py-2 rounded font-mono text-sm"
												style={{
													backgroundColor: HOLOGRAM_COLORS.bg.surface,
													borderColor: HOLOGRAM_COLORS.border.normal,
													color: HOLOGRAM_COLORS.text.primary,
												}}
												whileHover={{
													backgroundColor: HOLOGRAM_COLORS.bg.hover,
													boxShadow: HOLOGRAM_COLORS.glow.medium,
												}}
											>
												GitHub →
											</motion.a>
										)}
										{/* Similar styling for demo link */}
									</div>
								)}
							</div>
						</div>
					</motion.div>

					{/* Right side - Images */}
					<div className="w-3/5 h-full overflow-y-auto p-8 custom-scrollbar">
						<div className="space-y-8">
							{project.images.map((image, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2 + index * 0.1 }}
									className="space-y-2"
								>
									<motion.div
										className="relative aspect-video rounded-lg overflow-hidden"
										style={{
											backgroundColor: HOLOGRAM_COLORS.bg.surface,
											borderColor: HOLOGRAM_COLORS.border.normal,
										}}
										animate={{
											boxShadow: [
												HOLOGRAM_COLORS.glow.weak,
												HOLOGRAM_COLORS.glow.medium,
												HOLOGRAM_COLORS.glow.weak,
											],
										}}
										transition={{
											duration: 2,
											repeat: Number.POSITIVE_INFINITY,
											ease: "easeInOut",
											delay: index * 0.2,
										}}
									>
										<img
											src={image.src}
											alt={image.alt}
											className="w-full h-full object-cover"
											style={{
												filter: "brightness(1.1) contrast(1.05)",
												mixBlendMode: "screen",
											}}
										/>
									</motion.div>
									{image.description && (
										<p
											className="text-sm font-mono"
											style={{ color: HOLOGRAM_COLORS.text.muted }}
										>
											{image.description}
										</p>
									)}
								</motion.div>
							))}
						</div>
					</div>

					<div className="absolute top-2 right-2 text-[0.5rem] font-mono text-blue-300/60">
						project.details | v1.0
					</div>

					{/* Close button */}
					<div className="absolute top-2 right-2 flex items-center gap-2">
						<motion.button
							onClick={onClose}
							className="relative group p-2 rounded-none"
							style={{
								backgroundColor: HOLOGRAM_COLORS.bg.surface,
								borderColor: HOLOGRAM_COLORS.border.normal,
							}}
							whileHover={{
								backgroundColor: "rgba(239, 68, 68, 0.2)",
							}}
						>
							<motion.div
								className="absolute inset-0 rounded"
								animate={{
									boxShadow: [
										HOLOGRAM_COLORS.glow.weak,
										HOLOGRAM_COLORS.glow.medium,
										HOLOGRAM_COLORS.glow.weak,
									],
								}}
								transition={{
									duration: 2,
									repeat: Number.POSITIVE_INFINITY,
									ease: "easeInOut",
								}}
							/>
							<svg
								alt={"Close Icon"}
								xmlns="http://www.w3.org/2000/svg"
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="relative z-10 transition-colors"
								style={{
									color: HOLOGRAM_COLORS.text.muted,
								}}
							>
								<line x1="18" y1="6" x2="6" y2="18" />
								<line x1="6" y1="6" x2="18" y2="18" />
							</svg>
						</motion.button>
					</div>
				</div>
			</div>
			<NoiseEffect opacity={0.02} />
		</motion.div>
	);
});

export default Details;
