import { memo } from "react";
import { COLORS } from "../../../../global-utils/colors.ts";
import { Icosphere } from "../../../3d-models/Icosphere.tsx";

export const ProjectsScene = memo(() => {
	return (
		<Icosphere
			position={[-4, 1.5, 25]}
			scale={10}
			materialOptions={{
				color: COLORS.palette.white,
				emissive: COLORS.palette.purple.primary,
				wireframe: true,
				opacity: 0.4,
				transparent: true,
				emissiveIntensity: 0.3,
			}}
			rotationOptions={{
				axis: "y",
				speed: 0.5,
			}}
		/>
	);
});
