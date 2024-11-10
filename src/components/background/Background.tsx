import { memo } from "react";
import { AnimatedRings } from "./components/animated-rings/AnimatedRings.tsx";
import { GlitchyTextPool } from "./components/animated-text/GlitchyTextPool.tsx";
import { GridOverlay } from "./components/grid-overlay/GridOverlay.tsx";

const RINGS_CLASS_NAME = "fixed h-full w-full z-[-1]" as const;

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

const BackgroundBase = ({
	textPool = TEXT_POOL,
}: { textPool?: readonly string[] }) => (
	<>
		<GridOverlay />
		<AnimatedRings className={RINGS_CLASS_NAME} />
		<GlitchyTextPool textPool={textPool} />
	</>
);

export const Background = memo(BackgroundBase);
Background.displayName = "Background";
