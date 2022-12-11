import { defineConfig, mergeConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
import react from "@vitejs/plugin-react";
import jotaiDebugLabel from "jotai/babel/plugin-debug-label";
import jotaiReactRefresh from "jotai/babel/plugin-react-refresh";
import { defineConfig as defineConfigForTest } from "vitest/config";

// https://vitejs.dev/config/
const viteConfig = defineConfig({
	plugins: [
		(react as any)({
			babel: {
				plugins: [jotaiDebugLabel, jotaiReactRefresh,
					["formatjs", {
						"idInterpolationPattern": "[sha512:contenthash:base64:6]",
						"ast": true
					}]
				]
			},
		}),
	],
});

export default mergeConfig(
	viteConfig,
	defineConfigForTest({
		test: {
			// exclude: ['packages/template/*'],
			exclude: ["tests/*", "node_modules", "dist"],
		},
	}),
);
