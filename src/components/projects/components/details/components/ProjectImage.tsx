import { motion } from "framer-motion";
import { memo } from "react";
import {
	COLORS,
	hologramAnimations,
} from "../../../../../global-utils/colors.ts";
import type { Project } from "../../../utils/projects.ts";
import { TypewriterText } from "./TypewriterText.tsx";

export const ProjectImage = memo(
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
				className="relative aspect-video rounded-none overflow-hidden border"
				style={{
					backgroundColor: COLORS.bg.surface,
					borderColor: COLORS.border.normal,
					boxShadow: COLORS.glow.weak,
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
				<p
					className="text-sm font-mono"
					style={{
						color: COLORS.text.muted,
						textShadow: COLORS.glow.weak,
					}}
				>
					<TypewriterText
						text={image.description}
						delay={baseDelay + index * 150}
					/>
				</p>
			)}
		</motion.div>
	),
);
