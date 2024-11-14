export enum CRTColors {
	BACKGROUND = "#1b1b1b",
	TEXT = "#c8c8c8",
	SCANLINE = "#000000",
	GLOW = "#ffffff",
}

export interface BaseConfig {
	intensity?: number;
}

export interface ScanlineConfig extends BaseConfig {
	height?: number;
	speed?: number;
	opacity?: number;
}

export interface ScanlinesConfig extends BaseConfig {
	count?: number;
	blur?: number;
	opacity?: number;
}

export interface GlowConfig extends BaseConfig {
	spread?: number;
	color?: keyof typeof CRTColors;
	blur?: number;
}
