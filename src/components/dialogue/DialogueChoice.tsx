import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { motion as motion2d } from "framer-motion";
import { cn } from "../../utils/cn.ts";
import { DialogueBox } from "./DialogueBox";

interface DialogueChoiceProps {
	text?: string;
	width?: number;
	height?: number;
	depth?: number;
	color?: string;
	fontSize?: number;
	className?: string;
	debug?: boolean;
	active?: boolean;
}
export const DialogueChoice = ({
	text = "Example dialogue!",
	width = 22,
	height = 6,
	depth = 5,
	color = "#ff69b4",
	fontSize = 0.75,
	className = "",
	debug = false,
	active = false,
}: DialogueChoiceProps) => {
	return (
		<motion2d.div
			className={cn(
				`w-[600px] h-[200px]  bg-transparent ${className}`,
				debug && "border-2 border-red-500",
			)}
		>
			<Canvas>
				<PerspectiveCamera makeDefault position={[0, 0, 15]} />
				<DialogueBox
					text={text}
					width={width}
					height={height}
					depth={depth}
					color={color}
					fontSize={fontSize}
					active={active}
				/>
				<ambientLight intensity={0.3} />
				<directionalLight position={[-2, 3, 5]} intensity={1} />
				<directionalLight position={[2, -3, -5]} intensity={0.5} />
			</Canvas>
		</motion2d.div>
	);
};
