import { motion } from "framer-motion";
import { memo } from "react";
import { COLORS } from "../../../../../global-utils/colors.ts";
import { MarbleButton } from "./MarbleButton.tsx";
import { TypewriterText } from "./TypewriterText.tsx";

export const TechnologiesSection = memo(
	({
		technologies,
		animationDelay,
		techItems,
	}: {
		technologies: string[];
		animationDelay: number;
		techItems: number;
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
							delay: techItems / 1000 + index * 0.1,
						}}
					>
						<MarbleButton onClick={() => {}} className="px-3 py-1 text-sm">
							<TypewriterText text={tech} delay={techItems + index * 100} />
						</MarbleButton>
					</motion.div>
				))}
			</div>
		</motion.div>
	),
);

TechnologiesSection.displayName = "TechnologiesSection";
