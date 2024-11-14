/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			keyframes: {
				textShadow: {
					"0%": "0.4389924193300864px 0 1px rgba(0,30,255,0.5), -0.4389924193300864px 0 1px rgba(255,0,80,0.3), 0 0 3px",
					"5%": "2.7928974010788217px 0 1px rgba(0,30,255,0.5), -2.7928974010788217px 0 1px rgba(255,0,80,0.3), 0 0 3px",
					"10%":
						"0.02956275843481219px 0 1px rgba(0,30,255,0.5), -0.02956275843481219px 0 1px rgba(255,0,80,0.3), 0 0 3px",
					"15%":
						"0.40218538552878136px 0 1px rgba(0,30,255,0.5), -0.40218538552878136px 0 1px rgba(255,0,80,0.3), 0 0 3px",
					"20%":
						"3.4794037899852017px 0 1px rgba(0,30,255,0.5), -3.4794037899852017px 0 1px rgba(255,0,80,0.3), 0 0 3px",
					"25%":
						"1.6125630401149584px 0 1px rgba(0,30,255,0.5), -1.6125630401149584px 0 1px rgba(255,0,80,0.3), 0 0 3px",
					"30%":
						"0.7015590085143956px 0 1px rgba(0,30,255,0.5), -0.7015590085143956px 0 1px rgba(255,0,80,0.3), 0 0 3px",
					"35%":
						"3.896914047650351px 0 1px rgba(0,30,255,0.5), -3.896914047650351px 0 1px rgba(255,0,80,0.3), 0 0 3px",
					"40%":
						"3.870905614848819px 0 1px rgba(0,30,255,0.5), -3.870905614848819px 0 1px rgba(255,0,80,0.3), 0 0 3px",
					"45%":
						"2.231056963361899px 0 1px rgba(0,30,255,0.5), -2.231056963361899px 0 1px rgba(255,0,80,0.3), 0 0 3px",
					"50%":
						"0.08084290417898504px 0 1px rgba(0,30,255,0.5), -0.08084290417898504px 0 1px rgba(255,0,80,0.3), 0 0 3px",
					"55%":
						"2.3758461067427543px 0 1px rgba(0,30,255,0.5), -2.3758461067427543px 0 1px rgba(255,0,80,0.3), 0 0 3px",
					"60%":
						"2.202193051050636px 0 1px rgba(0,30,255,0.5), -2.202193051050636px 0 1px rgba(255,0,80,0.3), 0 0 3px",
					"65%":
						"2.8638780614874975px 0 1px rgba(0,30,255,0.5), -2.8638780614874975px 0 1px rgba(255,0,80,0.3), 0 0 3px",
					"70%":
						"0.48874025155497314px 0 1px rgba(0,30,255,0.5), -0.48874025155497314px 0 1px rgba(255,0,80,0.3), 0 0 3px",
					"75%":
						"1.8948491305757957px 0 1px rgba(0,30,255,0.5), -1.8948491305757957px 0 1px rgba(255,0,80,0.3), 0 0 3px",
					"80%":
						"0.0833037308038857px 0 1px rgba(0,30,255,0.5), -0.0833037308038857px 0 1px rgba(255,0,80,0.3), 0 0 3px",
					"85%":
						"0.09769827255241735px 0 1px rgba(0,30,255,0.5), -0.09769827255241735px 0 1px rgba(255,0,80,0.3), 0 0 3px",
					"90%":
						"3.443339761481782px 0 1px rgba(0,30,255,0.5), -3.443339761481782px 0 1px rgba(255,0,80,0.3), 0 0 3px",
					"95%":
						"2.1841838852799786px 0 1px rgba(0,30,255,0.5), -2.1841838852799786px 0 1px rgba(255,0,80,0.3), 0 0 3px",
					"100%":
						"2.6208764473832513px 0 1px rgba(0,30,255,0.5), -2.6208764473832513px 0 1px rgba(255,0,80,0.3), 0 0 3px",
				},
				scanline: {
					"0%": { transform: "translateY(-100%)" },
					"100%": { transform: "translateY(100%)" },
				},
				flicker: {
					"0%": { opacity: "0.27861" },
					"5%": { opacity: "0.34769" },
					"10%": { opacity: "0.23604" },
					"15%": { opacity: "0.90626" },
					"20%": { opacity: "0.18128" },
					"25%": { opacity: "0.83891" },
					"30%": { opacity: "0.65583" },
					"35%": { opacity: "0.67807" },
					"40%": { opacity: "0.26559" },
					"45%": { opacity: "0.84693" },
					"50%": { opacity: "0.96019" },
					"55%": { opacity: "0.08594" },
					"60%": { opacity: "0.20313" },
					"65%": { opacity: "0.71988" },
					"70%": { opacity: "0.53455" },
					"75%": { opacity: "0.37288" },
					"80%": { opacity: "0.71428" },
					"85%": { opacity: "0.70419" },
					"90%": { opacity: "0.7003" },
					"95%": { opacity: "0.36108" },
					"100%": { opacity: "0.24387" },
				},
				gradient: {
					"0%": { "background-position": "0% 50%" },
					"50%": { "background-position": "100% 50%" },
					"100%": { "background-position": "0% 50%" },
				},
			},
			animation: {
				scanline: "scanline 2s linear infinite",
				flicker: "flicker 0.15s infinite",
				gradient: "gradient 6s linear infinite",
				colorShift: "textShadow 1.6s infinite",
			},

			transformOrigin: {
				center: "center center",
			},
			scale: {
				"102": "1.02",
			},
		},
	},
	plugins: [],
};
