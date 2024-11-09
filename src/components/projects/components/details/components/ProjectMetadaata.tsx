import { motion } from "framer-motion";
import { memo } from "react";
import { MarbleButton } from "./MarbleButton.tsx";
import { TypewriterText } from "./TypewriterText.tsx";

export const ProjectMetadata = memo(
	({
		projectId,
		onClose,
	}: {
		projectId: string;
		onClose: () => void;
	}) => (
		<>
			<motion.div
				className="absolute top-2 right-2 text-[0.6rem] font-mono text-blue-300/60"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
			>
				<TypewriterText text={`project[${projectId}].details`} />
			</motion.div>

			<motion.div
				className="absolute bottom-2 right-2 flex items-center gap-2"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
			>
				<MarbleButton
					onClick={onClose}
					className="w-16 h-8 text-sm"
					isClose={true}
				>
					Close
				</MarbleButton>
			</motion.div>
		</>
	),
);

ProjectMetadata.displayName = "ProjectMetadata";
