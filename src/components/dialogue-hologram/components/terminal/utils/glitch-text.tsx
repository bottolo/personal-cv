import { motion } from "framer-motion";

interface GlitchTextProps {
	text: string;
}
export const GlitchText = ({ text }: GlitchTextProps) => {
	return (
		<motion.div className="relative">
			<motion.div
				className="absolute inset-0 text-blue-400/30"
				animate={{
					x: [0, -2, 2, -1, 1, 0],
					opacity: [1, 0.8, 0.9, 0.7, 1],
				}}
				transition={{
					duration: 0.2,
					delay: 0.1,
				}}
			>
				{text}
			</motion.div>
			<motion.div
				className="absolute inset-0 text-red-400/30"
				animate={{
					x: [0, 2, -2, 1, -1, 0],
					opacity: [1, 0.7, 0.9, 0.8, 1],
				}}
				transition={{
					duration: 0.2,
					delay: 0.1,
				}}
			>
				{text}
			</motion.div>
			<span className="relative z-10">{text}</span>
		</motion.div>
	);
};
