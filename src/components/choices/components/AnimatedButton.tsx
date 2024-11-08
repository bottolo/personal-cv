import { Text, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useCallback, useMemo, useState } from "react";
import * as THREE from "three";
import { COLORS } from "../../../global-utils/colors";
import type { ButtonPositions } from "../utils/button-states";
import type { ButtonGLTFResult } from "../utils/button-utils";

interface AnimatedButtonProps {
	text: string;
	modelPath: string;
	geometryName: string;
	buttonId: string;
	activeButton: string | null;
	positions: ButtonPositions;
	metalness?: number;
	roughness?: number;
	onHover?: (isHovered: boolean) => void;
	onClick?: () => void;
}

const defaultMaterialOptions = {
	metalness: 0.9,
	roughness: 0.3,
} as const;

// Pre-create color instances
const colorInstances = {
	hover: new THREE.Color(COLORS.button.hover),
	active: new THREE.Color(COLORS.button.active),
	default: new THREE.Color(COLORS.button.default),
	inactive: new THREE.Color(COLORS.button.inactive),
} as const;

// Memoize transition config
const transition = {
	type: "spring",
	stiffness: 100,
	damping: 30,
	mass: 0.5,
} as const;

// Extract opacity values once
const getOpacity = (color: string) =>
	color.includes("rgba") ? Number.parseFloat(color.split(",")[3]) : 1;

const opacityValues = {
	default: getOpacity(COLORS.button.default),
	inactive: getOpacity(COLORS.button.inactive),
} as const;

export const AnimatedButton = ({
	text,
	modelPath,
	geometryName,
	buttonId,
	activeButton,
	positions,
	metalness = defaultMaterialOptions.metalness,
	roughness = defaultMaterialOptions.roughness,
	onHover,
	onClick,
}: AnimatedButtonProps) => {
	const { nodes } = useGLTF(modelPath) as ButtonGLTFResult<typeof geometryName>;
	const isActive = buttonId === activeButton;
	const [isHovered, setIsHovered] = useState(false);

	const material = useMemo(() => {
		const material = new THREE.MeshStandardMaterial({
			color: isActive
				? colorInstances.active
				: !activeButton
					? colorInstances.default
					: colorInstances.inactive,
			metalness,
			roughness,
			side: THREE.DoubleSide,
			transparent: true,
			opacity: !activeButton ? opacityValues.default : opacityValues.inactive,
		});

		material.needsUpdate = false;
		return material;
	}, [isActive, activeButton, metalness, roughness]);

	const textConfig = useMemo(
		() => ({
			color: COLORS.text.secondary,
			fontSize: 0.2,
			maxWidth: 2,
			lineHeight: 1,
			letterSpacing: 0.05,
			textAlign: "center" as const,
			font: "src/fonts/Space_Mono/SpaceMono-Regular.ttf",
		}),
		[],
	);

	const currentPosition = useMemo(
		() =>
			activeButton
				? positions.active[activeButton][buttonId]
				: positions.default[buttonId],
		[activeButton, buttonId, positions],
	);

	const buttonColor = useMemo(() => {
		if (isHovered) return colorInstances.hover;
		if (isActive) return colorInstances.active;
		if (!activeButton) return colorInstances.default;
		return colorInstances.inactive;
	}, [isHovered, isActive, activeButton]);

	const handleHoverStart = useCallback(() => {
		setIsHovered(true);
		onHover?.(true);
	}, [onHover]);

	const handleHoverEnd = useCallback(() => {
		setIsHovered(false);
		onHover?.(false);
	}, [onHover]);

	const animatePosition = useMemo(
		() => ({
			x: currentPosition.position[0],
			y: currentPosition.position[1],
			z: currentPosition.position[2],
			rotateX: currentPosition.rotation[0],
			rotateY: currentPosition.rotation[1],
			rotateZ: currentPosition.rotation[2],
		}),
		[currentPosition],
	);

	const textPosition = useMemo(
		() => ({
			x: currentPosition.textPosition[0],
			y: currentPosition.textPosition[1],
			z: currentPosition.textPosition[2],
		}),
		[currentPosition],
	);

	return (
		<motion.group
			initial={false}
			animate={animatePosition}
			whileHover={{
				scale: 1.1,
			}}
			transition={transition}
			dispose={null}
			onHoverStart={handleHoverStart}
			onHoverEnd={handleHoverEnd}
			onClick={onClick}
		>
			<motion.mesh
				name={geometryName}
				castShadow
				receiveShadow
				geometry={nodes[geometryName].geometry}
				material={material}
				rotation={[Math.PI / 2, 0, 0]}
				animate={{
					color: buttonColor,
				}}
				transition={transition}
			/>

			<motion.group animate={textPosition} transition={transition}>
				<Text {...textConfig}>{text}</Text>
			</motion.group>
		</motion.group>
	);
};
