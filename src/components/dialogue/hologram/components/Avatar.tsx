import { motion } from "framer-motion";
import { memo, useEffect, useMemo, useState } from "react";
import { NoiseEffect } from "../../../../utils/Noise.tsx";

interface AvatarProps {
	imageUrl: string;
	size?: number;
	scanlines?: number;
	glowColor?: string;
	scanlineOpacity?: number;
	scanlineSpeed?: number;
	className?: string;
}

// Glitch effect component
const GlitchEffect = memo(
	({ imageUrl, size }: { imageUrl: string; size: number }) => {
		const [isGlitching, setIsGlitching] = useState(false);

		useEffect(() => {
			const glitchInterval = setInterval(() => {
				if (Math.random() > 0.7) {
					// 30% chance to trigger glitch
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

const Scanlines = memo(
	({
		size,
		scanlines,
		glowColor,
		scanlineOpacity,
		scanlineSpeed,
	}: Omit<AvatarProps, "imageUrl" | "className">) => {
		const scanlineStyles = useMemo(
			() => ({
				maskImage: "linear-gradient(to bottom, black 50%, transparent 50%)",
				maskSize: `100% ${(size! / scanlines!) * 2}px`,
				WebkitMaskImage:
					"linear-gradient(to bottom, black 50%, transparent 50%)",
				WebkitMaskSize: `100% ${(size! / scanlines!) * 2}px`,
			}),
			[size, scanlines],
		);

		const gradientStyles = useMemo(
			() => ({
				height: size! * 2,
				background: `repeating-linear-gradient(
          0deg,
          rgba(${glowColor}, ${scanlineOpacity}) 0px,
          rgba(${glowColor}, ${scanlineOpacity}) 1px,
          transparent 1px,
          transparent ${size! / scanlines!}px
        )`,
			}),
			[size, scanlines, glowColor, scanlineOpacity],
		);

		return (
			<div
				className="absolute inset-0 overflow-hidden z-[3]"
				style={scanlineStyles}
			>
				<motion.div
					animate={{ y: [0, -size!] }}
					transition={{
						duration: scanlineSpeed,
						repeat: Number.POSITIVE_INFINITY,
						ease: "linear",
					}}
					className="w-full"
					style={gradientStyles}
				/>
			</div>
		);
	},
);

Scanlines.displayName = "Scanlines";

const OverlayEffects = memo(({ glowColor }: Pick<AvatarProps, "glowColor">) => {
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
});

OverlayEffects.displayName = "OverlayEffects";

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
