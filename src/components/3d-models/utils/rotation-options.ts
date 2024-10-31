export interface RotationOptions {
	axis?: "x" | "y" | "z" | "none";
	speed?: number;
}

export const defaultRotationOptions: RotationOptions = {
	axis: "y",
	speed: 0.1,
};
