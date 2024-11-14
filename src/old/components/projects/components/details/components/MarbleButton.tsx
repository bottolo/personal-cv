import { motion } from "framer-motion";
import { type ReactNode, memo, useMemo } from "react";
import { COLORS } from "../../../../../global-utils/colors.ts";

export const MarbleButton = memo(
	({
		children,
		onClick,
		className = "",
		isClose = false,
	}: {
		children: ReactNode;
		onClick: () => void;
		className?: string;
		isClose?: boolean;
	}) => {
		const buttonStyle = useMemo(
			() => ({
				background: `linear-gradient(135deg, ${COLORS.sphere.gradient.start}, ${COLORS.sphere.gradient.end})`,
				boxShadow: `0 5px 15px ${COLORS.sphere.glow.outer},
                    inset -2px -2px 6px ${COLORS.sphere.glow.inner},
                    inset 2px 2px 6px ${COLORS.sphere.highlight}`,
			}),
			[],
		);

		const hoverAnimation = useMemo(
			() => ({
				scale: 1.05,
				boxShadow: `0 10px 30px ${COLORS.sphere.glow.outer},
                    inset -2px -2px 10px ${COLORS.sphere.glow.inner},
                    inset 2px 2px 10px ${COLORS.sphere.highlight}`,
			}),
			[],
		);

		return (
			<motion.button
				onClick={onClick}
				className={`relative rounded-none flex items-center justify-center cursor-none font-mono ${className}`}
				style={buttonStyle}
				whileHover={hoverAnimation}
				animate={
					isClose
						? {
								background: [
									`linear-gradient(135deg, ${COLORS.sphere.gradient.start}, ${COLORS.sphere.gradient.end})`,
									"linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(239, 68, 68, 0.5))",
								],
							}
						: undefined
				}
				transition={{ duration: 0.2 }}
			>
				{children}
			</motion.button>
		);
	},
);
