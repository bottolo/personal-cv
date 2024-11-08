import { Environment } from "@react-three/drei";
import { Suspense, memo, useMemo } from "react";
import * as THREE from "three";
import { Cube } from "../../../../3d-models/Cube.tsx";
import { Dodecahedron } from "../../../../3d-models/Dodecahedron.tsx";
import { Sphere } from "../../../../3d-models/Sphere.tsx";
import { Tetrahedron } from "../../../../3d-models/Tetrahedron.tsx";
import { Halottolo } from "../../../../3d-models/halottolo.tsx";

const commonMaterialOptions = {
	emissive: "#612dc7",
	emissiveIntensity: 0.5,
};

const wireframeMaterial = {
	...commonMaterialOptions,
	color: "#ffffff",
	wireframe: false,
	opacity: 0.4,
};

const solidMaterial = {
	...commonMaterialOptions,
	color: "#8d35e0",
	wireframe: false,
	opacity: 1,
};

export const RingScene = memo(() => {
	const sphereGeometry = useMemo(() => new THREE.SphereGeometry(1, 32, 32), []);
	const cubeGeometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);

	return (
		<>
			<Environment preset="night" />
			<fog attach="fog" args={["#4c1d95", 5, 50]} />
			<ambientLight intensity={5} />
			<directionalLight position={[-10, 5, 10]} intensity={1} castShadow />

			<Suspense fallback={null}>
				<Halottolo
					rotationOptions={{
						speed: 0.1,
					}}
					rotation={[1.9, 1.25, -0.5]}
					position={[-3.5, 1, 5]}
				/>
			</Suspense>

			<Dodecahedron
				position={[-3, 1, 3]}
				materialOptions={wireframeMaterial}
				scale={2}
			/>

			<Tetrahedron
				position={[-5.4, 1, 7]}
				materialOptions={{
					...solidMaterial,
					opacity: 0.2,
				}}
				scale={0.3}
			/>

			<instancedMesh count={3} geometry={sphereGeometry}>
				<Sphere
					position={[50, 30, -30]}
					materialOptions={{
						...wireframeMaterial,
						opacity: 0.5,
						emissiveIntensity: 1,
					}}
					scale={60}
				/>
				<Sphere
					position={[-10, -20, -15]}
					rotation={[0, 0.3, 3]}
					materialOptions={solidMaterial}
					scale={5}
				/>
				<Sphere
					position={[-5, 20, -10]}
					rotation={[0, 0.3, 3]}
					materialOptions={{
						...wireframeMaterial,
						opacity: 1,
					}}
					scale={5}
				/>
			</instancedMesh>

			<instancedMesh count={2} geometry={cubeGeometry}>
				<Cube
					position={[-25, 30, -30]}
					rotation={[0, 0.5, 6]}
					materialOptions={{
						...solidMaterial,
						opacity: 0.8,
					}}
					scale={25}
				/>
				<Cube
					position={[40, -50, -10]}
					rotation={[0, 0.5, 6]}
					materialOptions={{
						...solidMaterial,
						opacity: 0.5,
					}}
					scale={40}
				/>
			</instancedMesh>
		</>
	);
});
