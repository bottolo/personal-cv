import { memo, useMemo } from "react";
import { AnimatedRings } from "./components/animated-rings/AnimatedRings.tsx";
import { GlitchyTextPool } from "./components/animated-text/GlitchyTextPool.tsx";
import { GridOverlay } from "./components/grid-overlay/GridOverlay.tsx";

const TEXT_POOL = [
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
] as const;

const MemoizedGridOverlay = memo(GridOverlay);
const MemoizedAnimatedRings = memo(AnimatedRings);
const MemoizedGlitchyTextPool = memo(GlitchyTextPool);

export const Background = memo(() => {
	const ringsClassName = useMemo(() => "fixed h-full w-full z-[-1]", []);

	return (
		<>
			<MemoizedGridOverlay />
			<MemoizedAnimatedRings className={ringsClassName} />
			<MemoizedGlitchyTextPool textPool={TEXT_POOL} />
		</>
	);
});

Background.displayName = "Background";

export const DynamicBackground = memo(
	({ customTextPool }: { customTextPool?: readonly string[] }) => {
		const ringsClassName = useMemo(() => "fixed h-full w-full z-[-1]", []);

		return (
			<>
				<MemoizedGridOverlay />
				<MemoizedAnimatedRings className={ringsClassName} />
				<MemoizedGlitchyTextPool textPool={customTextPool ?? TEXT_POOL} />
			</>
		);
	},
);

DynamicBackground.displayName = "DynamicBackground";