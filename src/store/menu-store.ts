import { create } from "zustand";

interface MenuState {
	currentView: string | null;
	isMainContentVisible: boolean;
	setCurrentView: (view: string | null) => void;
	toggleMainContent: (visible: boolean) => void;
}

export const useMenuStore = create<MenuState>((set) => ({
	currentView: null,
	isMainContentVisible: false,
	setCurrentView: (view) => set({ currentView: view }),
	toggleMainContent: (visible) => set({ isMainContentVisible: visible }),
}));
