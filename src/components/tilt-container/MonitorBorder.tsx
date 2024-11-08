import { motion } from "framer-motion";
import { Power } from "lucide-react";
import { memo, useMemo, useState } from "react";
import { cn } from "../../global-utils/cn.ts";
import {
	COLORS,
	createHologramGradient,
	hologramAnimations,
} from "../../global-utils/colors";

interface MonitorBorderProps {
	onPowerChange?: (isOn: boolean) => void;
}

export const MonitorBorder = memo(({ onPowerChange }: MonitorBorderProps) => {
	const [isPowerOn, setIsPowerOn] = useState(false);
	const [isBooting, setIsBooting] = useState(false);

	const styles = useMemo(
		() => ({
			outer: {
				background: createHologramGradient(
					"45deg",
					COLORS.palette.purple.dark,
					[".4", ".2"],
				),
				boxShadow: `
                inset 0 0 10px ${COLORS.effects.scanLine},
                ${COLORS.glow.weak}
            `,
			},
			inner: {
				background: createHologramGradient(
					"45deg",
					COLORS.palette.blue.primary,
					[".3", ".1"],
				),
				boxShadow: `
                inset 0 0 15px ${COLORS.effects.glitch.overlay},
                0 0 5px ${COLORS.effects.scanLine}
            `,
			},
			corner: {
				background: COLORS.effects.glitch.overlay,
				boxShadow: `
                inset 0 0 10px ${COLORS.palette.blue.light},
                0 0 15px ${COLORS.effects.scanLine}
            `,
			},
			scanLines: {
				background: `
                repeating-linear-gradient(
                    0deg,
                    ${COLORS.effects.scanLine} 0px,
                    transparent 1px,
                    transparent 2px
                )
            `,
				opacity: 0.1,
				mixBlendMode: "overlay" as const,
			},
			glare: {
				background: `
                linear-gradient(
                    45deg,
                    transparent 0%,
                    ${COLORS.effects.glitch.highlight} 45%,
                    ${COLORS.effects.glitch.highlight} 55%,
                    transparent 100%
                )
            `,
				opacity: 0.1,
				mixBlendMode: "screen" as const,
			},
			screen: {
				off: {
					background: "rgb(16, 16, 16)",
					boxShadow: "inset 0 0 100px rgba(0, 0, 0, 0.9)",
				},
				bootAnimation: {
					background: createHologramGradient(
						"180deg",
						COLORS.palette.blue.primary,
						[".05", ".02"],
					),
				},
			},
			widgets: {
				container: {
					background: createHologramGradient(
						"90deg",
						COLORS.palette.purple.dark,
						[".3", ".1"],
					),
					boxShadow: `
                    0 0 10px ${COLORS.effects.scanLine},
                    inset 0 0 5px ${COLORS.effects.glitch.overlay}
                `,
				},
				powerButton: {
					background: isPowerOn
						? COLORS.palette.blue.primary
						: COLORS.palette.purple.dark,
					boxShadow: isPowerOn
						? `0 0 15px ${COLORS.effects.glitch.overlay}`
						: "none",
				},
			},
		}),
		[isPowerOn],
	);

	const handlePowerClick = async () => {
		setIsPowerOn(!isPowerOn);
		if (!isPowerOn) {
			setIsBooting(true);
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setIsBooting(false);
		}
		onPowerChange?.(!isPowerOn);
	};

	return (
		<motion.div
			className="fixed inset-0 pointer-events-none"
			style={{ zIndex: 9996 }}
			animate={hologramAnimations.glow.animate}
			transition={hologramAnimations.glow.transition}
		>
			{/* Screen overlay for power off state */}
			{!isPowerOn && (
				<motion.div
					className="absolute inset-0 z-1"
					style={styles.screen.off}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				/>
			)}

			{/* Boot animation */}
			{isBooting && (
				<motion.div
					className="absolute inset-0 z-40"
					style={styles.screen.bootAnimation}
					initial={{ opacity: 0, scaleY: 0 }}
					animate={{
						opacity: [0, 1, 1, 0],
						scaleY: [0, 1, 1, 0],
					}}
					transition={{
						duration: 1,
						times: [0, 0.1, 0.9, 1],
					}}
				>
					<motion.div
						className="absolute inset-0"
						style={{
							background: `linear-gradient(transparent 0%, ${COLORS.effects.scanLine} 50%, transparent 100%)`,
							backgroundSize: "100% 10px",
						}}
						animate={{
							y: ["0%", "100%"],
						}}
						transition={{
							duration: 0.5,
							repeat: 2,
							ease: "linear",
						}}
					/>
				</motion.div>
			)}

			{/* Main border container */}
			<div
				className="absolute inset-0 border-[40px] rounded-lg"
				style={styles.outer}
			>
				<div
					className="absolute inset-[-5px] border-[15px] rounded-sm"
					style={styles.inner}
				/>

				{/* Top Left */}
				<div className="absolute top-[-25px] left-[-25px]">
					<div
						className="absolute w-[40px] h-[8px] rounded-full"
						style={styles.corner}
					/>
					<div
						className="absolute w-[8px] h-[40px] rounded-full"
						style={styles.corner}
					/>
				</div>

				{/* Top Right */}
				<div className="absolute top-[-25px] right-[-25px]">
					<div
						className="absolute right-0 w-[40px] h-[8px] rounded-full"
						style={styles.corner}
					/>
					<div
						className="absolute right-0 w-[8px] h-[40px] rounded-full"
						style={styles.corner}
					/>
				</div>

				{/* Bottom Left */}
				<div className="absolute bottom-[-25px] left-[-25px]">
					<div
						className="absolute bottom-0 left-0 w-[8px] h-[40px] rounded-full"
						style={styles.corner}
					/>
					<div
						className="absolute bottom-0 left-0 w-[40px] h-[8px] rounded-full"
						style={styles.corner}
					/>
				</div>

				{/* Bottom Right */}
				<div className="absolute bottom-[-25px] right-[-25px]">
					<div
						className="absolute bottom-0 right-0 w-[8px] h-[40px] rounded-full"
						style={styles.corner}
					/>
					<div
						className="absolute bottom-0 right-0 w-[40px] h-[8px] rounded-full"
						style={styles.corner}
					/>
				</div>

				{/* Scan lines effect */}
				<div
					className="absolute inset-0 pointer-events-none"
					style={styles.scanLines}
				/>

				{/* Glare effect */}
				<div
					className="absolute inset-0 pointer-events-none"
					style={styles.glare}
				/>
			</div>

			{/* Widget bar */}
			<motion.div
				className="absolute bottom-[10px] left-1/2 transform -translate-x-1/2 w-[50rem] h-[15px] pointer-events-auto rounded-full"
				style={styles.widgets.container}
			>
				{/* Power button */}
				<motion.button
					className="absolute -top-[8.6px] left-[24rem] rounded-full cursor-none"
					style={styles.widgets.powerButton}
					whileHover={{
						scale: 1.01,
						boxShadow: `0 0 20px ${COLORS.effects.glitch.overlay}`,
					}}
					onClick={handlePowerClick}
				>
					<Power
						size={12}
						className={cn(isPowerOn ? "text-white" : "text-gray-500")}
					/>
				</motion.button>
			</motion.div>
		</motion.div>
	);
});

MonitorBorder.displayName = "MonitorBorder";
