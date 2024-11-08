import { Text, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useMemo, useState } from "react";
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
	metalness: 1,
	roughness: 0.3,
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
		// Get initial color based on state
		const initialColor = isActive
			? COLORS.button.active
			: !activeButton
				? COLORS.button.default
				: COLORS.button.inactive;

		return new THREE.MeshStandardMaterial({
			color: new THREE.Color(initialColor),
			metalness,
			roughness,
			side: THREE.DoubleSide,
			transparent: true,
			opacity: initialColor.includes("rgba")
				? Number.parseFloat(initialColor.split(",")[3])
				: 1,
		});
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

	const getCurrentPosition = () => {
		if (activeButton) {
			return positions.active[activeButton][buttonId];
		}
		return positions.default[buttonId];
	};

	const currentPosition = getCurrentPosition();

	const transition = {
		type: "spring",
		stiffness: 100,
		damping: 30,
		mass: 0.5,
	} as const;

	const getButtonColor = () => {
		if (isHovered) {
			return COLORS.button.hover;
		}
		if (isActive) {
			return COLORS.button.active;
		}
		if (!activeButton) {
			return COLORS.button.default;
		}
		return COLORS.button.inactive;
	};

	const handleHoverStart = () => {
		setIsHovered(true);
		onHover?.(true);
	};

	const handleHoverEnd = () => {
		setIsHovered(false);
		onHover?.(false);
	};

	return (
		<motion.group
			initial={false}
			animate={{
				x: currentPosition.position[0],
				y: currentPosition.position[1],
				z: currentPosition.position[2],
				rotateX: currentPosition.rotation[0],
				rotateY: currentPosition.rotation[1],
				rotateZ: currentPosition.rotation[2],
			}}
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
					color: getButtonColor(),
				}}
				transition={transition}
			/>

			<motion.group
				animate={{
					x: currentPosition.textPosition[0],
					y: currentPosition.textPosition[1],
					z: currentPosition.textPosition[2],
				}}
				transition={transition}
			>
				<Text {...textConfig}>{text}</Text>
			</motion.group>
		</motion.group>
	);
};
