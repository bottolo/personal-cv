import { motion } from "framer-motion";

interface GlitchContainerProps {
	children: React.ReactNode;
}
export const GlitchContainer = ({ children }: GlitchContainerProps) => {
	return (
		<motion.div
			className="relative"
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={{
				hidden: {
					opacity: 0,
					y: 20,
					scale: 0.95,
				},
				visible: {
					opacity: 1,
					y: 0,
					scale: 1,
					transition: {
						duration: 0.5,
						ease: "easeOut",
					},
				},
				exit: {
					opacity: 0,
					y: -20,
					scale: 0.95,
					transition: {
						duration: 0.3,
						ease: "easeIn",
					},
				},
			}}
		>
			<motion.div
				className="absolute inset-0 bg-blue-500/30"
				animate={{
					x: [0, -8, 4, -2, 0],
					opacity: [0, 0.5, 0.3, 0.7, 0],
				}}
				transition={{
					duration: 0.5,
					times: [0, 0.2, 0.4, 0.6, 1],
				}}
			/>
			<motion.div
				className="absolute inset-0 bg-red-500/30"
				animate={{
					x: [0, 8, -4, 2, 0],
					opacity: [0, 0.5, 0.3, 0.7, 0],
				}}
				transition={{
					duration: 0.5,
					times: [0, 0.2, 0.4, 0.6, 1],
				}}
			/>
			{children}
		</motion.div>
	);
};
