import { motion } from "framer-motion";
import { memo } from "react";
import { COLORS } from "../../global-utils/colors";

const RadarRings = memo(() => (
	<div className="relative w-48 h-48 flex items-center justify-center">
		{[...Array(5)].map((_, i) => (
			<motion.div
				key={i}
				className="absolute rounded-full"
				style={{
					border: `2px solid ${COLORS.palette.blue.primary}`,
					boxShadow: `0 0 20px ${COLORS.effects.glitch.overlay}`,
					background: `radial-gradient(circle, ${COLORS.palette.blue.primary}20 0%, transparent 70%)`,
				}}
				initial={{ width: 50, height: 50, opacity: 0.8, scale: 0 }}
				animate={{
					width: [50, 200],
					height: [50, 200],
					opacity: [0.8, 0],
					scale: [1, 2],
				}}
				transition={{
					duration: 1.5,
					delay: i * 0.2,
					ease: "linear",
					repeat: Number.POSITIVE_INFINITY,
				}}
			/>
		))}
	</div>
));

RadarRings.displayName = "RadarRings";

const TypewriterText = memo(({ text }: { text: string }) => (
	<motion.div
		className="text-blue-400/80 text-lg font-mono"
		animate={{ opacity: [0.4, 0.8, 0.4] }}
		transition={{
			duration: 0.5,
			repeat: Number.POSITIVE_INFINITY,
			ease: "easeInOut",
		}}
	>
		{text}
	</motion.div>
));

TypewriterText.displayName = "TypewriterText";

const LoadingScreen = () => {
	return (
		<motion.div
			className="absolute inset-0 z-30 bg-black/100 flex flex-col items-center justify-center gap-8"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{
				opacity: 0,
				transition: {
					duration: 0.3,
					ease: "easeInOut",
				},
			}}
			transition={{
				duration: 0.25,
				ease: "easeIn",
			}}
		>
			<TypewriterText text="bottolo-cv | v0.1" />
			<RadarRings />
		</motion.div>
	);
};

export default memo(LoadingScreen);
