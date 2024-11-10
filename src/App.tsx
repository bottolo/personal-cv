import { useState } from "react";
import Cursor from "./components/cursor/Cursor.tsx";
import BootSequence from "./components/menu/BootSequence.tsx";
import BorderLayout from "./components/menu/BorderLayout.tsx";
import { DynamicContent } from "./components/menu/DynamicContent.tsx";
import TiltContainer from "./components/tilt-container/TiltContainer.tsx";
import { useMenuStore } from "./store/menu-store.ts";

function App() {
	const { isMainContentVisible } = useMenuStore();
	const [isMonitorOn, setIsMonitorOn] = useState(false);

	const handleBootComplete = () => {
		setIsMonitorOn(true);
	};

	return (
		<>
			{!isMonitorOn && <BootSequence onBootComplete={handleBootComplete} />}
			{isMonitorOn && (
				<BorderLayout>
					{" "}
					<TiltContainer>
						{isMainContentVisible ? <DynamicContent /> : <div>ciao</div>}
					</TiltContainer>
				</BorderLayout>
			)}
			<Cursor />
		</>
	);
}
export default App;
