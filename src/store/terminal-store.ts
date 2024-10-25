import { create } from "zustand";

interface TerminalState {
	lines: string[];
	currentLine: number;
	isBooting: boolean;
	isShuttingDown: boolean;
	isChangingDialogue: boolean;
	isWaitingForInput: boolean;
	isAcceptingInput: boolean; // New state to track when input should be accepted
	bootSequence: string[];
	shutdownSequence: string[];
	setBootSequence: (sequence: string[]) => void;
	setShutdownSequence: (sequence: string[]) => void;
	addLine: (line: string) => void;
	clearLines: () => void;
	nextLine: () => void;
	startBoot: () => void;
	finishBoot: () => void;
	startShutdown: () => void;
	finishShutdown: () => void;
	startDialogueChange: () => void;
	finishDialogueChange: () => void;
	setWaitingForInput: (waiting: boolean) => void;
	setAcceptingInput: (accepting: boolean) => void; // New action
}

export const useTerminalStore = create<TerminalState>((set) => ({
	lines: [],
	currentLine: 0,
	isBooting: false,
	isShuttingDown: false,
	isChangingDialogue: false,
	isWaitingForInput: false,
	isAcceptingInput: true, // Default to true
	bootSequence: [
		"Initiating communication...",
		"...",
		"...",
		"Connecting...",
		"...",
		"...",
		"Connected.",
	],
	shutdownSequence: [
		"Initiating shutdown...",
		"...",
		"...",
		"Disconnecting...",
		"...",
		"...",
		"Disconnected.",
	],
	setBootSequence: (sequence) => set({ bootSequence: sequence }),
	setShutdownSequence: (sequence) => set({ shutdownSequence: sequence }),
	addLine: (line) => set((state) => ({ lines: [...state.lines, line] })),
	clearLines: () => set({ lines: [] }),
	nextLine: () => set((state) => ({ currentLine: state.currentLine + 1 })),
	startBoot: () =>
		set({
			isBooting: true,
			isAcceptingInput: false, // Disable input during boot
			isWaitingForInput: false,
		}),
	finishBoot: () =>
		set({
			isBooting: false,
			isAcceptingInput: true, // Re-enable input after boot
		}),
	startShutdown: () =>
		set({
			isShuttingDown: true,
			isAcceptingInput: false, // Disable input during shutdown
			isWaitingForInput: false,
		}),
	finishShutdown: () =>
		set({
			isShuttingDown: false,
			isAcceptingInput: true, // Re-enable input after shutdown
			currentLine: 0,
		}),
	startDialogueChange: () =>
		set({
			isChangingDialogue: true,
			isAcceptingInput: false, // Disable input during dialogue change
			isWaitingForInput: false,
		}),
	finishDialogueChange: () =>
		set({
			isChangingDialogue: false,
			isAcceptingInput: true, // Re-enable input after dialogue change
		}),
	setWaitingForInput: (waiting) => set({ isWaitingForInput: waiting }),
	setAcceptingInput: (accepting) => set({ isAcceptingInput: accepting }),
}));
