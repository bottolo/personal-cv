import { MENU_CONFIG } from "../../config/menu-config.tsx";
import { COLORS } from "../../global-utils/colors.ts";
import { useMenuStore } from "../../store/menu-store.ts";

export const SideMenu = ({ backgroundColor }) => {
	const { currentView, setCurrentView, toggleMainContent } = useMenuStore();

	const handleMenuClick = (view: string) => {
		setCurrentView(view);
		toggleMainContent(true);
	};

	return (
		<div className="h-full w-full flex flex-col cursor-none">
			{/* Inner container with matching background */}
			<div
				className="flex-1 p-4 relative"
				style={{
					backgroundColor: backgroundColor,
				}}
			>
				{/* Menu header */}
				<div
					className="mb-6 pb-2"
					style={{
						borderBottom: `2px solid ${COLORS.accent}`,
					}}
				>
					<h2
						className="font-bold text-xl tracking-wider"
						style={{ color: COLORS.text.primary }}
					>
						SYSTEM MENU
					</h2>
				</div>

				{/* Menu items */}
				<div className="space-y-2 relative z-10">
					{MENU_CONFIG.map((item) => (
						<button
							type="button"
							key={item.id}
							onClick={() => handleMenuClick(item.view)}
							className="w-full text-left p-2 transition-all duration-200 rounded-none cursor-none"
							style={{
								color:
									currentView === item.view
										? COLORS.text.primary
										: COLORS.text.secondary,
								backgroundColor:
									currentView === item.view
										? `${backgroundColor}99`
										: "transparent",
								border: `1px solid ${
									currentView === item.view
										? COLORS.border.hover
										: "transparent"
								}`,
							}}
						>
							<div className="text-sm font-bold tracking-wider">
								{item.label}
							</div>
							{item.description && (
								<div
									className="text-xs mt-1"
									style={{ color: COLORS.text.muted }}
								>
									{item.description}
								</div>
							)}
						</button>
					))}
				</div>

				{/* System info footer */}
				<div
					className="absolute bottom-4 left-4 right-4"
					style={{
						borderTop: `1px solid ${COLORS.border.normal}`,
						color: COLORS.text.muted,
					}}
				>
					<div className="text-xs pt-2 space-y-1">
						<div className="flex justify-between">
							<span>SYSTEM STATUS</span>
							<span style={{ color: COLORS.text.primary }}>ONLINE</span>
						</div>
						<div className="flex justify-between">
							<span>MEMORY</span>
							<span style={{ color: COLORS.text.primary }}>98% FREE</span>
						</div>
						<div className="flex justify-between">
							<span>TIME</span>
							<span style={{ color: COLORS.text.primary }}>
								{new Date().toLocaleTimeString()}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
