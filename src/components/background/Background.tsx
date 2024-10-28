import { AnimatedGeometry } from "./components/animated-geometry/AnimatedGeometry.tsx";
import { GridOverlay } from "./components/grid-overlay/GridOverlay.tsx";

export const Background = () => {
	return (
		<>
			<AnimatedGeometry />
			<GridOverlay />
		</>
	);
};
