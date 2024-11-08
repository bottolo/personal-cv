import { animated, useSpring } from "@react-spring/three";
import { useState } from "react";
import type { BaseButtonProps, ButtonState } from "../utils/button-utils.ts";
import { BaseButton } from "./BaseButton.tsx";

const AnimatedButton = animated(BaseButton);

interface AnimatedButtonProps
	extends Omit<BaseButtonProps, "position" | "rotation" | "textPosition"> {
	initialState: ButtonState;
	hoverState: ButtonState;
	onHover?: (isHovered: boolean) => void;
}

export const AnimatedBaseButton = ({
	initialState,
	hoverState,
	onHover,
	...props
}: AnimatedButtonProps) => {
	const [isHovered, setIsHovered] = useState(false);

	const { position, rotation, textPosition } = useSpring({
		position: isHovered ? hoverState.position : initialState.position,
		rotation: isHovered ? hoverState.rotation : initialState.rotation,
		textPosition: isHovered
			? hoverState.textPosition
			: initialState.textPosition,
		config: { mass: 1, tension: 280, friction: 60 },
	});

	const handlePointerOver = () => {
		setIsHovered(true);
		onHover?.(true);
	};

	const handlePointerOut = () => {
		setIsHovered(false);
		onHover?.(false);
	};

	return (
		<AnimatedButton
			{...props}
			position={position}
			rotation={rotation}
			textPosition={textPosition}
			onPointerOver={handlePointerOver}
			onPointerOut={handlePointerOut}
		/>
	);
};
