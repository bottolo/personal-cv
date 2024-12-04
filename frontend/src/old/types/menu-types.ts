import type { ComponentType, ReactNode } from "react";

export interface MenuItem {
	id: string;
	label: string;
	icon?: string;
	view: string;
	description?: string;
	component: ComponentType<ReactNode>;
}
