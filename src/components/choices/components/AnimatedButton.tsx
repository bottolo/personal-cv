import { Text, useGLTF } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

// Pre-create color instances and their hex values
const colorInstances = {
	hover: {
		color: new THREE.Color(COLORS.button.hover),
		hex: COLORS.button.hover,
	},
	active: {
		color: new THREE.Color(COLORS.button.active),
		hex: COLORS.button.active,
	},
	default: {
		color: new THREE.Color(COLORS.button.default),
		hex: COLORS.button.default,
	},
	inactive: {
		color: new THREE.Color(COLORS.button.inactive),
		hex: COLORS.button.inactive,
	},
} as const;

const transition = {
	type: "spring",
	stiffness: 100,
	damping: 30,
	mass: 0.5,
} as const;

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
	const meshRef = useRef<THREE.Mesh>(null);

	const material = useMemo(() => {
		return new THREE.MeshStandardMaterial({
			color: isActive
				? colorInstances.active.color
				: !activeButton
					? colorInstances.default.color
					: colorInstances.inactive.color,
			metalness,
			roughness,
			side: THREE.DoubleSide,
			transparent: true,
			opacity: !activeButton ? opacityValues.default : opacityValues.inactive,
		});
	}, [isActive, activeButton, metalness, roughness]);

	// Update material color when button state changes
	useEffect(() => {
		if (meshRef.current) {
			const targetColor = isHovered
				? colorInstances.hover.color
				: isActive
					? colorInstances.active.color
					: !activeButton
						? colorInstances.default.color
						: colorInstances.inactive.color;

			const meshMaterial = meshRef.current
				.material as THREE.MeshStandardMaterial;
			meshMaterial.color = targetColor;
			meshMaterial.needsUpdate = true;
		}
	}, [isHovered, isActive, activeButton]);

	const textConfig = useMemo(
		() => ({
			color: COLORS.text.secondary,
			fontSize: 0.2,
			maxWidth: 2,
			lineHeight: 1,
			letterSpacing: 0.05,
			textAlign: "center" as const,
			font: "fonts/Space_Mono/SpaceMono-Regular.ttf",
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

	const handleHoverStart = useCallback(() => {
		setIsHovered(true);
		onHover?.(true);
	}, [onHover]);

	const handleHoverEnd = useCallback(() => {
		setIsHovered(false);
		onHover?.(false);
	}, [onHover]);

	const handleClick = useCallback(
		(event: ThreeEvent<MouseEvent>) => {
			event.stopPropagation();
			onClick?.();
		},
		[onClick],
	);

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
			onClick={handleClick}
		>
			<mesh
				ref={meshRef}
				name={geometryName}
				castShadow
				receiveShadow
				geometry={nodes[geometryName].geometry}
				material={material}
				rotation={[Math.PI / 2, 0, 0]}
			/>

			<motion.group animate={textPosition} transition={transition}>
				<Text {...textConfig}>{text}</Text>
			</motion.group>
		</motion.group>
	);
};

AnimatedButton.displayName = "AnimatedButton";
