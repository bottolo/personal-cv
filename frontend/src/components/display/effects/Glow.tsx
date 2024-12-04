import { type ReactNode, useMemo } from "react";
import { mapRange } from "../../../utils/map-range.ts";
import { CRTColors, type GlowConfig } from "../types.ts";

interface GlowProps {
	config?: GlowConfig;
	children: ReactNode;
}

export const Glow = ({ config = {}, children }: GlowProps) => {
	const style = useMemo(
		() => ({
			filter: `brightness(${mapRange(config?.spread, 0, 100, 1, 1.5)}) 
      blur(${mapRange(config?.blur ?? 50, 0, 100, 0, 10)}px)`,
			backgroundColor: `color-mix(in srgb, ${CRTColors[config.color ?? "GLOW"]} 10%, transparent)`,
		}),
		[config],
	);

	return (
		<div className="animate-colorShift" style={style}>
			{children}
		</div>
	);
};
