import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback, useMemo } from "react";

interface TiltProps {
	children: React.ReactNode;
}
const TiltContainer = ({ children }: TiltProps) => {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const springConfig = useMemo(
		() => ({
			damping: 20,
			stiffness: 150,
			mass: 0.5,
		}),
		[],
	);

	const rotateX = useSpring(
		useTransform(mouseY, [-0.5, 0.5], [3, -3]),
		springConfig,
	);
	const rotateY = useSpring(
		useTransform(mouseX, [-0.5, 0.5], [-3, 3]),
		springConfig,
	);

	const normalizeValue = useCallback((value: number) => {
		const sign = Math.sign(value);
		const absValue = Math.abs(value);
		return sign * absValue ** 1.5;
	}, []);

	const handleMouseMove = useCallback(
		(e: {
			currentTarget: { getBoundingClientRect: () => any };
			clientX: number;
			clientY: number;
		}) => {
			const rect = e.currentTarget.getBoundingClientRect();

			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;
			const mouseXFromCenter = e.clientX - centerX;
			const mouseYFromCenter = e.clientY - centerY;

			const mouseXVal = mouseXFromCenter / (rect.width / 2);
			const mouseYVal = mouseYFromCenter / (rect.height / 2);

			mouseX.set(normalizeValue(mouseXVal));
			mouseY.set(normalizeValue(mouseYVal));
		},
		[mouseX, mouseY, normalizeValue],
	);

	const handleMouseLeave = useCallback(() => {
		mouseX.set(0, true);
		mouseY.set(0, true);
	}, [mouseX, mouseY]);

	const containerStyle = useMemo(
		() => ({
			perspective: 500,
			rotateX,
			rotateY,
			transformStyle: "preserve-3d",
		}),
		[rotateX, rotateY],
	);

	const contentStyle = useMemo(
		() => ({
			scale: 1.0,
			transformStyle: "preserve-3d",
		}),
		[],
	);

	return (
		<div className="fixed inset-0 w-screen h-screen overflow-hidden cursor-none">
			{/* Main content with lower z-index */}
			<div
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				className="relative w-full h-full bg-transparent z-0"
			>
				<motion.div
					style={containerStyle}
					className="w-full h-full bg-transparent rounded-md cursor-none"
				>
					<motion.div
						style={contentStyle}
						className="w-full h-full origin-center"
					>
						{children}
					</motion.div>
				</motion.div>
			</div>

			{/* Border overlay with highest z-index */}
			<div
				className="fixed inset-0 pointer-events-none"
				style={{ zIndex: 9996 }}
			>
				<div className="w-full h-full border-[50px] border-white" />
			</div>
		</div>
	);
};

export default TiltContainer;
