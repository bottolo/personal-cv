import { AnimatePresence, motion } from "framer-motion";
import { NoiseEffect } from "../../../utils/Noise.tsx";
import { glowingAnimation } from "../../animations/glowing-animation.ts";
import type { Dialogue } from "../types/dialogue-types.ts";
import { AsciiGeometry } from "./components/ascii-geometry/AsciiGeometry.tsx";
import { HolographicAvatar } from "./components/avatar/Avatar.tsx";
import Terminal from "./components/terminal/Terminal.tsx";
import { hologramFloatingAnimation } from "./hologram-floating-animation.ts";

interface DialogueHologramProps {
	dialogue: Dialogue;
	className?: string;
}

export const Hologram = ({ className = "" }: DialogueHologramProps) => {
	return (
		<AnimatePresence mode="wait">
			<motion.div
				className={`relative flex flex-col items-center ${className}`}
				initial="initial"
				animate="animate"
				exit="exit"
			>
				<div className="w-[600px] relative">
					{/* Main Container */}
					<motion.div
						variants={hologramFloatingAnimation}
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
								className="absolute inset-[-1px] rounded-none border border-white/20 bg-white/10 backdrop-blur-lg -z-10 shadow-md shadow-blue-500/20"
								style={{
									transform: "scale(1.02)",
								}}
							/>
							<HolographicAvatar
								imageUrl={"/avatar-sopipet-0.png"}
								size={300}
							/>
						</div>
						<p
							className={
								"font-mono absolute opacity-70 right-2 top-1 text-[0.5rem] text-blue-100/60"
							}
						>
							bottolo | v0.1 | pre-release
						</p>
						{/* Canvas container */}
						<div className="w-[300px] h-[310px] flex-shrink-0 absolute right-[-2.5rem] top-[2rem]">
							<AsciiGeometry />
						</div>
					</motion.div>

					{/* Terminal Section */}
					<Terminal />
				</div>
			</motion.div>
		</AnimatePresence>
	);
};
