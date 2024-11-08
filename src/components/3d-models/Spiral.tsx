import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { createMaterial } from "./utils/create-material";
import type { GeometricProps } from "./utils/geometry-props";
import { defaultMaterialOptions } from "./utils/material-options";
import { defaultRotationOptions } from "./utils/rotation-options";

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

export function Spiral({
	materialOptions = defaultMaterialOptions,
	rotationOptions = defaultRotationOptions,
	geometryOptions = defaultSpiralOptions,
	scale = 1,
	path = "/spiral.glb",
	instances,
	instanceRotation = true,
	...props
}: SpiralProps) {
	const groupRef = useRef<THREE.Group>(null);
	const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
	const instancesRef = useRef<THREE.Object3D[]>([]);

	const { nodes } = useGLTF(path) as unknown as SpiralGLTF;

	// Create custom material
	const material = useMemo(
		() => createMaterial(materialOptions),
		[materialOptions],
	);

	// Memoize geometry modifications
	const modifiedGeometry = useMemo(() => {
		const geometry = nodes.Spiral.geometry.clone();

		// Apply any geometry modifications based on geometryOptions
		if (
			geometryOptions.segments !== defaultSpiralOptions.segments ||
			geometryOptions.turns !== defaultSpiralOptions.turns ||
			geometryOptions.radius !== defaultSpiralOptions.radius ||
			geometryOptions.height !== defaultSpiralOptions.height
		) {
			// Apply modifications if needed
			// This would depend on how you want to modify the spiral geometry
		}

		return geometry;
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

	// Handle rotation animation
	useFrame((state, delta) => {
		if (instances && instanceRotation && rotationOptions.axis !== "none") {
			const speed = rotationOptions.speed ?? defaultRotationOptions.speed;
			instancesRef.current.forEach((instance, i) => {
				instance.rotation[rotationOptions.axis ?? "y"] += delta * speed;
				instance.updateMatrix();
				instancedMeshRef.current?.setMatrixAt(i, instance.matrix);
			});
			if (instancedMeshRef.current) {
				instancedMeshRef.current.instanceMatrix.needsUpdate = true;
			}
		} else if (groupRef.current && rotationOptions.axis !== "none") {
			const speed = rotationOptions.speed ?? defaultRotationOptions.speed;
			groupRef.current.rotation[rotationOptions.axis ?? "y"] += delta * speed;
		}
	});

	// Render instanced or single mesh
	if (instances) {
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

// Preload utility
export function preloadSpiral(path = "/spiral.glb") {
	useGLTF.preload(path);
}

// Export types
export type { SpiralProps, SpiralOptions, SpiralInstance };
