import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NoiseEffect } from "../../../../global-utils/NoiseEffect.tsx";
import { cn } from "../../../../global-utils/cn.ts";

// Depth type
type Depth = "near" | "mid" | "far";

// Position type
interface Position {
	readonly x: number;
	readonly y: number;
}

// Text configuration type
interface TextConfig {
	readonly text: string;
	readonly depth: Depth;
	readonly position: Position;
}

// Visual style configuration
interface VisualConfig {
	readonly baseColor: string;
	readonly glowColor: string;
	readonly bloomIntensity: number;
	readonly noiseOpacity: number;
}

// Animation configuration
interface AnimationConfig {
	readonly spawnInterval: number;
	readonly textLifespan: number;
	readonly typewriterSpeed: number;
	readonly glitchIntensity: number;
}

// Complete props interface
interface TextPoolProps
	extends Partial<VisualConfig>,
		Partial<AnimationConfig> {
	readonly textPool: readonly string[];
	readonly maxActiveTexts?: number;
}

// Depth-specific styles
interface DepthStyles {
	readonly blur: string;
	readonly opacity: number;
	readonly scale: number;
	readonly zIndex: number;
	readonly fontSize: string;
}

// Glitch text component props
interface GlitchTextProps {
	readonly config: TextConfig;
	readonly style: React.CSSProperties;
	readonly typewriterSpeed: number;
	readonly glitchIntensity: number;
	readonly noiseOpacity: number;
	readonly blur: string;
}

// Active text type
type ActiveText = TextConfig & { readonly id: number };

// Default configurations
const DEFAULT_VISUAL_CONFIG: Required<VisualConfig> = {
	baseColor: "#8c75e1",
	glowColor: "#8c75e1",
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
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.5 }}
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

export const GlitchyTextPool: React.FC<TextPoolProps> = ({
	textPool,
	maxActiveTexts = 100,
	...configProps
}) => {
	const [activeTexts, setActiveTexts] = useState<readonly ActiveText[]>([]);
	const nextIdRef = useRef(0);

	// Merge default and provided configurations
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
								color: config.baseColor,
								opacity: depthStyle.opacity,
								transform: `scale(${depthStyle.scale})`,
								zIndex: depthStyle.zIndex,
								fontSize: depthStyle.fontSize,
								textShadow: `0 0 ${config.bloomIntensity * 10}px ${config.glowColor}`,
							}}
						/>
					);
				})}
			</AnimatePresence>
		</div>
	);
};
