import type { ReactNode } from "react";

export type AvatarVariant = "talking" | "idle";

export interface Dialogue {
	id: string;
	name: string;
	dialogue: string[];
	avatar: AvatarVariant;
	completed?: boolean;
	custom?: ReactNode;
	autoskip?: boolean;
	delay?: number;
}
