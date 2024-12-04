import { useMemo } from "react";
import { mapRange } from "../../../utils/map-range.ts";
import type { BaseConfig } from "../types.ts";

export const Flicker = ({ config = {} }: { config?: BaseConfig }) => {
	const intensity = useMemo(
		() => mapRange(config?.intensity, 0, 100, 0, 1),
		[config],
	);

	return (
		<div
			className="absolute inset-0 pointer-events-none z-30 animate-flicker"
			style={{ backgroundColor: `rgba(18, 16, 16, ${intensity})` }}
		/>
	);
};
