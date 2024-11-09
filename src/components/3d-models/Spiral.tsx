import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { createMaterial } from "./utils/create-material";
import type { GeometricProps } from "./utils/geometry-props";
import { defaultMaterialOptions } from "./utils/material-options";
import {
	type RotationOptions,
	defaultRotationOptions,
} from "./utils/rotation-options";

interface SpiralGLTF extends THREE.Object3D {
	nodes: {
		Spiral: THREE.Mesh;
	};
	materials: {
		[key: string]: THREE.Material;
	};
}

interface SpiralInstance {
	position: [number, number, number];
	rotation?: [number, number, number];
	scale?: number | [number, number, number];
}

interface SpiralOptions {
	segments?: number;
	turns?: number;
	radius?: number;
	height?: number;
}

interface SpiralProps extends GeometricProps {
	geometryOptions?: SpiralOptions;
	path?: string;
	instances?: SpiralInstance[];
	instanceRotation?: boolean;
}

const defaultSpiralOptions: SpiralOptions = {
	segments: 64,
	turns: 2,
	radius: 1,
	height: 2,
};

// Type guard for rotation axis
const isValidRotationAxis = (
	axis: string,
): axis is Exclude<RotationOptions, "none"> => {
	return ["x", "y", "z"].includes(axis);
};

export function Spiral({
	materialOptions = defaultMaterialOptions,
	rotationOptions = defaultRotationOptions,
	geometryOptions = defaultSpiralOptions,
	scale = 1,
	path = `${import.meta.env.BASE_URL}spiral.glb`,
	instances,
	instanceRotation = true,
	...props
}: SpiralProps) {
	const groupRef = useRef<THREE.Group>(null);
	const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
	const instancesRef = useRef<THREE.Object3D[]>([]);

	const { nodes } = useGLTF(path) as unknown as SpiralGLTF;

	const material = useMemo(
		() => createMaterial(materialOptions),
		[materialOptions],
	);

	// Memoize geometry modifications
	const modifiedGeometry = useMemo(() => {
		return nodes.Spiral.geometry.clone();
	}, [nodes.Spiral.geometry, geometryOptions]);

	// Initialize instances
	useMemo(() => {
		if (instances) {
			instancesRef.current = instances.map(() => new THREE.Object3D());
			instancesRef.current.forEach((instance, i) => {
				const {
					position,
					rotation = [0, 0, 0],
					scale: instanceScale = scale,
				} = instances[i];

				instance.position.set(...position);
				instance.rotation.set(...rotation);

				if (Array.isArray(instanceScale)) {
					instance.scale.set(...instanceScale);
				} else {
					instance.scale.set(instanceScale, instanceScale, instanceScale);
				}

				instance.updateMatrix();
			});
		}
	}, [instances, scale]);

	useFrame((_state, delta) => {
		const axis = rotationOptions.axis ?? "y";
		const speed = rotationOptions.speed ?? defaultRotationOptions.speed;

		if (instances && instanceRotation && axis !== "none") {
			instancesRef.current.forEach((instance, i) => {
				if (isValidRotationAxis(axis)) {
					instance.rotation[axis] += delta * speed;
					instance.updateMatrix();
					instancedMeshRef.current?.setMatrixAt(i, instance.matrix);
				}
			});
			if (instancedMeshRef.current) {
				instancedMeshRef.current.instanceMatrix.needsUpdate = true;
			}
		} else if (
			groupRef.current &&
			axis !== "none" &&
			isValidRotationAxis(axis)
		) {
			groupRef.current.rotation[axis] += delta * speed;
		}
	});

	// Render instanced or single mesh
	if (instances?.length) {
		return (
			<instancedMesh
				ref={instancedMeshRef}
				args={[modifiedGeometry, material, instances.length]}
				castShadow
				receiveShadow
				{...props}
			/>
		);
	}

	return (
		<group {...props}>
			<group ref={groupRef} name="Spiral" dispose={null}>
				<mesh
					castShadow
					receiveShadow
					geometry={modifiedGeometry}
					material={material}
					scale={scale}
				/>
			</group>
		</group>
	);
}

// Preload utility with dynamic path
export function preloadSpiral(path = `${import.meta.env.BASE_URL}spiral.glb`) {
	useGLTF.preload(path);
}

// Export types
export type { SpiralProps, SpiralOptions, SpiralInstance };
