import { Environment } from "@react-three/drei";
import { Suspense, memo, useMemo } from "react";
import * as THREE from "three";
import { COLORS } from "../../../../../global-utils/colors.ts";
import { Halottolo } from "../../../../3d-models/halottolo.tsx";

const commonMaterialOptions = {
	emissive: COLORS.palette.purple.primary,
	emissiveIntensity: 0.5,
};

const wireframeMaterial = {
	...commonMaterialOptions,
	color: COLORS.palette.white,
	wireframe: true,
	opacity: 0.4,
	transparent: true,
};

const solidMaterial = {
	...commonMaterialOptions,
	color: COLORS.palette.blue.primary,
	emissive: COLORS.palette.purple.primary,
	wireframe: false,
	opacity: 0.8,
	transparent: true,
};

const glowMaterial = {
	...commonMaterialOptions,
	color: COLORS.palette.cyan.primary,
	emissive: COLORS.palette.blue.primary,
	emissiveIntensity: 0.75,
	opacity: 0.6,
	transparent: true,
};

export const RingScene = memo(() => {
	const sphereGeometry = useMemo(() => new THREE.SphereGeometry(1, 32, 32), []);
	const cubeGeometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);

	const spiralInstances = useMemo(() => {
		const count = 8;
		const radius = 15;
		return Array.from({ length: count }, (_, index) => {
			const angle = (index / count) * Math.PI * 2;
			return {
				position: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius] as [
					number,
					number,
					number,
				],
				rotation: [0, angle, 0] as [number, number, number],
				scale: 2,
			};
		});
	}, []);

	return (
		<>
			<Environment preset="night" />
			<ambientLight intensity={5} color={COLORS.palette.blue.light} />
			<directionalLight
				position={[-10, 5, 10]}
				intensity={1}
				castShadow
				color={COLORS.palette.cyan.primary}
			/>

			<Suspense fallback={null}>
				<Halottolo
					rotationOptions={{ speed: 0.1 }}
					rotation={[1.9, 1.25, -0.5]}
					position={[-3.5, 1, 5]}
					materialOptions={{
						...glowMaterial,
					}}
				/>
			</Suspense>

			{/*<Spiral*/}
			{/*	position={[-5, -15, 4.7]}*/}
			{/*	rotation={[-0.1, 0, -0.2]}*/}
			{/*	instances={spiralInstances}*/}
			{/*	materialOptions={{*/}
			{/*		...wireframeMaterial,*/}
			{/*		color: COLORS.palette.cyan.primary,*/}
			{/*		emissive: COLORS.palette.blue.primary,*/}
			{/*		opacity: 0.6,*/}
			{/*	}}*/}
			{/*	rotationOptions={{*/}
			{/*		axis: "y",*/}
			{/*		speed: 0.5,*/}
			{/*	}}*/}
			{/*	instanceRotation={true}*/}
			{/*	scale={10}*/}
			{/*/>*/}

			{/*<Icosphere*/}
			{/*	position={[-4, 1.5, 4.9]}*/}
			{/*	scale={3}*/}
			{/*	materialOptions={{*/}
			{/*		...wireframeMaterial,*/}
			{/*		emissiveIntensity: 0.3,*/}
			{/*	}}*/}
			{/*	rotationOptions={{*/}
			{/*		axis: "y",*/}
			{/*		speed: 0.2,*/}
			{/*	}}*/}
			{/*/>*/}
			{/*<Icosphere*/}
			{/*	position={[-50, -110, -50]}*/}
			{/*	materialOptions={{*/}
			{/*		...glowMaterial,*/}
			{/*		emissiveIntensity: 1,*/}
			{/*		opacity: 0.3,*/}
			{/*	}}*/}
			{/*	scale={50}*/}
			{/*	rotationOptions={{*/}
			{/*		axis: "x",*/}
			{/*		speed: 0.02,*/}
			{/*	}}*/}
			{/*/>*/}

			{/*<Tetrahedron*/}
			{/*	position={[-5.4, 1, 7]}*/}
			{/*	materialOptions={{*/}
			{/*		...solidMaterial,*/}
			{/*		opacity: 0.4,*/}
			{/*	}}*/}
			{/*	scale={0.3}*/}
			{/*/>*/}

			{/*<instancedMesh count={3} geometry={sphereGeometry}>*/}
			{/*	<Sphere*/}
			{/*		position={[50, 30, -30]}*/}
			{/*		materialOptions={{*/}
			{/*			...glowMaterial,*/}
			{/*			emissiveIntensity: 1,*/}
			{/*			opacity: 0.3,*/}
			{/*		}}*/}
			{/*		scale={50}*/}
			{/*		rotationOptions={{*/}
			{/*			axis: "x",*/}
			{/*			speed: 0.1,*/}
			{/*		}}*/}
			{/*	/>*/}
			{/*	<Sphere*/}
			{/*		position={[-10, -20, -15]}*/}
			{/*		rotation={[0, 0.3, 3]}*/}
			{/*		materialOptions={{*/}
			{/*			...solidMaterial,*/}
			{/*			opacity: 0.8,*/}
			{/*		}}*/}
			{/*		scale={5}*/}
			{/*	/>*/}
			{/*	<Sphere*/}
			{/*		position={[-5, 20, -10]}*/}
			{/*		rotation={[0, 0.3, 3]}*/}
			{/*		materialOptions={wireframeMaterial}*/}
			{/*		scale={5}*/}
			{/*	/>*/}
			{/*</instancedMesh>*/}

			{/*<Hourglass*/}
			{/*	position={[-30, -10, -15]}*/}
			{/*	rotation={[9, 2, 0]}*/}
			{/*	scale={30}*/}
			{/*	instances={[*/}
			{/*		{ position: [-30, -10, -15], rotation: [9, 2, 0], scale: 30 },*/}
			{/*		{ position: [-25, -8, -12], rotation: [8, 1.5, 0.5], scale: 25 },*/}
			{/*	]}*/}
			{/*	materialOptions={{*/}
			{/*		...wireframeMaterial,*/}
			{/*		emissiveIntensity: 0.8,*/}
			{/*	}}*/}
			{/*/>*/}

			{/*<instancedMesh count={2} geometry={cubeGeometry}>*/}
			{/*	<Cube*/}
			{/*		position={[-50, 75, -50]}*/}
			{/*		rotation={[0, 0.5, 6]}*/}
			{/*		materialOptions={{*/}
			{/*			...solidMaterial,*/}
			{/*			opacity: 0.8,*/}
			{/*		}}*/}
			{/*		scale={25}*/}
			{/*	/>*/}
			{/*	<Cube*/}
			{/*		position={[40, -50, -20]}*/}
			{/*		rotation={[0, 0.5, 6]}*/}
			{/*		materialOptions={{*/}
			{/*			...solidMaterial,*/}
			{/*			opacity: 0.5,*/}
			{/*		}}*/}
			{/*		scale={40}*/}
			{/*	/>*/}
			{/*</instancedMesh>*/}
		</>
	);
});
