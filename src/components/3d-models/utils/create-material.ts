// Shared material creator
import * as THREE from "three";

import {
	type MaterialOptions,
	defaultMaterialOptions,
} from "./material-options.ts";

export const createMaterial = (options: MaterialOptions) => {
	const mergedOptions = { ...defaultMaterialOptions, ...options };
	return new THREE.MeshStandardMaterial({
		color: mergedOptions.color,
		metalness: mergedOptions.metalness,
		roughness: mergedOptions.roughness,
		wireframe: mergedOptions.wireframe,
		transparent: mergedOptions.transparent,
		opacity: mergedOptions.opacity,
		emissive: new THREE.Color(mergedOptions.emissive),
		emissiveIntensity: mergedOptions.emissiveIntensity,
		side: THREE.DoubleSide,
	});
};
