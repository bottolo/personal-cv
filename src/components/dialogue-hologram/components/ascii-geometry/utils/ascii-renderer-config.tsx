import { AsciiRenderer } from "@react-three/drei";
import { memo } from "react";

export const AsciiRendererConfig = memo(function AsciiRendererConfig() {
	return (
		<AsciiRenderer
			invert={false}
			fgColor="white"
			bgColor="transparent"
			resolution={0.3}
			characters=" .:-+*=%@#"
		/>
	);
});
