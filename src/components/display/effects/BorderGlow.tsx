import { type ReactNode, useMemo } from "react";
import { mapRange } from "../../../utils/map-range.ts";
import { CRTColors, type GlowConfig } from "../types.ts";

interface BorderGlowProps {
	config?: GlowConfig;
	children: ReactNode;
}

export const BorderGlow = ({ config = {}, children }: BorderGlowProps) => {
	const style = useMemo(() => {
		const baseIntensity = config?.color === "OUTER_GLOW" ? 2 : 1;
		const outerGlow = mapRange(
			config?.outerGlow ?? 50,
			0,
			100,
			baseIntensity * 0.5,
			baseIntensity * 2,
		);
		const glowColor = CRTColors[config.color ?? "GLOW"];

		return {
			boxShadow: `
        inset 0 0 ${Math.round(outerGlow * 20)}px ${glowColor},
        inset 0 0 ${Math.round(outerGlow * 40)}px ${glowColor},
        inset 0 0 ${Math.round(outerGlow * 100)}px ${glowColor}
      `,
			willChange: "transform",
		};
	}, [config]);

	return <div style={style}>{children}</div>;
};
