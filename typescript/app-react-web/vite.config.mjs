import { defineConfig } from "npm:vite";
import react from "npm:@vitejs/plugin-react";
import jotaiDebugLabel from "npm:jotai/babel/plugin-debug-label";
import jotaiReactRefresh from "npm:jotai/babel/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }),
    // react(),
  ],
});
