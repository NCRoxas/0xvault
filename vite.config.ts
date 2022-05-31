import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Pages from "vite-plugin-pages";
import WindiCSS from "vite-plugin-windicss";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: { alias: { "~": path.resolve(__dirname, "src") } },
	server: { port: 8000 },
	preview: { port: 8000 },
	plugins: [react(), Pages(), WindiCSS()]
});
