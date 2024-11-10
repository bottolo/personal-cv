import { useGLTF } from "@react-three/drei";
import type { GroupProps } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { memo, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
	nodes: {
		Cylinder: THREE.Mesh;
		Torus: THREE.Mesh;
		Torus001: THREE.Mesh;
		Torus002: THREE.Mesh;
		Torus003: THREE.Mesh;
		Torus004: THREE.Mesh;
		Torus005: THREE.Mesh;
		Torus006: THREE.Mesh;
		Torus007: THREE.Mesh;
	};
	materials: {};
};

interface MaterialOptions {
	color?: string;
	metalness?: number;
	roughness?: number;
}

interface RotationOptions {
	axis?: "x" | "y" | "z" | "none";
	speed?: number;
}

interface HalottoloProps extends GroupProps {
	materialOptions?: MaterialOptions;
	rotationOptions?: RotationOptions;
	scale?: number;
	path?: string;
}

const defaultMaterialOptions: MaterialOptions = {
	color: "#8c75e1",
	metalness: 1,
	roughness: 0.3,
} as const;

const defaultRotationOptions: RotationOptions = {
	axis: "x",
	speed: 0.1,
} as const;

// Pre-calculate static rotations
const ROTATIONS = {
	default: [0, 0, 0],
	torus001: [-Math.PI / 2, 0, 0],
	torus002: [Math.PI / 2, 0, 0],
	torus003: [Math.PI, 0, 0],
	torus004: [Math.PI / 4, 0, 0],
	torus005: [-Math.PI / 4, 0, 0],
	torus006: [2.35619432, 0, 0],
	torus007: [-2.3561946, 0, 0],
} as const;

// Create a reusable mesh component to reduce code duplication
const TorusMesh = memo(
	({
		name,
		geometry,
		material,
		rotation = ROTATIONS.default,
		scale,
	}: {
		name: string;
		geometry: THREE.BufferGeometry;
		material: THREE.Material;
		rotation?: readonly [number, number, number];
		scale: number;
	}) => (
		<mesh
			name={name}
			castShadow
			receiveShadow
			geometry={geometry}
			material={material}
			rotation={rotation}
			scale={scale}
			userData={{ name }}
		/>
	),
);

TorusMesh.displayName = "TorusMesh";

export function Halottolo({
	materialOptions = defaultMaterialOptions,
	rotationOptions = defaultRotationOptions,
	scale = 1,
	path = `${import.meta.env.BASE_URL}halottolo.glb`,
	...props
}: HalottoloProps) {
	const { nodes } = useGLTF(path) as GLTFResult;
	const groupRef = useRef<THREE.Group>(null);

	// Memoize material creation
	const material = useMemo(() => {
		const mergedMaterialOptions = {
			...defaultMaterialOptions,
			...materialOptions,
		};
		return new THREE.MeshStandardMaterial({
			color: mergedMaterialOptions.color,
			metalness: mergedMaterialOptions.metalness,
			roughness: mergedMaterialOptions.roughness,
			side: THREE.DoubleSide,
		});
	}, [
		materialOptions.color,
		materialOptions.metalness,
		materialOptions.roughness,
	]);

	// Optimize rotation calculation with useRef
	const rotationRef = useRef({
		axis: rotationOptions.axis ?? defaultRotationOptions.axis,
		speed: rotationOptions.speed ?? defaultRotationOptions.speed,
	});

	// Update rotation ref when props change
	useEffect(() => {
		rotationRef.current = {
			axis: rotationOptions.axis ?? defaultRotationOptions.axis,
			speed: rotationOptions.speed ?? defaultRotationOptions.speed,
		};
	}, [rotationOptions.axis, rotationOptions.speed]);

	// Optimize frame updates
	useFrame((state, delta) => {
		if (groupRef.current && rotationRef.current.axis !== "none") {
			groupRef.current.rotation[rotationRef.current.axis] +=
				delta * rotationRef.current.speed;
		}
	});

	// Memoize scale calculations
	const scales = useMemo(
		() => ({
			base: scale,
			cylinder: [8 * scale, 8 * scale * 0.625, 8 * scale] as const,
		}),
		[scale],
	);

	// Memoize the entire mesh structure
	const meshes = useMemo(
		() => (
			<group ref={groupRef} name="Scene">
				<mesh
					name="Cylinder"
					castShadow
					receiveShadow
					geometry={nodes.Cylinder.geometry}
					material={material}
					scale={scales.cylinder}
					userData={{ name: "Cylinder" }}
				/>
				<TorusMesh
					name="Torus"
					geometry={nodes.Torus.geometry}
					material={material}
					scale={scales.base}
				/>
				<TorusMesh
					name="Torus001"
					geometry={nodes.Torus001.geometry}
					material={material}
					rotation={ROTATIONS.torus001}
					scale={scales.base}
				/>
				<TorusMesh
					name="Torus002"
					geometry={nodes.Torus002.geometry}
					material={material}
					rotation={ROTATIONS.torus002}
					scale={scales.base}
				/>
				<TorusMesh
					name="Torus003"
					geometry={nodes.Torus003.geometry}
					material={material}
					rotation={ROTATIONS.torus003}
					scale={scales.base}
				/>
				<TorusMesh
					name="Torus004"
					geometry={nodes.Torus004.geometry}
					material={material}
					rotation={ROTATIONS.torus004}
					scale={scales.base}
				/>
				<TorusMesh
					name="Torus005"
					geometry={nodes.Torus005.geometry}
					material={material}
					rotation={ROTATIONS.torus005}
					scale={scales.base}
				/>
				<TorusMesh
					name="Torus006"
					geometry={nodes.Torus006.geometry}
					material={material}
					rotation={ROTATIONS.torus006}
					scale={scales.base}
				/>
				<TorusMesh
					name="Torus007"
					geometry={nodes.Torus007.geometry}
					material={material}
					rotation={ROTATIONS.torus007}
					scale={scales.base}
				/>
			</group>
		),
		[nodes, material, scales],
	);

	return <group {...props}>{meshes}</group>;
}

// Preload the model
useGLTF.preload(`${import.meta.env.BASE_URL}halottolo.glb`);
