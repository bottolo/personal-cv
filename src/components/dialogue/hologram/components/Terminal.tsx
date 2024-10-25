import { useMemo, useRef } from "react";
import { useDialogueStore } from "../../../../store/dialogue-store.ts";
import { useTerminalStore } from "../../../../store/terminal-store.ts";

const Terminal = () => {
	const terminalRef = useRef<HTMLDivElement>(null);
	const {
		lines,
		currentLine,
		isBooting,
		isShuttingDown,
		isChangingDialogue,
		isWaitingForInput,
		bootSequence,
		shutdownSequence,
		isAcceptingInput,
		addLine,
		clearLines,
		nextLine,
		startBoot,
		finishBoot,
		startShutdown,
		finishShutdown,
		startDialogueChange,
		finishDialogueChange,
		setWaitingForInput,
	} = useTerminalStore();

	const { currentDialogue } = useDialogueStore();

	const processBootSequence = (index = 0) => {
		if (index < bootSequence.length) {
			addLine(bootSequence[index]);
			setTimeout(() => processBootSequence(index + 1), 500);
		} else {
			finishBoot();
			if (currentDialogue) {
				addLine(currentDialogue.dialogue[0]);
				setWaitingForInput(true);
			}
		}
	};

	const processDialogueChange = (index = 0) => {
		const changeSequence = [
			"Changing communication...",
			"...",
			"...",
			"Reconnecting...",
			"...",
			"...",
			"Connected.",
		];

		if (index < changeSequence.length) {
			addLine(changeSequence[index]);
			setTimeout(() => processDialogueChange(index + 1), 500);
		} else {
			finishDialogueChange();
			if (currentDialogue) {
				addLine(currentDialogue.dialogue[0]);
				setWaitingForInput(true);
			}
		}
	};

	const processShutdownSequence = (index = 0) => {
		if (index < shutdownSequence.length) {
			addLine(shutdownSequence[index]);
			setTimeout(() => processShutdownSequence(index + 1), 500);
		} else {
			finishShutdown();
			clearLines();
		}
	};

	// Handle initial boot and dialogue changes
	useMemo(() => {
		if (!currentDialogue) return false;

		// Handle initial boot
		if (
			!isBooting &&
			!isShuttingDown &&
			!isChangingDialogue &&
			lines.length === 0
		) {
			startBoot();
			processBootSequence();
			return true;
		}

		// Handle dialogue changes only when dialogue content changes
		const isNewDialogue =
			lines.length > 0 &&
			!isBooting &&
			!isShuttingDown &&
			!isChangingDialogue &&
			currentDialogue.dialogue[0] !== lines[lines.length - 1];

		if (isNewDialogue) {
			startDialogueChange();
			clearLines();
			processDialogueChange();
			return true;
		}

		return false;
	}, [
		currentDialogue?.dialogue[0],
		isBooting,
		isShuttingDown,
		isChangingDialogue,
	]);

	// Handle scrolling
	useMemo(() => {
		if (terminalRef.current) {
			terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
		}
		return terminalRef.current?.scrollHeight;
	}, [lines]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Enter" && isWaitingForInput && isAcceptingInput) {
			if (
				currentDialogue &&
				currentLine < currentDialogue.dialogue.length - 1
			) {
				nextLine();
				addLine(currentDialogue.dialogue[currentLine + 1]);
			} else if (
				currentDialogue &&
				currentLine === currentDialogue.dialogue.length - 1
			) {
				startShutdown();
				processShutdownSequence();
			}
		}
	};

	return (
		<div
			className="w-full max-w-2xl mx-auto bg-black text-green-500 p-4 rounded-lg shadow-lg"
			onKeyDown={handleKeyDown}
		>
			<div ref={terminalRef} className="font-mono text-sm h-96 overflow-y-auto">
				{lines.map((line, index) => (
					<div key={index} className="py-1">
						{line}
						{index === lines.length - 1 && isWaitingForInput && (
							<div className="text-gray-500 mt-2">
								[press enter to continue...]
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Terminal;
