export const defaultState = {
	projects: {
		position: [0, 0, 0],
		rotation: [0, -0.8, 0],
		textPosition: [-1.1, 0.55, 1.5],
	},
	about: {
		position: [0, -0.02, 0],
		rotation: [0, -0.8, 0],
		textPosition: [-1.14, -0.12, 1.5],
	},
	contacts: {
		position: [0, -0.04, 0],
		rotation: [0, -0.8, 0],
		textPosition: [-1.05, -0.63, 1.3],
	},
};

export const hoverState = {
	projects: {
		position: [-0.3, 0, 0.3],
		rotation: [0, -0.8, 0],
		textPosition: [-1.1, 0.55, 1.5],
	},
	about: {
		position: [-0.3, -0.01, 0.3],
		rotation: [0, -0.8, 0],
		textPosition: [-1.14, -0.12, 1.5],
	},
	contacts: {
		position: [-0.3, -0.02, 0.3],
		rotation: [0, -0.8, 0],
		textPosition: [-1.05, -0.63, 1.3],
	},
};

export const offsetMap = {
	projects: {
		about: [0, -0.3, 0],
		contacts: [0.1, -0.3, 0.2],
	},
	about: {
		projects: [0, 0.3, 0],
		contacts: [0, -0.3, 0],
	},
	contacts: {
		projects: [0, 0.4, 0],
		about: [0, 0.3, 0],
	},
};
