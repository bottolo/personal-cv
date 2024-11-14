export const COLORS = {
	// Base palette
	palette: {
		blue: {
			primary: "rgb(59, 130, 246)", // blue-400
			light: "rgb(147, 197, 253)", // blue-300
			dark: "rgb(30, 58, 138)", // blue-900
		},
		cyan: {
			primary: "rgb(165, 243, 252)", // cyan-200
		},
		purple: {
			primary: "rgb(147, 51, 234)", // purple-600
			dark: "rgb(88, 28, 135)", // purple-900
		},
		white: "rgb(255, 255, 255)",
	},

	// Semantic colors
	primary: "rgb(59, 130, 246)", // blue.primary
	accent: "rgb(165, 243, 252)", // cyan.primary

	// Interactive elements
	button: {
		default: "rgba(165, 243, 252, 0.95)", // cyan.primary @ 60%
		hover: "rgb(59, 130, 246)", // blue.primary
		active: "rgb(147, 51, 234)", // purple.primary
		inactive: "rgba(165, 243, 252, 0.8)", // cyan.primary @ 30%
	},

	border: {
		normal: "rgba(59, 130, 246, 0.2)", // blue.primary @ 20%
		hover: "rgba(59, 130, 246, 0.4)", // blue.primary @ 40%
	},

	// Background variations
	bg: {
		surface: "rgba(59, 130, 246, 0.1)", // blue.primary @ 10%
		hover: "rgba(59, 130, 246, 0.2)", // blue.primary @ 20%
		gradient: {
			from: "rgba(30, 58, 138, 0.8)", // blue.dark @ 80%
			to: "rgba(88, 28, 135, 0.8)", // purple.dark @ 80%
		},
	},

	// Typography
	text: {
		primary: "rgba(165, 243, 252, 1)", // cyan.primary @ 100%
		secondary: "rgba(165, 243, 252, 0.8)", // cyan.primary @ 80%
		muted: "rgba(165, 243, 252, 0.6)", // cyan.primary @ 60%
	},

	// Effects
	glow: {
		weak: "0 0 10px rgba(59, 130, 246, 0.2)", // blue.primary @ 20%
		medium: "0 0 20px rgba(59, 130, 246, 0.3)", // blue.primary @ 30%
		strong: "0 0 30px rgba(59, 130, 246, 0.4)", // blue.primary @ 40%
	},

	sphere: {
		gradient: {
			start: "rgba(59, 130, 246, 0.9)", // blue.primary @ 90%
			end: "rgba(59, 130, 246, 0.5)", // blue.primary @ 50%
		},
		glow: {
			outer: "rgba(59, 130, 246, 0.25)", // blue.primary @ 25%
			inner: "rgba(59, 130, 246, 0.4)", // blue.primary @ 40%
		},
		highlight: "rgba(255, 255, 255, 0.25)", // white @ 25%
	},

	grid: {
		line: "rgba(100, 149, 237, 0.1)", // cornflowerblue @ 10%
	},

	effects: {
		scanLine: "rgba(59, 130, 246, 0.3)", // blue.primary @ 30%
		particles: "rgba(147, 197, 253, 0.4)", // blue.light @ 40%
		glitch: {
			overlay: "rgba(59, 130, 246, 0.5)", // blue.primary @ 50%
			highlight: "rgba(255, 255, 255, 0.4)", // white @ 40%
		},
	},

	terminal: {
		prompt: {
			user: "rgba(59, 130, 246, 0.9)", // blue.primary @ 90%
			separator: "rgba(165, 243, 252, 0.6)", // cyan.primary @ 60%
			host: "rgba(147, 51, 234, 0.8)", // purple.primary @ 80%
		},
		cursor: "rgba(165, 243, 252, 0.8)", // cyan.primary @ 80%
	},
} as const;

// Type for the colors object
export type Colors = typeof COLORS;

export const hologramAnimations = {
	glow: {
		animate: {
			boxShadow: [COLORS.glow.weak, COLORS.glow.medium, COLORS.glow.weak],
		},
		transition: {
			duration: 2,
			repeat: Number.POSITIVE_INFINITY,
			ease: "easeInOut",
		},
	},

	scan: {
		animate: {
			top: ["-10%", "110%"],
		},
		transition: {
			duration: 2.5,
			repeat: Number.POSITIVE_INFINITY,
			ease: "linear",
		},
	},

	pulse: {
		animate: {
			opacity: [0.4, 0.7, 0.4],
			scale: [1, 1.001, 1],
		},
		transition: {
			duration: 2,
			repeat: Number.POSITIVE_INFINITY,
			ease: "easeInOut",
		},
	},
};

// Helper function for creating gradient strings
export const createHologramGradient = (
	direction: string,
	color: string,
	opacity: number[],
) => {
	return `linear-gradient(${direction}, ${color}${opacity[0]} 0%, ${color}${opacity[1]} 100%)`;
};

// Helper function for creating glow effects
export const createHologramGlow = (color: string, intensity: number) => {
	return `0 0 ${intensity}px ${color}`;
};
