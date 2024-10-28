import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
	ChromaticAberration,
	EffectComposer,
	Grid,
	Noise,
} from "@react-three/postprocessing";
import { motion as motion2d } from "framer-motion";
import { BlendFunction } from "postprocessing";
import { useRef } from "react";
import * as THREE from "three";
import { useDialogueStore } from "../../../../store/dialogue-store.ts";
import { cn } from "../../../../utils/cn.ts";
import { ChoiceButton } from "./choice-button.tsx";

interface DialogueChoiceProps {
	text?: string;
	color?: string;
	fontSize?: number;
	className?: string;
	debug?: boolean;
	active?: boolean;
	dialogueId: string;
	confirmedColor?: string;
}

const ChromaticAberrationEffect = () => {
	const offsetRef = useRef(new THREE.Vector2(0, 0));

	useFrame((state) => {
		const t = state.clock.elapsedTime;
		offsetRef.current.set(Math.sin(t / 2) * 0.004, Math.cos(t / 2) * 0.004);
	});

	return <ChromaticAberration offset={offsetRef.current} />;
};

export const ChoiceCanvas = ({
	text = "Example dialogue!",
	color = "#ff3791",
	confirmedColor = "#ff7d37",
	fontSize = 0.75,
	className = "",
	debug = false,
	dialogueId,
}: DialogueChoiceProps) => {
	const { setCurrentDialogue, currentDialogue } = useDialogueStore();

	const handleClick = () => {
		if (currentDialogue?.id === dialogueId) {
			setCurrentDialogue(null);
		} else {
			setCurrentDialogue(dialogueId);
		}
	};

	const isActive = currentDialogue?.id === dialogueId;

	return (
		<motion2d.div
			className={cn(
				`absolute bottom-[50px] right-[200px] w-[650px] h-[300px] bg-transparent ${className}`,
				debug && "border-2 border-red-500",
			)}
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
		>
			<Canvas shadows={"soft"}>
				<PerspectiveCamera makeDefault position={[0, -0.2, 15]} />
				<EffectComposer>
					<Noise premultiply blendFunction={BlendFunction.ADD} />
					<ChromaticAberrationEffect />
					<Grid scale={2} />
				</EffectComposer>
				<ChoiceButton
					text={text}
					color={color}
					confirmedColor={confirmedColor}
					fontSize={isActive ? fontSize / 2 : fontSize}
					active={isActive}
					onClick={handleClick}
				/>
			</Canvas>
		</motion2d.div>
	);
};
