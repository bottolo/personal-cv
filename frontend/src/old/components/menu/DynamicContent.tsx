import { MENU_CONFIG } from "../../config/menu-config.tsx";
import { useMenuStore } from "../../store/menu-store.ts";
import { VoidView } from "./VoidView.tsx";

export const DynamicContent = () => {
	const { currentView } = useMenuStore();

	const currentMenuItem = MENU_CONFIG.find((item) => item.view === currentView);

	if (!currentMenuItem) {
		return <VoidView />;
	}

	const ViewComponent = currentMenuItem.component;
	return <ViewComponent />;
};
