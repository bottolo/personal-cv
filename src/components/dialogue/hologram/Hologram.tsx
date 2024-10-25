import { motion } from "framer-motion";
import { useDialogueStore } from "../../../store/dialogue-store.ts";
import type { Dialogue } from "../../../types/dialogue-types.ts";

interface DialogueHologramProps {
	dialogue: Dialogue;
	className?: string;
}

export const Hologram = ({
	dialogue,
	className = "",
}: DialogueHologramProps) => {
	const { currentPage, nextPage, previousPage } = useDialogueStore();

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.8 }}
			className={`bg-black/50 backdrop-blur-md p-6 rounded-lg ${className}`}
		>
			<div className="flex items-start gap-4">
				<div className="w-16 h-16 bg-blue-500 rounded-full">
					{/* Avatar component would go here */}
				</div>

				<div className="flex-1">
					<h3 className="text-white text-xl font-bold mb-2">{dialogue.name}</h3>
					<p className="text-white">{dialogue.dialogue[currentPage]}</p>
				</div>
			</div>

			<div className="flex justify-between mt-4">
				<button
					type={"button"}
					onClick={previousPage}
					disabled={currentPage === 0}
					className="text-white disabled:opacity-50"
				>
					Previous
				</button>
				<button type={"button"} onClick={nextPage} className="text-white">
					{currentPage === dialogue.dialogue.length - 1 ? "Close" : "Next"}
				</button>
			</div>
		</motion.div>
	);
};
