import type { BaseButtonProps } from "../../choices/utils/button-utils.ts";
import { BaseButton } from "./BaseButton.tsx";

export function ProjectsButton(
	props: Omit<
		BaseButtonProps,
		"text" | "modelPath" | "geometryName" | "buttonId"
	>,
) {
	return (
		<BaseButton
			{...props}
			text="/projects"
			modelPath="/projects_button.glb"
			geometryName="ProjectsButton"
		/>
	);
}
