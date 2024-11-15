import { type ReactNode, useEffect, useState } from "react";
import { cn } from "../../utils/cn.ts";
import { mapRange } from "../../utils/map-range.ts";
import {
	type BaseConfig,
	CRTColors,
	type GlowConfig,
	type ScanlineConfig,
	type ScanlinesConfig,
} from "./types.ts";

interface DisplayProps {
	children: ReactNode;
	className?: string;
	scanline?: boolean;
	scanlines?: boolean;
	flicker?: boolean;
	glow?: boolean;
	borderGlow?: boolean;
	scanlineConfig?: ScanlineConfig;
	scanlinesConfig?: ScanlinesConfig;
	flickerConfig?: BaseConfig;
	glowConfig?: GlowConfig;
}

export const Display = ({
	children,
	className,
	scanline = false,
	scanlines = false,
	flicker = false,
	glow = false,
	borderGlow = false,
	scanlineConfig = {},
	scanlinesConfig = {},
	flickerConfig = {},
	glowConfig = {},
}: DisplayProps) => {
	const [scanPos, setScanPos] = useState(0);

	const scanlineHeight = mapRange(scanlineConfig?.height, 0, 100, 0, 2);
	const scanlineOpacity = mapRange(scanlineConfig?.opacity);
	const scanlineSpeed = mapRange(scanlineConfig?.speed, 0, 100, 0, 200);

	const scanlinesSpacing = mapRange(scanlinesConfig?.count, 0, 100, 0, 20);
	const scanlinesOpacity = mapRange(scanlinesConfig?.opacity);
	const scanlinesBlur = mapRange(scanlinesConfig?.blur, 0, 100, 0, 2);

	const flickerIntensity = mapRange(flickerConfig?.intensity, 0, 100, 0.1, 0.8);

	const glowBrightness = mapRange(glowConfig?.spread, 0, 100, 1, 1.5);
	const glowBlur = mapRange(glowConfig?.blur ?? 50, 0, 100, 0, 10);
	const glowColor = CRTColors[glowConfig.color ?? "GLOW"];

	const baseIntensity = glowConfig?.color === "OUTER_GLOW" ? 2 : 1;
	const outerGlow = mapRange(
		glowConfig?.outerGlow ?? 50,
		0,
		100,
		baseIntensity * 0.5,
		baseIntensity * 2,
	);

	const borderGlowStyle = borderGlow
		? {
				boxShadow: `
                inset 0 0 ${Math.round(outerGlow * 20)}px ${glowColor},
                inset 0 0 ${Math.round(outerGlow * 40)}px ${glowColor},
                inset 0 0 ${Math.round(outerGlow * 100)}px ${glowColor}
            `,
			}
		: {};

	useEffect(() => {
		if (!scanline) return;
		const interval = setInterval(() => {
			setScanPos((prev) => (prev + 1) % 100);
		}, scanlineSpeed);
		return () => clearInterval(interval);
	}, [scanline, scanlineSpeed]);

	return (
		<div
			className={cn("fixed inset-0 overflow-hidden", className)}
			style={borderGlowStyle}
		>
			<div className="relative w-full h-full">
				<div className="h-screen overflow-auto">
					{glow ? (
						<div
							className="animate-colorShift"
							style={{
								filter: `brightness(${glowBrightness}) blur(${glowBlur}px)`,
								backgroundColor: `color-mix(in srgb, ${glowColor} 10%, transparent)`,
							}}
						>
							{children}
						</div>
					) : (
						<div className="animate-colorShift">{children}</div>
					)}
				</div>

				{scanline && (
					<div
						className="absolute w-full pointer-events-none z-50"
						style={{
							height: `${scanlineHeight}px`,
							top: `${scanPos}%`,
							backgroundColor: `rgba(0, 0, 0, ${scanlineOpacity})`,
							transition: `top ${scanlineSpeed}ms linear`,
						}}
					/>
				)}

				{scanlines && (
					<div
						className="absolute inset-0 pointer-events-none z-40"
						style={{
							backgroundImage: `linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, ${scanlinesOpacity}) 51%)`,
							backgroundSize: `100% ${scanlinesSpacing}px`,
							filter: `blur(${scanlinesBlur}px)`,
						}}
					/>
				)}

				{flicker && (
					<div
						className="absolute inset-0 pointer-events-none z-30 animate-flicker"
						style={{
							backgroundColor: `rgba(18, 16, 16, ${flickerIntensity})`,
						}}
					/>
				)}

				<div
					className="absolute inset-0 pointer-events-none z-20 bg-crt-overlay"
					style={{
						backgroundSize: "100% 2px, 3px 100%",
					}}
				/>
			</div>
		</div>
	);
};
