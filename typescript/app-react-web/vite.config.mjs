import { defineConfig } from "npm:vite";
import react from "npm:@vitejs/plugin-react";
// import jotaiDebugLabel from "npm:jotai/babel/plugin-debug-label";
// import jotaiReactRefresh from "npm:jotai/babel/plugin-react-refresh";

// const __filename = path.fromFileUrl(import.meta.url);
// Without trailing slash
// const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
//// <reference types="npm:@types/react" />

//// <reference types="vite/client" />

import "npm:lodash@4.17";
import "npm:@tanstack/react-router@0.0.1-beta.25";
import "npm:@tanstack/router-core@0.0.1-beta.25";
import "npm:@tanstack/react-router-devtools@0.0.1-beta.19";
import "npm:@tanstack/match-sorter-utils@8.5.14";
import "npm:@tanstack/react-query@4.10.3";
import "npm:@tanstack/react-table@8.5.15";
import "npm:@vitejs/plugin-react@1.1.3";
import "npm:react@18.2.0";
import "npm:react-dom@18.2.0";
import "npm:react-dom@18.2.0/client";
import "npm:axios@1.1.3";
import "npm:immer@9.0.15";
import "npm:vite@2.8.6";
import "npm:jotai@1.8.5";
import "npm:zod@3.19.1";
import "npm:@emotion/react@11.10.4";
// import "https://cdn.skypack.dev/@heroicons/react@2.0.13";
// import "npm:@heroicons/react@2.0.13";
// import "npm:@heroicons/react";
// import "npm:@tabler/icons@1.111.0";
// import "npm:@tabler/icons@1.111.0";
import "npm:@mantine/carousel@5.8.0";
import "npm:@mantine/core";
// import "npm:@mantine/core@5.8.0";
import "npm:@mantine/dates@5.8.0";
import "npm:@mantine/dropzone@5.8.0";
import "npm:@mantine/form@5.8.0";
import "npm:@mantine/hooks@5.8.0";
import "npm:@mantine/modals@5.8.0";
import "npm:@mantine/notifications@5.8.0";
import "npm:@mantine/nprogress@5.8.0";
import "npm:@mantine/prism@5.8.0";
import "npm:@mantine/tiptap@5.8.0";
import "npm:@mantine/spotlight@5.8.0";
import "npm:@modulz/radix-icons@4.0.0";
import "npm:tabler-icons-react@1.55.0";
import "npm:echarts@5.4.0";
import "npm:@react-spring/animated@9.5.5";
import "npm:@react-spring/core@9.5.5";
import "npm:@react-spring/three@9.5.5";
import "npm:@react-spring/web@9.5.5";
import "npm:@react-three/drei@9.34.3";
import "npm:@react-three/fiber@8.8.9";
import "npm:@use-gesture/react@10.2.20";
import "npm:graphql-request@5.0.0";
import "npm:d3@7.6.1";
import "npm:d3-array@3.2.0";
import "npm:d3-axis@3.0.0";
import "npm:d3-delaunay@6.0.2";
import "npm:d3-scale@4.0.2";
import "npm:d3-shape@3.1.0";
import "npm:date-fns@2.29.3";
import "npm:dayjs@1.11.5";
// import "npm:dayjs@1.11.6/plugin/isBetween";
import "npm:framer-motion@7.6.7";
import "npm:fuse.js@6.6.2";
// import "npm:glsl-random@0.0.5";
import "npm:prism-react-renderer@1.3.5";
import "npm:react-spring@9.5.5";
import "npm:react-use@17.4.0";
// import "npm:three-stdlib@2.17.2";
import "npm:@faker-js/faker@7.5.0";
// import "npm:cypress@10.9.0";
// import "npm:msw@0.47.4";
import "npm:ts-pattern@4.0.5";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }),
    react(),
  ],
});
