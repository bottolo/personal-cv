import { memo } from "react";

import { useDialogueStore } from "../../../../store/dialogue-store.ts";
import { SCENE_CONFIGS } from "../../utils/scene-configs.ts";
import { AboutScene } from "./AboutScenes.tsx";
import { BaseScene } from "./BaseScene.tsx";
import { ContactsScene } from "./ContactsScene.tsx";
import { DefaultScene } from "./DefaultScene.tsx";
import { ProjectsScene } from "./ProjectsScene.tsx";

export const SceneManager = memo(() => {
	const { currentDialogue } = useDialogueStore();
	const config =
		SCENE_CONFIGS[currentDialogue?.name as keyof typeof SCENE_CONFIGS] ||
		SCENE_CONFIGS.default;

	const getSceneComponent = () => {
		switch (currentDialogue?.name) {
			case "/projects":
				return <ProjectsScene />;
			case "/about":
				return <AboutScene />;
			case "/contacts":
				return <ContactsScene />;
			default:
				return <DefaultScene />;
		}
	};

	return (
		<BaseScene
			position={config.ringPosition}
			rotation={config.ringRotation}
			ambientLightIntensity={config.ambientLightIntensity}
			fogDistance={config.fogDistance}
		>
			{getSceneComponent()}
		</BaseScene>
	);
});
