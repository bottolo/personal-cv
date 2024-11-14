import type React from "react";
import { useEffect, useState } from "react";
import { cn } from "../../utils/cn.ts";
import {
	type CRTAnimationType,
	CRTAnimationTypes,
	type CRTColorType,
	CRTColorTypes,
	crtAnimationClasses,
	crtBaseClasses,
	crtColorClasses,
} from "./crt-utils";

interface DisplayProps {
	children: React.ReactNode;
	className?: string;
	colorScheme?: CRTColorType;
	animationType?: CRTAnimationType;
}

const Display = ({
	children,
	className,
	colorScheme = CRTColorTypes.BACKGROUND,
	animationType = CRTAnimationTypes.SCANLINE,
}: DisplayProps) => {
	const [scanPos, setScanPos] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setScanPos((prev) => (prev + 1) % 100);
		}, 1000 / 120);

		return () => clearInterval(interval);
	}, []);

	return (
		<div
			className={cn(
				crtBaseClasses.wrapper,
				crtColorClasses[colorScheme],
				crtColorClasses.text,
				className,
			)}
		>
			{/* Main content */}
			{children}

			{/* Moving scanline */}
			<div
				className={cn(
					crtBaseClasses.scanlineBase,
					crtBaseClasses.movingScanline,
					crtColorClasses.movingScanline,
					"z-50",
				)}
				style={{
					top: `${scanPos}%`,
					transition: "top 16.67ms linear",
				}}
			/>

			{/* Static scanlines */}
			<div
				className={cn(crtBaseClasses.scanlineBase, "inset-0 z-40")}
				style={{
					backgroundImage:
						"linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3) 51%)",
					backgroundSize: "100% 4px",
				}}
			/>

			{/* CRT flicker effect */}
			<div
				className={cn(
					crtBaseClasses.scanlineBase,
					"inset-0 z-30",
					crtColorClasses.flicker,
					crtAnimationClasses[animationType],
				)}
			/>
		</div>
	);
};

export default Display;
