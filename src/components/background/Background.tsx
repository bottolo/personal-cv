import { AnimatedRings } from "./components/animated-rings/AnimatedRings.tsx";
import { GlitchyTextPool } from "./components/animated-text/GlitchyTextPool.tsx";
import { GridOverlay } from "./components/grid-overlay/GridOverlay.tsx";

export const Background = () => {
	return (
		<>
			<GridOverlay />
			<AnimatedRings className={"fixed h-full w-full z-[-1]"} />

			<GlitchyTextPool
				textPool={[
					"something is out there",
					"something is happening",
					"everything is everywhere",
					"we are not the same",
					"we live the same",
					"enhancing...",
					"pursuing...",
					"living...",
					"acting...",
					"recreation",
					"diffusion",
					"we love to be unique",
					"we hate being different",
					"we are all the same",
					"considering...",
					"look at me",
					"look at this",
					"look at us",
				]}
			/>
		</>
	);
};
