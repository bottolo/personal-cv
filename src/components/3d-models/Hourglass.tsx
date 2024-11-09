import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { createMaterial } from "./utils/create-material";
import type { GeometricProps } from "./utils/geometry-props";
import { defaultMaterialOptions } from "./utils/material-options";
import { defaultRotationOptions } from "./utils/rotation-options";

interface HourglassGLTF extends THREE.Object3D {
	nodes: {
		Cone: THREE.Mesh;
	};
	materials: {
		[key: string]: THREE.Material;
	};
}

// Define instance type
interface HourglassInstance {
	position: [number, number, number];
	rotation?: [number, number, number];
	scale?: number | [number, number, number];
}

interface HourglassOptions {
	detail?: number;
	segments?: number;
}

interface HourglassProps extends GeometricProps {
	geometryOptions?: HourglassOptions;
	path?: string;
	instances?: HourglassInstance[];
	instanceRotation?: boolean; // Whether to apply rotation animation to instances
}

const defaultHourglassOptions: HourglassOptions = {
	detail: 1,
	segments: 32,
};

export function Hourglass({
	materialOptions = defaultMaterialOptions,
	rotationOptions = defaultRotationOptions,
	geometryOptions = defaultHourglassOptions,
	scale = 1,
	path = `${import.meta.env.BASE_URL}hourglass.glb`,
	instances,
	instanceRotation = true,
	...props
}: HourglassProps) {
	const groupRef = useRef<THREE.Group>(null);
	const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
	const instancesRef = useRef<THREE.Object3D[]>([]);

	const { nodes } = useGLTF(path) as unknown as HourglassGLTF;

	const material = useMemo(
		() => createMaterial(materialOptions),
		[materialOptions],
	);

	const modifiedGeometry = useMemo(() => {
		const geometry = nodes.Cone.geometry.clone();

		if (geometryOptions.detail !== defaultHourglassOptions.detail) {
			// Apply detail modifications if necessary
		}

		if (geometryOptions.segments !== defaultHourglassOptions.segments) {
			// Apply segment modifications if necessary
		}

		return geometry;
	}, [nodes.Cone.geometry, geometryOptions]);

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
			<group ref={groupRef} name="Hourglass" dispose={null}>
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

export function preloadHourglass(
	path = `${import.meta.env.BASE_URL}hourglass.glb`,
) {
	useGLTF.preload(path);
}
