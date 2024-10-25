import { motion } from "framer-motion";
import { useCallback, useMemo } from "react";
import { generateRandomInRange } from "../../utils/generate-random-in-range.ts";
import { createMoveVariants } from "./utils/create-move-variants.ts";
import { noiseSvgUrl } from "./utils/noise.ts";
import type { Sphere } from "./utils/sphere.ts";

interface AnimatedBackgroundProps {
	sphereCount?: number;
	minSize?: number;
	maxSize?: number;
	minDuration?: number;
	maxDuration?: number;
	baseColor?: string;
	minOpacity?: number;
	maxOpacity?: number;
}

export const AnimatedBackground = ({
	sphereCount = 15,
	minSize = 50,
	maxSize = 200,
	minDuration = 10,
	maxDuration = 30,
	baseColor = "255, 255, 255",
	minOpacity = 0.05,
	maxOpacity = 0.15,
}: AnimatedBackgroundProps) => {
	const createSphereStyle = useCallback(
		(sphere: Sphere) => ({
			width: sphere.size,
			height: sphere.size,
			left: `${sphere.initialX}%`,
			top: `${sphere.initialY}%`,
			transform: "translate(-50%, -50%)",
			background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), ${sphere.color})`,
			boxShadow: `
            inset -10px -10px 20px rgba(0, 0, 0, 0.2),
            inset 5px 5px 15px rgba(255, 255, 255, 0.2),
            0 0 20px ${sphere.color}
        `,
			zIndex: Math.floor(sphere.scale * 10),
		}),
		[],
	);

	const spheres = useMemo(() => {
		return Array.from({ length: sphereCount }, (_, i) => ({
			id: i,
			size: generateRandomInRange(minSize, maxSize),
			initialX: generateRandomInRange(0, 100),
			initialY: generateRandomInRange(0, 100),
			duration: generateRandomInRange(minDuration, maxDuration),
			delay: generateRandomInRange(0, 2),
			scale: generateRandomInRange(0.5, 1),
			rotationSpeed: generateRandomInRange(0, 360),
			color: `rgba(${baseColor}, ${generateRandomInRange(minOpacity, maxOpacity)})`,
		}));
	}, [
		sphereCount,
		minSize,
		maxSize,
		minDuration,
		maxDuration,
		baseColor,
		minOpacity,
		maxOpacity,
	]);

	const moveVariants = useMemo(() => createMoveVariants(), []);

	return (
		<div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-blue-900 to-purple-900 perspective-1000 h-screen w-screen z-[-1]">
			{spheres.map((sphere) => (
				<motion.div
					key={sphere.id}
					custom={sphere}
					variants={moveVariants}
					animate="animate"
					className="absolute rounded-full"
					style={createSphereStyle(sphere)}
				/>
			))}
			<div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/50" />
			<div
				className="absolute inset-0 mix-blend-overlay opacity-50"
				style={{ backgroundImage: `url("${noiseSvgUrl}")` }}
			/>
		</div>
	);
};
