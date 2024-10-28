import { memo, useMemo } from "react";

export const CubeShape = memo(
	({
		size,
		color,
		depth,
	}: {
		size: number;
		color: string;
		depth: number;
	}) => {
		const faces = useMemo(
			() => [{ transform: `translateZ(${size / 2}px)` }],
			[size],
		);

		return (
			<div
				className="preserve-3d"
				style={{
					width: size,
					height: size,
					position: "relative",
					transformStyle: "preserve-3d",
				}}
			>
				{faces.map((face, index) => (
					<div
						key={index}
						className="absolute inset-0"
						style={{
							...face,
							background: `linear-gradient(135deg, 
              rgba(255, 255, 255, ${0.2 * depth}), 
              ${color}, 
              rgba(0, 0, 0, ${0.3 * depth}))`,
							boxShadow: `inset 0 0 ${15 * depth}px rgba(255, 255, 255, ${
								0.3 * depth
							})`,
							backfaceVisibility: "hidden",
						}}
					/>
				))}
			</div>
		);
	},
);
