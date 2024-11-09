import { memo } from "react";
import { COLORS } from "../../../../global-utils/colors";
import { Dodecahedron } from "../../../3d-models/Dodecahedron.tsx";
import { Tetrahedron } from "../../../3d-models/Tetrahedron.tsx";

export const ContactsScene = memo(() => {
	return (
		<>
			<Dodecahedron
				position={[50, 25, -5]}
				materialOptions={{
					color: COLORS.palette.cyan.primary,
					emissive: COLORS.palette.blue.primary,
					emissiveIntensity: 0.5,
					opacity: 0.9,
					transparent: true,
				}}
				scale={30}
				rotationOptions={{
					axis: "y",
					speed: 0.1,
				}}
			/>{" "}
			<Tetrahedron
				position={[-75, -70, -50]}
				materialOptions={{
					color: COLORS.palette.cyan.primary,
					emissive: COLORS.palette.blue.primary,
					emissiveIntensity: 0.5,
					opacity: 0.9,
					transparent: true,
				}}
				scale={30}
				rotationOptions={{
					axis: "z",
					speed: 0.1,
				}}
			/>
		</>
	);
});
