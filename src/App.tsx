import { useState } from "react";
import { DynamicBackground } from "./components/background/Background";
import { Choices } from "./components/choices/Choices";
import Cursor from "./components/cursor/Cursor";
import Content from "./components/projects/Content";
import { MonitorBorder } from "./components/tilt-container/MonitorBorder";
import TiltContainer from "./components/tilt-container/TiltContainer";
import type { Dialogue } from "./global-utils/dialogue-types.ts";
import { useDialogueStore } from "./store/dialogue-store";

const MainContent = ({ currentDialogue }: { currentDialogue: Dialogue }) => (
	<>
		<DynamicBackground />
		<Choices />
		{currentDialogue && <Content />}
	</>
);

function App() {
	const { currentDialogue } = useDialogueStore();
	const [isMonitorOn, setIsMonitorOn] = useState(false);

	return (
		<>
			<TiltContainer>
				{isMonitorOn && <MainContent currentDialogue={currentDialogue} />}
			</TiltContainer>
			<Cursor />
			<MonitorBorder onPowerChange={setIsMonitorOn} />
		</>
	);
}

export default App;
