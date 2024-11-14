import { COLORS } from "../../global-utils/colors.ts";
import { SideMenu } from "./SideMenu.tsx";

const BorderLayout = ({ children }) => {
	const borderWidth = "3.25rem";
	const rightMenuWidth = "16rem";
	const solidBackground = COLORS.palette.blue.dark;

	return (
		<div
			className="fixed inset-0 flex"
			style={{ backgroundColor: solidBackground }}
		>
			{/* Left Border */}
			<div
				className="h-full z-10"
				style={{
					width: borderWidth,
					backgroundColor: solidBackground,
				}}
			/>

			{/* Main Content Area */}
			<div className="flex-1 flex flex-col">
				{/* Top Border */}
				<div
					className="w-full z-10"
					style={{
						height: borderWidth,
						backgroundColor: solidBackground,
					}}
				/>

				{/* Content Area */}
				<div className="flex-1 relative overflow-hidden bg-black">
					{children}
				</div>

				{/* Bottom Border */}
				<div
					className="w-full z-10"
					style={{
						height: borderWidth,
						backgroundColor: solidBackground,
					}}
				/>
			</div>

			{/* Right Border with Menu */}
			<div
				className="h-full z-10"
				style={{
					width: rightMenuWidth,
					backgroundColor: solidBackground,
				}}
			>
				<SideMenu backgroundColor={solidBackground} />
			</div>
		</div>
	);
};

export default BorderLayout;
