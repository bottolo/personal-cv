// types.ts
export type Vector3 = [number, number, number];

export interface Position {
	position: Vector3;
	rotation: Vector3;
	textPosition: Vector3;
	zIndex?: number;
}

export interface ButtonPositions {
	default: Record<string, Position>;
	active: Record<string, Record<string, Position>>;
}

// button-positions.ts
export const buttonPositions: ButtonPositions = {
	default: {
		projects: {
			position: [0, 0, 0],
			rotation: [0, -0.8, 0],
			textPosition: [-1.1, 0.55, 1.5],
			zIndex: 10,
		},
		about: {
			position: [0, -0.02, 0],
			rotation: [0, -0.8, 0],
			textPosition: [-1.14, -0.12, 1.5],
			zIndex: 20,
		},
		contacts: {
			position: [0, -0.04, 0],
			rotation: [0, -0.8, 0],
			textPosition: [-1.05, -0.63, 1.3],
			zIndex: 30,
		},
	},
	active: {
		projects: {
			projects: {
				position: [-0.5, 0.3, 1.5],
				rotation: [0, -0.8, 0],
				textPosition: [-1.1, 0.55, 1.5],
				zIndex: 30,
			},
			about: {
				position: [0, -0.3, 0],
				rotation: [0, -0.8, 0],
				textPosition: [-1.14, -0.12, 1.5],
				zIndex: 10,
			},
			contacts: {
				position: [0.1, -0.4, 0],
				rotation: [0, -0.8, 0],
				textPosition: [-1.05, -0.63, 1.3],
				zIndex: 10,
			},
		},
		about: {
			projects: {
				position: [0, 0.3, 0],
				rotation: [0, -0.8, 0],
				textPosition: [-1.1, 0.55, 1.5],
				zIndex: 10,
			},
			about: {
				position: [-0.5, -0.01, 0.5],
				rotation: [0, -0.8, 0],
				textPosition: [-1.14, -0.12, 1.5],
				zIndex: 30,
			},
			contacts: {
				position: [0, -0.5, 0],
				rotation: [0, -0.8, 0],
				textPosition: [-1.05, -0.63, 1.3],
				zIndex: 10,
			},
		},
		contacts: {
			projects: {
				position: [0, 0.4, 0],
				rotation: [0, -0.8, 0],
				textPosition: [-1.1, 0.55, 1.5],
				zIndex: 10,
			},
			about: {
				position: [0, 0.3, 0],
				rotation: [0, -0.8, 0],
				textPosition: [-1.14, -0.12, 1.5],
				zIndex: 10,
			},
			contacts: {
				position: [-0.3, -0.02, 0.3],
				rotation: [0, -0.8, 0],
				textPosition: [-1.05, -0.63, 1.3],
				zIndex: 30,
			},
		},
	},
};
