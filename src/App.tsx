import { AnimatePresence } from "framer-motion";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
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

const MainContent = memo(({ currentDialogue }: { currentDialogue: any }) => (
	<>
		<DynamicBackground />
		<Choices />
		{currentDialogue && <Content />}
	</>
));

MainContent.displayName = "MainContent";

const LoadingScreenWrapper = memo(({ isVisible }: { isVisible: boolean }) => (
	<AnimatePresence>{isVisible && <LoadingScreen />}</AnimatePresence>
));

LoadingScreenWrapper.displayName = "LoadingScreenWrapper";

function App() {
	const { currentDialogue } = useDialogueStore();
	const [isMonitorOn, setIsMonitorOn] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handlePowerChange = useCallback((newState: boolean) => {
		setIsMonitorOn(newState);
	}, []);

	useEffect(() => {
		if (isMonitorOn) {
			setIsLoading(true);
			const timer = setTimeout(() => {
				setIsLoading(false);
			}, TIMER_DURATION);
			return () => clearTimeout(timer);
		} else {
			setIsLoading(false);
		}
	}, [isMonitorOn]);

	const isLoadingVisible = useMemo(
		() => isMonitorOn && isLoading,
		[isMonitorOn, isLoading],
	);

	return (
		<>
			<TiltContainer>
				{isMonitorOn && <MainContent currentDialogue={currentDialogue} />}
				<LoadingScreenWrapper isVisible={isLoadingVisible} />
			</TiltContainer>
			<Cursor />
			<MonitorBorder onPowerChange={handlePowerChange} />
		</>
	);
}

export default memo(App);
