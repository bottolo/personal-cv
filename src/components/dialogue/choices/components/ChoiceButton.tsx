import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import type * as THREE from "three";
import type { StateConfig } from "../../types/dialogue-config-types.ts";

interface DialogueBoxProps {
	text: string;
	color: string;
	confirmedColor?: string;
	fontSize: number;
	active?: boolean;
	onClick?: () => void;
}

export const ChoiceButton = ({
	text,
	color,
	confirmedColor,
	fontSize,
	active = false,
	onClick,
}: DialogueBoxProps) => {
	const groupRef = useRef<THREE.Group>();
	const meshRef = useRef<THREE.Mesh>();
	const textRef = useRef<THREE.Group>();
	const [mousePosition, setMousePosition] = useState([0, 0]);
	const [isHovered, setIsHovered] = useState(false);
	const { viewport } = useThree();

	const stateConfigs = useMemo(
		() => ({
			active: {
				box: {
					scale: [0.7, 0.65, 0.75],
					position: [-0.2, -1, 3],
					rotation: [-0.2, -1.9, 0],
				},
				text: {
					position: [-0.8, 0.1, 12],
					rotation: [-0.1, -0.3, 0.02],
					fontSize: fontSize,
				},
			} as StateConfig,
			inactive: {
				box: {
					scale: [0.3, 0.7, 1],
					position: [0, 0, 0],
					rotation: [-0.1, -2.1, 0],
				},
				text: {
					position: [-0.6, 0.2, 8],
					rotation: [-0.2, -0.3, 0],
					fontSize: fontSize / 1.4,
				},
			} as StateConfig,
		}),
		[fontSize],
	);

	const currentConfig = active ? stateConfigs.active : stateConfigs.inactive;

	useFrame(() => {
		if (!groupRef.current || !meshRef.current || !textRef.current) return;

		const targetRotX = -mousePosition[1] / (active ? 7 : 5);
		const targetRotY = mousePosition[0] / (active ? 7 : 5);

		// Reset rotation when not hovered and not active
		const shouldResetRotation = !isHovered && !active;
		const finalTargetRotX = shouldResetRotation ? 0 : targetRotX;
		const finalTargetRotY = shouldResetRotation ? 0 : targetRotY;

		groupRef.current.rotation.x +=
			(finalTargetRotX - groupRef.current.rotation.x) * 0.1;
		groupRef.current.rotation.y +=
			(finalTargetRotY - groupRef.current.rotation.y) * 0.1;

		// Determine target scale based on hover and active state
		const targetScale = isHovered
			? [
					currentConfig.box.scale[0] * 1.03,
					currentConfig.box.scale[1],
					currentConfig.box.scale[2] * 1.03,
				]
			: currentConfig.box.scale;

		// Smoothly transition scale
		meshRef.current.scale.x += (targetScale[0] - meshRef.current.scale.x) * 0.1;
		meshRef.current.scale.y += (targetScale[1] - meshRef.current.scale.y) * 0.1;
		meshRef.current.scale.z += (targetScale[2] - meshRef.current.scale.z) * 0.1;

		// Smoothly transition position with faster return
		const positionLerpFactor = !isHovered && !active ? 0.15 : 0.1;
		meshRef.current.position.x +=
			(currentConfig.box.position[0] - meshRef.current.position.x) *
			positionLerpFactor;
		meshRef.current.position.y +=
			(currentConfig.box.position[1] - meshRef.current.position.y) *
			positionLerpFactor;
		meshRef.current.position.z +=
			(currentConfig.box.position[2] - meshRef.current.position.z) *
			positionLerpFactor;

		// Smoothly transition rotation with faster return
		const rotationLerpFactor = !isHovered && !active ? 0.15 : 0.1;
		meshRef.current.rotation.x +=
			(currentConfig.box.rotation[0] - meshRef.current.rotation.x) *
			rotationLerpFactor;
		meshRef.current.rotation.y +=
			(currentConfig.box.rotation[1] - meshRef.current.rotation.y) *
			rotationLerpFactor;
		meshRef.current.rotation.z +=
			(currentConfig.box.rotation[2] - meshRef.current.rotation.z) *
			rotationLerpFactor;

		// Text transitions
		const textLerpFactor = !isHovered && !active ? 0.15 : 0.1;
		textRef.current.position.x +=
			(currentConfig.text.position[0] - textRef.current.position.x) *
			textLerpFactor;
		textRef.current.position.y +=
			(currentConfig.text.position[1] - textRef.current.position.y) *
			textLerpFactor;
		textRef.current.position.z +=
			(currentConfig.text.position[2] - textRef.current.position.z) *
			textLerpFactor;

		textRef.current.rotation.x +=
			(currentConfig.text.rotation[0] - textRef.current.rotation.x) *
			textLerpFactor;
		textRef.current.rotation.y +=
			(currentConfig.text.rotation[1] - textRef.current.rotation.y) *
			textLerpFactor;
		textRef.current.rotation.z +=
			(currentConfig.text.rotation[2] - textRef.current.rotation.z) *
			textLerpFactor;
	});

	const handleMouseMove = (event: { point: { x: number; y: number } }) => {
		const x = (event.point.x / viewport.width) * 2;
		const y = (event.point.y / viewport.height) * 2;
		setMousePosition([x, y]);
	};

	const lights = useMemo(
		() => ({
			ambient: {
				intensity: 0.9,
			},
			directional: [
				{
					position: [-400, 150, 100],
					intensity: 1.0,
				},
				{
					position: [-10, -10, -10],
					intensity: 0.7,
				},
				{
					position: [100, 100, 100],
					intensity: 0.4,
				},
			],
		}),
		[],
	);

	return (
		<>
			<ambientLight intensity={lights.ambient.intensity} />
			{lights.directional.map((light, index) => (
				<directionalLight
					key={index}
					position={light?.position}
					intensity={light.intensity}
				/>
			))}

			<group
				ref={groupRef}
				onPointerMove={handleMouseMove}
				onPointerOver={() => setIsHovered(true)}
				onPointerOut={() => setIsHovered(false)}
				onClick={onClick}
			>
				<mesh ref={meshRef}>
					<boxGeometry args={[14, 5, active ? 18 : 14]} />
					<meshStandardMaterial
						color={active ? confirmedColor : color}
						metalness={0.9}
						roughness={0.7}
						transparent
						opacity={active ? 0.9 : isHovered ? 0.85 : 0.7}
					/>
				</mesh>

				<group ref={textRef}>
					<Text
						fontSize={currentConfig.text.fontSize}
						color="white"
						anchorX="center"
						anchorY="middle"
					>
						{text}
					</Text>
				</group>
			</group>
		</>
	);
};
