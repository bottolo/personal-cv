import { Display } from "./components/display/Display.tsx";

function App() {
	const textPool = [
		"the end",
		"beginning at sunrise",
		"being laid onto uneven surfaces",
		"creeping",
		"soothing and chaotic",
		"prying fate",
		"made for us",
		"seen through",
	];

	const getRandomText = (count: number) => {
		return Array(count)
			.fill(null)
			.map(() => textPool[Math.floor(Math.random() * textPool.length)])
			.join(" is not ");
	};

	const screenText = getRandomText(1000);

	return (
		<Display
			scanline
			scanlines
			flicker
			glow
			scanlineConfig={{ intensity: 40, height: 70, opacity: 30, speed: 30 }}
			scanlinesConfig={{ count: 40, opacity: 20, blur: 50 }}
			flickerConfig={{ intensity: 100 }}
			glowConfig={{ spread: 100, intensity: 100, blur: 4, color: "GLOW" }}
		>
			<div className="fixed h-screen w-screen inset-0 flex flex-col justify-center items-center bg-blue-700/30 overflow-hidden">
				<div className="flex-1 overflow-hidden">
					<div className="text-center text-[#96ceba] text-[1rem] font-mono tracking-normal leading-loose">
						{screenText.split(" ").map((word, i) => (
							<span
								key={i}
								className="inline-block mx-[3px] hover:text-red-500 hover:cursor-default transition-all duration-300 ease-in-out"
							>
								{word}
							</span>
						))}
					</div>
				</div>

				<div className="absolute border p-2 rounded-lg bg-gradient-to-br from-red-500 to-blue-500 mix-blend-multiply opacity-90">
					<iframe
						width="450"
						height="300"
						src="https://www.youtube.com/embed/83cqKXgs6Z4?list=PLxp5kE-kTL7y6nUt9UKi8yWP22BKxCYl0"
						title="Drew Redman - The Youngest Looks"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerPolicy="strict-origin-when-cross-origin"
						allowFullScreen
					/>
				</div>
			</div>
		</Display>
	);
}

export default App;
