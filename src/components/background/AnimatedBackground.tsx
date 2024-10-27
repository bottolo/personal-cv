import { motion } from "framer-motion";
import { memo, useCallback, useMemo, useState } from "react";

const generateRandomInRange = (min: number, max: number): number => {
	return Math.random() * (max - min) + min;
};

interface Shape {
	id: number;
	type: "sphere" | "cube";
	size: number;
	initialX: number;
	initialY: number;
	duration: number;
	delay: number;
	color: string;
	scale: number;
	rotationSpeed: number;
	moveX: number;
	moveY: number;
	depth: number;
	rotateX?: number;
	rotateY?: number;
	rotateZ?: number;
}

interface AnimatedBackgroundProps {
	sphereCount?: number;
	cubeCount?: number;
	minSize?: number;
	maxSize?: number;
	minDuration?: number;
	maxDuration?: number;
	baseColor?: string;
	minOpacity?: number;
	maxOpacity?: number;
	depthLayers?: number;
}

// Memoize CubeComponent since it's purely dependent on its props
const CubeComponent = memo(
	({
		size,
		color,
		depth,
	}: {
		size: number;
		color: string;
		depth: number;
	}) => {
		// Memoize faces array since it only depends on size
		const faces = useMemo(
			() => [
				{ transform: `translateZ(${size / 2}px)` },
				{ transform: `translateZ(${-size / 2}px) rotateY(180deg)` },
				{ transform: `translateX(${-size / 2}px) rotateY(-90deg)` },
				{ transform: `translateX(${size / 2}px) rotateY(90deg)` },
				{ transform: `translateY(${-size / 2}px) rotateX(90deg)` },
				{ transform: `translateY(${size / 2}px) rotateX(-90deg)` },
			],
			[size],
		);

		return (
			<div
				className="preserve-3d"
				style={{
					width: size,
					height: size,
					position: "relative",
					transformStyle: "preserve-3d",
				}}
			>
				{faces.map((face, index) => (
					<div
						key={index}
						className="absolute inset-0"
						style={{
							...face,
							background: `linear-gradient(135deg, 
              rgba(255, 255, 255, ${0.2 * depth}), 
              ${color}, 
              rgba(0, 0, 0, ${0.3 * depth}))`,
							boxShadow: `inset 0 0 ${15 * depth}px rgba(255, 255, 255, ${
								0.3 * depth
							})`,
							backfaceVisibility: "hidden",
						}}
					/>
				))}
			</div>
		);
	},
);

// Memoize movement variants creation
const createMoveVariants = (shape: Shape) => ({
	animate: {
		x: [0, shape.moveX, 0],
		y: [0, shape.moveY, 0],
		scale: [1, shape.scale * 1.1, 1],
		...(shape.type === "cube"
			? {
					rotateX: [shape.rotateX, shape.rotateX! + 360, shape.rotateX],
					rotateY: [shape.rotateY, shape.rotateY! + 360, shape.rotateY],
					rotateZ: [shape.rotateZ, shape.rotateZ! + 360, shape.rotateZ],
				}
			: {
					rotate: [0, shape.rotationSpeed, 0],
				}),
		transition: {
			duration: shape.duration,
			repeat: Number.POSITIVE_INFINITY,
			ease: shape.type === "cube" ? "linear" : "easeInOut",
			delay: shape.delay,
			...(shape.type === "cube" && {
				rotateX: {
					duration: shape.duration * 4,
					repeat: Number.POSITIVE_INFINITY,
					ease: "linear",
				},
				rotateY: {
					duration: shape.duration * 5,
					repeat: Number.POSITIVE_INFINITY,
					ease: "linear",
				},
				rotateZ: {
					duration: shape.duration * 6,
					repeat: Number.POSITIVE_INFINITY,
					ease: "linear",
				},
			}),
		},
	},
});

const ShapeComponent = memo(
	({
		shape,
		isHovered,
		createSphereStyle,
	}: {
		shape: Shape;
		isHovered: boolean;
		createSphereStyle: (shape: Shape) => any;
	}) => {
		// Move variants calculation inside component and memoize the result
		const moveVariants = useMemo(() => createMoveVariants(shape), [shape]);

		return (
			<motion.div
				key={shape.id}
				variants={moveVariants}
				animate="animate"
				whileHover={{ scale: isHovered ? 1.1 : 1 }}
				className={`absolute ${shape.type === "sphere" ? "rounded-full" : ""}`}
				style={
					shape.type === "sphere"
						? createSphereStyle(shape)
						: {
								left: `${shape.initialX}%`,
								top: `${shape.initialY}%`,
								transform: "translate(-50%, -50%)",
								transformStyle: "preserve-3d",
								filter: `blur(${(1 - shape.depth) * 4}px)`,
								zIndex: Math.floor(shape.depth * 10),
							}
				}
			>
				{shape.type === "cube" && (
					<CubeComponent
						size={shape.size}
						color={shape.color}
						depth={shape.depth}
					/>
				)}
			</motion.div>
		);
	},
);

// Main component with memoization
const AnimatedBackgroundBase = ({
	sphereCount = 15,
	cubeCount = 15,
	minSize = 50,
	maxSize = 200,
	minDuration = 10,
	maxDuration = 30,
	baseColor = "255, 255, 255",
	minOpacity = 0.05,
	maxOpacity = 0.15,
	depthLayers = 3,
}: AnimatedBackgroundProps) => {
	const [isHovered, setIsHovered] = useState(false);

	const createSphereStyle = useCallback(
		(shape: Shape) => ({
			width: shape.size,
			height: shape.size,
			left: `${shape.initialX}%`,
			top: `${shape.initialY}%`,
			transform: "translate(-50%, -50%)",
			background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, ${
				0.1 * shape.depth
			}), ${shape.color})`,
			boxShadow: `
        inset -10px -10px 20px rgba(0, 0, 0, ${0.2 * shape.depth}),
        inset 5px 5px 15px rgba(255, 255, 255, ${0.2 * shape.depth}),
        0 0 ${20 * shape.depth}px ${shape.color}
      `,
			filter: `blur(${(1 - shape.depth) * 4}px)`,
			zIndex: Math.floor(shape.depth * 10),
		}),
		[],
	);

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
			...generateShapes(cubeCount, "cube"),
		];

		return allShapes.sort((a, b) => a.depth - b.depth);
	}, [
		sphereCount,
		cubeCount,
		minSize,
		maxSize,
		minDuration,
		maxDuration,
		baseColor,
		minOpacity,
		maxOpacity,
		depthLayers,
	]);

	return (
		<div
			className="fixed inset-0 overflow-hidden bg-gradient-to-br from-blue-900 to-purple-900 h-screen w-screen z-[-1]"
			style={{ perspective: "1000px" }}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{shapes.map((shape) => (
				<ShapeComponent
					key={shape.id}
					shape={shape}
					isHovered={isHovered}
					createSphereStyle={createSphereStyle}
				/>
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

// Export memoized version
export const AnimatedBackground = memo(AnimatedBackgroundBase);
