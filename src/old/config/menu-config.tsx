import { MusicView } from "../components/menu/MusicView.tsx";
import { VoidView } from "../components/menu/VoidView.tsx";
import type { MenuItem } from "../types/menu-types.ts";

export const MENU_CONFIG: MenuItem[] = [
	{
		id: "world",
		label: "THE VOID",
		view: "world",
		description: "where everything has been, is now, and will always be",
		component: VoidView,
	},
	{
		id: "music",
		label: "MUSIC",
		view: "music",
		description: "time to change the tune",
		component: MusicView,
	},
];
