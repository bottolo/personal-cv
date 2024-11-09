import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Grid } from "@react-three/postprocessing";
import { memo, useCallback, useMemo } from "react";
import { useDialogueStore } from "../../store/dialogue-store";
import { AnimatedButton } from "./components/AnimatedButton";
import { buttonPositions } from "./utils/button-states";

const BUTTONS = [
	{
		id: "projects",
		text: "/projects",
		modelPath: "projects_button.glb",
		geometryName: "ProjectsButton",
	},
	{
		id: "about",
		text: "/about",
		modelPath: "about_button.glb",
		geometryName: "AboutButton",
	},
	{
		id: "contacts",
		text: "/contacts",
		modelPath: "contacts_button.glb",
		geometryName: "ContactsButton",
	},
] as const;

const Lights = memo(() => (
	<>
		<ambientLight intensity={0.3} />
		<directionalLight position={[-100, -10, 2]} intensity={0.1} />
	</>
));

Lights.displayName = "Lights";

const Camera = memo(() => (
	<PerspectiveCamera makeDefault position={[-3.5, 0.8, 6]} />
));

Camera.displayName = "Camera";

const Effects = memo(() => (
	<EffectComposer>
		<Grid scale={2} />
	</EffectComposer>
));

Effects.displayName = "Effects";

const ButtonsContainer = memo(
	({
		activeButton,
		handleButtonClick,
	}: {
		activeButton: string | null;
		handleButtonClick: (path: string) => void;
	}) => (
		<>
			{BUTTONS.map((button) => (
				<AnimatedButton
					key={button.id}
					text={button.text}
					modelPath={`${import.meta.env.BASE_URL}${button.modelPath}`}
					geometryName={button.geometryName}
					buttonId={button.id}
					activeButton={activeButton}
					positions={buttonPositions}
					onClick={() => handleButtonClick(button.text)}
				/>
			))}
		</>
	),
);

ButtonsContainer.displayName = "ButtonsContainer";

export const Choices = memo(() => {
	const { setCurrentDialogue, currentDialogue } = useDialogueStore();

	const activeButton = useMemo(
		() => currentDialogue?.name.slice(1) || null,
		[currentDialogue?.name],
	);

	const handleButtonClick = useCallback(
		(path: string) => {
			setCurrentDialogue(currentDialogue?.name === path ? null : path);
		},
		[currentDialogue?.name, setCurrentDialogue],
	);

	const canvasConfig = useMemo(
		() => ({
			shadows: "soft" as const,
			gl: {
				antialias: true,
				powerPreference: "high-performance",
			},
			dpr: window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio,
			performance: { min: 0.5 },
		}),
		[],
	);

	return (
		<Canvas {...canvasConfig}>
			<Camera />
			<Effects />
			<ButtonsContainer
				activeButton={activeButton}
				handleButtonClick={handleButtonClick}
			/>
			<Lights />
		</Canvas>
	);
});

Choices.displayName = "Choices";
