// src/hooks/useButtonAnimation.ts
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import { HOLOGRAM_COLORS } from "../../../global-utils/colors.ts";
import type { Dialogue } from "../../../global-utils/dialogue-types.ts";
import {
	BUTTONS_CONFIG,
	type ButtonId,
	type ButtonState,
} from "./button-config.ts";

interface ButtonAnimationState {
	position: THREE.Vector3;
	rotation: THREE.Euler;
	textPosition: THREE.Vector3;
	scale: THREE.Vector3;
	color: THREE.Color;
}

const lerp = (start: number, end: number, t: number) =>
	start * (1 - t) + end * t;

export const useButtonAnimation = (
	buttonId: ButtonId,
	currentDialogue: Dialogue | null,
) => {
	const [isHovered, setIsHovered] = useState(false);
	const [hoveredButton, setHoveredButton] = useState<ButtonId | null>(null);
	const stateRef = useRef<ButtonAnimationState>({
		position: new THREE.Vector3(),
		rotation: new THREE.Euler(),
		textPosition: new THREE.Vector3(),
		scale: new THREE.Vector3(1, 1, 1),
		color: new THREE.Color(HOLOGRAM_COLORS.primary),
	});

	useFrame((_, delta) => {
		const lerpFactor = delta * 3; // Slower lerp factor for smoother animation

		let targetState: ButtonState;

		if (currentDialogue?.name === buttonId) {
			targetState = BUTTONS_CONFIG.active[buttonId];
		} else if (isHovered) {
			targetState = BUTTONS_CONFIG.hover[buttonId];
		} else if (hoveredButton && hoveredButton !== buttonId) {
			targetState = BUTTONS_CONFIG.otherButtonsOnHover[buttonId];
		} else {
			targetState = BUTTONS_CONFIG.default[buttonId];
		}

		// Smooth position update
		stateRef.current.position.lerp(
			new THREE.Vector3(...targetState.position),
			lerpFactor,
		);

		// Smooth rotation update
		const targetRotation = new THREE.Euler(...targetState.rotation);
		stateRef.current.rotation.x = lerp(
			stateRef.current.rotation.x,
			targetRotation.x,
			lerpFactor,
		);
		stateRef.current.rotation.y = lerp(
			stateRef.current.rotation.y,
			targetRotation.y,
			lerpFactor,
		);
		stateRef.current.rotation.z = lerp(
			stateRef.current.rotation.z,
			targetRotation.z,
			lerpFactor,
		);

		// Smooth text position update
		stateRef.current.textPosition.lerp(
			new THREE.Vector3(...targetState.textPosition),
			lerpFactor,
		);

		// Smooth scale update
		stateRef.current.scale.lerp(
			new THREE.Vector3(...targetState.scale),
			lerpFactor,
		);

		// Smooth color update
		stateRef.current.color.lerp(new THREE.Color(targetState.color), lerpFactor);
	});

	return {
		state: stateRef.current,
		setIsHovered: (hovered: boolean) => {
			setIsHovered(hovered);
			setHoveredButton(hovered ? buttonId : null);
		},
	};
};
