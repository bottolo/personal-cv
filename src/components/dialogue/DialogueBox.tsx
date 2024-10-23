import { Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { useRef, useState } from "react";

interface DialogueBoxProps {
	text: string;
	width: number;
	height: number;
	depth: number;
	color: string;
	fontSize: number;
	active?: boolean;
}
export const DialogueBox = ({
	text,
	width,
	height,
	depth,
	color,
	fontSize,
	active = false,
}: DialogueBoxProps) => {
	const groupRef = useRef();
	const [mousePosition, setMousePosition] = useState([0, 0]);
	const { viewport } = useThree();

	const handleMouseMove = (event: { point: { x: number; y: number } }) => {
		const x = (event.point.x / viewport.width) * 2;
		const y = (event.point.y / viewport.height) * 2;
		setMousePosition([x, y]);
	};

	return (
		<motion.group
			ref={groupRef}
			onPointerMove={handleMouseMove}
			whileHover={{
				rotateX: -mousePosition[1] / 10,
				rotateY: mousePosition[0] / 10,
			}}
			transition={{
				duration: 0.1,
				rotateX: { type: "keyframes", stiffness: 50 },
				rotateY: { type: "keyframes", stiffness: 50 },
			}}
		>
			{/* Mesh */}
			<motion.mesh
				scale={active ? [1, 1, 1] : [0.75, 0.75, 0.75]}
				position={[0, 0, 4]}
			>
				<boxGeometry args={[width, height, depth]} />
				<meshPhongMaterial
					color={color}
					transparent
					opacity={1}
					shininess={100}
				/>
			</motion.mesh>

			{/* Text */}
			<Text
				position={[0, 0, depth + 4]}
				fontSize={active ? fontSize : fontSize / 1.2}
				color="white"
				anchorX="center"
				anchorY="middle"
			>
				{text}
			</Text>
		</motion.group>
	);
};
