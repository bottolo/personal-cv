import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Grid } from "@react-three/postprocessing";
import { useDialogueStore } from "../../store/dialogue-store.ts";
import { AboutButton } from "../3d-models/buttons/AboutButton.tsx";
import { ContactsButton } from "../3d-models/buttons/ContactsButton.tsx";
import { ProjectsButton } from "../3d-models/buttons/ProjectsButton.tsx";

interface ChoicesProps {
	className?: string;
}
export const Choices = ({ className }: ChoicesProps) => {
	const { currentDialogue, setCurrentDialogue } = useDialogueStore();

	return (
		<Canvas shadows={"soft"}>
			<PerspectiveCamera makeDefault position={[-3.5, 1, 6]} />
			<EffectComposer>
				<Grid scale={2} />
			</EffectComposer>
			<ProjectsButton
				position={[0, 0, 0]}
				rotation={[0, -0.8, 0]}
				textPosition={[-1.1, 0.55, 1.5]}
				onClick={() => setCurrentDialogue("/projects")}
			/>
			<AboutButton
				position={[0, -0.01, 0]}
				rotation={[0, -0.8, 0]}
				textPosition={[-1.14, -0.12, 1.5]}
				onClick={() => setCurrentDialogue("/about")}
			/>
			<ContactsButton
				position={[0, -0.02, 0]}
				rotation={[0, -0.8, 0]}
				textPosition={[-1.05, -0.63, 1.3]}
				onClick={() => setCurrentDialogue("/contacts")}
			/>
			<ambientLight intensity={0.5} />
			<directionalLight position={[-50, 0, 15]} intensity={0.3} />
		</Canvas>
	);
};
