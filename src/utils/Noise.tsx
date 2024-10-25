// Noise Canvas Component
import { useEffect, useRef } from "react";

export const NoiseEffect = ({ opacity = 0.05 }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let animationFrameId: number;
		const noise = () => {
			const imageData = ctx.createImageData(canvas.width, canvas.height);
			const buffer = new Uint32Array(imageData.data.buffer);

			for (let i = 0; i < buffer.length; i++) {
				if (Math.random() < 0.5) {
					buffer[i] = 0xffffffff; // white pixel
				}
			}

			ctx.putImageData(imageData, 0, 0);
			animationFrameId = requestAnimationFrame(noise);
		};

		noise();
		return () => cancelAnimationFrame(animationFrameId);
	}, []);

	return (
		<canvas
			ref={canvasRef}
			width={100}
			height={100}
			className="absolute inset-0 w-full h-full rounded-lg pointer-events-none mix-blend-overlay"
			style={{ opacity }}
		/>
	);
};
