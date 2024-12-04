import { useMemo } from "react";
import { mapRange } from "../../../utils/map-range.ts";
import type { DirectionalScanlinesConfig } from "../types.ts";

interface ScanlinesProps {
	config?: DirectionalScanlinesConfig;
	direction?: "horizontal" | "vertical";
}

export const Scanlines = ({
	config = {},
	direction = "horizontal",
}: ScanlinesProps) => {
	const { spacing, opacity, blur } = useMemo(
		() => ({
			spacing: mapRange(config?.count, 0, 100, 0, 20),
			opacity: mapRange(config?.opacity),
			blur: mapRange(config?.blur, 0, 100, 0, 2),
		}),
		[config],
	);

	const style = {
		backgroundImage: `linear-gradient(${direction === "horizontal" ? "to bottom" : "to right"}, 
            transparent 50%, rgba(0, 0, 0, ${opacity}) 51%)`,
		backgroundSize:
			direction === "horizontal" ? `100% ${spacing}px` : `${spacing}px 100%`,
		filter: `blur(${blur}px)`,
	};

	return (
		<div className="absolute inset-0 pointer-events-none z-40" style={style} />
	);
};
