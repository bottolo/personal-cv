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
					[0.4, 0.2],
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
					[0.3, 0.1],
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
				bootBackground: {
					background: "rgb(16, 16, 16)",
				},
				radar: {
					border: `2px solid ${COLORS.palette.blue.primary}`,
					boxShadow: `0 0 20px ${COLORS.effects.glitch.overlay}`,
					background: `radial-gradient(circle, ${COLORS.palette.blue.primary}20 0%, transparent 70%)`,
				},
			},
			widgets: {
				container: {
					background: createHologramGradient(
						"90deg",
						COLORS.palette.purple.dark,
						[0.3, 0.1],
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
			await new Promise((resolve) => setTimeout(resolve, 2000));
			setIsBooting(false);
		}
		onPowerChange?.(!isPowerOn);
	};

	return (
		<motion.div
			className="fixed inset-0 pointer-events-none"
			style={{ zIndex: 9999 }}
			animate={hologramAnimations.glow.animate}
			transition={hologramAnimations.glow.transition}
		>
			{/* Screen overlay for power off state */}
			{!isPowerOn && (
				<motion.div
					className="absolute inset-0 z-[0]"
					style={styles.screen.off}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				/>
			)}

			{/* Boot animation */}
			{isBooting && (
				<motion.div
					className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
					style={styles.screen.bootBackground}
				>
					{/* Text in the center */}
					<motion.div
						className="absolute z-10 text-center"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: [0, 1, 1, 0] }}
						transition={{ duration: 2, times: [0, 0.1, 0.9, 1] }}
					>
						<div className="text-sm font-mono text-blue-300">initiating</div>
					</motion.div>

					{/* Radar rings */}
					{[...Array(5)].map((_, i) => (
						<motion.div
							key={i}
							className="absolute rounded-full"
							style={styles.screen.radar}
							initial={{ width: 100, height: 100, opacity: 0.8, scale: 0 }}
							animate={{
								width: [100, 1000],
								height: [100, 1000],
								opacity: [0.8, 0],
								scale: [1, 2],
							}}
							transition={{
								duration: 1.5,
								delay: i * 0.2,
								ease: "linear",
							}}
						/>
					))}
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

				{/* Corner components */}
				<CornerElements styles={styles.corner} />

				{/* Effects */}
				<div
					className="absolute inset-0 pointer-events-none"
					style={styles.scanLines}
				/>
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

// Corner elements component remains the same
const CornerElements = memo(({ styles }: { styles: any }) => (
	<>
		{/* Top Left */}
		<div className="absolute top-[-25px] left-[-25px]">
			<div className="absolute w-[40px] h-[8px] rounded-full" style={styles} />
			<div className="absolute w-[8px] h-[40px] rounded-full" style={styles} />
		</div>

		{/* Top Right */}
		<div className="absolute top-[-25px] right-[-25px]">
			<div
				className="absolute right-0 w-[40px] h-[8px] rounded-full"
				style={styles}
			/>
			<div
				className="absolute right-0 w-[8px] h-[40px] rounded-full"
				style={styles}
			/>
		</div>

		{/* Bottom Left */}
		<div className="absolute bottom-[-25px] left-[-25px]">
			<div
				className="absolute bottom-0 left-0 w-[8px] h-[40px] rounded-full"
				style={styles}
			/>
			<div
				className="absolute bottom-0 left-0 w-[40px] h-[8px] rounded-full"
				style={styles}
			/>
		</div>

		{/* Bottom Right */}
		<div className="absolute bottom-[-25px] right-[-25px]">
			<div
				className="absolute bottom-0 right-0 w-[8px] h-[40px] rounded-full"
				style={styles}
			/>
			<div
				className="absolute bottom-0 right-0 w-[40px] h-[8px] rounded-full"
				style={styles}
			/>
		</div>
	</>
));

CornerElements.displayName = "CornerElements";
MonitorBorder.displayName = "MonitorBorder";
