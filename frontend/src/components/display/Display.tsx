import type { ReactNode } from "react";
import { cn } from "../../utils/cn.ts";
import { BorderGlow } from "./effects/BorderGlow.tsx";
import ChromaticAberration from "./effects/ChromaticAberration.tsx";
import { Flicker } from "./effects/Flicker.tsx";
import { Glow } from "./effects/Glow.tsx";
import { MovingScanline } from "./effects/MovingScanline.tsx";
import { Scanlines } from "./effects/Scanlines.tsx";
import type {
	BaseConfig,
	ChromaticAberrationConfig,
	GlowConfig,
	ScanlineConfig,
	ScanlinesConfig,
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
	chromaticAberrationConfig?: ChromaticAberrationConfig;
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
	chromaticAberrationConfig = {},
}: DisplayProps) => {
	return (
		<div className={cn("fixed inset-0 overflow-hidden", className)}>
			<ChromaticAberration config={chromaticAberrationConfig}>
				<BorderGlow config={glowConfig}>
					<div className="relative w-full h-full">
						<div className="h-screen overflow-auto">
							{glow ? <Glow config={glowConfig}>{children}</Glow> : children}
						</div>

						{movingScanline && <MovingScanline config={scanlineConfig} />}
						{horizontalScanlines && (
							<Scanlines
								direction="horizontal"
								config={scanlinesConfig.horizontal}
							/>
						)}
						{verticalScanlines && (
							<Scanlines
								direction="vertical"
								config={scanlinesConfig.vertical}
							/>
						)}
						{flicker && <Flicker config={flickerConfig} />}

						<div
							className="absolute inset-0 pointer-events-none z-20 bg-crt-overlay"
							style={{ backgroundSize: "100% 2px, 3px 100%" }}
						/>
					</div>
				</BorderGlow>
			</ChromaticAberration>
		</div>
	);
};
