import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Grid } from "@react-three/postprocessing";
import { useState } from "react";
import { useDialogueStore } from "../../store/dialogue-store";
import { AnimatedButton } from "./components/AnimatedButton.tsx";
import { defaultState, hoverState } from "./utils/button-states.ts";

export const Choices = () => {
	const { setCurrentDialogue, currentDialogue } = useDialogueStore();
	const [hoveredButton, setHoveredButton] = useState<string | null>(null);

	const activeButton = currentDialogue?.name.slice(1) || null;

	const handleButtonHover = (buttonId: string, isHovered: boolean) => {
		setHoveredButton(isHovered ? buttonId : null);
	};

	return (
		<Canvas shadows="soft">
			<PerspectiveCamera makeDefault position={[-3.5, 1, 6]} />
			<EffectComposer>
				<Grid scale={2} />
			</EffectComposer>

			<AnimatedButton
				text="/projects"
				modelPath="/projects_button.glb"
				geometryName="ProjectsButton"
				buttonId="projects"
				initialState={defaultState.projects}
				hoverState={hoverState.projects}
				hoveredButton={hoveredButton}
				activeButton={activeButton}
				onClick={() => setCurrentDialogue("/projects")}
				onHover={(isHovered) => handleButtonHover("projects", isHovered)}
			/>

			<AnimatedButton
				text="/about"
				modelPath="/about_button.glb"
				geometryName="AboutButton"
				buttonId="about"
				initialState={defaultState.about}
				hoverState={hoverState.about}
				hoveredButton={hoveredButton}
				activeButton={activeButton}
				onClick={() => setCurrentDialogue("/about")}
				onHover={(isHovered) => handleButtonHover("about", isHovered)}
			/>

			<AnimatedButton
				text="/contacts"
				modelPath="/contacts_button.glb"
				geometryName="ContactsButton"
				buttonId="contacts"
				initialState={defaultState.contacts}
				hoverState={hoverState.contacts}
				hoveredButton={hoveredButton}
				activeButton={activeButton}
				onClick={() => setCurrentDialogue("/contacts")}
				onHover={(isHovered) => handleButtonHover("contacts", isHovered)}
			/>

			<ambientLight intensity={0.3} />
			<directionalLight position={[-100, -10, 2]} intensity={0.1} />
		</Canvas>
	);
};
