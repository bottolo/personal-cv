import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HOLOGRAM_COLORS } from "../../../global-utils/colors.ts";
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
		<div
			className="w-full flex border-b border-white/10 relative"
			style={{
				backgroundColor: HOLOGRAM_COLORS.bg.surface,
			}}
		>
			<div className="w-1/4 h-full">
				<GlitchAvatar />
			</div>

			<div className="w-3/4 flex items-center">
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
								stopOpacity="0.6"
							/>
							<stop
								offset="100%"
								stopColor={HOLOGRAM_COLORS.sphere.gradient.end}
								stopOpacity="0.2"
							/>
						</linearGradient>
					</defs>

					<path d={generateWavePath()} fill="url(#waveGradient)" />

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
			</div>
		</div>
	);
};
