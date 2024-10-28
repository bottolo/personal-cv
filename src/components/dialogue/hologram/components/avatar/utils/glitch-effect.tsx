import { motion } from "framer-motion";
import { memo, useEffect, useState } from "react";

interface GlitchEffectProps {
	imageUrl: string;
	size: number;
	chance?: number;
}
export const GlitchEffect = memo(
	({ imageUrl, size, chance = 0.7 }: GlitchEffectProps) => {
		const [isGlitching, setIsGlitching] = useState(false);

		useEffect(() => {
			const glitchInterval = setInterval(() => {
				if (Math.random() > chance) {
					setIsGlitching(true);
					setTimeout(() => setIsGlitching(false), 200);
				}
			}, 2000);

			return () => clearInterval(glitchInterval);
		}, []);

		return (
			<motion.div
				className="absolute inset-0 overflow-hidden"
				animate={
					isGlitching
						? {
								x: [0, -2, 2, -1, 0],
								y: [0, 1, -1, 1, 0],
								opacity: [1, 0.8, 0.9, 0.7, 1],
							}
						: {}
				}
				transition={{ duration: 0.2 }}
			>
				<img
					src={imageUrl}
					alt="Avatar"
					className="w-full h-full object-cover border border-white/10 opacity-60"
					style={{
						filter: isGlitching ? "hue-rotate(20deg) brightness(1.2)" : "none",
					}}
					loading="lazy"
				/>
				{isGlitching && (
					<>
						<motion.div
							className="absolute inset-0 bg-blue-500/30 mix-blend-screen"
							animate={{
								x: [0, 2, -2, 1, 0],
								opacity: [0, 0.5, 0, 0.5, 0],
							}}
							transition={{ duration: 0.2 }}
						/>
						<motion.div
							className="absolute inset-0 bg-red-500/30 mix-blend-screen"
							animate={{
								x: [0, -2, 2, -1, 0],
								opacity: [0, 0.5, 0, 0.5, 0],
							}}
							transition={{ duration: 0.2 }}
						/>
					</>
				)}
			</motion.div>
		);
	},
);

GlitchEffect.displayName = "GlitchEffect";
