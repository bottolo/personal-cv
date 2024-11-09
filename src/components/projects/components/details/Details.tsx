import { motion, useAnimationControls } from "framer-motion";
import { memo, useCallback, useEffect, useMemo } from "react";
import { COLORS, createHologramGlow } from "../../../../global-utils/colors.ts";
import type { Project } from "../../utils/projects.ts";
import { MarbleButton } from "./components/MarbleButton.tsx";
import { ProjectImage } from "./components/ProjectImage.tsx";
import { ProjectMetadata } from "./components/ProjectMetadaata.tsx";
import { TechnologiesSection } from "./components/TechnologiesSection.tsx";
import { TypewriterText } from "./components/TypewriterText.tsx";

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

	const titleGlow = useMemo(() => {
		return [
			createHologramGlow(COLORS.palette.cyan.primary, 1),
			createHologramGlow(COLORS.palette.cyan.primary, 2.5),
			createHologramGlow(COLORS.palette.blue.primary, 4),
		].join(", ");
	}, []);

	const descriptionGlow = useMemo(() => {
		return [
			createHologramGlow(COLORS.text.secondary, 1),
			createHologramGlow(COLORS.palette.cyan.primary, 0.5),
		].join(", ");
	}, []);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="absolute inset-0 flex items-center justify-center"
			style={{ zIndex: 50 }}
		>
			<div
				className="relative w-full h-full backdrop-blur-sm overflow-hidden"
				style={{
					background: `linear-gradient(135deg, ${COLORS.bg.gradient.from}, ${COLORS.bg.gradient.to})`,
					borderColor: COLORS.border.normal,
					boxShadow: COLORS.glow.medium,
				}}
			>
				<div className="relative flex h-full">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						className="w-2/5 h-full flex flex-col relative border-r"
						style={{
							borderColor: COLORS.border.normal,
							background: `linear-gradient(180deg, ${COLORS.bg.surface}, transparent)`,
						}}
					>
						<div
							className="h-full overflow-y-auto p-8 scrollbar-none"
							style={{
								msOverflowStyle: "none",
								scrollbarWidth: "none",
							}}
						>
							<div className="space-y-6">
								<motion.h2
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className="text-3xl font-mono font-bold"
									style={{
										color: COLORS.text.primary,
										textShadow: titleGlow,
									}}
								>
									<TypewriterText
										text={project.title}
										delay={ANIMATION_SEQUENCE.title}
									/>
								</motion.h2>

								<motion.p
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: ANIMATION_SEQUENCE.description / 1000 }}
									className="text-lg leading-relaxed font-mono"
									style={{
										color: COLORS.text.secondary,
										textShadow: descriptionGlow,
									}}
								>
									<TypewriterText
										text={project.description}
										delay={ANIMATION_SEQUENCE.description}
									/>
								</motion.p>

								<TechnologiesSection
									technologies={project.technologies}
									animationDelay={ANIMATION_SEQUENCE.techTitle}
									techItems={ANIMATION_SEQUENCE.techItems}
								/>

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
					<div
						className="w-3/5 h-full overflow-y-auto p-8 scrollbar-none"
						style={{
							msOverflowStyle: "none",
							scrollbarWidth: "none",
							background: `linear-gradient(180deg, ${COLORS.bg.surface}, transparent)`,
						}}
					>
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
		</motion.div>
	);
});

Details.displayName = "Details";

export default Details;
