import { hydrateRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { App } from "./main";
import { router } from "./router";

// import { createRouter } from "./router";
// import { App } from "./App";

// const router = createRouter();

const state = (window as any).__TANSTACK_ROUTER_STATE__;

router.hydrateState(state);

hydrateRoot(
  document.getElementById("root")!,
  <RouterProvider router={router} useServerData>
    <App />
  </RouterProvider>
);
