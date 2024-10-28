import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import type { AvatarProps } from "../Avatar.tsx";

export const Scanlines = memo(
	({
		size,
		scanlines,
		glowColor,
		scanlineOpacity,
		scanlineSpeed,
	}: Omit<AvatarProps, "imageUrl" | "className">) => {
		const scanlineStyles = useMemo(
			() => ({
				maskImage: "linear-gradient(to bottom, black 50%, transparent 50%)",
				maskSize: `100% ${(size! / scanlines!) * 2}px`,
				WebkitMaskImage:
					"linear-gradient(to bottom, black 50%, transparent 50%)",
				WebkitMaskSize: `100% ${(size! / scanlines!) * 2}px`,
			}),
			[size, scanlines],
		);

		const gradientStyles = useMemo(
			() => ({
				height: size! * 2,
				background: `repeating-linear-gradient(
          0deg,
          rgba(${glowColor}, ${scanlineOpacity}) 0px,
          rgba(${glowColor}, ${scanlineOpacity}) 1px,
          transparent 1px,
          transparent ${size! / scanlines!}px
        )`,
			}),
			[size, scanlines, glowColor, scanlineOpacity],
		);

		return (
			<div
				className="absolute inset-0 overflow-hidden z-[3]"
				style={scanlineStyles}
			>
				<motion.div
					animate={{ y: [0, -size!] }}
					transition={{
						duration: scanlineSpeed,
						repeat: Number.POSITIVE_INFINITY,
						ease: "linear",
					}}
					className="w-full"
					style={gradientStyles}
				/>
			</div>
		);
	},
);

Scanlines.displayName = "Scanlines";
