import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { createMaterial } from "./utils/create-material.ts";
import type { GeometricProps } from "./utils/geometry-props.ts";
import { defaultMaterialOptions } from "./utils/material-options.ts";
import { defaultRotationOptions } from "./utils/rotation-options.ts";

// Define the GLTF result type
interface IcosphereGLTF extends THREE.Object3D {
	nodes: {
		Icosphere: THREE.Mesh;
	};
	materials: {
		[key: string]: THREE.Material;
	};
}

// Icosphere-specific options interface
interface IcosphereOptions {
	subdivisions?: number;
	radius?: number;
	detail?: number;
}

// Combined props interface
interface IcosphereProps extends GeometricProps {
	geometryOptions?: IcosphereOptions;
	path?: string;
}

// Default options
const defaultIcosphereOptions: IcosphereOptions = {
	subdivisions: 1,
	radius: 1,
	detail: 0,
};

export function Icosphere({
	materialOptions = defaultMaterialOptions,
	rotationOptions = defaultRotationOptions,
	geometryOptions = defaultIcosphereOptions,
	scale = 1,
	path = `${import.meta.env.BASE_URL}icosph.glb`,
	...props
}: IcosphereProps) {
	// Refs
	const groupRef = useRef<THREE.Group>(null);
	const meshRef = useRef<THREE.Mesh>(null);

	// Load the GLTF model
	const { nodes, materials } = useGLTF(path) as unknown as IcosphereGLTF;

	// Create custom material
	const material = useMemo(
		() => createMaterial(materialOptions),
		[materialOptions],
	);

	// Handle geometry modifications
	const modifiedGeometry = useMemo(() => {
		const geometry = nodes.Icosphere.geometry.clone();

		if (
			geometryOptions.radius !== defaultIcosphereOptions.radius ||
			geometryOptions.detail !== defaultIcosphereOptions.detail
		) {
			// Create a new IcosahedronGeometry with custom parameters if needed
			const newGeometry = new THREE.IcosahedronGeometry(
				geometryOptions.radius,
				geometryOptions.detail,
			);
			geometry.copy(newGeometry);
			newGeometry.dispose(); // Clean up
		}

		return geometry;
	}, [nodes.Icosphere.geometry, geometryOptions]);

	// Handle rotation animation
	useFrame((_state, delta) => {
		if (groupRef.current && rotationOptions.axis !== "none") {
			const speed = rotationOptions.speed ?? defaultRotationOptions.speed;
			groupRef.current.rotation[rotationOptions.axis ?? "y"] += delta * speed;
		}
	});

	// Optional instance support
	const instances = useMemo(() => {
		if (props.instances) {
			return props.instances.map((instance, index) => ({
				...instance,
				key: `icosphere-instance-${index}`,
			}));
		}
		return null;
	}, [props.instances]);

	return (
		<group {...props}>
			<group ref={groupRef} name="Icosphere" dispose={null}>
				{instances ? (
					<instancedMesh
						args={[modifiedGeometry, material, instances.length]}
						castShadow
						receiveShadow
					>
						{instances.map((instance, index) => (
							<primitive
								key={instance.key}
								object={new THREE.Object3D()}
								position={instance.position}
								rotation={instance.rotation}
								scale={instance.scale || scale}
							/>
						))}
					</instancedMesh>
				) : (
					<mesh
						ref={meshRef}
						geometry={modifiedGeometry}
						material={material}
						scale={scale}
						castShadow
						receiveShadow
					/>
				)}
			</group>
		</group>
	);
}

export type { IcosphereProps, IcosphereOptions };
