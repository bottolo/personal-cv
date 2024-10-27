import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface Image3DProps {
	url: string;
	scale: [number, number, number];
	rotation?: [number, number, number];
	onClick?: () => void;
}
export const Image3D = ({
	url,
	scale,
	rotation = [0, 0, 0],
	onClick,
}: Image3DProps) => {
	const texture = useTexture(url);

	const segments = 32;
	const geometry = new THREE.PlaneGeometry(1, 1, segments, 1);
	const arc = Math.PI / 6;

	const position = geometry.attributes.position;
	for (let i = 0; i <= segments; i++) {
		const x = position.getX(i);
		const angle = x * arc;
		const z = Math.sin(angle) * 0.1;
		position.setZ(i, z);
		position.setZ(i + (segments + 1), z);
	}
	geometry.computeVertexNormals();

	return (
		<mesh rotation={rotation} onClick={onClick} geometry={geometry}>
			<meshBasicMaterial
				map={texture}
				transparent={true}
				side={THREE.DoubleSide}
			/>
			<primitive object={geometry} scale={scale} />
		</mesh>
	);
};
