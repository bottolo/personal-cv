import { AnimatePresence, motion } from "framer-motion";
import { NoiseEffect } from "../../../utils/Noise.tsx";
import { AsciiBox } from "../../3d-models/SpinningCube.tsx";
import type { Dialogue } from "../types/dialogue-types.ts";
import { HolographicAvatar } from "./components/Avatar.tsx";
import Terminal from "./components/Terminal.tsx";

interface DialogueHologramProps {
	dialogue: Dialogue;
	className?: string;
}

const floatingAnimation = {
	animate: {
		x: [0, 8, 0],
		y: [0, -8, 0],
		transition: {
			duration: Number.POSITIVE_INFINITY,
			repeat: Number.POSITIVE_INFINITY,
			ease: "easeInOut",
		},
	},
};

const glowingAnimation = {
	animate: {
		opacity: [0.7, 0.9, 0.7],
		transition: {
			duration: 2,
			repeat: Number.POSITIVE_INFINITY,
			ease: "easeInOut",
		},
	},
};

export const Hologram = ({ className = "" }: DialogueHologramProps) => {
	return (
		<div className={`relative flex flex-col items-center ${className}`}>
			<div className="w-[600px]">
				{" "}
				{/* Fixed width container */}
				{/* Avatar Section */}
				<motion.div
					variants={floatingAnimation}
					animate="animate"
					className="relative z-20 flex items-center gap-8"
				>
					{/* Background with glow effect */}
					<motion.div
						variants={glowingAnimation}
						animate="animate"
						className="absolute inset-[-0.5rem] rounded-none border border-white/20 bg-white/10 backdrop-blur-lg -z-10 shadow-lg shadow-blue-500/20"
						style={{
							transform: "scale(1.1)",
						}}
					>
						<NoiseEffect opacity={0.02} />
					</motion.div>

					{/* Avatar container with fixed width */}
					<div className="w-[300px] flex-shrink-0">
						<HolographicAvatar imageUrl={"/avatar-sopipet-0.png"} size={300} />
					</div>

					{/* Canvas container with fixed width */}
					<div className="w-[310px] h-[200px] flex-shrink-0">
						<AsciiBox />
					</div>
				</motion.div>
				<div className="p-4">
					<AnimatePresence>
						<Terminal />
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
};
