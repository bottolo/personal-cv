import { useEffect, useRef, useState } from "react";
import { useDialogueStore } from "../../../../store/dialogue-store.ts";

const Terminal = () => {
	const { currentDialogue, currentPage, nextPage } = useDialogueStore();
	const [displayText, setDisplayText] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const [showCursor, setShowCursor] = useState(true);
	const terminalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const interval = setInterval(() => {
			setShowCursor((prev) => !prev);
		}, 530);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (!currentDialogue?.dialogue[currentPage]) return;

		const text = currentDialogue.dialogue[currentPage];
		setIsTyping(true);
		let index = 0;
		setDisplayText("");

		const typeInterval = setInterval(() => {
			if (index < text.length) {
				setDisplayText(text.slice(0, index + 1));
				index++;
			} else {
				setIsTyping(false);
				clearInterval(typeInterval);
			}
		}, 30);

		return () => clearInterval(typeInterval);
	}, [currentDialogue, currentPage]);

	// Handle key press
	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			if (e.key === "Enter" && !isTyping && currentDialogue) {
				nextPage();
			}
		};

		window.addEventListener("keypress", handleKeyPress);
		return () => window.removeEventListener("keypress", handleKeyPress);
	}, [isTyping, currentDialogue, nextPage]);

	// Scroll to bottom effect
	useEffect(() => {
		if (terminalRef.current) {
			terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
		}
	}, [displayText]);

	if (!currentDialogue) return null;

	return (
		<div className="absolute bottom-[-15rem] left-0 w-full h-48 bg-black bg-opacity-90 text-green-400 font-mono">
			<div ref={terminalRef} className="p-4 h-full overflow-y-auto">
				<div className="mb-2">
					<span className="text-blue-400">guest</span>
					<span className="text-gray-400">@</span>
					<span className="text-purple-400">terminal</span>
					<span className="text-gray-400">:~$ </span>
				</div>
				<div className="min-h-[20px]">
					{displayText}
					{showCursor && <span className="opacity-70">▊</span>}
				</div>
				{!isTyping && (
					<div className="text-gray-500 text-sm mt-2">
						Press Enter to continue...
					</div>
				)}
			</div>
		</div>
	);
};

export default Terminal;
