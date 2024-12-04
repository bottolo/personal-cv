export type Shape = {
	id: number;
	type: "sphere" | "cube";
	size: number;
	initialX: number;
	initialY: number;
	duration: number;
	delay: number;
	color: string;
	scale: number;
	rotationSpeed: number;
	moveX: number;
	moveY: number;
	depth: number;
	rotateX?: number;
	rotateY?: number;
	rotateZ?: number;
};
