import { memo, useMemo } from "react";
import { COLORS } from "../../../../global-utils/colors.ts";
import { Spiral } from "../../../3d-models/Spiral.tsx";

export const AboutScene = memo(() => {
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
		<Spiral
			position={[-5, -15, 4.7]}
			rotation={[-0.1, 0, -0.2]}
			instances={spiralInstances}
			materialOptions={{
				color: COLORS.palette.cyan.primary,
				emissive: COLORS.palette.blue.primary,
				wireframe: true,
				opacity: 0.6,
				transparent: true,
			}}
			rotationOptions={{
				axis: "y",
				speed: 0.5,
			}}
			instanceRotation={true}
			scale={10}
		/>
	);
});
