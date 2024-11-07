import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { NoiseEffect } from "../../global-utils/NoiseEffect.tsx";
import { HOLOGRAM_COLORS } from "../../global-utils/colors.ts";
import { useDialogueStore } from "../../store/dialogue-store.ts";
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

	// Word cycling effect
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

	// Cursor blinking effect
	useEffect(() => {
		const interval = setInterval(() => {
			setShowCursor((prev) => !prev);
		}, 530);
		return () => clearInterval(interval);
	}, []);

	// Typing effect
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

	// Key press handling
	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			if (e.key === "Enter" && !isTyping && currentDialogue) {
				nextPage();
			}
		};

		window.addEventListener("keypress", handleKeyPress);
		return () => window.removeEventListener("keypress", handleKeyPress);
	}, [isTyping, currentDialogue, nextPage]);

	// Auto-scroll
	useEffect(() => {
		if (terminalRef.current) {
			terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
		}
	}, [displayText]);

	return (
		<AnimatePresence mode="wait">
			{currentDialogue && (
				<motion.div className="w-full h-full z-[1000]">
					<GlitchContainer>
						<div
							className="relative bg-gradient-to-br from-blue-950/80 to-purple-950/80 backdrop-blur-sm border"
							style={{ borderColor: HOLOGRAM_COLORS.border.normal }}
						>
							<motion.div
								animate={{
									boxShadow: [
										HOLOGRAM_COLORS.glow.weak,
										HOLOGRAM_COLORS.glow.medium,
										HOLOGRAM_COLORS.glow.weak,
									],
								}}
								transition={{
									duration: 2,
									repeat: Number.POSITIVE_INFINITY,
									ease: "easeInOut",
								}}
								className="absolute inset-[-1px] border backdrop-blur-lg -z-10"
								style={{
									borderColor: HOLOGRAM_COLORS.border.normal,
									backgroundColor: HOLOGRAM_COLORS.bg.surface,
								}}
							>
								<NoiseEffect opacity={0.02} />
							</motion.div>

							<div
								ref={terminalRef}
								className="p-4 h-48 overflow-y-auto font-mono custom-scrollbar"
								style={{ color: HOLOGRAM_COLORS.text.secondary }}
							>
								<div className="mb-2 flex items-center gap-2">
									<div>
										<motion.span
											animate={{
												color: [
													HOLOGRAM_COLORS.text.primary,
													HOLOGRAM_COLORS.text.secondary,
													HOLOGRAM_COLORS.text.primary,
												],
											}}
											transition={{
												duration: 4,
												repeat: Number.POSITIVE_INFINITY,
												ease: "easeInOut",
											}}
										>
											guest
										</motion.span>
										<span style={{ color: HOLOGRAM_COLORS.text.muted }}>@</span>
										<motion.span
											animate={{
												color: [
													HOLOGRAM_COLORS.text.primary,
													HOLOGRAM_COLORS.text.secondary,
													HOLOGRAM_COLORS.text.primary,
												],
											}}
											transition={{
												duration: 4,
												repeat: Number.POSITIVE_INFINITY,
												ease: "easeInOut",
												delay: 0.5,
											}}
										>
											terminal
										</motion.span>
										<span style={{ color: HOLOGRAM_COLORS.text.muted }}>
											:~${" "}
										</span>
									</div>
								</div>

								<div className="min-h-[20px] relative">
									<motion.span
										animate={{
											textShadow: [
												HOLOGRAM_COLORS.glow.weak,
												HOLOGRAM_COLORS.glow.medium,
												HOLOGRAM_COLORS.glow.weak,
											],
										}}
										transition={{
											duration: 2,
											repeat: Number.POSITIVE_INFINITY,
											ease: "easeInOut",
										}}
									>
										{displayText}
									</motion.span>
									{showCursor && (
										<motion.span
											animate={{
												opacity: [1, 0],
												boxShadow: [
													HOLOGRAM_COLORS.glow.weak,
													HOLOGRAM_COLORS.glow.medium,
													HOLOGRAM_COLORS.glow.weak,
												],
											}}
											transition={{
												opacity: {
													duration: 0.5,
													repeat: Number.POSITIVE_INFINITY,
												},
												boxShadow: {
													duration: 2,
													repeat: Number.POSITIVE_INFINITY,
													ease: "easeInOut",
												},
											}}
											className="absolute ml-1"
											style={{ color: HOLOGRAM_COLORS.text.primary }}
										>
											▊
										</motion.span>
									)}
								</div>

								{!isTyping && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{
											opacity: [0.4, 0.8, 0.4],
										}}
										transition={{
											duration: 2,
											repeat: Number.POSITIVE_INFINITY,
											ease: "easeInOut",
										}}
										className="text-sm mt-2 italic"
										style={{ color: HOLOGRAM_COLORS.text.muted }}
									>
										Press Enter to continue...
									</motion.div>
								)}
							</div>
						</div>

						<AnimatePresence mode="wait">
							<motion.div
								key={currentWord}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.3 }}
								className="absolute bottom-2 right-2 text-[0.55rem] font-mono"
								style={{ color: HOLOGRAM_COLORS.text.muted }}
							>
								{isGlitching ? (
									<GlitchText text={currentWord} />
								) : (
									<motion.span
										animate={{
											textShadow: [
												HOLOGRAM_COLORS.glow.weak,
												HOLOGRAM_COLORS.glow.medium,
												HOLOGRAM_COLORS.glow.weak,
											],
										}}
										transition={{
											duration: 2,
											repeat: Number.POSITIVE_INFINITY,
											ease: "easeInOut",
										}}
									>
										{currentWord}
									</motion.span>
								)}
							</motion.div>
						</AnimatePresence>
					</GlitchContainer>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Terminal;
