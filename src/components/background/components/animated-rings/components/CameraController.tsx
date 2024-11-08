import { useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { HOLOGRAM_COLORS } from "../../../../../global-utils/colors.ts";
import { useDialogueStore } from "../../../../../store/dialogue-store.ts";

const CAMERA_POSITIONS = {
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
		position: new THREE.Vector3(-5, 2, 10.5),
		target: new THREE.Vector3(-3.5, 1, 3),
	},
};

export const CameraController = () => {
	const { camera } = useThree();
	const { currentDialogue } = useDialogueStore();
	const [isTransitioning, setIsTransitioning] = useState(false);
	const previousDialogue = useRef(currentDialogue);
	const interferenceRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!interferenceRef.current) {
			const overlay = document.createElement("div");
			overlay.style.position = "fixed";
			overlay.style.inset = "0";
			overlay.style.background = "white";
			overlay.style.opacity = "0";
			overlay.style.pointerEvents = "none";
			overlay.style.zIndex = "1000";
			overlay.style.transition = "opacity 0.1s ease";
			document.body.appendChild(overlay);
			interferenceRef.current = overlay;
		}

		// Changed to check name instead of id
		if (currentDialogue?.name !== previousDialogue.current?.name) {
			setIsTransitioning(true);

			if (interferenceRef.current) {
				interferenceRef.current.style.opacity = "0.8";
				interferenceRef.current.style.backgroundImage = `
                    repeating-linear-gradient(
                        0deg,
                        ${HOLOGRAM_COLORS.effects.scanLine} 0px,
                        ${HOLOGRAM_COLORS.effects.scanLine} 1px,
                        transparent 2px,
                        transparent 4px
                    )
                `;
			}

			const cameraConfig =
				CAMERA_POSITIONS[currentDialogue?.name] || CAMERA_POSITIONS.default;

			camera.position.copy(cameraConfig.position);
			camera.lookAt(cameraConfig.target);

			setTimeout(() => {
				if (interferenceRef.current) {
					interferenceRef.current.style.opacity = "0";
				}
				setIsTransitioning(false);
			}, 150);

			previousDialogue.current = currentDialogue;
		}

		return () => {
			if (interferenceRef.current) {
				document.body.removeChild(interferenceRef.current);
				interferenceRef.current = null;
			}
		};
	}, [camera, currentDialogue]);

	return null;
};
