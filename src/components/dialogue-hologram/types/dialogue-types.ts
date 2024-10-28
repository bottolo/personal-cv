export type AvatarVariant = "talking" | "idle";

export interface Dialogue {
	id: string;
	name: string;
	dialogue: string[];
	avatar: AvatarVariant;
	completed?: boolean;
	autoskip?: boolean;
	delay?: number;
}
