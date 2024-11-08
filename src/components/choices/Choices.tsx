import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Grid } from "@react-three/postprocessing";
import { useState } from "react";
import { useDialogueStore } from "../../store/dialogue-store";
import { AnimatedBaseButton } from "./components/AnimatedButton.tsx";
import { defaultState, hoverState } from "./utils/button-states.ts";

export const Choices = () => {
	const { setCurrentDialogue } = useDialogueStore();
	const [hoveredButton, setHoveredButton] = useState<string | null>(null);

	const handleButtonHover = (buttonId: string, isHovered: boolean) => {
		setHoveredButton(isHovered ? buttonId : null);
	};

	return (
		<Canvas shadows="soft">
			<PerspectiveCamera makeDefault position={[-3.5, 1, 6]} />
			<EffectComposer>
				<Grid scale={2} />
			</EffectComposer>

			<AnimatedBaseButton
				text="/projects"
				modelPath="/projects_button.glb"
				geometryName="ProjectsButton"
				initialState={defaultState.projects}
				hoverState={hoverState.projects}
				onClick={() => setCurrentDialogue("/projects")}
				onHover={(isHovered) => handleButtonHover("projects", isHovered)}
			/>

			<AnimatedBaseButton
				text="/about"
				modelPath="/about_button.glb"
				geometryName="AboutButton"
				initialState={defaultState.about}
				hoverState={hoverState.about}
				onClick={() => setCurrentDialogue("/about")}
				onHover={(isHovered) => handleButtonHover("about", isHovered)}
			/>

			<AnimatedBaseButton
				text="/contacts"
				modelPath="/contacts_button.glb"
				geometryName="ContactsButton"
				initialState={defaultState.contacts}
				hoverState={hoverState.contacts}
				onClick={() => setCurrentDialogue("/contacts")}
				onHover={(isHovered) => handleButtonHover("contacts", isHovered)}
			/>

			<ambientLight intensity={0.5} />
			<directionalLight position={[-50, 0, 15]} intensity={0.3} />
		</Canvas>
	);
};
