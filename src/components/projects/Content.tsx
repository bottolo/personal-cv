import { AnimatePresence, motion } from "framer-motion";
import { memo, useMemo } from "react";
import { useDialogueStore } from "../../store/dialogue-store.ts";
import Terminal from "../terminal/Terminal.tsx";
import { Header } from "./components/Header.tsx";
import Projects from "./components/Projects.tsx";

const Content = () => {
	const { currentDialogue } = useDialogueStore();

	const showProjects = useMemo(
		() => currentDialogue?.name === "/projects",
		[currentDialogue?.name],
	);

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key="content-container"
				initial="initial"
				exit="exit"
				custom={showProjects}
				className="relative left-[10rem] top-[5rem] w-1/2 cursor-none backdrop-blur-sm border border-white/10"
				style={{ zIndex: 1 }}
			>
				<motion.div className="relative flex flex-col" style={{ zIndex: 3 }}>
					<Header />
					<motion.div
						className="w-full overflow-hidden"
						animate={{
							height: showProjects ? "40rem" : "0rem",
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

					<div className="w-full shrink-0">
						<Terminal />
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};

export default memo(Content);
