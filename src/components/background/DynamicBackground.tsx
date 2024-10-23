import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";

const DynamicBackground = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [elements, setElements] = useState([]);
	const [time, setTime] = useState(0);

	// Memoize element generation
	const generateElements = useCallback(() => {
		const numberOfElements = Math.floor(
			(window.innerWidth * window.innerHeight) / 7000,
		);
		return Array.from({ length: numberOfElements }, (_, i) => ({
			id: i,
			x: Math.random() * window.innerWidth,
			y: Math.random() * window.innerHeight,
			width: Math.random() * 3 + 1,
			height: Math.random() * 30 + 10,
			baseOpacity: Math.random() * 0.3 + 0.1,
			animationOffset: Math.random() * 2 * Math.PI,
			animationSpeed: Math.random() * 0.3 + 0.5,
			amplitude: Math.random() * 10 + 5,
		}));
	}, []);

	// Initialize elements
	useEffect(() => {
		return setElements(generateElements());
	}, [generateElements]);

	// Optimized mouse move handler with throttling
	const handleMouseMove = useCallback((e) => {
		requestAnimationFrame(() => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		});
	}, []);

	// Optimized animation loop using requestAnimationFrame
	useEffect(() => {
		let frameId: number;
		let lastTime = performance.now();

		const animate = (currentTime: number) => {
			const deltaTime = (currentTime - lastTime) / 1000;
			lastTime = currentTime;

			setTime((prevTime) => prevTime + deltaTime * 2);
			frameId = requestAnimationFrame(animate);
		};

		frameId = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(frameId);
	}, []);

	// Memoize maxDistance calculation
	const maxDistance = useMemo(() => 300, []);

	return (
		<motion.div
			className="fixed inset-0 overflow-hidden bg-black pointer-events-none blur-sm"
			onMouseMove={handleMouseMove}
		>
			{elements.map((element) => {
				// Optimized calculations
				const animY =
					Math.sin(time * element.animationSpeed + element.animationOffset) *
					element.amplitude;
				const animX =
					Math.cos(
						time * element.animationSpeed * 0.5 + element.animationOffset,
					) *
					(element.amplitude * 0.5);

				const deltaX = mousePosition.x - element.x;
				const deltaY = mousePosition.y - element.y;
				const distance = Math.hypot(deltaX, deltaY);

				const influence = Math.max(0, 1 - distance / maxDistance);
				const luminance = Math.min(1, element.baseOpacity + influence * 0.6);

				const moveRange = 15;
				const xOffset =
					(deltaX / (distance || 1)) * influence * moveRange + animX;
				const yOffset =
					(deltaY / (distance || 1)) * influence * moveRange + animY;

				// Use transform instead of x/y position for better performance
				const transform = `translate3d(${element.x + xOffset}px, ${element.y + yOffset}px, 0)`;

				return (
					<motion.div
						key={element.id}
						className="absolute will-change-transform"
						initial={{
							width: element.width,
							height: element.height,
						}}
						style={{
							transform,
							width: element.width,
							height: element.height * (1 + influence * 0.3),
							filter: influence > 0.1 ? `blur(${0.5 + influence}px)` : "none",
							backgroundColor: `rgba(30, 100, 255, ${luminance})`,
							boxShadow:
								influence > 0.5
									? `0 0 ${influence * 10}px rgba(30, 100, 255, ${influence * 0.3})`
									: "none",
						}}
					/>
				);
			})}
		</motion.div>
	);
};

export default DynamicBackground;
