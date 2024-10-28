import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import { createMoveVariants } from "../../../utils/create-move-variants.ts";
import type { Shape } from "../../../utils/shape.ts";
import { CubeShape } from "./cube-shape.tsx";
import { SphereShape } from "./sphere-shape.tsx";

export const ShapeComponent = memo(
	({
		shape,
		isHovered,
	}: {
		shape: Shape;
		isHovered: boolean;
	}) => {
		const moveVariants = useMemo(() => createMoveVariants(shape), [shape]);

		return (
			<motion.div
				key={shape.id}
				variants={moveVariants}
				animate="animate"
				whileHover={{ scale: isHovered ? 1.1 : 1 }}
				className="absolute"
				style={{
					left: `${shape.initialX}%`,
					top: `${shape.initialY}%`,
					transform: "translate(-50%, -50%)",
					transformStyle: "preserve-3d",
					filter: `blur(${(1 - shape.depth) * 4}px)`,
					zIndex: Math.floor(shape.depth * 10),
				}}
			>
				{shape.type === "cube" ? (
					<CubeShape
						size={shape.size}
						color={shape.color}
						depth={shape.depth}
					/>
				) : (
					<SphereShape
						size={shape.size}
						color={shape.color}
						depth={shape.depth}
					/>
				)}
			</motion.div>
		);
	},
);
