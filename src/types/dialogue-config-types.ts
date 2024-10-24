export interface StateConfig {
	box: {
		scale: [number, number, number];
		position: [number, number, number];
		rotation: [number, number, number];
	};
	text: {
		position: [number, number, number];
		rotation: [number, number, number];
		fontSize: number;
	};
}
