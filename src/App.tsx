import { Choices } from "./components/dialogue/choices/Choices.tsx";
import { Hologram } from "./components/dialogue/hologram/Hologram.tsx";

import { AnimatedBackground } from "./components/background/AnimatedBackground.tsx";
import { Cursor } from "./components/background/Cursor.tsx";
import { GridOverlay } from "./components/background/GridOverlay.tsx";
import { Showcase } from "./components/projects/Showcase.tsx";
import { useDialogueStore } from "./store/dialogue-store.ts";

function App() {
	const { currentDialogue } = useDialogueStore();

	return (
		<div className="w-screen h-screen z-[9998] bg-transparent border-[30px] border-white rounded-md cursor-none overflow-auto shadow-blue-500/50">
			<AnimatedBackground
				sphereCount={30}
				cubeCount={10}
				minSize={10}
				maxSize={300}
				minDuration={20}
				maxDuration={50}
				baseColor="255, 255, 255"
				minOpacity={0.05}
				maxOpacity={0.3}
				depthLayers={10}
			/>

			<GridOverlay />

			<Choices />

			{currentDialogue && (
				<Hologram
					dialogue={currentDialogue}
					className="absolute top-[15rem] left-[450px] transform -translate-x-1/2 -translate-y-1/2"
				/>
			)}
			<Cursor />
			{currentDialogue?.name === "/projects" && <Showcase />}
		</div>
	);
}

export default App;
