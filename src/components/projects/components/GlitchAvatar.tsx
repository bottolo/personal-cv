import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface GlitchOffset {
	x: number;
	y: number;
	opacity: number;
}

export const GlitchAvatar = () => {
	const [glitch, setGlitch] = useState<GlitchOffset>({
		x: 0,
		y: 0,
		opacity: 0.7,
	});
	const glitchIntervalRef = useRef<NodeJS.Timeout>();
	const [scanlineOffset, setScanlineOffset] = useState(0);
	const scanlineAnimationRef = useRef<number>();

	useEffect(() => {
		const triggerGlitch = () => {
			const shouldGlitch = Math.random() < 0.3;

			if (shouldGlitch) {
				setGlitch({
					x: (Math.random() - 0.5) * 10,
					y: (Math.random() - 0.5) * 10,
					opacity: 0.8 + Math.random() * 0.2,
				});

				setTimeout(
					() => {
						setGlitch({ x: 0, y: 0, opacity: 1 });
					},
					50 + Math.random() * 150,
				);
			}
		};

		glitchIntervalRef.current = setInterval(triggerGlitch, 2000);

		return () => {
			if (glitchIntervalRef.current) {
				clearInterval(glitchIntervalRef.current);
			}
		};
	}, []);

	useEffect(() => {
		const animateScanlines = () => {
			setScanlineOffset((prev) => (prev + 1) % 8);
			scanlineAnimationRef.current = requestAnimationFrame(animateScanlines);
		};

		scanlineAnimationRef.current = requestAnimationFrame(animateScanlines);

		return () => {
			if (scanlineAnimationRef.current) {
				cancelAnimationFrame(scanlineAnimationRef.current);
			}
		};
	}, []);

	return (
		<div className="relative w-full h-full flex items-center overflow-hidden">
			{/* Main image */}
			<motion.img
				src="/avatar-sopipet-0.png"
				alt="Avatar"
				className="h-full w-full object-contain relative z-10"
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{
					opacity: glitch.opacity,
					scale: 1,
					x: glitch.x,
					y: glitch.y,
				}}
				transition={{ duration: 0.5 }}
			/>

			{/* Glitch effects */}
			<motion.img
				src="/avatar-sopipet-0.png"
				alt="Glitch 1"
				className="absolute inset-0 object-contain"
				style={{
					opacity: glitch.x !== 0 ? 0.3 : 0,
					filter: "hue-rotate(90deg)",
					transform: `translate(${glitch.x * 1.5}px, ${glitch.y * 1.5}px)`,
					mixBlendMode: "exclusion",
				}}
			/>
			<motion.img
				src="/avatar-sopipet-0.png"
				alt="Glitch 2"
				className="absolute inset-0 object-contain"
				style={{
					opacity: glitch.x !== 0 ? 0.3 : 0,
					filter: "hue-rotate(-90deg)",
					transform: `translate(${-glitch.x}px, ${-glitch.y}px)`,
					mixBlendMode: "exclusion",
				}}
			/>

			{/* CRT and Scanline effects */}
			<div
				className="absolute inset-0 pointer-events-none z-20"
				style={{
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
					mixBlendMode: "overlay",
				}}
			/>

			{/* Additional scanlines for more visibility */}
			<div
				className="absolute inset-0 pointer-events-none z-20"
				style={{
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
					mixBlendMode: "overlay",
				}}
			/>
		</div>
	);
};
