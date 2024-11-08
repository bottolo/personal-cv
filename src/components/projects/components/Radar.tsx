import { motion } from "framer-motion";
import { memo } from "react";
import { COLORS } from "../../../global-utils/colors.ts";

export const Radar = memo(() => (
	<div className="absolute inset-0 overflow-hidden">
		<div
			className="absolute inset-0 opacity-60"
			style={{
				background: `
          radial-gradient(circle at center, transparent 0%, transparent 85%, ${COLORS.grid.line} 100%),
          linear-gradient(transparent 0%, transparent calc(50% - 1px), ${COLORS.grid.line} 50%, transparent calc(50% + 1px), transparent 100%),
          linear-gradient(90deg, transparent 0%, transparent calc(50% - 1px), ${COLORS.grid.line} 50%, transparent calc(50% + 1px), transparent 100%)
        `,
				backgroundSize: "100% 100%, 40px 40px, 40px 40px",
			}}
		/>
		<motion.div
			className="absolute top-1/2 left-1/2 origin-left h-[1px] w-[50%]"
			style={{
				background: `linear-gradient(to right, ${COLORS.primary}40 0%, transparent 100%)`,
			}}
			animate={{ rotate: 360 }}
			transition={{
				duration: 4,
				repeat: Number.POSITIVE_INFINITY,
				ease: "linear",
			}}
		/>
		<div className="absolute inset-0 flex items-center justify-center">
			{[1, 2, 3].map((i) => (
				<motion.div
					key={i}
					className="absolute rounded-full"
					style={{
						border: `1px solid ${COLORS.border.normal}`,
					}}
					initial={{ width: 0, height: 0, opacity: 0.5 }}
					animate={{
						width: ["0%", "150%"],
						height: ["0%", "150%"],
						opacity: [0.3, 0],
					}}
					transition={{
						duration: 4,
						delay: i * 1.3,
						repeat: Number.POSITIVE_INFINITY,
						ease: "linear",
					}}
				/>
			))}
		</div>
	</div>
));
