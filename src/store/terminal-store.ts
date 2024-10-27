import { create } from "zustand";
import { sequences } from "../components/dialogue/hologram/components/sequences";

interface TerminalState {
	lines: string[];
	currentLine: number;
	isBooting: boolean;
	isShuttingDown: boolean;
	isChangingDialogue: boolean;
	isWaitingForInput: boolean;
	isAcceptingInput: boolean;
	bootSequence: string[];
	shutdownSequence: string[];
	setBootSequence: (sequence: string[]) => void;
	setShutdownSequence: (sequence: string[]) => void;
	addLine: (line: string) => void;
	clearLines: () => void;
	nextLine: () => void;
	setCurrentLine: (line: number) => void; // Add this
	startBoot: () => void;
	finishBoot: () => void;
	startShutdown: () => void;
	finishShutdown: () => void;
	startDialogueChange: () => void;
	finishDialogueChange: () => void;
	setWaitingForInput: (waiting: boolean) => void;
	setAcceptingInput: (accepting: boolean) => void;
}

export const useTerminalStore = create<TerminalState>((set) => ({
	lines: [],
	currentLine: 0,
	isBooting: false,
	isShuttingDown: false,
	isChangingDialogue: false,
	isWaitingForInput: false,
	isAcceptingInput: true,
	bootSequence: sequences.boot,
	shutdownSequence: sequences.shutdown,
	setBootSequence: (sequence) => set({ bootSequence: sequence }),
	setShutdownSequence: (sequence) => set({ shutdownSequence: sequence }),
	addLine: (line) => set((state) => ({ lines: [...state.lines, line] })),
	clearLines: () => set({ lines: [] }),
	nextLine: () => set((state) => ({ currentLine: state.currentLine + 1 })),
	setCurrentLine: (line) => set({ currentLine: line }), // Add this
	startBoot: () =>
		set({
			isBooting: true,
			isAcceptingInput: false,
			isWaitingForInput: false,
			currentLine: 0,
		}),
	finishBoot: () =>
		set({
			isBooting: false,
			isAcceptingInput: true,
		}),
	startShutdown: () =>
		set({
			isShuttingDown: true,
			isAcceptingInput: false,
			isWaitingForInput: false,
		}),
	finishShutdown: () =>
		set({
			isShuttingDown: false,
			isAcceptingInput: true,
			currentLine: 0,
		}),
	startDialogueChange: () =>
		set({
			isChangingDialogue: true,
			isAcceptingInput: false,
			isWaitingForInput: false,
			currentLine: 0,
		}),
	finishDialogueChange: () =>
		set({
			isChangingDialogue: false,
			isAcceptingInput: true,
		}),
	setWaitingForInput: (waiting) => set({ isWaitingForInput: waiting }),
	setAcceptingInput: (accepting) => set({ isAcceptingInput: accepting }),
}));
