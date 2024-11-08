import { Canvas } from "@react-three/fiber";
import {
	Bloom,
	ChromaticAberration,
	EffectComposer,
	Glitch,
	Scanline,
} from "@react-three/postprocessing";
import { BlendFunction, KernelSize, Resolution } from "postprocessing";
import { Suspense, memo, useCallback, useEffect, useMemo, useRef } from "react";
import { cn } from "../../../../global-utils/cn.ts";
import { COLORS } from "../../../../global-utils/colors.ts";
import { useDialogueStore } from "../../../../store/dialogue-store.ts";
import { CameraController } from "./components/CameraController.tsx";
import { RingScene } from "./components/RingScene.tsx";

// Static configurations
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
	kernelSize: KernelSize.LARGE, // Reduced from VERY_LARGE
	luminanceThreshold: 0.9,
	luminanceSmoothing: 0.05,
	mipmapBlur: true,
	resolutionX: Resolution.AUTO_SIZE,
	resolutionY: Resolution.AUTO_SIZE,
} as const;

const GLITCH_BASE_CONFIG = {
	delay: [1.5, 3.5] as [number, number],
	duration: [0.1, 0.2] as [number, number],
	active: true,
} as const;

// Base effect configurations
const BASE_EFFECT_CONFIGS = {
	normal: {
		chromaticAberration: { offset: [0.002, 0.002] },
		scanline: {
			blendFunction: BlendFunction.OVERLAY,
			density: 1.75,
		},
		glitch: {
			...GLITCH_BASE_CONFIG,
			strength: [0.01, 0.1],
			ratio: 1,
		},
	},
	active: {
		chromaticAberration: { offset: [0.01, 0.01] },
		scanline: {
			blendFunction: BlendFunction.OVERLAY,
			density: 4,
		},
		glitch: {
			...GLITCH_BASE_CONFIG,
			strength: [0.2, 0.5],
			ratio: 0.85,
		},
	},
} as const;

const MemoizedRingScene = memo(RingScene);
const MemoizedCameraController = memo(CameraController);

const Effects = memo(({ isGlitchActive }: { isGlitchActive: boolean }) => {
	const configs = isGlitchActive
		? BASE_EFFECT_CONFIGS.active
		: BASE_EFFECT_CONFIGS.normal;

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

const Scene = memo(() => (
	<Suspense fallback={null}>
		<color attach="background" args={[COLORS.palette.blue.dark]} />
		<fog attach="fog" args={[COLORS.palette.purple.dark, 5, 30]} />
		<MemoizedRingScene />
		<MemoizedCameraController />
	</Suspense>
));

Scene.displayName = "Scene";

interface AnimatedRingsProps {
	className?: string;
}

const AnimatedRings = memo(({ className }: AnimatedRingsProps) => {
	const glitchTimeoutRef = useRef<number>();
	const { currentDialogue } = useDialogueStore();
	const isGlitchActiveRef = useRef(false);

	const containerClassName = useMemo(
		() => cn(className, "fixed inset-0 overflow-hidden blur-[0.1rem]"),
		[className],
	);

	const handleGlitchEffect = useCallback(() => {
		isGlitchActiveRef.current = true;
		window.clearTimeout(glitchTimeoutRef.current);

		glitchTimeoutRef.current = window.setTimeout(() => {
			isGlitchActiveRef.current = false;
		}, 200);
	}, []);

	useEffect(() => {
		handleGlitchEffect();
		return () => window.clearTimeout(glitchTimeoutRef.current);
	}, [currentDialogue, handleGlitchEffect]);

	return (
		<div className={containerClassName}>
			<Canvas camera={CAMERA_CONFIG} {...CANVAS_CONFIG}>
				<Scene />
				<Effects isGlitchActive={isGlitchActiveRef.current} />
			</Canvas>
		</div>
	);
});

AnimatedRings.displayName = "AnimatedRings";

export { AnimatedRings };
