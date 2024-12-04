import { memo, useEffect, useState } from "react";

export const TypewriterText = memo(
	({ text, delay = 0 }: { text: string; delay?: number }) => {
		const [displayText, setDisplayText] = useState("");

		useEffect(() => {
			let index = 0;
			let intervalId: number;
			const timerId = setTimeout(() => {
				intervalId = window.setInterval(() => {
					if (index < text.length) {
						setDisplayText((prev) => text.slice(0, prev.length + 1));
						index++;
					} else {
						clearInterval(intervalId);
					}
				}, 30);
			}, delay);

			return () => {
				clearTimeout(timerId);
				clearInterval(intervalId);
			};
		}, [text, delay]);

		return <span>{displayText}</span>;
	},
);

TypewriterText.displayName = "TypewriterText";
