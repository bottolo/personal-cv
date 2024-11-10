import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { COLORS } from "../../global-utils/colors.ts";

export const BootSequence = ({ onBootComplete }) => {
	const [bootPhase, setBootPhase] = useState(0);
	const bootMessages = [
		"initializing",
		"reaching bottolo",
		"loading",
		"locating possibilities",
		"ready",
	];

	const startBoot = () => {
		let phase = 0;
		const interval = setInterval(() => {
			if (phase < bootMessages.length - 1) {
				phase += 1;
				setBootPhase(phase);
			} else {
				clearInterval(interval);
				setTimeout(() => {
					onBootComplete();
				}, 1000);
			}
		}, 800);
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black z-[9999999]">
			<div className="text-center">
				{bootPhase === 0 ? (
					<motion.button
						onClick={startBoot}
						className="relative px-8 py-4 rounded-lg overflow-hidden"
						whileHover={{ scale: 1.05 }}
						style={{
							backgroundColor: COLORS.bg.surface,
							border: `2px solid ${COLORS.border.normal}`,
							color: COLORS.text.primary,
							boxShadow: COLORS.glow.medium,
						}}
					>
						<motion.div
							className="absolute inset-0"
							animate={{
								background: [
									`linear-gradient(to right, ${COLORS.bg.gradient.from}, ${COLORS.bg.gradient.to})`,
									`linear-gradient(to left, ${COLORS.bg.gradient.from}, ${COLORS.bg.gradient.to})`,
								],
							}}
							transition={{
								duration: 3,
								repeat: Number.POSITIVE_INFINITY,
								repeatType: "reverse",
							}}
							style={{ opacity: 0.2 }}
						/>
						<span className="relative z-10 text-xl font-bold tracking-wider">
							init
						</span>
					</motion.button>
				) : (
					<div className="space-y-4">
						<motion.div
							className="h-1 w-64 rounded-full overflow-hidden"
							style={{ backgroundColor: COLORS.bg.surface }}
						>
							<motion.div
								className="h-full"
								style={{ backgroundColor: COLORS.accent }}
								animate={{
									width: ["0%", "100%"],
								}}
								transition={{
									duration: 0.8,
									ease: "easeInOut",
								}}
							/>
						</motion.div>
						<AnimatePresence mode="wait">
							<motion.div
								key={bootPhase}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								className="font-mono"
								style={{ color: COLORS.text.primary }}
							>
								{bootMessages[bootPhase]}
							</motion.div>
						</AnimatePresence>
					</div>
				)}
			</div>
		</div>
	);
};

export default BootSequence;
