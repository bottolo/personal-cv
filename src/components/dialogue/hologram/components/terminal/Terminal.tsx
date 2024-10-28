import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDialogueStore } from "../../../../../store/dialogue-store.ts";
import { NoiseEffect } from "../../../../../utils/NoiseEffect.tsx";
import { GlitchContainer } from "./utils/glitch-container.tsx";
import { GlitchText } from "./utils/glitch-text.tsx";
import { INTROSPECTIVE_WORDS } from "./utils/introspective-words.ts";

const Terminal = () => {
	const { currentDialogue, currentPage, nextPage } = useDialogueStore();
	const [displayText, setDisplayText] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const [showCursor, setShowCursor] = useState(true);
	const [currentWord, setCurrentWord] = useState(INTROSPECTIVE_WORDS[0]);
	const [isGlitching, setIsGlitching] = useState(false);
	const terminalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setIsGlitching(true);
			setTimeout(() => {
				setCurrentWord((prev) => {
					const currentIndex = INTROSPECTIVE_WORDS.indexOf(prev);
					const nextIndex = (currentIndex + 1) % INTROSPECTIVE_WORDS.length;
					return INTROSPECTIVE_WORDS[nextIndex];
				});
				setTimeout(() => setIsGlitching(false), 200);
			}, 200);
		}, 3000);

		return () => clearInterval(intervalId);
	}, []);

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

	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			if (e.key === "Enter" && !isTyping && currentDialogue) {
				nextPage();
			}
		};

		window.addEventListener("keypress", handleKeyPress);
		return () => window.removeEventListener("keypress", handleKeyPress);
	}, [isTyping, currentDialogue, nextPage]);

	useEffect(() => {
		if (terminalRef.current) {
			terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
		}
	}, [displayText]);

	return (
		<AnimatePresence mode="wait">
			{currentDialogue && (
				<motion.div className="absolute top-[20rem] left-[5rem] w-full z-[1000]">
					<GlitchContainer>
						<div className="relative bg-gradient-to-br from-blue-950/80 to-purple-950/80 backdrop-blur-sm border border-white/10">
							<motion.div
								animate={{
									boxShadow: [
										"0 0 10px rgba(59, 130, 246, 0.2)",
										"0 0 20px rgba(59, 130, 246, 0.4)",
										"0 0 10px rgba(59, 130, 246, 0.2)",
									],
								}}
								transition={{
									duration: 2,
									repeat: Number.POSITIVE_INFINITY,
									ease: "easeInOut",
								}}
								className="absolute inset-[-1px] border border-white/20 bg-white/10 backdrop-blur-lg -z-10"
							>
								<NoiseEffect opacity={0.02} />
							</motion.div>

							<div
								ref={terminalRef}
								className="p-4 h-48 overflow-y-auto font-mono text-blue-200/90"
							>
								<div className="mb-2 flex items-center gap-2">
									<div>
										<span className="text-blue-400">guest</span>
										<span className="text-gray-400">@</span>
										<span className="text-purple-400">terminal</span>
										<span className="text-gray-400">:~$ </span>
									</div>
								</div>

								<div className="min-h-[20px] relative">
									{displayText}
									{showCursor && (
										<motion.span
											animate={{ opacity: [1, 0] }}
											transition={{
												duration: 0.5,
												repeat: Number.POSITIVE_INFINITY,
											}}
											className="absolute ml-1 text-blue-300"
										>
											▊
										</motion.span>
									)}
								</div>

								{!isTyping && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										className="text-blue-300/60 text-sm mt-2 italic"
									>
										Press Enter to continue...
									</motion.div>
								)}
							</div>
						</div>

						<AnimatePresence mode="wait">
							<motion.div
								key={currentWord}
								initial={{ opacity: 0, y: 0 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 0 }}
								transition={{ duration: 0.3 }}
								className="absolute bottom-2 right-2 text-xs text-blue-300/40"
							>
								{isGlitching ? <GlitchText text={currentWord} /> : currentWord}
							</motion.div>
						</AnimatePresence>
					</GlitchContainer>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Terminal;
