import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	root: `${process.cwd()}/frontend`,
	base: "/personal-cv/",
	server: {
		proxy: {
			"/api": {
				target: process.env.BACKEND_URL || "http://localhost:3000",
				changeOrigin: true,
				secure: false,
			},
		},
	},
	publicDir: "public",
	assetsInclude: ["**/*.glb", "**/*.jpg", "**/*.png", "**/*.svg"],
});
