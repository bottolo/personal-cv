import { Background } from "./components/background/Background.tsx";
import { Cursor } from "./components/cursor/Cursor.tsx";
import { Choices } from "./components/dialogue-choices/Choices.tsx";
import { Hologram } from "./components/dialogue-hologram/Hologram.tsx";
import { Showcase } from "./components/dialogue-projects/Showcase.tsx";
import { useDialogueStore } from "./store/dialogue-store.ts";

function App() {
	const { currentDialogue } = useDialogueStore();

	return (
		<div className="w-screen h-screen z-[9999] bg-transparent border-[30px] border-white rounded-md cursor-none overflow-auto shadow-blue-500/50">
			<Cursor />
			<Background />
			<Choices
				className={
					"absolute bottom-[50px] right-[200px] w-[650px] h-[300px] bg-transparent"
				}
			/>

			{currentDialogue && (
				<Hologram className="absolute top-[3.5rem] left-[20rem] transform -translate-x-1/2 -translate-y-1/2 z-[9999]" />
			)}

			{currentDialogue?.name === "/projects" && (
				<Showcase
					className={"absolute h-[20rem] bottom-[3rem] left-[8rem] w-[35rem]"}
				/>
			)}
		</div>
	);
}

export default App;
