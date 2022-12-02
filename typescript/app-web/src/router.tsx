import { createReactRouter } from "@tanstack/react-router";
import { createRouteConfig } from "@tanstack/router-core";

import { indexRoute } from "./routes/index.js";
import { dashboardRoute } from "./routes/dashboard/index.js";
import { expensiveRoute } from "./routes/expensive/index.js";
import {
	authenticatedIndexRoute,
	authenticatedRoute,
} from "./routes/authenticated/index.js";
import { layoutRoute } from "./routes/layout/index.js";
import { dashboardIndexRoute } from "./routes/dashboard/dashboard.js";
import { invoicesRoute } from "./routes/dashboard/invoices/index.js";
import { usersRoute } from "./routes/dashboard/users/index.js";
import { invoicesIndexRoute } from "./routes/dashboard/invoices/invoices.js";
import { invoiceRoute } from "./routes/dashboard/invoices/invoice.js";
import { usersIndexRoute } from "./routes/dashboard/users/users.js";
import { userRoute } from "./routes/dashboard/users/user.js";
import { layoutRouteA } from "./routes/layout/layout-a.js";
import { layoutRouteB } from "./routes/layout/layout-b.js";
import { bookingsRoute } from "./routes/bookings/index.js";
import { bookingsIndexRoute } from "./routes/bookings/bookings.js";
import { landingRoute } from "./routes/bookings/landing/index.js";

const routeConfig = createRouteConfig().addChildren([
	indexRoute,
	dashboardRoute.addChildren([
		dashboardIndexRoute,
		invoicesRoute.addChildren([invoicesIndexRoute, invoiceRoute]),
		usersRoute.addChildren([usersIndexRoute, userRoute]),
	]),
	bookingsRoute.addChildren([bookingsIndexRoute, landingRoute]),
	// landingRoute,
	expensiveRoute,
	authenticatedRoute.addChildren([authenticatedIndexRoute]),
	layoutRoute.addChildren([layoutRouteA, layoutRouteB]),
]);

export const router = createReactRouter({
	routeConfig,
	defaultPendingComponent: () => (
		<div>
			<>Router Loading...</>
		</div>
	),
});

declare module "@tanstack/react-router" {
	interface RegisterRouter {
		router: typeof router;
	}
}
