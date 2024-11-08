import { Text, useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import {
	type BaseButtonProps,
	type ButtonGLTFResult,
	defaultMaterialOptions,
} from "../utils/button-utils.ts";

export function BaseButton({
	color = defaultMaterialOptions.color,
	metalness = defaultMaterialOptions.metalness,
	roughness = defaultMaterialOptions.roughness,
	text,
	modelPath,
	geometryName,
	textPosition = [0, 0.01, 2],
	textRotation = [0, 0, 0],
	...props
}: BaseButtonProps) {
	const { nodes } = useGLTF(modelPath) as ButtonGLTFResult<typeof geometryName>;

	const material = useMemo(() => {
		return new THREE.MeshStandardMaterial({
			color,
			metalness,
			roughness,
			side: THREE.DoubleSide,
		});
	}, [color, metalness, roughness]);

	const textConfig = useMemo(
		() => ({
			color: "#ffffff",
			fontSize: 0.2,
			maxWidth: 2,
			lineHeight: 1,
			letterSpacing: 0.05,
			textAlign: "center" as const,
			font: "src/fonts/Space_Mono/SpaceMono-Regular.ttf",
		}),
		[],
	);

	return (
		<group {...props} dispose={null}>
			<mesh
				name={geometryName}
				castShadow
				receiveShadow
				geometry={nodes[geometryName].geometry}
				material={material}
				rotation={[Math.PI / 2, 0, 0]}
			/>

			<Text position={textPosition} rotation={textRotation} {...textConfig}>
				{text}
			</Text>
		</group>
	);
}
