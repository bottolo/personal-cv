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
		title: "Project Alpha",
		shortDescription: "AI-powered analytics platform",
		description: `A comprehensive data analytics platform leveraging artificial intelligence 
    to provide real-time insights and predictive analysis. Built with scalability in mind, 
    it handles massive datasets while maintaining responsive performance.`,
		color: "#FF6B6B",
		images: [
			{
				src: "/api/placeholder/800/600",
				alt: "Dashboard",
				description: "Main analytics dashboard",
			},
			{
				src: "/api/placeholder/800/600",
				alt: "Analytics",
				description: "Data visualization panel",
			},
		],
		technologies: ["React", "TypeScript", "TensorFlow.js"],
		links: {
			github: "https://github.com/user/alpha",
			demo: "https://demo.alpha.com",
		},
	},
	{
		id: 2,
		title: "Project Beta",
		shortDescription: "Real-time collaboration tool",
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
		technologies: ["Vue.js", "WebRTC", "Socket.io"],
		links: {
			github: "https://github.com/user/beta",
		},
	},
	{
		id: 3,
		title: "Project Gamma",
		shortDescription: "ML-powered image processing",
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
		technologies: ["Python", "TensorFlow", "React"],
	},
	{
		id: 4,
		title: "Project Delta",
		shortDescription: "Next-gen UI framework",
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
		technologies: ["TypeScript", "Vite", "Tailwind CSS"],
	},
];
