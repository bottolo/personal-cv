import { motion } from "framer-motion";
import { memo } from "react";
import { COLORS } from "../../global-utils/colors";

const GlowingSphere = memo(() => (
	<svg viewBox="0 0 200 200" className="w-48 h-48">
		{/* Glowing effect - outer */}
		<motion.circle
			cx="100"
			cy="100"
			r="80"
			fill="none"
			stroke={COLORS.palette.blue.primary}
			strokeWidth="1"
			style={{
				filter: "blur(4px)",
			}}
			animate={{
				opacity: [0.3, 0.6, 0.3],
			}}
			transition={{
				duration: 2,
				repeat: Number.POSITIVE_INFINITY,
				ease: "easeInOut",
			}}
		/>

		{/* Main sphere outline */}
		<circle
			cx="100"
			cy="100"
			r="70"
			fill="none"
			stroke={COLORS.palette.blue.primary}
			strokeWidth="2"
		/>

		{/* Filling effect */}
		<motion.circle
			cx="100"
			cy="100"
			r="0"
			fill={COLORS.palette.blue.primary}
			initial={{ r: 0 }}
			animate={{ r: 68 }}
			transition={{
				duration: 3,
				ease: "easeInOut",
			}}
			style={{
				opacity: 0.3,
			}}
		/>

		{/* Inner glow */}
		<motion.circle
			cx="100"
			cy="100"
			r="65"
			fill="none"
			stroke={COLORS.effects.glitch.overlay}
			strokeWidth="4"
			style={{
				filter: "blur(8px)",
			}}
			animate={{
				opacity: [0.1, 0.3, 0.1],
			}}
			transition={{
				duration: 1.5,
				repeat: Number.POSITIVE_INFINITY,
				ease: "easeInOut",
			}}
		/>
	</svg>
));

GlowingSphere.displayName = "GlowingSphere";

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
			<TypewriterText text="bottolocv-0.1" />
			<GlowingSphere />
		</motion.div>
	);
};

export default memo(LoadingScreen);
