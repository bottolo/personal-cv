import { Canvas, useFrame, useThree } from "@react-three/fiber";
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
import { cn } from "../../../../../utils/cn.ts";
import { useDialogueStore } from "../../../../store/dialogue-store.ts";
import { SceneManager } from "../scenes/SceneManager.tsx";

// Configurations with proper types
const CAMERA_CONFIG = {
	position: [-5, 2, 30] as const,
	fov: 125,
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
	legacy: true,
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

interface AnimatedRingsProps {
	className?: string;
}

function AdaptivePixelRatio() {
	const current = useThree((state) => state.performance.current);
	const setPixelRatio = useThree((state) => state.setDpr);
	useEffect(() => {
		setPixelRatio(window.devicePixelRatio * current);
	}, [current]);
	return null;
}

const BASE_CHROMATIC_OFFSET = new Vector2(0.002, 0.002);
const ACTIVE_CHROMATIC_OFFSET = new Vector2(0.01, 0.01);
const GLITCH_DELAY = new Vector2(1.5, 3.5);
const GLITCH_DURATION = new Vector2(0.1, 0.2);

export const AnimatedRings = memo(({ className }: AnimatedRingsProps) => {
	const glitchTimeoutRef = useRef<number>();
	const { currentDialogue } = useDialogueStore();
	const [isGlitchActive, setIsGlitchActive] = useState(false);
	const containerClassName = useMemo(
		() => cn(className, "fixed inset-0 overflow-hidden blur-[0.1rem]"),
		[className],
	);
	// Use useMemo to avoid recreating configurations on every render
	const configs = useMemo(
		() => ({
			chromaticAberration: {
				offset: isGlitchActive
					? ACTIVE_CHROMATIC_OFFSET
					: BASE_CHROMATIC_OFFSET,
				radialModulation: false,
				modulationOffset: 0,
			},
			scanline: {
				blendFunction: BlendFunction.OVERLAY,
				density: isGlitchActive ? 4 : 1.75,
			},
			glitch: {
				delay: GLITCH_DELAY,
				duration: GLITCH_DURATION,
				strength: new Vector2(
					isGlitchActive ? 0.2 : 0.01,
					isGlitchActive ? 0.5 : 0.1,
				),
				ratio: isGlitchActive ? 0.85 : 1,
				active: true,
			},
		}),
		[isGlitchActive],
	);

	const PerformanceOptimizer = () => {
		const ref = useRef({ lastTime: 0 });
		const regress = useThree((state) => state.performance.regress);

		useFrame((state) => {
			if (state.clock.elapsedTime - ref.current.lastTime > 0.016) {
				regress();
				ref.current.lastTime = state.clock.elapsedTime;
			}
		});

		// Mouse movement regression
		useEffect(() => {
			const handleMouseMove = () => {
				regress();
			};

			window.addEventListener("mousemove", handleMouseMove, { passive: true });
			return () => window.removeEventListener("mousemove", handleMouseMove);
		}, [regress]);

		return null;
	};

	// Use refs for glitch effect instead of state
	const glitchRef = useRef({ isActive: false });

	const handleGlitchEffect = useCallback(() => {
		glitchRef.current.isActive = true;
		window.clearTimeout(glitchTimeoutRef.current);
		glitchTimeoutRef.current = window.setTimeout(() => {
			glitchRef.current.isActive = false;
			setIsGlitchActive(false); // Keep state for config recalc only
		}, 200);
	}, []);

	useEffect(() => {
		handleGlitchEffect();
		return () => window.clearTimeout(glitchTimeoutRef.current);
	}, [currentDialogue, handleGlitchEffect]);

	return (
		<div className={containerClassName}>
			<Canvas camera={CAMERA_CONFIG} {...CANVAS_CONFIG}>
				<SceneManager />
				<EffectComposer multisampling={0}>
					<Bloom {...BLOOM_CONFIG} />
					<ChromaticAberration {...configs.chromaticAberration} />
					<Scanline {...configs.scanline} />
					<Glitch {...configs.glitch} />
				</EffectComposer>
				<AdaptivePixelRatio />
				<PerformanceOptimizer />
			</Canvas>
		</div>
	);
});
