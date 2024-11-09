import { Vector3 } from "three";

export const SCENE_CONFIGS = {
	"/projects": {
		cameraPosition: new Vector3(-5, 0, 5),
		cameraTarget: new Vector3(-5, 1, 8),
		ringPosition: [-3.5, 0, 35],
		ringRotation: [-1.6, 1, -0.5],
		fogDistance: [5, 20],
		ambientLightIntensity: 4,
	},
	"/about": {
		cameraPosition: new Vector3(8, 20, 0),
		cameraTarget: new Vector3(-3.5, 1, 3),
		ringPosition: [-2, 3, 2],
		ringRotation: [1.5, 1.8, -0.3],
		fogDistance: [8, 25],
		ambientLightIntensity: 5,
	},
	"/contacts": {
		cameraPosition: new Vector3(15, 15, -30),
		cameraTarget: new Vector3(-10, -20, 15),
		ringPosition: [-4, 0, 30],
		ringRotation: [2.1, 0.9, -0.7],
		fogDistance: [10, 30],
		ambientLightIntensity: 1,
	},
	default: {
		cameraPosition: new Vector3(-5, 2, 10),
		cameraTarget: new Vector3(-3.5, 1, 3),
		ringPosition: [-3.5, 1, -13],
		ringRotation: [1.7, 1.0, -0.4],
		fogDistance: [5, 125],
		ambientLightIntensity: 4.5,
	},
} as const;
