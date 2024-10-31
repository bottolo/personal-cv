export interface MaterialOptions {
	color?: string;
	metalness?: number;
	roughness?: number;
	wireframe?: boolean;
	transparent?: boolean;
	opacity?: number;
	emissive?: string;
	emissiveIntensity?: number;
}

export const defaultMaterialOptions: MaterialOptions = {
	color: "#8c75e1",
	metalness: 0.6,
	roughness: 0.2,
	wireframe: false,
	transparent: true,
	opacity: 0.8,
	emissive: "#3c2d70",
	emissiveIntensity: 0.2,
};
