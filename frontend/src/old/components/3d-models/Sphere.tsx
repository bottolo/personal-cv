import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { createMaterial } from "./utils/create-material.ts";
import type { GeometricProps } from "./utils/geometry-props.ts";
import { defaultMaterialOptions } from "./utils/material-options.ts";
import { defaultRotationOptions } from "./utils/rotation-options.ts";

interface SphereOptions {
	radius?: number;
	widthSegments?: number;
	heightSegments?: number;
}

interface SphereProps extends GeometricProps {
	geometryOptions?: SphereOptions;
}

const defaultSphereOptions: SphereOptions = {
	radius: 1,
	widthSegments: 32,
	heightSegments: 32,
};

export function Sphere({
	materialOptions = defaultMaterialOptions,
	rotationOptions = defaultRotationOptions,
	geometryOptions = defaultSphereOptions,
	scale = 1,
	...props
}: SphereProps) {
	const groupRef = useRef<THREE.Group>(null);

	const geometry = useMemo(() => {
		const merged = { ...defaultSphereOptions, ...geometryOptions };
		return new THREE.SphereGeometry(
			merged.radius,
			merged.widthSegments,
			merged.heightSegments,
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
