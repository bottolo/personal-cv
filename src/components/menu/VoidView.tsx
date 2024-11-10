import { useDialogueStore } from "../../store/dialogue-store.ts";
import { Background } from "../background/Background.tsx";
import { Choices } from "../choices/Choices.tsx";
import Content from "../projects/Content.tsx";

export const VoidView = () => {
	const { currentDialogue } = useDialogueStore();

	return (
		<div className="absolute inset-0 flex flex-col">
			<div className="absolute inset-0 z-0">
				<Background />
			</div>
			<div className="relative z-1 flex-1">
				<Choices />
				{currentDialogue && <Content />}
			</div>
		</div>
	);
};
