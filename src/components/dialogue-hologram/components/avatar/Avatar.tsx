import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import { NoiseEffect } from "../../../../utils/NoiseEffect.tsx";
import { GlitchEffect } from "./utils/glitch-effect.tsx";
import { OverlayEffects } from "./utils/overlay-effects.tsx";
import { Scanlines } from "./utils/scanlines.tsx";

export interface AvatarProps {
	imageUrl: string;
	size?: number;
	scanlines?: number;
	glowColor?: string;
	scanlineOpacity?: number;
	scanlineSpeed?: number;
	className?: string;
}

export const HolographicAvatar = memo(
	({
		imageUrl,
		size = 200,
		scanlines = 60,
		glowColor = "68, 189, 255",
		scanlineOpacity = 0.1,
		scanlineSpeed = 0.05,
		className = "",
	}: AvatarProps) => {
		const containerStyles = useMemo(
			() => ({
				width: size,
				height: size,
			}),
			[size],
		);

		return (
			<motion.div className={`relative ${className}`} style={containerStyles}>
				<div className="relative w-full h-full">
					<div className="absolute inset-0 overflow-hidden">
						<div className="relative w-full h-full bg-gradient-to-br from-blue-950/80 to-purple-950/80">
							<GlitchEffect imageUrl={imageUrl} size={size} />
							<NoiseEffect opacity={0.03} />
						</div>
					</div>

					<motion.div
						className="absolute inset-[-1px] border border-white/20 bg-white/10 backdrop-blur-lg -z-10"
						animate={{
							boxShadow: [
								"0 0 10px rgba(59, 130, 246, 0.2)",
								"0 0 20px rgba(59, 130, 246, 0.4)",
								"0 0 10px rgba(59, 130, 246, 0.2)",
							],
						}}
						transition={{
							duration: 2,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
					>
						<NoiseEffect opacity={0.02} />
					</motion.div>

					<Scanlines
						size={size}
						scanlines={scanlines}
						glowColor={glowColor}
						scanlineOpacity={scanlineOpacity}
						scanlineSpeed={scanlineSpeed}
					/>

					<OverlayEffects glowColor={glowColor} />
				</div>
			</motion.div>
		);
	},
);

HolographicAvatar.displayName = "HolographicAvatar";
