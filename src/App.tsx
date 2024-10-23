import { Cursor } from "./components/Cursor.tsx";
import DynamicBackground from "./components/background/DynamicBackground.tsx";
import { DialogueChoice } from "./components/dialogue/DialogueChoice.tsx";

function App() {
	return (
		<div className="w-screen h-screen bg-black border-[10px] border-white rounded-md cursor-none">
			<DynamicBackground />
			<DialogueChoice active={true} debug={true} />
			<DialogueChoice active={false} debug={true} />
			<DialogueChoice active={false} debug={true} />
			<Cursor />
		</div>
	);
}

export default App;
