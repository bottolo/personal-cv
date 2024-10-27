import { motion } from "framer-motion";
import { memo, useMemo } from "react";
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

// Memoize Scanlines component
const Scanlines = memo(
	({
		size,
		scanlines,
		glowColor,
		scanlineOpacity,
		scanlineSpeed,
	}: Omit<AvatarProps, "imageUrl" | "className">) => {
		// Memoize styles that depend on props
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

		// Memoize animation configuration
		const animationConfig = useMemo(
			() => ({
				animate: {
					y: [0, -size!],
				},
				transition: {
					duration: scanlineSpeed,
					repeat: Number.POSITIVE_INFINITY,
					ease: "linear",
				},
			}),
			[size, scanlineSpeed],
		);

		return (
			<div
				className="absolute inset-0 overflow-hidden z-[3]"
				style={scanlineStyles}
			>
				<motion.div
					{...animationConfig}
					className="w-full"
					style={gradientStyles}
				/>
			</div>
		);
	},
);

Scanlines.displayName = "Scanlines";

// Memoize overlay effects
const OverlayEffects = memo(({ glowColor }: Pick<AvatarProps, "glowColor">) => {
	const glowStyles = useMemo(
		() => ({
			background: `radial-gradient(circle at 50% 50%, rgba(${glowColor}, 0.15), transparent 70%)`,
			mixBlendMode: "screen",
		}),
		[glowColor],
	);

	const flickerAnimation = useMemo(
		() => ({
			animate: {
				opacity: [0.97, 1, 0.98, 0.97],
			},
			transition: {
				duration: 0.2,
				repeat: Number.POSITIVE_INFINITY,
				repeatType: "reverse",
			},
			style: {
				background: `rgba(${glowColor}, 0.02)`,
			},
		}),
		[glowColor],
	);

	return (
		<>
			<div className="absolute inset-0 rounded-none" style={glowStyles} />
			<motion.div
				className="absolute inset-0 rounded-none mix-blend-overlay"
				{...flickerAnimation}
			/>
		</>
	);
});

OverlayEffects.displayName = "OverlayEffects";

// Main component with memoization
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
		// Memoize container styles
		const containerStyles = useMemo(
			() => ({
				width: size,
				height: size,
			}),
			[size],
		);

		// Memoize gradient overlay styles
		const gradientOverlayStyles = useMemo(
			() => ({
				background: `linear-gradient(45deg, rgba(${glowColor}, 0.05) 0%, transparent 100%)`,
				mixBlendMode: "screen",
			}),
			[glowColor],
		);

		return (
			<motion.div className={`relative ${className}`} style={containerStyles}>
				<div className="relative w-full h-full shadow-lg shadow-white/15">
					<div className="absolute inset-0 overflow-hidden shadow-lg shadow-blue-500/25">
						<div className="relative w-full h-full">
							<img
								src={imageUrl}
								alt="Avatar"
								className="w-full h-full object-cover border border-white/10 opacity-60"
								loading="lazy"
							/>
							<div className="absolute inset-0" style={gradientOverlayStyles} />
							<NoiseEffect opacity={0.03} />
						</div>
					</div>

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
