import type { BaseButtonProps } from "../../choices/utils/button-utils.ts";
import { BaseButton } from "./BaseButton.tsx";

export function AboutButton(
	props: Omit<
		BaseButtonProps,
		"text" | "modelPath" | "geometryName" | "buttonId"
	>,
) {
	return (
		<BaseButton
			{...props}
			text="/about"
			modelPath="/about_button.glb"
			geometryName="AboutButton"
		/>
	);
}
