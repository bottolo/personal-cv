import type { ReactNode } from "react";
import { Mediations } from "./details/Mediations.tsx";
import { Noclip } from "./details/Noclip.tsx";

export type Project = {
	id: number;
	image: string;
	title: string;
	description: string;
	content: ReactNode;
};

export const projects: Project[] = [
	{
		id: 1,
		image: "/project1.png",
		title: "Project 1",
		description: "Description for Project 1",
		content: Mediations(),
	},
	{
		id: 2,
		image: "/project2.png",
		title: "Project 2",
		description: "Description for Project 2",
		content: Noclip(),
	},
	{
		id: 3,
		image: "/project3.png",
		title: "Project 3",
		description: "Description for Project 3",
		content: Mediations(),
	},
	{
		id: 4,
		image: "/project4.png",
		title: "Project 4",
		description: "Description for Project 4",
		content: Noclip(),
	},
];
