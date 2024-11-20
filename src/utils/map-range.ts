export const mapRange = (
	value: number | undefined,
	min = 0,
	max = 100,
	targetMin = 0,
	targetMax = 1,
) => {
	const normalized = Math.min(Math.max(value ?? 50, min), max);
	return (
		targetMin + ((normalized - min) * (targetMax - targetMin)) / (max - min)
	);
};
