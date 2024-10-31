import { AnimatePresence, motion } from "framer-motion";
import type { FC } from "react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { NoiseEffect } from "../../../../global-utils/NoiseEffect";

// Size-related types
type WindowSize = "sm" | "md" | "lg";

type SizeConfig = Readonly<{
	width: number;
	height: number;
	textSize: string;
	blur: string;
	opacity: string;
	zIndex: number;
}>;

type SizeConfigs = Record<WindowSize, SizeConfig>;

const TERMINAL_TEXTS = [
	"Initializing neural network...",
	"Processing quantum data streams...",
	"Analyzing cryptographic patterns...",
	"Scanning dimensional frequencies...",
	"Compiling synthetic algorithms...",
] as const;

type TerminalText = (typeof TERMINAL_TEXTS)[number];

interface Position {
	readonly x: number;
	readonly y: number;
}

interface Window {
	readonly id: number;
	readonly text: TerminalText;
	readonly size: WindowSize;
	readonly position: Position;
	readonly zIndex: number;
}

interface WindowContentProps {
	readonly text: string;
	readonly onComplete: () => void;
}

interface TerminalWindowProps {
	readonly window: Window;
	readonly onComplete: () => void;
}

const SIZE_CONFIGS: SizeConfigs = {
	sm: {
		width: 192,
		height: 128,
		textSize: "text-xs",
		blur: "blur-[0.2rem]",
		opacity: "opacity-10",
		zIndex: -3,
	},
	md: {
		width: 256,
		height: 192,
		textSize: "text-sm",
		blur: "blur-[0.15rem]",
		opacity: "opacity-30",
		zIndex: -2,
	},
	lg: {
		width: 384,
		height: 256,
		textSize: "",
		blur: "blur-[0.05rem]",
		opacity: "opacity-50",
		zIndex: -1,
	},
} as const;

const WindowContent: FC<WindowContentProps> = memo(({ text, onComplete }) => {
	const [displayText, setDisplayText] = useState("");

	useEffect(() => {
		let index = 0;
		const interval = setInterval(() => {
			if (index < text.length) {
				setDisplayText(text.slice(0, index + 1));
				index++;
			} else {
				clearInterval(interval);
				setTimeout(onComplete, 2000);
			}
		}, 50);

		return () => clearInterval(interval);
	}, [text, onComplete]);

	return (
		<div className="font-mono text-blue-200/90">
			<div className="mb-2">
				<span className="text-blue-400">system</span>
				<span className="text-gray-400">@</span>
				<span className="text-purple-400">matrix</span>
				<span className="text-gray-400">:~$ </span>
			</div>
			<div>{displayText}</div>
		</div>
	);
});

const TerminalWindow: FC<TerminalWindowProps> = memo(
	({ window, onComplete }) => {
		const sizeConfig = SIZE_CONFIGS[window.size];

		return (
			<motion.div
				initial={{ scale: 0, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0, opacity: 0 }}
				transition={{ duration: 0.5, ease: "easeInOut" }}
				style={{
					left: window.position.x,
					top: window.position.y,
					zIndex: window.zIndex,
					width: sizeConfig.width,
					height: sizeConfig.height,
				}}
				className={`absolute ${sizeConfig.blur} ${sizeConfig.opacity} ${sizeConfig.textSize}`}
			>
				<div className="relative w-full h-full bg-gradient-to-br from-blue-950/80 to-purple-950/80 border border-white/10">
					<motion.div
						animate={{
							boxShadow: [
								"0 0 10px rgba(59, 130, 246, 0.2)",
								"0 0 20px rgba(59, 130, 246, 0.4)",
								"0 0 10px rgba(59, 130, 246, 0.2)",
							],
						}}
						transition={{
							duration: 3,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
						className="absolute inset-[-1px] border border-white/20 bg-white/10"
					>
						<NoiseEffect opacity={0.03} />
					</motion.div>
					<div className="p-3 h-full overflow-hidden">
						<WindowContent text={window.text} onComplete={onComplete} />
					</div>
				</div>
			</motion.div>
		);
	},
);

export const AnimatedWindows: FC = memo(() => {
	const [windows, setWindows] = useState<readonly Window[]>([]);
	const nextIdRef = useRef<number>(0);

	const createWindow = useCallback(() => {
		const size: WindowSize = ["sm", "md", "lg"][
			Math.floor(Math.random() * 3)
		] as WindowSize;
		const sizeConfig = SIZE_CONFIGS[size];

		const position: Position = {
			x: Math.random() * (window.innerWidth - sizeConfig.width),
			y: Math.random() * (window.innerHeight - sizeConfig.height),
		};

		const newWindow: Window = {
			id: nextIdRef.current++,
			text: TERMINAL_TEXTS[Math.floor(Math.random() * TERMINAL_TEXTS.length)],
			size,
			position,
			zIndex: sizeConfig.zIndex,
		};

		setWindows((prev) => [...prev, newWindow]);
	}, []);

	const removeWindow = useCallback((id: number) => {
		setWindows((prev) => prev.filter((w) => w.id !== id));
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			if (windows.length < 5) {
				createWindow();
			}
		}, 4000);

		return () => clearInterval(interval);
	}, [windows.length, createWindow]);

	return (
		<AnimatePresence mode="popLayout">
			{windows.map((window) => (
				<TerminalWindow
					key={window.id}
					window={window}
					onComplete={() => removeWindow(window.id)}
				/>
			))}
		</AnimatePresence>
	);
});

WindowContent.displayName = "WindowContent";
TerminalWindow.displayName = "TerminalWindow";
AnimatedWindows.displayName = "AnimatedWindows";
