import { Canvas } from "@react-three/fiber";
import {
	Bloom,
	ChromaticAberration,
	EffectComposer,
	Glitch,
	Scanline,
} from "@react-three/postprocessing";
import { BlendFunction, KernelSize, Resolution } from "postprocessing";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Vector2 } from "three";
import { cn } from "../../../../global-utils/cn.ts";
import { COLORS } from "../../../../global-utils/colors.ts";
import { useDialogueStore } from "../../../../store/dialogue-store.ts";
import { SceneManager } from "../scenes/SceneManager.tsx";

// Configurations with proper types
const CAMERA_CONFIG = {
	position: [-5, 2, 30] as const,
	fov: 100,
} as const;

const CANVAS_CONFIG = {
	shadows: true,
	dpr: window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio,
	gl: {
		antialias: false,
		powerPreference: "high-performance",
		alpha: false,
		stencil: false,
		depth: true,
		logarithmicDepthBuffer: true,
	},
	performance: {
		min: 0.5,
		max: 1,
		debounce: 200,
	},
	flat: true,
	legacy: false,
} as const;

const BLOOM_CONFIG = {
	intensity: 15,
	kernelSize: KernelSize.LARGE,
	luminanceThreshold: 0.9,
	luminanceSmoothing: 0.05,
	mipmapBlur: true,
	resolutionX: Resolution.AUTO_SIZE,
	resolutionY: Resolution.AUTO_SIZE,
} as const;

// Effect configurations with proper vector types
const createEffectConfigs = (isActive: boolean) => ({
	chromaticAberration: {
		offset: new Vector2(isActive ? 0.01 : 0.002, isActive ? 0.01 : 0.002),
		radialModulation: false,
		modulationOffset: 0,
	},
	scanline: {
		blendFunction: BlendFunction.OVERLAY,
		density: isActive ? 4 : 1.75,
	},
	glitch: {
		delay: new Vector2(1.5, 3.5),
		duration: new Vector2(0.1, 0.2),
		strength: new Vector2(isActive ? 0.2 : 0.01, isActive ? 0.5 : 0.1),
		ratio: isActive ? 0.85 : 1,
		active: true,
	},
});

const Effects = memo(({ isGlitchActive }: { isGlitchActive: boolean }) => {
	const configs = useMemo(
		() => createEffectConfigs(isGlitchActive),
		[isGlitchActive],
	);

	return (
		<EffectComposer multisampling={0} enabled={true}>
			<Bloom {...BLOOM_CONFIG} />
			<ChromaticAberration {...configs.chromaticAberration} />
			<Scanline {...configs.scanline} />
			<Glitch {...configs.glitch} />
		</EffectComposer>
	);
});

Effects.displayName = "Effects";

interface AnimatedRingsProps {
	className?: string;
}

export const AnimatedRings = memo(({ className }: AnimatedRingsProps) => {
	const glitchTimeoutRef = useRef<number>();
	const { currentDialogue } = useDialogueStore();
	const [isGlitchActive, setIsGlitchActive] = useState(false);

	const containerClassName = useMemo(
		() => cn(className, "fixed inset-0 overflow-hidden blur-[0.1rem]"),
		[className],
	);

	const handleGlitchEffect = useCallback(() => {
		setIsGlitchActive(true);
		window.clearTimeout(glitchTimeoutRef.current);
		glitchTimeoutRef.current = window.setTimeout(() => {
			setIsGlitchActive(false);
		}, 200);
	}, []);

	useEffect(() => {
		handleGlitchEffect();
		return () => window.clearTimeout(glitchTimeoutRef.current);
	}, [currentDialogue, handleGlitchEffect]);

	return (
		<div className={containerClassName}>
			<Canvas camera={CAMERA_CONFIG} {...CANVAS_CONFIG}>
				<color attach="background" args={[COLORS.palette.blue.dark]} />
				<SceneManager />
				<Effects isGlitchActive={isGlitchActive} />
			</Canvas>
		</div>
	);
});
