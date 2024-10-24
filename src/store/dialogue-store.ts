import { create } from "zustand";
import { DIALOGUES } from "../components/dialogue/dialogues.ts";
import type { Dialogue } from "../types/dialogue-types.ts";

interface DialogueState {
	currentDialogue: Dialogue | null;
	currentPage: number;
	isDialogueActive: boolean;
	setCurrentDialogue: (dialogueId: string | null) => void;
	nextPage: () => void;
	previousPage: () => void;
	resetDialogue: () => void;
	markDialogueComplete: (dialogueId: string) => void;
}

export const useDialogueStore = create<DialogueState>((set) => ({
	currentDialogue: null,
	currentPage: 0,
	isDialogueActive: false,

	setCurrentDialogue: (dialogueId) =>
		set(() => ({
			currentDialogue: dialogueId ? DIALOGUES[dialogueId] : null,
			currentPage: 0,
			isDialogueActive: !!dialogueId,
		})),

	nextPage: () =>
		set((state) => {
			if (!state.currentDialogue) return state;

			const nextPage = state.currentPage + 1;
			if (nextPage >= state.currentDialogue.dialogue.length) {
				return {
					...state,
					isDialogueActive: false,
					currentDialogue: null,
					currentPage: 0,
				};
			}
			return { ...state, currentPage: nextPage };
		}),

	previousPage: () =>
		set((state) => ({
			currentPage: Math.max(0, state.currentPage - 1),
		})),

	resetDialogue: () =>
		set({
			currentDialogue: null,
			currentPage: 0,
			isDialogueActive: false,
		}),

	markDialogueComplete: (dialogueId) =>
		set((state) => ({
			...state,
			dialogues: {
				...DIALOGUES,
				[dialogueId]: {
					...DIALOGUES[dialogueId],
					completed: true,
				},
			},
		})),
}));
