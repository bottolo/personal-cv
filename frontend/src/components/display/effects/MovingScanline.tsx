import { useEffect, useMemo, useState } from "react";
import { mapRange } from "../../../utils/map-range.ts";
import type { ScanlineConfig } from "../types.ts";

export const MovingScanline = ({
	config = {},
}: { config?: ScanlineConfig }) => {
	const [scanPos, setScanPos] = useState(0);

	const { height, opacity, speed } = useMemo(
		() => ({
			height: mapRange(config?.height, 0, 100, 0, 2),
			opacity: mapRange(config?.opacity),
			speed: mapRange(config?.speed, 0, 100, 0, 200),
		}),
		[config],
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setScanPos((prev) => (prev + 1) % 160);
		}, speed);
		return () => clearInterval(interval);
	}, [speed]);

	return (
		<div
			className="absolute w-full pointer-events-none z-50"
			style={{
				height: `${height}px`,
				top: `${scanPos}%`,
				backgroundColor: `rgba(0, 0, 0, ${opacity})`,
				transition: `top ${speed}ms linear`,
			}}
		/>
	);
};
