import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { createMaterial } from "./utils/create-material.ts";
import type { GeometricProps } from "./utils/geometry-props.ts";
import { defaultMaterialOptions } from "./utils/material-options.ts";
import { defaultRotationOptions } from "./utils/rotation-options.ts";

interface TetrahedronOptions {
	radius?: number;
	detail?: number;
}

const defaultTetrahedronOptions: TetrahedronOptions = {
	radius: 1,
	detail: 0,
};

interface TetrahedronProps extends GeometricProps {
	geometryOptions?: TetrahedronOptions;
}

// Tetrahedron Component
export function Tetrahedron({
	materialOptions = defaultMaterialOptions,
	rotationOptions = defaultRotationOptions,
	geometryOptions = defaultTetrahedronOptions,
	scale = 1,
	...props
}: TetrahedronProps) {
	const groupRef = useRef<THREE.Group>(null);

	const geometry = useMemo(() => {
		const merged = { ...defaultTetrahedronOptions, ...geometryOptions };
		return new THREE.TetrahedronGeometry(merged.radius, merged.detail);
	}, [geometryOptions]);

	const material = useMemo(
		() => createMaterial(materialOptions),
		[materialOptions],
	);

	useFrame((_state, delta) => {
		if (groupRef.current && rotationOptions.axis !== "none") {
			const speed =
				(rotationOptions.speed ?? defaultRotationOptions.speed) || 0.01;
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
