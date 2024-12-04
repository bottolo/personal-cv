export enum CRTColors {
	BACKGROUND = "#1b1b1b",
	TEXT = "#c8c8c8",
	SCANLINE = "#000000",
	GLOW = "#ffffff",
	OUTER_GLOW = "#493b8a",
}

export interface BaseConfig {
	intensity?: number;
}

export interface ScanlineConfig extends BaseConfig {
	height?: number;
	speed?: number;
	opacity?: number;
}

export interface DirectionalScanlinesConfig extends BaseConfig {
	count?: number;
	blur?: number;
	opacity?: number;
}

export interface ScanlinesConfig {
	horizontal?: DirectionalScanlinesConfig;
	vertical?: DirectionalScanlinesConfig;
}

export interface GlowConfig extends BaseConfig {
	spread?: number;
	color?: keyof typeof CRTColors;
	blur?: number;
	outerGlow?: number;
}

export interface ChromaticAberrationConfig extends BaseConfig {
	redIntensity?: number;
	blueIntensity?: number;
	offset?: number;
}
