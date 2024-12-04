import type { ReactNode } from "react";
import { cn } from "../../../utils/cn.ts";
import { mapRange } from "../../../utils/map-range.ts";
import type { ChromaticAberrationConfig } from "../types.ts";

interface ChromaticAberrationProps {
	children: ReactNode;
	config?: ChromaticAberrationConfig;
}

const ChromaticAberration = ({
	children,
	config = {},
}: ChromaticAberrationProps) => {
	const redIntensity = mapRange(config.redIntensity ?? 50, 0, 100, 0, 8);
	const blueIntensity = mapRange(config.blueIntensity ?? 50, 0, 100, 0, 15);
	const offset = mapRange(config.offset ?? 50, 0, 100, 0, 5);

	return (
		<>
			<svg className="fixed h-0 w-0">
				<defs>
					<filter id="chromaticAberration">
						<feColorMatrix
							type="matrix"
							result="red_"
							values={`${redIntensity} 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0`}
						/>
						<feOffset in="red_" dx={offset} dy="0" result="red" />

						<feColorMatrix
							type="matrix"
							in="SourceGraphic"
							result="blue_"
							values={`0 0 0 0 0
                      0 ${blueIntensity / 2} 0 0 0
                      0 0 ${blueIntensity} 0 0
                      0 0 0 1 0`}
						/>
						<feOffset in="blue_" dx={-offset} dy="0" result="blue" />

						<feBlend mode="screen" in="red" in2="blue" />
					</filter>
				</defs>
			</svg>

			<div
				className={cn("relative w-full h-full")}
				style={{ filter: "url(#chromaticAberration)" }}
			>
				{children}
			</div>
		</>
	);
};

export default ChromaticAberration;
