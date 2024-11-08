// In dialogues.tsx
import type { Dialogue } from "./dialogue-types.ts";

export const DIALOGUES: Record<string, Dialogue> = {
	"/projects": {
		name: "/projects",
		dialogue: [
			"Welcome to our world! I'll be your guide.",
			"Let me show you around...",
			"Feel free to explore and ask questions!",
		],
	},
	"/about": {
		name: "/about",
		dialogue: [
			"There's something you need to know...",
			"The ancient prophecy speaks of a chosen one.",
			"Could it be you?",
		],
	},
	"/contacts": {
		name: "/contacts",
		dialogue: [
			"i have no physical form, but i can be reached through the terminal",
			"of course i'm joking",
			"feel free to contact me at samuele.castiglia.98@gmail.com",
			"or by phone. my number is +39 393 072 7445. though i don't really have a phone. just a voice",
			"oh, and also i have a github account: github.com/bottolo",
			"bye now",
		],
	},
};