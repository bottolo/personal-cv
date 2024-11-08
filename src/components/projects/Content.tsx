import { AnimatePresence, motion } from "framer-motion";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HOLOGRAM_COLORS } from "../../global-utils/colors.ts";
import { useDialogueStore } from "../../store/dialogue-store.ts";
import Terminal from "../terminal/Terminal.tsx";
import { Header } from "./components/Header.tsx";
import Projects from "./components/Projects.tsx";

const containerAnimations = {
	initial: {
		opacity: 0,
		borderColor: HOLOGRAM_COLORS.border.normal,
	},
	animate: {
		opacity: 1,
		borderColor: HOLOGRAM_COLORS.border.normal,
		boxShadow: [
			HOLOGRAM_COLORS.glow.weak,
			HOLOGRAM_COLORS.glow.medium,
			HOLOGRAM_COLORS.glow.weak,
		],
	},
	exit: {
		opacity: 0,
		borderColor: HOLOGRAM_COLORS.border.normal,
	},
};

const containerTransition = {
	duration: 0.5,
	boxShadow: {
		duration: 2,
		repeat: Number.POSITIVE_INFINITY,
		ease: "easeInOut",
	},
};

const scanLineAnimation = {
	y: ["-100%", "200%"],
};

const scanLineTransition = {
	duration: 10,
	repeat: Number.POSITIVE_INFINITY,
	ease: "linear",
};

const gridOverlayStyle = {
	backgroundImage: `
    linear-gradient(to right, ${HOLOGRAM_COLORS.grid.line} 1px, transparent 1px),
    linear-gradient(to bottom, ${HOLOGRAM_COLORS.grid.line} 1px, transparent 1px)
  `,
	backgroundSize: "20px 20px",
	opacity: 0.5,
};

const Content = () => {
	const { currentDialogue } = useDialogueStore();
	const calculateDimensions = (width: number, height: number) => ({
		width: Math.min(width * 0.5, 1200),
		maxHeight: height * 0.8,
		left: Math.min(width * 0.1, 160),
		top: Math.min(height * 0.1, 80),
	});

	// Initialize with current window dimensions
	const [dimensions, setDimensions] = useState(() =>
		calculateDimensions(window.innerWidth, window.innerHeight),
	);

	const prevDimensionsRef = useRef({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	const showProjects = useMemo(
		() => currentDialogue?.name === "/projects",
		[currentDialogue?.name],
	);

	// Debounced resize handler
	const handleResize = useCallback(() => {
		const { width: prevWidth, height: prevHeight } = prevDimensionsRef.current;
		const currentWidth = window.innerWidth;
		const currentHeight = window.innerHeight;

		if (
			Math.abs(prevWidth - currentWidth) > 5 ||
			Math.abs(prevHeight - currentHeight) > 5
		) {
			setDimensions(calculateDimensions(currentWidth, currentHeight));
			prevDimensionsRef.current = {
				width: currentWidth,
				height: currentHeight,
			};
		}
	}, []);

	useEffect(() => {
		let timeoutId: number;
		const debouncedResize = () => {
			clearTimeout(timeoutId);
			timeoutId = window.setTimeout(handleResize, 150);
		};

		window.addEventListener("resize", debouncedResize);
		return () => {
			window.removeEventListener("resize", debouncedResize);
			clearTimeout(timeoutId);
		};
	}, [handleResize]);

	const projectsHeight = useMemo(() => {
		const headerHeight = 192;
		const terminalHeight = 310;
		const maxProjectsHeight =
			dimensions.maxHeight - headerHeight - terminalHeight;
		return Math.max(maxProjectsHeight, 400);
	}, [dimensions.maxHeight]);

	const containerStyle = useMemo(
		() => ({
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
		}),
		[dimensions],
	);

	const projectsAnimationStyle = useMemo(
		() => ({
			height: showProjects ? projectsHeight : 0,
		}),
		[showProjects, projectsHeight],
	);

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key="content-container"
				initial={containerAnimations.initial}
				animate={containerAnimations.animate}
				exit={containerAnimations.exit}
				transition={containerTransition}
				className="fixed cursor-none overflow-hidden"
				style={containerStyle}
			>
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
					animate={scanLineAnimation}
					transition={scanLineTransition}
				/>

				<div
					className="absolute inset-0 pointer-events-none"
					style={gridOverlayStyle}
				/>

				<motion.div
					className="relative flex flex-col h-full"
					style={{ zIndex: 3 }}
				>
					<Header />

					<motion.div
						className="flex-grow overflow-hidden"
						animate={projectsAnimationStyle}
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
