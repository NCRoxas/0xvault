import { defineConfig } from "windicss/helpers";

export default defineConfig({
	theme: {
		extend: {
			animation: {
				pulse: "pulse 3s ease-in-out infinite"
			},
			fontFamily: {
				robaga: ["robaga", "sans-serif"]
			}
		}
	}
});
