import {
	animationClassList,
	baseClassList,
	colorClassList,
} from "./src/components/display/crt-utils.js";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	safelist: [...colorClassList, ...animationClassList, ...baseClassList],
	theme: {
		extend: {
			keyframes: {
				scanline: {
					"0%": { transform: "translateY(200%)" },
					"100%": { transform: "translateY(-100%)" },
				},
				flicker: {
					"0%": { opacity: "0.97" },
					"50%": { opacity: "0.95" },
					"100%": { opacity: "0.97" },
				},
			},
			animation: {
				scanline: "scanline 6s linear infinite",
				flicker: "flicker 0.01667s steps(1) infinite",
			},
		},
	},
	plugins: [],
};
