import { useGLTF } from "@react-three/drei";
import type { GroupProps } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
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
}

const defaultMaterialOptions: MaterialOptions = {
	color: "#8c75e1",
	metalness: 1,
	roughness: 0.3,
};

const defaultRotationOptions: RotationOptions = {
	axis: "x",
	speed: 0.1,
};

export function Halottolo({
	materialOptions = defaultMaterialOptions,
	rotationOptions = defaultRotationOptions,
	scale = 1,
	...props
}: HalottoloProps) {
	const { nodes } = useGLTF("/halottolo.glb") as GLTFResult;
	const groupRef = useRef<THREE.Group>(null);

	// Create a shared material with merged options
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
	}, [materialOptions]);

	// Add rotation animation
	useFrame((state, delta) => {
		if (groupRef.current && rotationOptions.axis !== "none") {
			const speed = rotationOptions.speed ?? defaultRotationOptions.speed;
			groupRef.current.rotation[rotationOptions.axis ?? "x"] += delta * speed;
		}
	});

	const baseScale = 8 * scale;
	const cylinderScale: [number, number, number] = [
		baseScale,
		baseScale * 0.625,
		baseScale,
	];

	return (
		<group {...props}>
			<group ref={groupRef} name="Scene">
				<mesh
					name="Cylinder"
					castShadow
					receiveShadow
					geometry={nodes.Cylinder.geometry}
					material={material}
					scale={cylinderScale}
					userData={{ name: "Cylinder" }}
				/>
				<mesh
					name="Torus"
					castShadow
					receiveShadow
					geometry={nodes.Torus.geometry}
					material={material}
					scale={scale}
					userData={{ name: "Torus" }}
				/>
				<mesh
					name="Torus001"
					castShadow
					receiveShadow
					geometry={nodes.Torus001.geometry}
					material={material}
					rotation={[-Math.PI / 2, 0, 0]}
					scale={scale}
					userData={{ name: "Torus.001" }}
				/>
				<mesh
					name="Torus002"
					castShadow
					receiveShadow
					geometry={nodes.Torus002.geometry}
					material={material}
					rotation={[Math.PI / 2, 0, 0]}
					scale={scale}
					userData={{ name: "Torus.002" }}
				/>
				<mesh
					name="Torus003"
					castShadow
					receiveShadow
					geometry={nodes.Torus003.geometry}
					material={material}
					rotation={[Math.PI, 0, 0]}
					scale={scale}
					userData={{ name: "Torus.003" }}
				/>
				<mesh
					name="Torus004"
					castShadow
					receiveShadow
					geometry={nodes.Torus004.geometry}
					material={material}
					rotation={[Math.PI / 4, 0, 0]}
					scale={scale}
					userData={{ name: "Torus.004" }}
				/>
				<mesh
					name="Torus005"
					castShadow
					receiveShadow
					geometry={nodes.Torus005.geometry}
					material={material}
					rotation={[-Math.PI / 4, 0, 0]}
					scale={scale}
					userData={{ name: "Torus.005" }}
				/>
				<mesh
					name="Torus006"
					castShadow
					receiveShadow
					geometry={nodes.Torus006.geometry}
					material={material}
					rotation={[2.35619432, 0, 0]}
					scale={scale}
					userData={{ name: "Torus.006" }}
				/>
				<mesh
					name="Torus007"
					castShadow
					receiveShadow
					geometry={nodes.Torus007.geometry}
					material={material}
					rotation={[-2.3561946, 0, 0]}
					scale={scale}
					userData={{ name: "Torus.007" }}
				/>
			</group>
		</group>
	);
}

useGLTF.preload("/halottolo.glb");
