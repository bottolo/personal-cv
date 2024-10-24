import { useFBX } from "@react-three/drei";

export const Assegai = () => {
	const fbx = useFBX("public/assegai.fbx");
	return <primitive object={fbx} />;
};
