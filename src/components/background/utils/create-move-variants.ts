import type { Sphere } from "./sphere.ts";

export const createMoveVariants = () => ({
	animate: (sphere: Sphere) => ({
		x: [
			`${sphere.initialX}%`,
			`${sphere.initialX - 20}%`,
			`${sphere.initialX + 20}%`,
			`${sphere.initialX}%`,
		],
		y: [
			`${sphere.initialY}%`,
			`${sphere.initialY + 20}%`,
			`${sphere.initialY - 20}%`,
			`${sphere.initialY}%`,
		],
		scale: [sphere.scale, sphere.scale * 1.1, sphere.scale * 0.9, sphere.scale],
		rotate: [0, sphere.rotationSpeed, sphere.rotationSpeed * 2, 360],
		filter: [
			"brightness(1)",
			"brightness(1.1)",
			"brightness(0.9)",
			"brightness(1)",
		],
		transition: {
			duration: sphere.duration,
			repeat: Number.POSITIVE_INFINITY,
			ease: "linear",
			delay: sphere.delay,
			times: [0, 0.33, 0.66, 1],
		},
	}),
});
