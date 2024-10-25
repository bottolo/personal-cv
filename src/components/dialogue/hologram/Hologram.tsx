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
		<motion.div className={`relative flex flex-col items-center ${className}`}>
			<div className="w-[600px] relative">
				{/* Main Container */}
				<motion.div
					variants={floatingAnimation}
					animate="animate"
					className="relative z-20 flex items-center gap-8 p-6 bg-gradient-to-br from-blue-950/80 to-purple-950/80 backdrop-blur-sm rounded-none border border-white/10"
				>
					{/* Glowing border */}
					<motion.div
						variants={glowingAnimation}
						animate="animate"
						className="absolute inset-[-1px] rounded-none border border-white/20 bg-white/10 backdrop-blur-lg -z-10 shadow-lg shadow-blue-500/20"
						style={{
							transform: "scale(1.02)",
						}}
					>
						<NoiseEffect opacity={0.02} />
					</motion.div>

					{/* Avatar container */}
					<div className="w-[300px] flex-shrink-0 relative">
						<motion.div
							className="absolute inset-[-1px] rounded-lg border border-white/20 bg-white/10 backdrop-blur-lg  -z-10 shadow-lg shadow-blue-500/20"
							style={{
								transform: "scale(1.02)",
							}}
						/>
						<HolographicAvatar imageUrl={"/avatar-sopipet-0.png"} size={300} />
					</div>

					{/* Canvas container */}
					<div className="w-[240px] h-[250px] flex-shrink-0 absolute right-[0rem] top-[1rem]">
						<AsciiBox />
						<p className={"font-mono"}>samuele_castiglia </p>
						<p className={"font-mono"}>a.k.a. bottolo </p>
					</div>
				</motion.div>

				{/* Terminal Section */}
				<div className="p-4 mt-4">
					<AnimatePresence>
						<Terminal />
					</AnimatePresence>
				</div>
			</div>
		</motion.div>
	);
};
