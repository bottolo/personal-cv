export const hologramFloatingAnimation = {
	initial: {
		x: 0,
		y: 0,
		opacity: 0,
		scale: 0.9,
	},
	animate: {
		x: [0, 8, 0],
		y: [0, -8, 0],
		opacity: 1,
		scale: 1,
		transition: {
			duration: Number.POSITIVE_INFINITY,
			repeat: Number.POSITIVE_INFINITY,
			ease: "easeInOut",
			opacity: { duration: 0.5 },
			scale: { duration: 0.5 },
		},
	},
	exit: {
		opacity: 0,
		scale: 0.9,
		transition: {
			duration: 0.5,
			ease: "easeInOut",
		},
	},
};
