import type { GroupProps } from "@react-three/fiber";
import type * as THREE from "three";
import type { GLTF } from "three-stdlib";

export const defaultMaterialOptions = {
	color: "#8c75e1",
	metalness: 1,
	roughness: 0.3,
} as const;

export interface ButtonProps extends GroupProps {
	color?: string;
	metalness?: number;
	roughness?: number;
}

export type ButtonGLTFResult<T extends string> = GLTF & {
	nodes: {
		[K in T]: THREE.Mesh;
	};
	materials: {
		[K in T]: THREE.MeshStandardMaterial;
	};
};

export interface BaseButtonProps extends ButtonProps {
	text: string;
	modelPath: string;
	geometryName: string;
	textPosition?: [number, number, number];
	textRotation?: [number, number, number];
}
