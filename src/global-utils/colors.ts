export const HOLOGRAM_COLORS = {
	// Base colors
	primary: "rgb(59, 130, 246)", // blue-400
	accent: "rgb(165, 243, 252)", // cyan-200

	// Borders
	border: {
		normal: "rgba(59, 130, 246, 0.2)",
		hover: "rgba(59, 130, 246, 0.4)",
	},

	// Backgrounds
	bg: {
		surface: "rgba(59, 130, 246, 0.1)",
		hover: "rgba(59, 130, 246, 0.2)",
		gradient: {
			from: "rgba(30, 58, 138, 0.8)",
			to: "rgba(88, 28, 135, 0.8)",
		},
	},

	// Text
	text: {
		primary: "rgba(165, 243, 252, 1)",
		secondary: "rgba(165, 243, 252, 0.8)",
		muted: "rgba(165, 243, 252, 0.6)",
	},

	// Glow effects
	glow: {
		weak: "0 0 10px rgba(59, 130, 246, 0.2)",
		medium: "0 0 20px rgba(59, 130, 246, 0.3)",
		strong: "0 0 30px rgba(59, 130, 246, 0.4)",
	},

	// Sphere specific
	sphere: {
		gradient: {
			start: "rgba(59, 130, 246, 0.9)",
			end: "rgba(59, 130, 246, 0.5)",
		},
		glow: {
			outer: "rgba(59, 130, 246, 0.25)",
			inner: "rgba(59, 130, 246, 0.4)",
		},
		highlight: "rgba(255, 255, 255, 0.25)",
	},

	// Grid effects
	grid: {
		line: "rgba(100, 149, 237, 0.1)",
	},

	// Hologram specific effects
	effects: {
		scanLine: "rgba(59, 130, 246, 0.3)",
		particles: "rgba(147, 197, 253, 0.4)", // blue-300/40
		glitch: {
			overlay: "rgba(59, 130, 246, 0.5)",
			highlight: "rgba(255, 255, 255, 0.4)",
		},
		grid: {
			line: "rgba(100, 149, 237, 0.1)",
		},
	},

	// Terminal specific
	terminal: {
		prompt: {
			user: "rgba(59, 130, 246, 0.9)",
			separator: "rgba(165, 243, 252, 0.6)",
			host: "rgba(168, 85, 247, 0.8)", // purple accent
		},
		cursor: "rgba(165, 243, 252, 0.8)",
	},
};

export const hologramAnimations = {
	glow: {
		animate: {
			boxShadow: [
				HOLOGRAM_COLORS.glow.weak,
				HOLOGRAM_COLORS.glow.medium,
				HOLOGRAM_COLORS.glow.weak,
			],
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
