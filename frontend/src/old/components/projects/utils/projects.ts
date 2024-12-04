// types/project.ts

export interface ProjectImage {
	src: string;
	alt: string;
	description?: string;
}

export interface Project {
	id: number;
	title: string;
	shortDescription: string;
	description: string;
	color: string;
	images: ProjectImage[];
	technologies: string[];
	links?: {
		github?: string;
		demo?: string;
	};
}

// Sample projects data
export const PROJECTS: Project[] = [
	{
		id: 1,
		title: "Noclip",
		shortDescription: "A short platformer made in Unity",
		description:
			"NOCLIP is an experimental first-person game in which you break its boundaries to discover a secret reality.",
		color: "#FF6B6B",
		images: [
			{
				src: "noclip-0.jpg",
				alt: "noclip-0",
				description: "falls",
			},
			{
				src: "noclip-1.jpg",
				alt: "noclip-1",
				description: "tower",
			},
			{
				src: "noclip-2.jpg",
				alt: "noclip-2",
				description: "entrance",
			},
			{
				src: "noclip-3.jpg",
				alt: "noclip-3",
				description: "rocks",
			},
			{
				src: "noclip-4.jpg",
				alt: "noclip-4",
				description: "tutorial",
			},
		],
		technologies: ["Unity", "C#"],
		links: {
			github: "https://github.com/VDP-noclip/noclip",
			demo: "https://polimi-game-collective.itch.io/noclip",
		},
	},
	{
		id: 2,
		title: "Octant",
		shortDescription: "Experimental walking simulator in Godot",
		description: `A modern collaboration platform enabling teams to work together seamlessly
    in real-time. Features include live document editing, video conferencing, and task management.`,
		color: "#4ECDC4",
		images: [
			{
				src: "/api/placeholder/800/600",
				alt: "Collaboration View",
				description: "Real-time editing interface",
			},
		],
		technologies: ["Godot", "GDScript"],
		links: {
			github: "https://github.com/user/beta",
		},
	},
	{
		id: 3,
		title: "Phareah",
		shortDescription: "Experimental visual novel built with Godot",
		description: `Advanced image processing application using machine learning
    for real-time modifications and enhancements.`,
		color: "#45B7D1",
		images: [
			{
				src: "/api/placeholder/800/600",
				alt: "Image Processing",
				description: "ML-powered editing tools",
			},
		],
		technologies: ["Godot", "GDScript"],
	},
	{
		id: 4,
		title: "Mediazioni Castiglia",
		shortDescription: "A simple landing page made with React",
		description: `A modern UI framework focused on developer experience and performance.
    Built with the latest web technologies and best practices.`,
		color: "#96CEB4",
		images: [
			{
				src: "/api/placeholder/800/600",
				alt: "Component Library",
				description: "UI component showcase",
			},
		],
		technologies: ["React", "TypeScript", "Vite", "Tailwind"],
	},
	{
		id: 5,
		title: "This app.",
		shortDescription: "An experimental CV with 3D elements",
		description: `A modern UI framework focused on developer experience and performance.
    Built with the latest web technologies and best practices.`,
		color: "#96CEB4",
		images: [
			{
				src: "/api/placeholder/800/600",
				alt: "Component Library",
				description: "UI component showcase",
			},
		],
		technologies: [
			"React",
			"React Three Fiber",
			"TypeScript",
			"Vite",
			"Tailwind",
		],
	},
	{
		id: 6,
		title: "Eridanus",
		shortDescription: "A work in progress simulated OS to present games",
		description: `A modern UI framework focused on developer experience and performance.
    Built with the latest web technologies and best practices.`,
		color: "#96CEB4",
		images: [
			{
				src: "/api/placeholder/800/600",
				alt: "Component Library",
				description: "UI component showcase",
			},
		],
		technologies: [
			"React",
			"React Three Fiber",
			"TypeScript",
			"Vite",
			"Tailwind",
		],
	},
];
