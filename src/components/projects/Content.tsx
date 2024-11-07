import { AnimatePresence, motion } from "framer-motion";
import { memo, useEffect, useMemo, useState } from "react";
import { HOLOGRAM_COLORS } from "../../global-utils/colors.ts";
import { useDialogueStore } from "../../store/dialogue-store.ts";
import Terminal from "../terminal/Terminal.tsx";
import { Header } from "./components/Header.tsx";
import Projects from "./components/Projects.tsx";

const Content = () => {
	const { currentDialogue } = useDialogueStore();
	const [windowHeight, setWindowHeight] = useState(window.innerHeight);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	const showProjects = useMemo(
		() => currentDialogue?.name === "/projects",
		[currentDialogue?.name],
	);

	// Handle window resize
	useEffect(() => {
		const handleResize = () => {
			setWindowHeight(window.innerHeight);
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const dimensions = useMemo(() => {
		const maxWidth = Math.min(windowWidth * 0.5, 1200);
		const maxHeight = windowHeight * 0.8;
		const leftOffset = Math.min(windowWidth * 0.1, 160);
		const topOffset = Math.min(windowHeight * 0.1, 80);

		return {
			width: maxWidth,
			maxHeight,
			left: leftOffset,
			top: topOffset,
		};
	}, [windowWidth, windowHeight]);

	const projectsHeight = useMemo(() => {
		const headerHeight = 192;
		const terminalHeight = 310;
		const maxProjectsHeight =
			dimensions.maxHeight - headerHeight - terminalHeight;
		return Math.max(maxProjectsHeight, 400);
	}, [dimensions.maxHeight]);

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key="content-container"
				initial={{
					opacity: 0,
					borderColor: HOLOGRAM_COLORS.border.normal,
				}}
				animate={{
					opacity: 1,
					borderColor: HOLOGRAM_COLORS.border.normal,
					boxShadow: [
						HOLOGRAM_COLORS.glow.weak,
						HOLOGRAM_COLORS.glow.medium,
						HOLOGRAM_COLORS.glow.weak,
					],
				}}
				exit={{
					opacity: 0,
					borderColor: HOLOGRAM_COLORS.border.normal,
				}}
				transition={{
					duration: 0.5,
					boxShadow: {
						duration: 2,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					},
				}}
				className="fixed cursor-none overflow-hidden"
				style={{
					zIndex: 1,
					backgroundColor: HOLOGRAM_COLORS.bg.surface,
					borderWidth: "1px",
					borderStyle: "solid",
					backdropFilter: "blur(8px)",
					width: dimensions.width,
					maxHeight: dimensions.maxHeight,
					left: dimensions.left,
					top: dimensions.top,
					display: "flex",
					flexDirection: "column",
				}}
			>
				{/* Hologram scan line effect */}
				<motion.div
					className="absolute left-0 right-0 pointer-events-none"
					style={{
						background: `linear-gradient(to bottom,
                            transparent,
                            ${HOLOGRAM_COLORS.effects.scanLine},
                            transparent
                        )`,
						height: "1rem",
					}}
					animate={{
						y: ["-100%", "200%"],
					}}
					transition={{
						duration: 10,
						repeat: Number.POSITIVE_INFINITY,
						ease: "linear",
					}}
				/>

				{/* Grid overlay effect */}
				<div
					className="absolute inset-0 pointer-events-none"
					style={{
						backgroundImage: `
                            linear-gradient(to right, ${HOLOGRAM_COLORS.grid.line} 1px, transparent 1px),
                            linear-gradient(to bottom, ${HOLOGRAM_COLORS.grid.line} 1px, transparent 1px)
                        `,
						backgroundSize: "20px 20px",
						opacity: 0.5,
					}}
				/>

				<motion.div
					className="relative flex flex-col h-full"
					style={{ zIndex: 3 }}
				>
					<Header />

					<motion.div
						className="flex-grow overflow-hidden"
						animate={{
							height: showProjects ? projectsHeight : 0,
						}}
						transition={{
							duration: 0.5,
							ease: [0.4, 0, 0.2, 1],
						}}
					>
						<AnimatePresence mode="wait">
							{showProjects && <Projects />}
						</AnimatePresence>
					</motion.div>

					<div
						className="shrink-0"
						style={{
							borderTop: `1px solid ${HOLOGRAM_COLORS.border.normal}`,
						}}
					>
						<Terminal />
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};

export default memo(Content);
