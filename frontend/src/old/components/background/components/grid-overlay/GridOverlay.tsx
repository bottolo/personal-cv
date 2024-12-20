import { memo, useCallback, useEffect, useRef } from "react";

interface GridOverlayProps {
	gridSize?: number;
	gridOpacity?: number;

	scanLinesOpacity?: number;
	scanLinesSpeed?: number;
	scanLinesSpacing?: number;
	scanLinesOffset?: number;

	glareOpacity?: number;
	glarePosition?: string;
	glareSize?: number;

	enableScanLines?: boolean;
	enableGlare?: boolean;
	highPerformanceMode?: boolean;
}

const GridOverlayBase = ({
	gridSize = 20,
	gridOpacity = 0.03,
	scanLinesOpacity = 0.5,
	scanLinesSpeed = 8,
	scanLinesSpacing = 2,
	scanLinesOffset = 20,
	glareOpacity = 0.05,
	glarePosition = "50% 50%",
	glareSize = 80,
	enableScanLines = true,
	enableGlare = true,
	highPerformanceMode = false,
}: GridOverlayProps) => {
	const scanLinesRef = useRef<HTMLDivElement>(null);

	const updateAnimation = useCallback(() => {
		if (!scanLinesRef.current || !enableScanLines) return;

		const startTime = performance.now();

		const animate = (currentTime: number) => {
			const elapsed = currentTime - startTime;
			const progress =
				(elapsed % (scanLinesSpeed * 1000)) / (scanLinesSpeed * 1000);

			if (scanLinesRef.current) {
				scanLinesRef.current.style.transform = `translateY(${progress * scanLinesOffset}px) translateZ(0)`;
			}

			requestAnimationFrame(animate);
		};

		const animationFrame = requestAnimationFrame(animate);

		return () => cancelAnimationFrame(animationFrame);
	}, [enableScanLines, scanLinesSpeed, scanLinesOffset]);

	useEffect(() => {
		const cleanup = updateAnimation();
		return () => cleanup?.();
	}, [updateAnimation]);

	return (
		<div className="fixed inset-0 pointer-events-none">
			{/* Grid Pattern */}
			<div
				className="absolute inset-0 z-[9998] will-change-transform"
				style={{
					backgroundImage: `
            linear-gradient(rgba(255,255,255,${gridOpacity}) 1px, transparent 1px),
            linear-gradient(90deg,rgba(255,255,255,${gridOpacity}) 1px, transparent 1px)
          `,
					backgroundSize: `${gridSize}px ${gridSize}px`,
					WebkitMaskImage:
						"linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)",
					maskImage:
						"linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)",
					transform: "translateZ(0)",
				}}
			/>

			{/* Scan Lines */}
			{enableScanLines && (
				<div
					ref={scanLinesRef}
					className="absolute inset-0 z-[9999] will-change-transform"
					style={{
						background: `repeating-linear-gradient(
              0deg,
              rgba(255,255,255,${gridOpacity}) 0px,
              rgba(255,255,255,${gridOpacity}) 1px,
              transparent 1px,
              transparent ${scanLinesSpacing}px
            )`,
						opacity: scanLinesOpacity,
						transform: "translateZ(0)",
						contain: "strict",
					}}
				/>
			)}

			{/* Screen Glare */}
			{enableGlare && !highPerformanceMode && (
				<div
					className="absolute inset-0 z-[9999] will-change-transform"
					style={{
						background: `radial-gradient(
              circle at ${glarePosition},
              rgba(255,255,255,${glareOpacity}) 0%,
              transparent ${glareSize}%
            )`,
						transform: "translateZ(0)",
						contain: "strict",
					}}
				/>
			)}
		</div>
	);
};

export const GridOverlay = memo(GridOverlayBase);
