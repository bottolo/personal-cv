import { useThree } from "@react-three/fiber";
import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { COLORS } from "../../../../../global-utils/colors.ts";
import { useDialogueStore } from "../../../../../store/dialogue-store.ts";

type DialoguePath = "/projects" | "/about" | "/contacts" | "default";

interface CameraConfig {
	position: THREE.Vector3;
	target: THREE.Vector3;
}

const CAMERA_POSITIONS: Record<DialoguePath, CameraConfig> = {
	"/projects": {
		position: new THREE.Vector3(-5, 0, 8),
		target: new THREE.Vector3(-5, 1, 7),
	},
	"/about": {
		position: new THREE.Vector3(8, 20, 0),
		target: new THREE.Vector3(-3.5, 1, 3),
	},
	"/contacts": {
		position: new THREE.Vector3(15, 15, -30),
		target: new THREE.Vector3(-10, -20, 15),
	},
	default: {
		position: new THREE.Vector3(-5, 2, 10),
		target: new THREE.Vector3(-3.5, 1, 3),
	},
} as const;

export const CameraController = () => {
	const { camera } = useThree();
	const { currentDialogue } = useDialogueStore();
	const previousDialogue = useRef(currentDialogue);
	const interferenceRef = useRef<HTMLDivElement | null>(null);
	const transitionTimeoutRef = useRef<number>();

	const cleanupInterference = useCallback(() => {
		if (interferenceRef.current) {
			document.body.removeChild(interferenceRef.current);
			interferenceRef.current = null;
		}
		if (transitionTimeoutRef.current) {
			window.clearTimeout(transitionTimeoutRef.current);
		}
	}, []);

	const createInterferenceOverlay = useCallback(() => {
		const overlay = document.createElement("div");
		overlay.style.position = "fixed";
		overlay.style.inset = "0";
		overlay.style.background = "white";
		overlay.style.opacity = "0";
		overlay.style.pointerEvents = "none";
		overlay.style.zIndex = "1000";
		overlay.style.transition = "opacity 0.1s ease";
		document.body.appendChild(overlay);
		return overlay;
	}, []);

	const updateCamera = useCallback(
		(path: DialoguePath) => {
			const cameraConfig = CAMERA_POSITIONS[path];
			camera.position.copy(cameraConfig.position);
			camera.lookAt(cameraConfig.target);
		},
		[camera],
	);

	const handleTransition = useCallback(() => {
		if (!interferenceRef.current) {
			interferenceRef.current = createInterferenceOverlay();
		}

		interferenceRef.current.style.opacity = "0.8";
		interferenceRef.current.style.backgroundImage = `
            repeating-linear-gradient(
                0deg,
                ${COLORS.effects.scanLine} 0px,
                ${COLORS.effects.scanLine} 1px,
                transparent 2px,
                transparent 4px
            )
        `;

		const dialoguePath = (currentDialogue?.name || "default") as DialoguePath;
		updateCamera(dialoguePath);

		transitionTimeoutRef.current = window.setTimeout(() => {
			if (interferenceRef.current) {
				interferenceRef.current.style.opacity = "0";
			}
		}, 150);

		previousDialogue.current = currentDialogue;
	}, [currentDialogue, createInterferenceOverlay, updateCamera]);

	useEffect(() => {
		if (currentDialogue?.name !== previousDialogue.current?.name) {
			handleTransition();
		}

		return cleanupInterference;
	}, [currentDialogue, handleTransition, cleanupInterference]);

	return null;
};

CameraController.displayName = "CameraController";
