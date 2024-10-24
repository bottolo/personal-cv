import { Cursor } from "./components/Cursor";
import { DynamicBackground } from "./components/background/DynamicBackground.tsx";
import { DialogueChoices } from "./components/dialogue/DialogueChoices";
import { DialogueHologram } from "./components/dialogue/DialogueHologram";
import { useDialogueStore } from "./store/dialogue-store.ts";

function App() {
	const { currentDialogue } = useDialogueStore();

	return (
		<div className="w-screen h-screen z-[9999] bg-transparent border-[10px] border-white rounded-md cursor-none">
			{/*<img*/}
			{/*	alt="background"*/}
			{/*	className="blur-md h-screen w-screen absolute z-[-1] object-cover"*/}
			{/*	src="https://i.pinimg.com/enabled/1200x/67/fb/01/67fb0100f0a187aefc8a27eb17807552.jpg"*/}
			{/*/>*/}
			<DynamicBackground
				sphereCount={30}
				minSize={100}
				maxSize={500}
				baseColor="147, 197, 253"
				minOpacity={0.1}
				maxOpacity={0.2}
			/>
			{/*<div>*/}
			<DialogueChoices />
			{/*</div>*/}
			{currentDialogue && (
				<DialogueHologram
					dialogue={currentDialogue}
					className="absolute top-14 left-14 transform -translate-x-1/2 -translate-y-1/2"
				/>
			)}
			<Cursor />
		</div>
	);
}

export default App;
