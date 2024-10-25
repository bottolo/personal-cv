import { useFBX } from "@react-three/drei";

export const Wifi = () => {
	const fbx = useFBX("public/Wifi.fbx");
	return <primitive object={fbx} />;
};
