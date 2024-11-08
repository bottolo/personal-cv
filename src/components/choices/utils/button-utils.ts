import type { GroupProps } from "@react-three/fiber";
import type * as THREE from "three";
import type { GLTF } from "three-stdlib";

export const defaultMaterialOptions = {
	color: "#8c75e1",
	metalness: 1,
	roughness: 0.3,
} as const;

export interface ButtonState {
	position: [number, number, number];
	rotation: [number, number, number];
	textPosition: [number, number, number];
}

// Helper to add vectors
const addVectors = (
	a: [number, number, number],
	b: [number, number, number],
): [number, number, number] => {
	return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
};

export const getPositionWhenOtherHovered = (
	buttonId: string,
	hoveredButton: string | null,
	activeButton: string | null,
	initialState: ButtonState,
	hoverState: ButtonState,
	offsetMap: Record<string, Record<string, [number, number, number]>>,
): ButtonState => {
	let finalPosition = [...initialState.position] as [number, number, number];

	// If there's an active button
	if (activeButton) {
		// If this is the active button, use hover state
		if (buttonId === activeButton) {
			return hoverState;
		}
		// If this isn't the active button, apply offset from active button
		if (offsetMap[activeButton]?.[buttonId]) {
			finalPosition = addVectors(
				finalPosition,
				offsetMap[activeButton][buttonId],
			);
		}
	}
	// If no active button and this button is hovered
	else if (hoveredButton === buttonId) {
		return hoverState;
	}
	// If no active button and another button is hovered
	else if (hoveredButton && offsetMap[hoveredButton]?.[buttonId]) {
		finalPosition = addVectors(
			finalPosition,
			offsetMap[hoveredButton][buttonId],
		);
	}

	return {
		...initialState,
		position: finalPosition,
	};
};

export interface ButtonProps extends GroupProps {
	color?: string;
	metalness?: number;
	roughness?: number;
}
export interface BaseButtonProps extends ButtonProps {
	text: string;
	modelPath: string;
	geometryName: string;
	textPosition?: [number, number, number];
	textRotation?: [number, number, number];
}

export type ButtonGLTFResult<T extends string> = GLTF & {
	nodes: {
		[K in T]: THREE.Mesh;
	};
	materials: {
		[K in T]: THREE.MeshStandardMaterial;
	};
};
