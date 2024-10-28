export const asciiGeometryAnimation = {
	initial: {
		scale: 1,
		opacity: 1,
	},
	exit: {
		scale: 0,
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: "easeOut",
		},
	},
	enter: {
		scale: [0, 1],
		opacity: [0, 1],
		transition: {
			duration: 0.3,
			ease: "easeOut",
		},
	},
};
