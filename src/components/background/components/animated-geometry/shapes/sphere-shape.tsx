import { memo } from "react";
import type { BaseShapeProps } from "./base-shape-props.ts";

export const SphereShape = memo(({ size, color, depth }: BaseShapeProps) => {
	return (
		<div
			className="rounded-full"
			style={{
				width: size,
				height: size,
				background: `radial-gradient(circle at 30% 30%, 
            rgba(255, 255, 255, ${0.5 * depth}), 
            ${color}, 
            rgba(0, 0, 0, ${0.3 * depth}))`,
				boxShadow: `inset 0 0 ${10 * depth}px rgba(255, 255, 255, ${0.5 * depth})`,
			}}
		/>
	);
});
