import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { createMaterial } from "./utils/create-material.ts";
import type { GeometricProps } from "./utils/geometry-props.ts";
import { defaultMaterialOptions } from "./utils/material-options.ts";
import { defaultRotationOptions } from "./utils/rotation-options.ts";

// Shared types

// Geometry-specific options

interface CubeOptions {
	width?: number;
	height?: number;
	depth?: number;
	widthSegments?: number;
	heightSegments?: number;
	depthSegments?: number;
}

interface CubeProps extends GeometricProps {
	geometryOptions?: CubeOptions;
}

const defaultCubeOptions: CubeOptions = {
	width: 1,
	height: 1,
	depth: 1,
	widthSegments: 1,
	heightSegments: 1,
	depthSegments: 1,
};

// Cube Component
export function Cube({
	materialOptions = defaultMaterialOptions,
	rotationOptions = defaultRotationOptions,
	geometryOptions = defaultCubeOptions,
	scale = 1,
	...props
}: CubeProps) {
	const groupRef = useRef<THREE.Group>(null);

	const geometry = useMemo(() => {
		const merged = { ...defaultCubeOptions, ...geometryOptions };
		return new THREE.BoxGeometry(
			merged.width,
			merged.height,
			merged.depth,
			merged.widthSegments,
			merged.heightSegments,
			merged.depthSegments,
		);
	}, [geometryOptions]);

	const material = useMemo(
		() => createMaterial(materialOptions),
		[materialOptions],
	);

	useFrame((state, delta) => {
		if (groupRef.current && rotationOptions.axis !== "none") {
			const speed = rotationOptions.speed ?? defaultRotationOptions.speed;
			groupRef.current.rotation[rotationOptions.axis ?? "y"] += delta * speed;
		}
	});

	return (
		<group {...props}>
			<group ref={groupRef} name="Scene">
				<mesh
					geometry={geometry}
					material={material}
					scale={scale}
					castShadow
					receiveShadow
				/>
			</group>
		</group>
	);
}
