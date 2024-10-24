import type { Dialogue } from "../../types/dialogue-types.ts";

export const DIALOGUES: Record<string, Dialogue> = {
	firstChoice: {
		id: "firstChoice",
		name: "what have you worked on?",
		dialogue: [
			"Welcome to our world! I'll be your guide.",
			"Let me show you around...",
			"Feel free to explore and ask questions!",
		],
		avatar: {
			style: "guide",
			emote: "happy",
		},
	},
	secondChoice: {
		id: "secondChoice",
		name: "tell me about yourself",
		dialogue: [
			"There's something you need to know...",
			"The ancient prophecy speaks of a chosen one.",
			"Could it be you?",
		],
		avatar: {
			style: "mystic",
			emote: "neutral",
		},
	},
	thirdChoice: {
		id: "thirdChoice",
		name: "how can i contact you?",
		dialogue: [
			"Ah, a customer! Browse my wares.",
			"I've got rare items from distant lands.",
			"Everything's for sale, for the right price!",
		],
		avatar: {
			style: "merchant",
			emote: "happy",
		},
	},
};
