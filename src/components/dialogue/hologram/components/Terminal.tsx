import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDialogueStore } from "../../../../store/dialogue-store.ts";
import { useTerminalStore } from "../../../../store/terminal-store.ts";
import { sequences } from "./sequences.ts";

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
			}, 25);

			return () => clearTimeout(timeout);
		}

		if (onComplete) {
			onComplete();
		}
	}, [currentIndex, text, onComplete]);

	return <span>{displayText}</span>;
};

const glowingAnimation = {
	animate: {
		boxShadow: [
			"0 0 20px 0px rgba(59, 130, 246, 0.2)",
			"0 0 40px 0px rgba(59, 130, 246, 0.4)",
			"0 0 20px 0px rgba(59, 130, 246, 0.2)",
		],
		transition: {
			duration: 2,
			repeat: Number.POSITIVE_INFINITY,
			ease: "easeInOut",
		},
	},
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
		if (index < sequences.change.length) {
			addLine(sequences.change[index]);
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
			handleContinue();
		}
	};

	// Add useEffect hook to handle keyboard events
	useEffect(() => {
		// Only add the event listener if waiting for input and accepting input
		if (isWaitingForInput && isAcceptingInput) {
			document.addEventListener("keydown", handleKeyDown);

			// Cleanup function to remove the event listener
			return () => {
				document.removeEventListener("keydown", handleKeyDown);
			};
		}
	}, [isWaitingForInput, isAcceptingInput, currentLine, currentDialogue]);

	const handleLineComplete = () => {
		if (!isWaitingForInput) {
			setTypingIndex((prev) => prev + 1);
		}
	};

	return (
		<div className="absolute top-[37rem] left-[13rem] -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-[30]">
			<div className="relative">
				<motion.div
					variants={glowingAnimation}
					animate="animate"
					className="absolute inset-[-1px] rounded-none border border-white/20 bg-white/10 backdrop-blur-lg -z-10 shadow-xl shadow-blue-500/20"
					style={{
						transform: "scale(1.02)",
					}}
				/>
				<div className="relative bg-gradient-to-br from-blue-950/80 to-purple-950/80 backdrop-blur-sm text-blue-300 p-4 rounded-none shadow-lg border border-white/10">
					<div
						ref={terminalRef}
						className="font-mono text-sm h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500/20 scrollbar-track-transparent"
					>
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
										<div
											className="cursor-none w-full text-left text-blue-400/60 mt-2 hover:text-blue-300/80 focus:outline-none focus:ring-1 focus:ring-blue-400/30 rounded-none  animate-pulse transition-colors duration-200"
											onClick={handleContinue}
										>
											[press enter or click to continue...]
										</div>
									)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Terminal;
