export type Emote = "happy" | "neutral" | "sad" | "angry" | "surprised";

export interface Avatar {
	style: string;
	emote: Emote;
}

export interface Dialogue {
	id: string;
	name: string;
	dialogue: string[];
	avatar: Avatar;
	completed?: boolean;
}
