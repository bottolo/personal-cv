export enum CRTColors {
	BACKGROUND = "#1b1b1b",
	TEXT = "#c8c8c8",
	SCANLINE = "#000000",
	MOVING_SCANLINE = "#000000",
	FLICKER = "#000000",
}

export enum CRTColorTypes {
	BACKGROUND = "background",
	TEXT = "text",
	SCANLINE = "scanline",
	MOVING_SCANLINE = "movingScanline",
	FLICKER = "flicker",
}

// Animation types enum
export enum CRTAnimationTypes {
	SCANLINE = "scanline",
	FLICKER = "flicker",
}

// Base class types enum
export enum CRTBaseClassTypes {
	WRAPPER = "wrapper",
	SCANLINE_BASE = "scanlineBase",
	MOVING_SCANLINE = "movingScanline",
}

// Generate the color classes
export const crtColorClasses = {
	background: `bg-[${CRTColors.BACKGROUND}]`,
	text: `text-[${CRTColors.TEXT}]`,
	scanline: `bg-[${CRTColors.SCANLINE}]/30`,
	movingScanline: `bg-[${CRTColors.MOVING_SCANLINE}]/75`,
	flicker: `bg-[${CRTColors.FLICKER}]/3`,
} as const;

// Get all possible color classes for safelist
export const colorClassList = Object.values(crtColorClasses);

// Animation constants
export const crtAnimationClasses = {
	[CRTAnimationTypes.SCANLINE]: "animate-[scanline_6s_linear_infinite]",
	[CRTAnimationTypes.FLICKER]: "animate-[flicker_0.01667s_steps(1)_infinite]",
} as const;

// Get all possible animation classes for safelist
export const animationClassList = Object.values(crtAnimationClasses);

// Base classes
export const crtBaseClasses = {
	[CRTBaseClassTypes.WRAPPER]: "relative overflow-hidden",
	[CRTBaseClassTypes.SCANLINE_BASE]: "absolute pointer-events-none",
	[CRTBaseClassTypes.MOVING_SCANLINE]: "w-full h-[0.5px]",
} as const;

// Get all possible base classes for safelist
export const baseClassList = Object.values(crtBaseClasses);

// Types for props
export type CRTColorType = keyof typeof crtColorClasses;
export type CRTAnimationType = keyof typeof crtAnimationClasses;
export type CRTBaseClassType = keyof typeof crtBaseClasses;
