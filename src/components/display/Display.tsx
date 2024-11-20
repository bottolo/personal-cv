import { type ReactNode, useEffect, useMemo, useState } from "react";
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
	movingScanline?: boolean;
	horizontalScanlines?: boolean;
	verticalScanlines?: boolean;
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
	movingScanline = false,
	horizontalScanlines = false,
	verticalScanlines = false,
	flicker = false,
	glow = false,
	borderGlow = false,
	scanlineConfig = {},
	scanlinesConfig = {},
	flickerConfig = {},
	glowConfig = {},
}: DisplayProps) => {
	const [scanPos, setScanPos] = useState(0);

	const {
		scanlineHeight,
		scanlineOpacity,
		scanlineSpeed,
		scanlinesSpacing,
		scanlinesOpacity,
		scanlinesBlur,
		flickerIntensity,
		glowStyles,
		borderGlowStyle,
	} = useMemo(
		() => ({
			scanlineHeight: mapRange(scanlineConfig?.height, 0, 100, 0, 2),
			scanlineOpacity: mapRange(scanlineConfig?.opacity),
			scanlineSpeed: mapRange(scanlineConfig?.speed, 0, 100, 0, 200),
			scanlinesSpacing: mapRange(scanlinesConfig?.count, 0, 100, 0, 20),
			scanlinesOpacity: mapRange(scanlinesConfig?.opacity),
			scanlinesBlur: mapRange(scanlinesConfig?.blur, 0, 100, 0, 2),
			flickerIntensity: mapRange(flickerConfig?.intensity, 0, 100, 0, 1),
			glowStyles: {
				filter: `brightness(${mapRange(glowConfig?.spread, 0, 100, 1, 1.5)}) blur(${mapRange(glowConfig?.blur ?? 50, 0, 100, 0, 10)}px)`,
				backgroundColor: `color-mix(in srgb, ${CRTColors[glowConfig.color ?? "GLOW"]} 10%, transparent)`,
			},
			borderGlowStyle: borderGlow
				? {
						boxShadow: (() => {
							const baseIntensity = glowConfig?.color === "OUTER_GLOW" ? 2 : 1;
							const outerGlow = mapRange(
								glowConfig?.outerGlow ?? 50,
								0,
								100,
								baseIntensity * 0.5,
								baseIntensity * 2,
							);
							const glowColor = CRTColors[glowConfig.color ?? "GLOW"];
							return `
                    inset 0 0 ${Math.round(outerGlow * 20)}px ${glowColor},
                    inset 0 0 ${Math.round(outerGlow * 40)}px ${glowColor},
                    inset 0 0 ${Math.round(outerGlow * 100)}px ${glowColor}
                `;
						})(),
						willChange: "transform",
					}
				: {},
		}),
		[scanlineConfig, scanlinesConfig, flickerConfig, glowConfig, borderGlow],
	);

	useEffect(() => {
		if (!movingScanline) return;
		const interval = setInterval(() => {
			setScanPos((prev) => (prev + 1) % 100);
		}, scanlineSpeed);
		return () => clearInterval(interval);
	}, [movingScanline, scanlineSpeed]);

	const scanlineStyles = useMemo(
		() => ({
			height: `${scanlineHeight}px`,
			top: `${scanPos}%`,
			backgroundColor: `rgba(0, 0, 0, ${scanlineOpacity})`,
			transition: `top ${scanlineSpeed}ms linear`,
		}),
		[scanlineHeight, scanPos, scanlineOpacity, scanlineSpeed],
	);

	const horizontalScanlinesStyles = useMemo(
		() => ({
			backgroundImage: `linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, ${scanlinesOpacity}) 51%)`,
			backgroundSize: `100% ${scanlinesSpacing}px`,
			filter: `blur(${scanlinesBlur}px)`,
		}),
		[scanlinesOpacity, scanlinesSpacing, scanlinesBlur],
	);

	const verticalScanlinesStyles = useMemo(
		() => ({
			backgroundImage: `linear-gradient(to right, transparent 50%, rgba(0, 0, 0, ${scanlinesOpacity}) 51%)`,
			backgroundSize: `${scanlinesSpacing}px 100%`,
			filter: `blur(${scanlinesBlur}px)`,
		}),
		[scanlinesOpacity, scanlinesSpacing, scanlinesBlur],
	);

	return (
		<div
			className={cn("fixed inset-0 overflow-hidden", className)}
			style={borderGlowStyle}
		>
			<div className="relative w-full h-full">
				<div className="h-screen overflow-auto">
					{glow ? (
						<div className="animate-colorShift" style={glowStyles}>
							{children}
						</div>
					) : (
						<div className="animate-colorShift">{children}</div>
					)}
				</div>

				{movingScanline && (
					<div
						className="absolute w-full pointer-events-none z-50"
						style={scanlineStyles}
					/>
				)}

				{horizontalScanlines && (
					<div
						className="absolute inset-0 pointer-events-none z-40"
						style={horizontalScanlinesStyles}
					/>
				)}

				{verticalScanlines && (
					<div
						className="absolute inset-0 pointer-events-none z-40"
						style={verticalScanlinesStyles}
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
