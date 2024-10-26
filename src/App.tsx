import { AnimatedBackground } from "./components/background/AnimatedBackground.tsx";
import { Cursor } from "./components/background/Cursor.tsx";
import { Choices } from "./components/dialogue/choices/Choices.tsx";
import { Hologram } from "./components/dialogue/hologram/Hologram.tsx";
import { Projects } from "./components/projects/Projects.tsx";
import { useDialogueStore } from "./store/dialogue-store.ts";

function App() {
	const { currentDialogue } = useDialogueStore();

	return (
		<div className="w-screen h-screen z-[9999] bg-transparent border-[30px] border-white rounded-md cursor-none overflow-auto shadow-blue-500/50">
			<AnimatedBackground
				sphereCount={30}
				minSize={100}
				maxSize={500}
				baseColor="147, 197, 253"
				minOpacity={0.1}
				maxOpacity={0.2}
			/>
			<Choices />

			{currentDialogue && (
				<Hologram
					dialogue={currentDialogue}
					className="absolute top-[15rem] left-[450px] transform -translate-x-1/2 -translate-y-1/2"
				/>
			)}
			<Cursor />
			<Projects />
		</div>
	);
}

export default App;
