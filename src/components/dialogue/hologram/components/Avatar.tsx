import { motion } from "framer-motion";
import { NoiseEffect } from "../../../../utils/Noise.tsx";

// Avatar Component
interface AvatarProps {
	imageUrl: string;
	size?: number;
	scanlines?: number;
	glowColor?: string;
	scanlineOpacity?: number;
	scanlineSpeed?: number;
	className?: string;
}

export const HolographicAvatar = ({
	imageUrl,
	size = 200,
	scanlines = 60,
	glowColor = "68, 189, 255",
	scanlineOpacity = 0.1,
	scanlineSpeed = 0.05,
	className = "",
}: AvatarProps) => {
	const Scanlines = () => (
		<div
			className="absolute inset-0 overflow-hidden z-[3]"
			style={{
				maskImage: "linear-gradient(to bottom, black 50%, transparent 50%)",
				maskSize: `100% ${(size / scanlines) * 2}px`,
				WebkitMaskImage:
					"linear-gradient(to bottom, black 50%, transparent 50%)",
				WebkitMaskSize: `100% ${(size / scanlines) * 2}px`,
			}}
		>
			<motion.div
				animate={{
					y: [0, -size],
				}}
				transition={{
					duration: scanlineSpeed,
					repeat: Number.POSITIVE_INFINITY,
					ease: "linear",
				}}
				className="w-full"
				style={{
					height: size * 2,
					background: `repeating-linear-gradient(
                        0deg,
                        rgba(${glowColor}, ${scanlineOpacity}) 0px,
                        rgba(${glowColor}, ${scanlineOpacity}) 1px,
                        transparent 1px,
                        transparent ${size / scanlines}px
                    )`,
				}}
			/>
		</div>
	);

	return (
		<motion.div
			className={`relative ${className}`}
			style={{
				width: size,
				height: size,
			}}
		>
			<div className="relative w-full h-full shadow-lg shadow-white/15">
				<div className="absolute inset-0  overflow-hidden shadow-lg shadow-blue-500/25">
					<div className="relative w-full h-full">
						<img
							src={imageUrl}
							alt="Avatar"
							className="w-full h-full object-cover border border-white/10"
						/>
						<div
							className="absolute inset-0"
							style={{
								background: `linear-gradient(45deg, rgba(${glowColor}, 0.05) 0%, transparent 100%)`,
								mixBlendMode: "screen",
							}}
						/>
						<NoiseEffect opacity={0.03} />
					</div>
				</div>

				<Scanlines />

				<div
					className="absolute inset-0 rounded-lg"
					style={{
						background: `radial-gradient(circle at 50% 50%, rgba(${glowColor}, 0.15), transparent 70%)`,
						mixBlendMode: "screen",
					}}
				/>

				<motion.div
					className="absolute inset-0 rounded-lg mix-blend-overlay"
					animate={{
						opacity: [0.97, 1, 0.98, 0.97],
					}}
					transition={{
						duration: 0.2,
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "reverse",
					}}
					style={{
						background: `rgba(${glowColor}, 0.02)`,
					}}
				/>
			</div>
		</motion.div>
	);
};
