import { Canvas } from "@react-three/fiber";
import { memo, useMemo } from "react";
import { AsciiRendererConfig } from "./utils/ascii-renderer-config.tsx";
import { Lights } from "./utils/lights.tsx";
import { SpinningGeometry } from "./utils/spinning-geometry.tsx";

export const AsciiGeometry = memo(function AsciiCube() {
	const cameraSettings = useMemo(
		() => ({
			position: [0, 0, 10] as [number, number, number],
			fov: 30,
		}),
		[],
	);

	const canvasStyle = useMemo(
		() => ({
			userSelect: "none" as const,
			cursor: "pointer",
			backgroundColor: "transparent",
			width: "100%",
			height: "100%",
		}),
		[],
	);

	return (
		<Canvas
			camera={cameraSettings}
			style={canvasStyle}
			dpr={Math.min(window.devicePixelRatio, 2)}
			performance={{ min: 0.5 }}
		>
			<Lights />
			<SpinningGeometry />
			<AsciiRendererConfig />
		</Canvas>
	);
});
