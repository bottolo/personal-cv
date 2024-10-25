import {motion} from "framer-motion";
import {useMemo} from "react";

interface Sphere {
	id: number;
	size: number;
	initialX: number;
	initialY: number;
	duration: number;
	delay: number;
	color: string;
	scale: number;
	rotationSpeed: number;
}

interface DynamicBackgroundProps {
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
}: DynamicBackgroundProps) => {
	const spheres = useMemo(() => {
		return Array.from({ length: sphereCount }, (_, i) => ({
			id: i,
			size: Math.random() * (maxSize - minSize) + minSize,
			initialX: Math.random() * 100,
			initialY: Math.random() * 100,
			duration: Math.random() * (maxDuration - minDuration) + minDuration,
			delay: Math.random() * 2,
			scale: Math.random() * 0.5 + 0.5,
			rotationSpeed: Math.random() * 360,
			color: `rgba(${baseColor}, ${
				Math.random() * (maxOpacity - minOpacity) + minOpacity
			})`,
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

	const moveVariants = {
		animate: (sphere: Sphere) => ({
			x: [
				`${sphere.initialX}%`,
				`${sphere.initialX - 20}%`,
				`${sphere.initialX + 20}%`,
				`${sphere.initialX}%`,
			],
			y: [
				`${sphere.initialY}%`,
				`${sphere.initialY + 20}%`,
				`${sphere.initialY - 20}%`,
				`${sphere.initialY}%`,
			],
			scale: [
				sphere.scale,
				sphere.scale * 1.1,
				sphere.scale * 0.9,
				sphere.scale,
			],
			rotate: [0, sphere.rotationSpeed, sphere.rotationSpeed * 2, 360],
			filter: [
				"brightness(1)",
				"brightness(1.1)",
				"brightness(0.9)",
				"brightness(1)",
			],
			transition: {
				duration: sphere.duration,
				repeat: Number.POSITIVE_INFINITY,
				ease: "linear",
				delay: sphere.delay,
				times: [0, 0.33, 0.66, 1],
			},
		}),
	};

	return (
		<div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-blue-900 to-purple-900 perspective-1000 h-screen w-screen z-[-1]">
			{spheres.map((sphere) => (
				<motion.div
					key={sphere.id}
					custom={sphere}
					variants={moveVariants}
					animate="animate"
					className="absolute rounded-full"
					style={{
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
					}}
				/>
			))}
			<div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/50" />

			<div
				className="absolute inset-0 mix-blend-overlay opacity-50"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
				}}
			/>
		</div>
	);
};
