import { motion } from "framer-motion";
import { memo, useMemo, useState } from "react";
import { generateRandomInRange } from "../../../../utils/generate-random-in-range.ts";
import { ShapeComponent } from "./shapes/shapes.tsx";

interface AnimatedBackgroundProps {
	sphereCount?: number;
	planesCount?: number;
	minSize?: number;
	maxSize?: number;
	minDuration?: number;
	maxDuration?: number;
	baseColor?: string;
	minOpacity?: number;
	maxOpacity?: number;
}

const AnimatedGeometryBase = ({
	sphereCount = 15,
	planesCount = 15,
	minSize = 50,
	maxSize = 200,
	minDuration = 10,
	maxDuration = 30,
	baseColor = "255, 255, 255",
	minOpacity = 0.05,
	maxOpacity = 0.15,
}: AnimatedBackgroundProps) => {
	const [isHovered, setIsHovered] = useState(false);

	const shapes = useMemo(() => {
		const generateShapes = (count: number, type: "sphere" | "cube") => {
			const sizes = Array.from({ length: count }, () =>
				generateRandomInRange(minSize, maxSize),
			);

			const minSizeGenerated = Math.min(...sizes);
			const maxSizeGenerated = Math.max(...sizes);
			const sizeRange = maxSizeGenerated - minSizeGenerated;

			return sizes.map((size, i) => {
				const depth = ((size - minSizeGenerated) / sizeRange) * 0.8 + 0.2;
				const baseShape = {
					id: type === "sphere" ? i : i + sphereCount,
					type,
					size,
					initialX: generateRandomInRange(0, 100),
					initialY: generateRandomInRange(0, 100),
					moveX: generateRandomInRange(-100, 100) * (1.5 - depth),
					moveY: generateRandomInRange(-100, 100) * (1.5 - depth),
					duration: generateRandomInRange(minDuration, maxDuration) / depth,
					delay: generateRandomInRange(0, 2),
					scale: depth,
					depth,
					rotationSpeed: generateRandomInRange(0, 360) * (1.5 - depth),
					color: `rgba(${baseColor}, ${
						generateRandomInRange(minOpacity, maxOpacity) * depth
					})`,
				};

				if (type === "cube") {
					return {
						...baseShape,
						rotateX: generateRandomInRange(0, 360),
						rotateY: generateRandomInRange(0, 360),
						rotateZ: generateRandomInRange(0, 360),
					};
				}

				return baseShape;
			});
		};

		const allShapes = [
			...generateShapes(sphereCount, "sphere"),
			...generateShapes(planesCount, "cube"),
		];

		return allShapes.sort((a, b) => a.depth - b.depth);
	}, [
		sphereCount,
		planesCount,
		minSize,
		maxSize,
		minDuration,
		maxDuration,
		baseColor,
		minOpacity,
		maxOpacity,
	]);

	return (
		<div
			className="fixed inset-0 overflow-hidden bg-gradient-to-br from-blue-900 to-purple-900 h-screen w-screen z-[-1]"
			style={{ perspective: "1000px" }}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{shapes.map((shape) => (
				<ShapeComponent key={shape.id} shape={shape} isHovered={isHovered} />
			))}

			<motion.div
				className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/50"
				animate={{
					opacity: isHovered ? 0.7 : 0.5,
				}}
				transition={{ duration: 0.3 }}
			/>
		</div>
	);
};

export const AnimatedGeometry = memo(AnimatedGeometryBase);
