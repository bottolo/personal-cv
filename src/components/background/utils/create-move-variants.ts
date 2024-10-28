import type { Shape } from "./shape.ts";

export const createMoveVariants = (shape: Shape) => ({
	animate: {
		x: [0, shape.moveX, 0],
		y: [0, shape.moveY, 0],
		scale: [1, shape.scale * 1.1, 1],
		...(shape.type === "cube"
			? {
					rotateX: [shape.rotateX, shape.rotateX! + 360, shape.rotateX],
					rotateY: [shape.rotateY, shape.rotateY! + 360, shape.rotateY],
					rotateZ: [shape.rotateZ, shape.rotateZ! + 360, shape.rotateZ],
				}
			: {
					rotate: [0, shape.rotationSpeed, 0],
				}),
		transition: {
			duration: shape.duration,
			repeat: Number.POSITIVE_INFINITY,
			ease: shape.type === "cube" ? "linear" : "easeInOut",
			delay: shape.delay,
			...(shape.type === "cube" && {
				rotateX: {
					duration: shape.duration * 4,
					repeat: Number.POSITIVE_INFINITY,
					ease: "linear",
				},
				rotateY: {
					duration: shape.duration * 5,
					repeat: Number.POSITIVE_INFINITY,
					ease: "linear",
				},
				rotateZ: {
					duration: shape.duration * 6,
					repeat: Number.POSITIVE_INFINITY,
					ease: "linear",
				},
			}),
		},
	},
});
