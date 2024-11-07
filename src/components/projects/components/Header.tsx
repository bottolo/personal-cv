import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
	HOLOGRAM_COLORS,
	hologramAnimations,
} from "../../../global-utils/colors.ts";
import { GlitchAvatar } from "./GlitchAvatar";

export const Header = () => {
	const [phase, setPhase] = useState(0);
	const animationFrameRef = useRef<number>();
	const startTimeRef = useRef<number>(0);

	useEffect(() => {
		const animate = (timestamp: number) => {
			if (!startTimeRef.current) {
				startTimeRef.current = timestamp;
			}

			const progress = (timestamp - startTimeRef.current) / 1000;
			setPhase(progress);

			animationFrameRef.current = requestAnimationFrame(animate);
		};

		animationFrameRef.current = requestAnimationFrame(animate);

		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, []);

	const generateWavePath = () => {
		const width = 1000;
		const height = 60;
		const points: string[] = [];
		const amplitude = 100;
		const frequency = 0.01;

		for (let x = 0; x <= width; x += 5) {
			const y =
				height / 2 +
				Math.sin(x * frequency + phase) * amplitude +
				Math.sin(x * frequency * 2 + phase * 1.5) * (amplitude / 2);
			points.push(`${x},${y}`);
		}

		return `M0,${height} L${points.join(" L")} L${width},${height} Z`;
	};

	return (
		<motion.div
			className="w-full flex relative overflow-hidden"
			style={{
				backgroundColor: HOLOGRAM_COLORS.bg.surface,
				borderBottom: `1px solid ${HOLOGRAM_COLORS.border.normal}`,
			}}
			initial={{ borderColor: HOLOGRAM_COLORS.border.normal }}
			animate={{
				borderColor: [
					HOLOGRAM_COLORS.border.normal,
					HOLOGRAM_COLORS.border.hover,
					HOLOGRAM_COLORS.border.normal,
				],
			}}
			transition={{
				borderColor: {
					duration: 2,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				},
			}}
		>
			{/* Particle effect overlay */}
			<motion.div
				className="absolute inset-0 pointer-events-none"
				style={{
					background: `radial-gradient(circle at 50% 50%, 
                        ${HOLOGRAM_COLORS.effects.particles}, 
                        transparent 70%
                    )`,
				}}
				animate={hologramAnimations.pulse.animate}
				transition={hologramAnimations.pulse.transition}
			/>

			{/* Grid effect */}
			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					backgroundImage: `
                        linear-gradient(to right, 
                            ${HOLOGRAM_COLORS.effects.grid.line} 1px, 
                            transparent 1px
                        ),
                        linear-gradient(to bottom, 
                            ${HOLOGRAM_COLORS.effects.grid.line} 1px, 
                            transparent 1px
                        )
                    `,
					backgroundSize: "20px 20px",
					opacity: 0.3,
				}}
			/>

			<div className="w-1/4 h-full relative">
				<motion.div
					className="w-full h-full"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					<GlitchAvatar />
				</motion.div>

				{/* Avatar section glow */}
				<motion.div
					className="absolute inset-0 pointer-events-none"
					style={{
						background: `radial-gradient(circle at center,
                            ${HOLOGRAM_COLORS.glow.weak},
                            transparent 70%
                        )`,
					}}
					animate={hologramAnimations.glow.animate}
					transition={hologramAnimations.glow.transition}
				/>
			</div>

			<div className="w-3/4 flex items-center relative">
				<svg
					width="100%"
					height="100%"
					viewBox="0 0 400 100"
					preserveAspectRatio="xMidYMid meet"
				>
					<defs>
						<linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
							<stop
								offset="0%"
								stopColor={HOLOGRAM_COLORS.sphere.gradient.start}
								stopOpacity="0.8"
							/>
							<stop
								offset="100%"
								stopColor={HOLOGRAM_COLORS.sphere.gradient.end}
								stopOpacity="0.3"
							/>
						</linearGradient>
					</defs>

					<path
						d={generateWavePath()}
						fill="url(#waveGradient)"
						style={{
							filter: `drop-shadow(0 0 8px ${HOLOGRAM_COLORS.glow.weak})`,
						}}
					/>

					<motion.g
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.6 }}
						transition={{ duration: 0.5 }}
					>
						{[...Array(3)].map((_, i) => (
							<path
								key={i}
								d={generateWavePath()}
								fill="none"
								stroke={HOLOGRAM_COLORS.text.secondary}
								strokeWidth="0.5"
								strokeOpacity={0.3 - i * 0.1}
								transform={`translate(0, ${i * 5})`}
							/>
						))}
					</motion.g>
				</svg>

				{/* Wave section glow */}
				<motion.div
					className="absolute inset-0 pointer-events-none"
					style={{
						background: `linear-gradient(90deg,
                            transparent,
                            ${HOLOGRAM_COLORS.effects.glitch.overlay},
                            transparent
                        )`,
					}}
					animate={hologramAnimations.pulse.animate}
					transition={hologramAnimations.pulse.transition}
				/>
			</div>
		</motion.div>
	);
};
