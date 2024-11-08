import { animated, useSpring } from "@react-spring/three";
import { Text, useGLTF } from "@react-three/drei";
import { useCallback, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { HOLOGRAM_COLORS } from "../../../global-utils/colors";
import { offsetMap } from "../utils/button-states";
import {
	type ButtonGLTFResult,
	type ButtonProps,
	type ButtonState,
	defaultMaterialOptions,
	getPositionWhenOtherHovered,
} from "../utils/button-utils";

const SPRING_CONFIG = {
	mass: 1,
	tension: 280,
	friction: 50,
	precision: 0.001,
};

const HOVER_TIMEOUT = 3000;

interface AnimatedButtonProps extends ButtonProps {
	text: string;
	modelPath: string;
	geometryName: string;
	initialState: ButtonState;
	hoverState: ButtonState;
	buttonId: string;
	hoveredButton: string | null;
	activeButton: string | null;
	onHover?: (isHovered: boolean) => void;
	color?: string;
	metalness?: number;
	roughness?: number;
}

export const AnimatedButton = ({
	text,
	modelPath,
	geometryName,
	initialState,
	hoverState,
	buttonId,
	hoveredButton,
	activeButton,
	onHover,
	color = defaultMaterialOptions.color,
	metalness = defaultMaterialOptions.metalness,
	roughness = defaultMaterialOptions.roughness,
	...props
}: AnimatedButtonProps) => {
	const { nodes } = useGLTF(modelPath) as ButtonGLTFResult<typeof geometryName>;
	const timeoutRef = useRef<number | null>(null);
	const isActive = buttonId === activeButton;

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (timeoutRef.current !== null) {
				window.clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	// Get current state based on hover/active status
	const currentState = getPositionWhenOtherHovered(
		buttonId,
		hoveredButton,
		activeButton,
		initialState,
		hoverState,
		offsetMap,
	);

	// Create material
	const material = useMemo(() => {
		const materialColor =
			color instanceof THREE.Color ? color : new THREE.Color(color);
		return new THREE.MeshStandardMaterial({
			color: materialColor,
			metalness,
			roughness,
			side: THREE.DoubleSide,
			transparent: false,
		});
	}, [color, metalness, roughness]);

	// Text configuration
	const textConfig = useMemo(
		() => ({
			color: HOLOGRAM_COLORS.text.secondary,
			fontSize: 0.2,
			maxWidth: 2,
			lineHeight: 1,
			letterSpacing: 0.05,
			textAlign: "center" as const,
			font: "src/fonts/Space_Mono/SpaceMono-Regular.ttf",
		}),
		[],
	);

	// Determine button color
	const getButtonColor = () => {
		if (isActive) {
			return HOLOGRAM_COLORS.accent;
		}
		if (!activeButton && buttonId === hoveredButton) {
			return HOLOGRAM_COLORS.primary;
		}
		return HOLOGRAM_COLORS.text.secondary;
	};

	// Animation springs
	const { position, rotation, textPosition, buttonColor } = useSpring({
		position: currentState.position,
		rotation: currentState.rotation,
		textPosition: currentState.textPosition,
		buttonColor: getButtonColor(),
		config: SPRING_CONFIG,
		immediate: false,
	});

	// Event handlers
	const handlePointerEnter = useCallback(() => {
		if (activeButton) return;

		if (timeoutRef.current !== null) {
			window.clearTimeout(timeoutRef.current);
		}

		onHover?.(true);

		timeoutRef.current = window.setTimeout(() => {
			onHover?.(false);
			timeoutRef.current = null;
		}, HOVER_TIMEOUT);
	}, [onHover, activeButton]);

	const handlePointerDown = useCallback(() => {
		if (activeButton) return;

		if (timeoutRef.current !== null) {
			window.clearTimeout(timeoutRef.current);
		}
		onHover?.(false);
	}, [onHover, activeButton]);

	const AnimatedGroup = animated("group");
	const AnimatedMesh = animated("mesh");
	const AnimatedText = animated(Text);

	return (
		<AnimatedGroup
			{...props}
			position={position}
			rotation={rotation}
			onPointerEnter={handlePointerEnter}
			onPointerDown={handlePointerDown}
			dispose={null}
		>
			<AnimatedMesh
				name={geometryName}
				castShadow
				receiveShadow
				geometry={nodes[geometryName].geometry}
				material={material}
				rotation={[Math.PI / 2, 0, 0]}
			/>

			<AnimatedText position={textPosition} {...textConfig} color={buttonColor}>
				{text}
			</AnimatedText>
		</AnimatedGroup>
	);
};
