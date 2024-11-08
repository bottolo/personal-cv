import { Background } from "./components/background/Background";
import { Choices } from "./components/choices/Choices.tsx";
import Cursor from "./components/cursor/Cursor.tsx";
import Content from "./components/projects/Content.tsx";
import TiltContainer from "./components/tilt-container/TiltContainer.tsx";
import { useDialogueStore } from "./store/dialogue-store";

function App() {
	const { currentDialogue } = useDialogueStore();

	return (
		<TiltContainer>
			<Cursor />
			<Background />

			<Choices />
			{currentDialogue && <Content />}
		</TiltContainer>
	);
}

export default App;
