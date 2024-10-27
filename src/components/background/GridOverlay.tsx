import { memo, useCallback, useEffect, useRef } from "react";

interface GridOverlayProps {
	// Grid customization
	gridSize?: number; // Size of grid cells in pixels
	gridOpacity?: number; // Grid line opacity (0-1)

	// Scan lines customization
	scanLinesOpacity?: number; // Opacity of scan lines
	scanLinesSpeed?: number; // Duration in seconds
	scanLinesSpacing?: number; // Spacing between scan lines in pixels
	scanLinesOffset?: number; // Movement distance in pixels

	// Glare customization
	glareOpacity?: number; // Screen glare opacity
	glarePosition?: string; // Position of glare center (e.g., "50% 50%")
	glareSize?: number; // Size of glare (0-100)

	// Performance options
	enableScanLines?: boolean; // Toggle scan line animation
	enableGlare?: boolean; // Toggle glare effect
	highPerformanceMode?: boolean; // Reduce effects for better performance
}

const GridOverlayBase = ({
	// Default values for all parameters
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

	// Performance optimization for animation
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

		// Cleanup animation frame on unmount or when disabled
		return () => cancelAnimationFrame(animationFrame);
	}, [enableScanLines, scanLinesSpeed, scanLinesOffset]);

	// Initialize animation
	useEffect(() => {
		const cleanup = updateAnimation();
		return () => cleanup?.();
	}, [updateAnimation]);

	return (
		<div className="fixed inset-0 pointer-events-none">
			{/* Grid Pattern */}
			<div
				className="absolute inset-0 z-[9999] will-change-transform"
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

// Memoize the component to prevent unnecessary re-renders
export const GridOverlay = memo(GridOverlayBase);
