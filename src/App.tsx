import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { DynamicBackground } from "./components/background/Background";
import { Choices } from "./components/choices/Choices";
import Cursor from "./components/cursor/Cursor";
import Content from "./components/projects/Content";
import LoadingScreen from "./components/tilt-container/LoadingScreen.tsx";
import { MonitorBorder } from "./components/tilt-container/MonitorBorder";
import TiltContainer from "./components/tilt-container/TiltContainer";
import { useDialogueStore } from "./store/dialogue-store";

const FADE_DURATION = 0.8;
const TOTAL_DURATION = 4;
const TIMER_DURATION = (TOTAL_DURATION - FADE_DURATION) * 1000;

const MainContent = ({ currentDialogue }) => (
	<>
		<DynamicBackground />
		<Choices />
		{currentDialogue && <Content />}
	</>
);

const LoadingScreenWrapper = ({ isVisible }) => (
	<AnimatePresence>{isVisible && <LoadingScreen />}</AnimatePresence>
);

function App() {
	const { currentDialogue } = useDialogueStore();
	const [isMonitorOn, setIsMonitorOn] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handlePowerChange = useCallback((newState) => {
		setIsMonitorOn(newState);
	}, []);

	useEffect(() => {
		if (isMonitorOn) {
			setIsLoading(true);
			const timer = setTimeout(() => {
				setIsLoading(false);
			}, TIMER_DURATION);
			return () => clearTimeout(timer);
		}
		setIsLoading(false);
	}, [isMonitorOn]);

	return (
		<>
			<TiltContainer>
				{isMonitorOn && <MainContent currentDialogue={currentDialogue} />}
			</TiltContainer>
			<Cursor />
			<MonitorBorder onPowerChange={handlePowerChange} />
		</>
	);
}

export default App;
