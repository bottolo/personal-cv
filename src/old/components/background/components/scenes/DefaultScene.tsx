import { memo } from "react";
import { COLORS } from "../../../../global-utils/colors.ts";
import { Hourglass } from "../../../3d-models/Hourglass.tsx";
import { Sphere } from "../../../3d-models/Sphere.tsx";
import { Spiral } from "../../../3d-models/Spiral.tsx";

export const DefaultScene = memo(() => {
	return (
		<>
			<Spiral
				position={[-25, -20, 7]}
				rotation={[0, 0, 0.6]}
				materialOptions={{
					color: COLORS.palette.blue.primary,
					emissive: COLORS.palette.purple.primary,
					opacity: 0.4,
					transparent: true,
				}}
				scale={10}
			/>
			<Hourglass
				position={[40, 0, 0]}
				rotation={[0.9, 0.6, 0.6]}
				materialOptions={{
					color: COLORS.palette.blue.primary,
					emissive: COLORS.palette.cyan.primary,
					opacity: 0.2,
					transparent: false,
					metalness: 1,
				}}
				scale={10}
			/>
			<Sphere
				position={[25, 0, -355]}
				materialOptions={{
					color: COLORS.palette.cyan.primary,
					emissive: COLORS.palette.blue.primary,
					emissiveIntensity: 0.1,
					opacity: 0.9,
					transparent: true,
					metalness: 1,
				}}
				scale={300}
				rotationOptions={{
					axis: "x",
					speed: 0.1,
				}}
			/>
		</>
	);
});
