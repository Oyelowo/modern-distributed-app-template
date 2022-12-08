import * as React from "react";
import { createReactRouter } from "@tanstack/react-router";
import { routeConfig } from "./routes.generated/routeConfig";
import { routeConfigClient } from "./routes.generated/routeConfig.client";

export const createRouter = () =>
	createReactRouter({
		routeConfig:
			typeof document !== "undefined" ? routeConfigClient : routeConfig,
		useServerData: true,
		context: {
			head: "",
		},
	});

declare module "@tanstack/react-router" {
	interface RegisterRouter {
		router: ReturnType<typeof createRouter>;
	}
}
