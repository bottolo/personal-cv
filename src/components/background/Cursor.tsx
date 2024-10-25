import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CursorProps {
	defaultColor?: string;
	size?: number;
	thickness?: number;
	lineThickness?: number;
}
export function Cursor({
	defaultColor = "white",
	size = 40,
	thickness = 2,
	lineThickness = 1.5,
}: CursorProps) {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [currentColor, setCurrentColor] = useState(defaultColor);

	useEffect(() => {
		const updatePosition = (e: { clientX: number; clientY: number }) => {
			setPosition({ x: e.clientX, y: e.clientY });

			const element = document.elementFromPoint(e.clientX, e.clientY);
			if (element) {
				const elementColor = element.getAttribute("data-cursor-color");
				setCurrentColor(elementColor || defaultColor);
			}
		};

		window.addEventListener("mousemove", updatePosition);

		return () => {
			window.removeEventListener("mousemove", updatePosition);
		};
	}, [defaultColor]);

	return (
		<motion.div className="fixed inset-0 pointer-events-none z-[9998]">
			{/* Horizontal line */}
			<div
				className="absolute w-full"
				style={{
					top: `${position.y}px`,
					height: `${lineThickness}px`,
					backgroundColor: currentColor,
				}}
			/>

			{/* Vertical line */}
			<div
				className="absolute h-full"
				style={{
					left: `${position.x}px`,
					width: `${lineThickness}px`,
					backgroundColor: currentColor,
				}}
			/>

			{/* Hollow square cursor */}
			<div
				className={"absolute"}
				style={{
					left: `${position.x - size / 2 + 20.5}px`,
					top: `${position.y - size / 2 + 20.5}px`,
					width: `${size}px`,
					height: `${size}px`,
					border: `${thickness}px solid ${currentColor}`,
					transform: "translate(-50%, -50%)",
				}}
			/>
		</motion.div>
	);
}
