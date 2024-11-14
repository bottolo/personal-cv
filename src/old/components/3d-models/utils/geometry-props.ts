import type { GroupProps } from "@react-three/fiber";
import type { MaterialOptions } from "./material-options.ts";
import type { RotationOptions } from "./rotation-options.ts";

export interface GeometricProps extends GroupProps {
	materialOptions?: MaterialOptions;
	rotationOptions?: RotationOptions;
	scale?: number;
}
