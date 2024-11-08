import { useGLTF } from "@react-three/drei";
import type { BaseButtonProps } from "../../choices/utils/button-utils.ts";
import { BaseButton } from "./BaseButton.tsx";

export function ContactsButton(
	props: Omit<BaseButtonProps, "text" | "modelPath" | "geometryName">,
) {
	return (
		<BaseButton
			{...props}
			text="/contacts"
			modelPath="/contacts_button.glb"
			geometryName="ContactsButton"
		/>
	);
}

useGLTF.preload("/contacts_button.glb");
