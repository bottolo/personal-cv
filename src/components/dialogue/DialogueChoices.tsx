import { motion } from "framer-motion";
import { useMemo } from "react";
import { useDialogueStore } from "../../store/dialogue-store.ts";
import { DialogueChoice } from "./DialogueChoice";
import { DIALOGUES } from "./dialogues.ts";

interface PositionConfig {
	bottom: string;
	right: string;
	zIndex?: string;
}

interface PositionsConfig {
	default: Record<string, PositionConfig>;
	active: Record<string, Record<string, PositionConfig>>;
}

// interface ButtonLabels {
// 	active: string;
// 	inactive: string;
// }

// const getButtonLabels = (dialogue: Dialogue): ButtonLabels => {
// 	return {
// 		active: "Connecting...",
// 		inactive: dialogue.name,
// 	};
// };

export const DialogueChoices = () => {
	const { currentDialogue } = useDialogueStore();

	const positions = useMemo(
		() =>
			({
				default: {
					firstChoice: {
						bottom: "325px",
						right: "-185px",
						zIndex: "10",
					},
					secondChoice: {
						bottom: "150px",
						right: "-50px",
						zIndex: "20",
					},
					thirdChoice: {
						bottom: "-35px",
						right: "-185px",
						zIndex: "30",
					},
				},
				active: {
					firstChoice: {
						firstChoice: {
							bottom: "375px",
							right: "-80px",
							zIndex: "30",
						},
						secondChoice: {
							bottom: "100px",
							right: "-125px",
							zIndex: "10",
						},
						thirdChoice: {
							bottom: "-80px",
							right: "-185px",
							zIndex: "10",
						},
					},
					secondChoice: {
						firstChoice: {
							bottom: "375px",
							right: "-230px",
							zIndex: "10",
						},
						secondChoice: {
							bottom: "150px",
							right: "-80px",
							zIndex: "30",
						},
						thirdChoice: {
							bottom: "-60px",
							right: "-250px",
							zIndex: "10",
						},
					},
					thirdChoice: {
						firstChoice: {
							bottom: "400px",
							right: "-200px",
							zIndex: "10",
						},
						secondChoice: {
							bottom: "200px",
							right: "-120px",
							zIndex: "10",
						},
						thirdChoice: {
							bottom: "-30px",
							right: "-80px",
							zIndex: "30",
						},
					},
				},
			}) as PositionsConfig,
		[],
	);

	const getPosition = (dialogueId: string) => {
		if (!currentDialogue) {
			return positions.default[dialogueId];
		}
		return positions.active[currentDialogue.id][dialogueId];
	};

	return (
		<>
			{Object.entries(DIALOGUES).map(([dialogueId, dialogue]) => {
				const isActive = currentDialogue?.id === dialogueId;

				return (
					<motion.div
						key={dialogueId}
						className="absolute"
						initial={positions.default[dialogueId]}
						animate={getPosition(dialogueId)}
						transition={{
							type: "spring",
							stiffness: 100,
							damping: 30,
							mass: 0.5,
						}}
					>
						<DialogueChoice
							text={dialogue.name}
							active={isActive}
							dialogueId={dialogueId}
							debug={false}
						/>
					</motion.div>
				);
			})}
		</>
	);
};
