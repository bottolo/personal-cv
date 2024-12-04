// In dialogues.tsx
import type { Dialogue } from "./dialogue-types.ts";

export const DIALOGUES: Record<string, Dialogue> = {
	"/projects": {
		name: "/projects",
		dialogue: [
			"[projects transmission begins]",
			"hi",
			"welcome to the projects section",
			"the interface above the terminal hosts all of them on this plane of existence",
			"click on a sphere to learn more",
			"each project has its technologies listed",
			"and a github page where you can find the source code",
			"i hope you find it interesting",
			"thanks!!",
			"[transmission ends]",
		],
	},
	"/about": {
		name: "/about",
		dialogue: [
			"[about transmission begins]",
			"heyy",
			"here's some information about me",
			"i'm a developer. i have worked full-stack for the past 2 years, using various technologies like...",
			"react, javascript, typescript, java (spring), angular (both JS and 14+), python, postgresql, mysql...",
			"while, in my free time, i have been experimenting with game development using unity, c#, godot and gdscript",
			"i always try to see visual patterns in both abstract and visual concepts.",
			"[interference]",
			"ideas are precious. brainstorming is essential.",
			"[transmission resumed]",
			"i've studied at the university of milan and i have got a bachelor's degree in computer science",
			"i'm currently working at gn techonomy in calusco d'adda, mostly remotely",
			"if you are interested in what i may have worked on, click on the projects section!",
			"[interference]",
			"challenges are opportunities",
			"for every problem there's always something new to learn",
			"[transmission resumed]",
			"this site is my personal statement for experimentation. i hope you enjoy exploring it!",
			"[transmission ends]",
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
