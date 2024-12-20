import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../../../../../utils/cn.ts";
import { NoiseEffect } from "../../../../global-utils/NoiseEffect.tsx";
import { COLORS, hologramAnimations } from "../../../../global-utils/colors.ts";
import type { Position } from "../../../../global-utils/position.ts";

// Types and Interfaces
type Depth = "near" | "mid" | "far";

interface TextConfig {
	readonly text: string;
	readonly depth: Depth;
	readonly position: Position;
}

interface VisualConfig {
	readonly baseColor: string;
	readonly glowColor: string;
	readonly bloomIntensity: number;
	readonly noiseOpacity: number;
}

interface AnimationConfig {
	readonly spawnInterval: number;
	readonly textLifespan: number;
	readonly typewriterSpeed: number;
	readonly glitchIntensity: number;
}

interface TextPoolProps
	extends Partial<VisualConfig>,
		Partial<AnimationConfig> {
	readonly textPool: readonly string[];
	readonly maxActiveTexts?: number;
}

interface DepthStyles {
	readonly blur: string;
	readonly opacity: number;
	readonly scale: number;
	readonly zIndex: number;
	readonly fontSize: string;
}

interface GlitchTextProps {
	readonly config: TextConfig;
	readonly style: React.CSSProperties;
	readonly typewriterSpeed: number;
	readonly glitchIntensity: number;
	readonly noiseOpacity: number;
	readonly blur: string;
}

type ActiveText = TextConfig & { readonly id: number };

type ColorEffect = {
	baseColor: string;
	glowEffect: string;
};

type DepthColorMap = Record<Depth, ColorEffect>;

const DEPTH_COLORS: DepthColorMap = {
	near: {
		baseColor: COLORS.text.primary,
		glowEffect: "0 0 30px rgba(59, 130, 246, 0.4)" as const,
	},
	mid: {
		baseColor: "rgba(165, 243, 252, 0.8)" as const,
		glowEffect: "0 0 20px rgba(59, 130, 246, 0.3)" as const,
	},
	far: {
		baseColor: "rgba(165, 243, 252, 0.6)" as const,
		glowEffect: COLORS.glow.weak,
	},
} as const;

// Default Configurations
const DEFAULT_VISUAL_CONFIG: Required<VisualConfig> = {
	baseColor: COLORS.text.primary,
	glowColor: COLORS.primary,
	bloomIntensity: 0.4,
	noiseOpacity: 0.1,
} as const;

const DEFAULT_ANIMATION_CONFIG: Required<AnimationConfig> = {
	spawnInterval: 1000,
	textLifespan: 5000,
	typewriterSpeed: 100,
	glitchIntensity: 0.3,
} as const;

const GlitchText: React.FC<GlitchTextProps> = ({
	config,
	style,
	typewriterSpeed,
	glitchIntensity,
	noiseOpacity,
	blur,
}) => {
	const [displayText, setDisplayText] = useState("");
	const [glitchText, setGlitchText] = useState("");
	const [position, setPosition] = useState<Position>(config.position);
	const glitchTimeoutRef = useRef<number>();

	const glitchCharacters = "!@#$%^&*<>[]{}";

	const glitchPosition = useCallback(() => {
		const glitchRange = 5;
		setPosition({
			x: config.position.x + (Math.random() - 0.5) * glitchRange,
			y: config.position.y + (Math.random() - 0.5) * glitchRange,
		});
	}, [config.position]);

	useEffect(() => {
		let currentIndex = 0;
		const interval = setInterval(() => {
			if (currentIndex <= config.text.length) {
				setDisplayText(config.text.slice(0, currentIndex));
				currentIndex++;
			} else {
				clearInterval(interval);
			}
		}, typewriterSpeed);

		return () => clearInterval(interval);
	}, [config.text, typewriterSpeed]);

	useEffect(() => {
		const triggerGlitch = () => {
			const glitchIndex = Math.floor(Math.random() * displayText.length);
			const glitchChar =
				glitchCharacters[Math.floor(Math.random() * glitchCharacters.length)];

			setGlitchText(
				displayText.slice(0, glitchIndex) +
					glitchChar +
					displayText.slice(glitchIndex + 1),
			);

			if (Math.random() < glitchIntensity) {
				glitchPosition();
			}

			glitchTimeoutRef.current = window.setTimeout(() => {
				setGlitchText(displayText);
				setPosition(config.position);
				if (Math.random() < glitchIntensity) {
					triggerGlitch();
				}
			}, Math.random() * 100);
		};

		const glitchInterval = setInterval(() => {
			if (Math.random() < glitchIntensity) {
				triggerGlitch();
			}
		}, 1000);

		return () => {
			clearInterval(glitchInterval);
			if (glitchTimeoutRef.current) {
				clearTimeout(glitchTimeoutRef.current);
			}
		};
	}, [displayText, glitchIntensity, config.position, glitchPosition]);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{
				opacity: 1,
				y: 0,
				textShadow: [COLORS.glow.weak, COLORS.glow.medium, COLORS.glow.weak],
			}}
			exit={{ opacity: 0, y: -20 }}
			transition={{
				duration: 0.5,
				textShadow: hologramAnimations.glow.transition,
			}}
			style={{
				...style,
				left: position.x,
				top: position.y,
			}}
			className={cn("relative", blur)}
		>
			{glitchText || displayText}
			<NoiseEffect opacity={noiseOpacity} />
		</motion.div>
	);
};

// Main GlitchyTextPool Component
export const GlitchyTextPool: React.FC<TextPoolProps> = ({
	textPool,
	maxActiveTexts = 100,
	...configProps
}) => {
	const [activeTexts, setActiveTexts] = useState<readonly ActiveText[]>([]);
	const nextIdRef = useRef(0);

	const config = {
		...DEFAULT_VISUAL_CONFIG,
		...DEFAULT_ANIMATION_CONFIG,
		...configProps,
	};

	const depthStyles = useMemo<Record<Depth, DepthStyles>>(
		() => ({
			near: {
				blur: "blur-none",
				opacity: 0.9,
				scale: 1.2,
				zIndex: 1000,
				fontSize: "1.5rem",
			},
			mid: {
				blur: "blur-[0.1rem]",
				opacity: 0.7,
				scale: 1,
				zIndex: 2,
				fontSize: "1.125rem",
			},
			far: {
				blur: "blur-[0.3rem]",
				opacity: 0.5,
				scale: 0.8,
				zIndex: 1,
				fontSize: "0.875rem",
			},
		}),
		[],
	);

	const removeText = useCallback((id: number) => {
		setActiveTexts((prev) => prev.filter((text) => text.id !== id));
	}, []);

	const addText = useCallback(() => {
		if (activeTexts.length >= maxActiveTexts) return;

		const text = textPool[Math.floor(Math.random() * textPool.length)];
		const depth: Depth = ["near", "mid", "far"][
			Math.floor(Math.random() * 3)
		] as Depth;
		const position: Position = {
			x: Math.random() * window.innerWidth * 0.8,
			y: Math.random() * window.innerHeight * 0.8,
		};
		const id = nextIdRef.current++;

		setActiveTexts((prev) => [...prev, { id, text, depth, position }]);
		setTimeout(() => removeText(id), config.textLifespan);
	}, [
		textPool,
		maxActiveTexts,
		config.textLifespan,
		removeText,
		activeTexts.length,
	]);

	useEffect(() => {
		const interval = setInterval(addText, config.spawnInterval);
		return () => clearInterval(interval);
	}, [addText, config.spawnInterval]);

	return (
		<div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
			<AnimatePresence mode="popLayout">
				{activeTexts.map(({ id, text, depth, position }) => {
					const depthStyle = depthStyles[depth];
					const colorEffect = DEPTH_COLORS[depth];

					return (
						<GlitchText
							key={id}
							config={{ text, depth, position }}
							typewriterSpeed={config.typewriterSpeed}
							glitchIntensity={config.glitchIntensity}
							noiseOpacity={config.noiseOpacity}
							blur={depthStyle.blur}
							style={{
								position: "absolute",
								fontFamily: "monospace",
								color: colorEffect.baseColor,
								opacity: depthStyle.opacity,
								transform: `scale(${depthStyle.scale})`,
								zIndex: depthStyle.zIndex,
								fontSize: depthStyle.fontSize,
								textShadow: colorEffect.glowEffect,
								background: `linear-gradient(135deg,
                                    ${COLORS.effects.glitch.overlay},
                                    transparent)`,
								backgroundClip: "text",
								WebkitBackgroundClip: "text",
							}}
						/>
					);
				})}
			</AnimatePresence>

			{/* Grid Overlay */}
			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					backgroundImage: `
                        linear-gradient(to right, ${COLORS.grid.line} 1px, transparent 1px),
                        linear-gradient(to bottom, ${COLORS.grid.line} 1px, transparent 1px)
                    `,
					backgroundSize: "20px 20px",
					opacity: 0.2,
				}}
			/>

			{/* Scan Line Effect */}
			<motion.div
				className="absolute left-0 right-0 pointer-events-none"
				style={{
					background: `linear-gradient(to bottom,
                        transparent,
                        ${COLORS.effects.scanLine},
                        transparent
                    )`,
					height: "2px",
				}}
				animate={hologramAnimations.scan.animate}
				transition={hologramAnimations.scan.transition}
			/>
		</div>
	);
};
