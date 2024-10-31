import type { GroupProps } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { MaterialOptions } from "./utils/material-options.ts";
import type { RotationOptions } from "./utils/rotation-options.ts";

interface DodecahedronOptions {
	radius?: number;
	detail?: number;
}

interface DodecahedronProps extends GroupProps {
	materialOptions?: MaterialOptions;
	rotationOptions?: RotationOptions;
	geometryOptions?: DodecahedronOptions;
	scale?: number;
}

const defaultMaterialOptions: MaterialOptions = {
	color: "#8c75e1",
	metalness: 0.6,
	roughness: 0.2,
	wireframe: false,
	transparent: true,
	opacity: 0.8,
	emissive: "#3c2d70",
	emissiveIntensity: 0.2,
};

const defaultRotationOptions: RotationOptions = {
	axis: "y",
	speed: 0.1,
};

const defaultGeometryOptions: DodecahedronOptions = {
	radius: 1,
	detail: 0,
};

export function Dodecahedron({
	materialOptions = defaultMaterialOptions,
	rotationOptions = defaultRotationOptions,
	geometryOptions = defaultGeometryOptions,
	scale = 1,
	...props
}: DodecahedronProps) {
	const groupRef = useRef<THREE.Group>(null);

	// Create geometry with merged options
	const geometry = useMemo(() => {
		const mergedGeometryOptions = {
			...defaultGeometryOptions,
			...geometryOptions,
		};
		return new THREE.DodecahedronGeometry(
			mergedGeometryOptions.radius,
			mergedGeometryOptions.detail,
		);
	}, [geometryOptions]);

	// Create material with merged options
	const material = useMemo(() => {
		const mergedMaterialOptions = {
			...defaultMaterialOptions,
			...materialOptions,
		};
		return new THREE.MeshStandardMaterial({
			color: mergedMaterialOptions.color,
			metalness: mergedMaterialOptions.metalness,
			roughness: mergedMaterialOptions.roughness,
			wireframe: mergedMaterialOptions.wireframe,
			transparent: mergedMaterialOptions.transparent,
			opacity: mergedMaterialOptions.opacity,
			emissive: new THREE.Color(mergedMaterialOptions.emissive),
			emissiveIntensity: mergedMaterialOptions.emissiveIntensity,
			side: THREE.DoubleSide,
		});
	}, [materialOptions]);

	// Add rotation animation
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
				{materialOptions.blur && (
					<BlurPass
						strength={materialOptions.blur}
						kernelSize={3}
						luminanceThreshold={0.9}
					/>
				)}
			</group>
		</group>
	);
}
