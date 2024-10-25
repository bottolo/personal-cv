import { useEffect, useRef } from "react";
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

	// Handle boot sequence
	useEffect(() => {
		if (
			currentDialogue &&
			!isBooting &&
			!isShuttingDown &&
			!isChangingDialogue
		) {
			startBoot();
			let currentIndex = 0;

			const bootInterval = setInterval(() => {
				if (currentIndex < bootSequence.length) {
					addLine(bootSequence[currentIndex]);
					currentIndex++;
				} else {
					clearInterval(bootInterval);
					finishBoot();
					addLine(currentDialogue.dialogue[0]);
					setWaitingForInput(true);
				}
			}, 500);

			return () => clearInterval(bootInterval);
		}
	}, [currentDialogue]);

	// Handle dialogue change
	useEffect(() => {
		if (currentDialogue && !isBooting && !isShuttingDown && lines.length > 0) {
			startDialogueChange();
			clearLines();
			let currentIndex = 0;

			const changeSequence = [
				"Changing communication...",
				"...",
				"...",
				"Reconnecting...",
				"...",
				"...",
				"Connected.",
			];

			const changeInterval = setInterval(() => {
				if (currentIndex < changeSequence.length) {
					addLine(changeSequence[currentIndex]);
					currentIndex++;
				} else {
					clearInterval(changeInterval);
					finishDialogueChange();
					addLine(currentDialogue.dialogue[0]);
					setWaitingForInput(true);
				}
			}, 500);

			return () => clearInterval(changeInterval);
		}
	}, [currentDialogue?.dialogue]);

	// Handle keyboard input
	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
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
					let currentIndex = 0;

					const shutdownInterval = setInterval(() => {
						if (currentIndex < shutdownSequence.length) {
							addLine(shutdownSequence[currentIndex]);
							currentIndex++;
						} else {
							clearInterval(shutdownInterval);
							finishShutdown();
							clearLines();
						}
					}, 500);
				}
			}
		};

		window.addEventListener("keypress", handleKeyPress);
		return () => window.removeEventListener("keypress", handleKeyPress);
	}, [currentLine, currentDialogue, isWaitingForInput]);

	// Auto-scroll effect
	useEffect(() => {
		if (terminalRef.current) {
			terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
		}
	}, [lines]);

	return (
		<div className="w-full max-w-2xl mx-auto bg-black text-green-500 p-4 rounded-lg shadow-lg">
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
