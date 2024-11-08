import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Grid } from "@react-three/postprocessing";
import { useState } from "react";
import { useDialogueStore } from "../../store/dialogue-store";
import { AnimatedButton } from "./components/AnimatedButton";
import { buttonPositions } from "./utils/button-states";

export const Choices = () => {
	const { setCurrentDialogue, currentDialogue } = useDialogueStore();
	const [hoveredButton, setHoveredButton] = useState<string | null>(null);

	const activeButton = currentDialogue?.name.slice(1) || null;

	const handleButtonHover = (buttonId: string, isHovered: boolean) => {
		setHoveredButton(isHovered ? buttonId : null);
	};

	const handleButtonClick = (path: string) => {
		if (currentDialogue?.name === path) {
			// If clicking the same button, set dialogue to null
			setCurrentDialogue(null);
		} else {
			// If clicking a different button, set the new dialogue
			setCurrentDialogue(path);
		}
	};

	return (
		<Canvas shadows="soft">
			<PerspectiveCamera makeDefault position={[-3.5, 0.8, 6]} />
			<EffectComposer>
				<Grid scale={2} />
			</EffectComposer>

			<AnimatedButton
				text="/projects"
				modelPath="/projects_button.glb"
				geometryName="ProjectsButton"
				buttonId="projects"
				activeButton={activeButton}
				positions={buttonPositions}
				onClick={() => handleButtonClick("/projects")}
				onHover={(isHovered) => handleButtonHover("projects", isHovered)}
			/>

			<AnimatedButton
				text="/about"
				modelPath="/about_button.glb"
				geometryName="AboutButton"
				buttonId="about"
				activeButton={activeButton}
				positions={buttonPositions}
				onClick={() => handleButtonClick("/about")}
				onHover={(isHovered) => handleButtonHover("about", isHovered)}
			/>

			<AnimatedButton
				text="/contacts"
				modelPath="/contacts_button.glb"
				geometryName="ContactsButton"
				buttonId="contacts"
				activeButton={activeButton}
				positions={buttonPositions}
				onClick={() => handleButtonClick("/contacts")}
				onHover={(isHovered) => handleButtonHover("contacts", isHovered)}
			/>

			<ambientLight intensity={0.3} />
			<directionalLight position={[-100, -10, 2]} intensity={0.1} />
		</Canvas>
	);
};
