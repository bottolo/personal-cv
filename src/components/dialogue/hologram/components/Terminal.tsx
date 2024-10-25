import { useEffect, useMemo, useRef, useState } from "react";
import { useDialogueStore } from "../../../../store/dialogue-store.ts";
import { useTerminalStore } from "../../../../store/terminal-store.ts";

const TypewriterText = ({
	text,
	onComplete,
}: { text: string; onComplete?: () => void }) => {
	const [displayText, setDisplayText] = useState("");
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (currentIndex < text.length) {
			const timeout = setTimeout(() => {
				setDisplayText((prev) => prev + text[currentIndex]);
				setCurrentIndex((prev) => prev + 1);
			}, 25); // Adjust speed here

			return () => clearTimeout(timeout);
		} else if (onComplete) {
			onComplete();
		}
	}, [currentIndex, text, onComplete]);

	return <span>{displayText}</span>;
};

const Terminal = () => {
	const terminalRef = useRef<HTMLDivElement>(null);
	const [typingIndex, setTypingIndex] = useState(0);
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

	const { currentDialogue, setCurrentDialogue } = useDialogueStore();

	const processBootSequence = (index = 0) => {
		if (index < bootSequence.length) {
			addLine(bootSequence[index]);
			setTimeout(() => processBootSequence(index + 1), 1000);
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
			setTimeout(() => processDialogueChange(index + 1), 1000);
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
			setTimeout(() => processShutdownSequence(index + 1), 1000);
		} else {
			setTimeout(() => {
				finishShutdown();
				clearLines();
				setCurrentDialogue(null);
			}, 2000);
		}
	};

	useMemo(() => {
		if (!currentDialogue) return false;

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

	useMemo(() => {
		if (terminalRef.current) {
			terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
		}
		return terminalRef.current?.scrollHeight;
	}, [lines, typingIndex]);

	const handleContinue = () => {
		if (isWaitingForInput && isAcceptingInput) {
			if (
				currentDialogue &&
				currentLine < currentDialogue.dialogue.length - 1
			) {
				nextLine();
				addLine(currentDialogue.dialogue[currentLine + 1]);
				setTypingIndex((prev) => prev + 1);
			} else if (
				currentDialogue &&
				currentLine === currentDialogue.dialogue.length - 1
			) {
				startShutdown();
				processShutdownSequence();
			}
		}
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleContinue();
		}
	};

	const handleLineComplete = () => {
		if (!isWaitingForInput) {
			setTypingIndex((prev) => prev + 1);
		}
	};

	return (
		<div className="w-full max-w-2xl mx-auto bg-black text-green-500 p-4 rounded-lg shadow-lg">
			<div ref={terminalRef} className="font-mono text-sm h-96 overflow-y-auto">
				{lines.map((line, index) => (
					<div key={index} className="py-1">
						{index <= typingIndex ? (
							<TypewriterText
								text={line}
								onComplete={
									index === typingIndex ? handleLineComplete : undefined
								}
							/>
						) : null}
						{index === lines.length - 1 &&
							isWaitingForInput &&
							index <= typingIndex && (
								<button
									tabIndex={0}
									type="button"
									onClick={handleContinue}
									onKeyDown={() => handleKeyDown}
									className="w-full text-left text-gray-500 mt-2 hover:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 rounded px-2 animate-pulse"
								>
									[press enter or click to continue...]
								</button>
							)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Terminal;
