import { motion, useAnimationControls } from "framer-motion";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { NoiseEffect } from "../../../../global-utils/NoiseEffect.tsx";
import { COLORS, hologramAnimations } from "../../../../global-utils/colors.ts";
import type { Project } from "../../utils/projects.ts";

interface ProjectLinks {
	github?: string;
	live?: string;
}

interface ProjectWithLinks extends Project {
	links?: ProjectLinks;
}

const ANIMATION_SEQUENCE = {
	title: 0,
	description: 400,
	techTitle: 800,
	techItems: 1000,
	links: 1200,
	images: 1400,
} as const;

const TypewriterText = memo(
	({ text, delay = 0 }: { text: string; delay?: number }) => {
		const [displayText, setDisplayText] = useState("");

		useEffect(() => {
			let index = 0;
			let intervalId: number; // Fixed NodeJS.Timeout type
			const timerId = setTimeout(() => {
				intervalId = window.setInterval(() => {
					if (index < text.length) {
						setDisplayText((prev) => text.slice(0, prev.length + 1));
						index++;
					} else {
						clearInterval(intervalId);
					}
				}, 30);
			}, delay);

			return () => {
				clearTimeout(timerId);
				clearInterval(intervalId);
			};
		}, [text, delay]);

		return <span>{displayText}</span>;
	},
);

TypewriterText.displayName = "TypewriterText";

const MarbleButton = memo(
	({
		children,
		onClick,
		className = "",
		isClose = false,
	}: {
		children: React.ReactNode;
		onClick: () => void;
		className?: string;
		isClose?: boolean;
	}) => {
		const buttonStyle = useMemo(
			() => ({
				background: `linear-gradient(135deg, ${COLORS.sphere.gradient.start}, ${COLORS.sphere.gradient.end})`,
				boxShadow: `0 5px 15px ${COLORS.sphere.glow.outer},
                    inset -2px -2px 6px ${COLORS.sphere.glow.inner},
                    inset 2px 2px 6px ${COLORS.sphere.highlight}`,
			}),
			[],
		);

		const hoverAnimation = useMemo(
			() => ({
				scale: 1.05,
				boxShadow: `0 10px 30px ${COLORS.sphere.glow.outer},
                    inset -2px -2px 10px ${COLORS.sphere.glow.inner},
                    inset 2px 2px 10px ${COLORS.sphere.highlight}`,
			}),
			[],
		);

		return (
			<motion.button
				onClick={onClick}
				className={`relative rounded-none flex items-center justify-center cursor-none font-mono ${className}`}
				style={buttonStyle}
				whileHover={hoverAnimation}
				animate={
					isClose
						? {
								background: [
									`linear-gradient(135deg, ${COLORS.sphere.gradient.start}, ${COLORS.sphere.gradient.end})`,
									"linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(239, 68, 68, 0.5))",
								],
							}
						: undefined
				}
				transition={{ duration: 0.2 }}
			>
				{children}
			</motion.button>
		);
	},
);

const ProjectImage = memo(
	({
		image,
		index,
		baseDelay,
	}: {
		image: Project["images"][0];
		index: number;
		baseDelay: number;
	}) => (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: baseDelay / 1000 + index * 0.15 }}
			className="space-y-2"
		>
			<motion.div
				className="relative aspect-video rounded-lg overflow-hidden"
				style={{
					backgroundColor: COLORS.bg.surface,
					borderColor: COLORS.border.normal,
				}}
				animate={hologramAnimations.glow.animate}
				transition={hologramAnimations.glow.transition}
			>
				<img
					src={image.src}
					alt={image.alt}
					className="w-full h-full object-cover"
					style={{
						filter: "brightness(1.1) contrast(1.05)",
						mixBlendMode: "screen",
					}}
					loading="lazy"
				/>
			</motion.div>
			{image.description && (
				<p className="text-sm font-mono" style={{ color: COLORS.text.muted }}>
					<TypewriterText
						text={image.description}
						delay={baseDelay + index * 150}
					/>
				</p>
			)}
		</motion.div>
	),
);

interface DetailsProps {
	project: ProjectWithLinks;
	onClose: () => void;
}

const Details = memo(({ project, onClose }: DetailsProps) => {
	const controls = useAnimationControls();

	useEffect(() => {
		controls.start({ opacity: 1 });
	}, [controls]);

	const handleGithubClick = useCallback(() => {
		if (project.links?.github) {
			window.open(project.links.github, "_blank");
		}
	}, [project.links?.github]);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="absolute inset-0 flex items-center justify-center"
			style={{ zIndex: 50 }}
		>
			<div className="relative w-full h-full bg-gradient-to-br from-blue-950/80 to-purple-950/80 backdrop-blur-sm border border-blue-400/20 overflow-hidden">
				<div className="relative flex h-full">
					{/* Left side - Info */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						className="w-2/5 h-full flex flex-col relative border-r"
						style={{ borderColor: COLORS.border.normal }}
					>
						<div className="h-full overflow-y-auto p-8 custom-scrollbar">
							<div className="space-y-6">
								<motion.h2
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className="text-3xl font-mono font-bold"
									style={{ color: COLORS.text.primary }}
								>
									<TypewriterText
										text={project.title}
										delay={ANIMATION_SEQUENCE.title}
									/>
								</motion.h2>

								{/* Description */}
								<motion.p
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: ANIMATION_SEQUENCE.description / 1000 }}
									className="text-lg leading-relaxed font-mono"
									style={{
										color: COLORS.text.secondary,
										textShadow: COLORS.glow.weak,
									}}
								>
									<TypewriterText
										text={project.description}
										delay={ANIMATION_SEQUENCE.description}
									/>
								</motion.p>

								{/* Technologies */}
								<TechnologiesSection
									technologies={project.technologies}
									animationDelay={ANIMATION_SEQUENCE.techTitle}
								/>

								{/* Links */}
								{project.links?.github && (
									<motion.div
										className="flex gap-4"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: ANIMATION_SEQUENCE.links / 1000 }}
									>
										<MarbleButton
											onClick={handleGithubClick}
											className="px-4 py-2 text-sm"
										>
											<TypewriterText
												text="GitHub →"
												delay={ANIMATION_SEQUENCE.links}
											/>
										</MarbleButton>
									</motion.div>
								)}
							</div>
						</div>
					</motion.div>

					{/* Right side - Images */}
					<div className="w-3/5 h-full overflow-y-auto p-8 custom-scrollbar">
						<div className="space-y-8">
							{project.images.map((image, index) => (
								<ProjectImage
									key={image.src}
									image={image}
									index={index}
									baseDelay={ANIMATION_SEQUENCE.images}
								/>
							))}
						</div>
					</div>

					{/* Metadata and Controls */}
					<ProjectMetadata
						projectId={project.id.toString()}
						onClose={onClose}
					/>
				</div>
			</div>
			<NoiseEffect opacity={0.02} />
		</motion.div>
	);
});

// Extracted components for better organization
const TechnologiesSection = memo(
	({
		technologies,
		animationDelay,
	}: {
		technologies: string[];
		animationDelay: number;
	}) => (
		<motion.div
			className="space-y-2"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: animationDelay / 1000 }}
		>
			<h3 className="font-mono" style={{ color: COLORS.text.primary }}>
				<TypewriterText text="Technologies" delay={animationDelay} />
			</h3>
			<div className="flex flex-wrap gap-2">
				{technologies.map((tech, index) => (
					<motion.div
						key={tech}
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							delay: ANIMATION_SEQUENCE.techItems / 1000 + index * 0.1,
						}}
					>
						<MarbleButton onClick={() => {}} className="px-3 py-1 text-sm">
							<TypewriterText
								text={tech}
								delay={ANIMATION_SEQUENCE.techItems + index * 100}
							/>
						</MarbleButton>
					</motion.div>
				))}
			</div>
		</motion.div>
	),
);

const ProjectMetadata = memo(
	({
		projectId,
		onClose,
	}: {
		projectId: string;
		onClose: () => void;
	}) => (
		<>
			<motion.div
				className="absolute top-2 right-2 text-[0.6rem] font-mono text-blue-300/60"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
			>
				<TypewriterText text={`project[${projectId}].details`} />
			</motion.div>

			<motion.div
				className="absolute bottom-2 right-2 flex items-center gap-2"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
			>
				<MarbleButton
					onClick={onClose}
					className="w-16 h-8 text-sm"
					isClose={true}
				>
					Close
				</MarbleButton>
			</motion.div>
		</>
	),
);

Details.displayName = "Details";
TechnologiesSection.displayName = "TechnologiesSection";
ProjectMetadata.displayName = "ProjectMetadata";

export default Details;
