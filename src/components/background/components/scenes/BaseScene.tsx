import { Environment } from "@react-three/drei";
import { type ReactNode, Suspense, memo } from "react";
import { COLORS } from "../../../../global-utils/colors.ts";
import { Sphere } from "../../../3d-models/Sphere.tsx";
import { Halottolo } from "../../../3d-models/halottolo.tsx";

interface BaseSceneProps {
	position: [number, number, number];
	rotation: [number, number, number];
	ambientLightIntensity: number;
	fogDistance: [number, number];
	children?: ReactNode;
}

export const BaseScene = memo(
	({
		position,
		rotation,
		ambientLightIntensity,
		fogDistance,
		children,
	}: BaseSceneProps) => {
		return (
			<>
				<Environment preset="sunset" />
				<ambientLight
					intensity={ambientLightIntensity}
					color={COLORS.palette.blue.light}
				/>
				<directionalLight
					position={[-15, 15, 15]}
					intensity={0.3}
					castShadow
					color={COLORS.palette.cyan.primary}
				/>
				<fog attach="fog" args={[COLORS.palette.purple.dark, ...fogDistance]} />

				<Suspense fallback={null}>
					<Halottolo
						position={position}
						rotation={rotation}
						rotationOptions={{ speed: 0.05 }}
						materialOptions={{
							color: COLORS.palette.cyan.primary,
							emissive: COLORS.palette.blue.primary,
							emissiveIntensity: 0.7,
							opacity: 0.6,
							transparent: true,
							roughness: 0.64,
						}}
						scale={3}
					/>
					<Sphere
						position={[10, 0, 0]}
						rotation={[0, 0, 0.5]}
						materialOptions={{
							color: COLORS.palette.cyan.primary,
							emissive: COLORS.palette.blue.primary,
							emissiveIntensity: 0.8,
							opacity: 0.4,
							transparent: true,
						}}
						scale={850}
					/>
					{children}
				</Suspense>
			</>
		);
	},
);
