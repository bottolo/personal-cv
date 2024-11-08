// src/config/button-config.ts
import { HOLOGRAM_COLORS } from "../../../global-utils/colors.ts";

export type ButtonId = "/projects" | "/about" | "/contacts";

export interface ButtonState {
	position: [number, number, number];
	rotation: [number, number, number];
	textPosition: [number, number, number];
	scale: [number, number, number];
	color: string;
}

export interface ButtonsConfig {
	default: Record<ButtonId, ButtonState>;
	hover: Record<ButtonId, ButtonState>;
	active: Record<ButtonId, ButtonState>;
	otherButtonsOnHover: Record<ButtonId, ButtonState>;
}

export const BUTTONS_CONFIG: ButtonsConfig = {
	default: {
		"/projects": {
			position: [0, 0, 0],
			rotation: [0, -0.8, 0],
			textPosition: [-1.1, 0.55, 1.5],
			scale: [1, 1, 1],
			color: HOLOGRAM_COLORS.primary,
		},
		"/about": {
			position: [0, -0.01, 0],
			rotation: [0, -0.8, 0],
			textPosition: [-1.14, -0.12, 1.5],
			scale: [1, 1, 1],
			color: HOLOGRAM_COLORS.primary,
		},
		"/contacts": {
			position: [0, -0.02, 0],
			rotation: [0, -0.8, 0],
			textPosition: [-1.05, -0.63, 1.3],
			scale: [1, 1, 1],
			color: HOLOGRAM_COLORS.primary,
		},
	},
	hover: {
		"/projects": {
			position: {
				position: [0, 0.1, 0.1],
				rotation: [0, -0.8, 0],
				textPosition: [-1.1, 0.65, 1.6],
			},
			scale: [1.1, 1.1, 1.1],
			color: HOLOGRAM_COLORS.accent,
		},
		"/about": {
			position: {
				position: [0, 0.1, 0.1],
				rotation: [0, -0.8, 0],
				textPosition: [-1.14, -0.02, 1.6],
			},
			scale: [1.1, 1.1, 1.1],
			color: HOLOGRAM_COLORS.accent,
		},
		"/contacts": {
			position: {
				position: [0, 0.1, 0.1],
				rotation: [0, -0.8, 0],
				textPosition: [-1.05, -0.46, 1.4],
			},
			scale: [1.1, 1.1, 1.1],
			color: HOLOGRAM_COLORS.accent,
		},
	},
	active: {
		"/projects": {
			position: [0, 0.3, 0.2],
			rotation: [0, -0.8, 0],
			textPosition: [-1.1, 0.85, 1.7],
			scale: [1.2, 1.2, 1.2],
			color: HOLOGRAM_COLORS.accent,
		},
		"/about": {
			position: [0, 0.3, 0.2],
			rotation: [0, -0.8, 0],
			textPosition: [-1.14, -0.22, 1.7],
			scale: [1.2, 1.2, 1.2],
			color: HOLOGRAM_COLORS.accent,
		},
		"/contacts": {
			position: [0, 0.3, 0.2],
			rotation: [0, -0.8, 0],
			textPosition: [-1.05, -0.66, 1.5],
			scale: [1.2, 1.2, 1.2],
			color: HOLOGRAM_COLORS.accent,
		},
	},
	otherButtonsOnHover: {
		"/projects": {
			position: [0, 0.3, 0.2],
			rotation: [0, -0.8, 0],
			textPosition: [-1.1, 0.85, 1.7],
			scale: [1.2, 1.2, 1.2],
			color: HOLOGRAM_COLORS.accent,
		},
		"/about": {
			position: [0, 0.3, 0.2],
			rotation: [0, -0.8, 0],
			textPosition: [-1.14, -0.22, 1.7],
			scale: [1.2, 1.2, 1.2],
			color: HOLOGRAM_COLORS.accent,
		},
		"/contacts": {
			position: [0, 0.3, 0.2],
			rotation: [0, -0.8, 0],
			textPosition: [-1.05, -0.66, 1.5],
			scale: [1.2, 1.2, 1.2],
			color: HOLOGRAM_COLORS.accent,
		},
	},
};
