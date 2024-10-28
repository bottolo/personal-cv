type Sequence = {
	boot: string[];
	shutdown: string[];
	change: string[];
};

export const sequences: Sequence = {
	boot: [
		"connecting...",
		"...",
		"...done.",
		"opening communication...",
		"...",
		"...done.",
		"booting up...",
		"...",
	],
	shutdown: [
		"closing communication...",
		"...",
		"...done.",
		"disconnecting...",
		"...",
		"...done.",
		"shutting down...",
	],
	change: ["", "changing communication...", "...", "...done."],
};
