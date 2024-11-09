import { type MotionStyle, type Variants, motion } from "framer-motion";
import { memo, useCallback, useEffect, useRef, useState } from "react";

interface GlitchOffset {
	x: number;
	y: number;
	opacity: number;
}

const GlitchAvatar = () => {
	const image = `${import.meta.env.BASE_URL}avatar.png`;
	const [glitch, setGlitch] = useState<GlitchOffset>({
		x: 0,
		y: 0,
		opacity: 0.5,
	});
	const glitchIntervalRef = useRef<number>();
	const [scanlineOffset, setScanlineOffset] = useState(0);
	const scanlineAnimationRef = useRef<number>();

	const resetGlitch = useCallback(() => {
		setGlitch({ x: 0, y: 0, opacity: 0.5 });
	}, []);

	const triggerGlitch = useCallback(() => {
		const shouldGlitch = Math.random() < 0.3;

		if (shouldGlitch) {
			setGlitch({
				x: (Math.random() - 0.5) * 10,
				y: (Math.random() - 0.5) * 10,
				opacity: 0.6 + Math.random() * 0.2,
			});

			setTimeout(resetGlitch, 50 + Math.random() * 150);
		}
	}, [resetGlitch]);

	useEffect(() => {
		glitchIntervalRef.current = window.setInterval(triggerGlitch, 2000);
		return () => {
			if (glitchIntervalRef.current) {
				clearInterval(glitchIntervalRef.current);
			}
		};
	}, [triggerGlitch]);

	const animateScanlines = useCallback(() => {
		setScanlineOffset((prev) => (prev + 1) % 8);
		scanlineAnimationRef.current = requestAnimationFrame(animateScanlines);
	}, []);

	useEffect(() => {
		scanlineAnimationRef.current = requestAnimationFrame(animateScanlines);
		return () => {
			if (scanlineAnimationRef.current) {
				cancelAnimationFrame(scanlineAnimationRef.current);
			}
		};
	}, [animateScanlines]);

	const mainImageVariants: Variants = {
		initial: {
			opacity: 0,
			scale: 0.8,
		},
		animate: {
			opacity: glitch.opacity,
			scale: 1.9,
			x: glitch.x,
			y: glitch.y,
		},
	};

	const glitch1Style: MotionStyle = {
		opacity: glitch.x !== 0 ? 0.3 : 0,
		filter: "hue-rotate(90deg)",
		transform: `translate(${glitch.x * 1.5}px, ${glitch.y * 1.5}px) scale(1.9)`,
		mixBlendMode: "exclusion" as const,
	};

	const glitch2Style: MotionStyle = {
		opacity: glitch.x !== 0 ? 0.3 : 0,
		filter: "hue-rotate(-90deg)",
		transform: `translate(${-glitch.x}px, ${-glitch.y}px) scale(1.9)`,
		mixBlendMode: "exclusion" as const,
	};

	const scanlineStyle = {
		background: `
            linear-gradient(
                to bottom,
                rgba(255, 255, 255, 0) 50%,
                rgba(0, 0, 0, 0.25) 50%
            ),
            linear-gradient(
                90deg,
                rgba(255, 0, 0, 0.06),
                rgba(0, 255, 0, 0.02),
                rgba(0, 0, 255, 0.06)
            )
        `,
		backgroundSize: "100% 4px, 100% 100%",
		transform: `translateY(${scanlineOffset}px)`,
		mixBlendMode: "overlay" as const,
	};

	const additionalScanlineStyle = {
		backgroundImage: `
            repeating-linear-gradient(
                0deg,
                rgba(0, 0, 0, 0.15),
                rgba(0, 0, 0, 0.15) 1px,
                transparent 1px,
                transparent 4px
            )
        `,
		transform: `translateY(${-scanlineOffset}px)`,
		mixBlendMode: "overlay" as const,
	};

	return (
		<div className="relative w-full h-full flex items-center overflow-hidden">
			{/* Main image */}
			<motion.img
				src={image}
				alt="Avatar"
				className="h-full w-full object-cover relative z-10"
				variants={mainImageVariants}
				initial="animate"
				animate="animate"
				transition={{ duration: 0.5 }}
			/>

			{/* Glitch effects */}
			<motion.img
				src={image}
				alt="Glitch 1"
				className="absolute inset-0 object-cover"
				style={glitch1Style}
			/>
			<motion.img
				src={image}
				alt="Glitch 2"
				className="absolute inset-0 object-cover"
				style={glitch2Style}
			/>

			{/* CRT and Scanline effects */}
			<div
				className="absolute inset-0 pointer-events-none z-20"
				style={scanlineStyle}
			/>

			{/* Additional scanlines */}
			<div
				className="absolute inset-0 pointer-events-none z-20"
				style={additionalScanlineStyle}
			/>
		</div>
	);
};

export default memo(GlitchAvatar);
