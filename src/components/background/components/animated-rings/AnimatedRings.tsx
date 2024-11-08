import { Canvas } from "@react-three/fiber";
import {
	Bloom,
	ChromaticAberration,
	EffectComposer,
	Glitch,
	Scanline,
} from "@react-three/postprocessing";
import { BlendFunction, KernelSize, Resolution } from "postprocessing";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "../../../../global-utils/cn.ts";
import { useDialogueStore } from "../../../../store/dialogue-store.ts";
import { CameraController } from "./components/CameraController.tsx";
import { RingScene } from "./components/RingScene.tsx";

const CAMERA_CONFIG = {
	position: [-5, 2, 10.5] as const,
	fov: 150,
} as const;

const CANVAS_CONFIG = {
	shadows: true,
	dpr: [1, 2] as const,
	performance: { min: 0 } as const,
} as const;

const BLOOM_CONFIG = {
	intensity: 15,
	kernelSize: KernelSize.VERY_LARGE,
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

interface AnimatedRingsProps {
	className?: string;
}

const AnimatedRings = memo(({ className }: AnimatedRingsProps) => {
	const [glitchActive, setGlitchActive] = useState(false);
	const { currentDialogue } = useDialogueStore();

	const effectConfigs = useMemo(
		() => ({
			chromaticAberration: {
				offset: glitchActive ? [0.01, 0.01] : [0.002, 0.002],
			},
			scanline: {
				blendFunction: BlendFunction.OVERLAY,
				density: glitchActive ? 4 : 1.75,
			},
			glitch: {
				...GLITCH_BASE_CONFIG,
				strength: glitchActive ? [0.2, 0.5] : [0.01, 0.1],
				ratio: glitchActive ? 0.85 : 1,
			},
		}),
		[glitchActive],
	);

	const containerClassName = useMemo(
		() => cn(className, "fixed inset-0 overflow-hidden blur-[0.1rem]"),
		[className],
	);

	const handleGlitchEffect = useCallback(() => {
		setGlitchActive(true);
		const timer = setTimeout(() => setGlitchActive(false), 200);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		handleGlitchEffect();
	}, [currentDialogue, handleGlitchEffect]);

	return (
		<div className={containerClassName}>
			<Canvas camera={CAMERA_CONFIG} {...CANVAS_CONFIG}>
				<color attach="background" args={["#371d95"]} />
				<RingScene />
				<CameraController />
				<EffectComposer multisampling={0}>
					<Bloom {...BLOOM_CONFIG} />
					<ChromaticAberration {...effectConfigs.chromaticAberration} />
					<Scanline {...effectConfigs.scanline} />
					<Glitch {...effectConfigs.glitch} />
				</EffectComposer>
			</Canvas>
		</div>
	);
});

// Add display name for debugging
AnimatedRings.displayName = "AnimatedRings";

export { AnimatedRings };
