import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import type { AvatarProps } from "../Avatar.tsx";

export const OverlayEffects = memo(
	({ glowColor }: Pick<AvatarProps, "glowColor">) => {
		const glowAnimation = useMemo(
			() => ({
				animate: {
					boxShadow: [
						"0 0 10px rgba(59, 130, 246, 0.2)",
						"0 0 20px rgba(59, 130, 246, 0.4)",
						"0 0 10px rgba(59, 130, 246, 0.2)",
					],
				},
				transition: {
					duration: 2,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				},
			}),
			[],
		);

		return (
			<>
				<motion.div
					className="absolute inset-0 rounded-none mix-blend-overlay"
					{...glowAnimation}
				/>
				<div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 to-purple-950/40 mix-blend-overlay" />
			</>
		);
	},
);

OverlayEffects.displayName = "OverlayEffects";
