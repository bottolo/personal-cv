import { Background } from "./components/background/Background";
import { Choices } from "./components/choices/Choices";
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
			<Choices className="absolute bottom-[50px] right-[200px] w-[650px] h-[300px] bg-transparent" />
			{currentDialogue && <Content />}
		</TiltContainer>
	);
}

export default App;
