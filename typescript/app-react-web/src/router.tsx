import { createReactRouter } from "@tanstack/react-router";
import { createRouteConfig } from "@tanstack/router-core";

import { indexRoute } from "./routes/index.tsx";
import { dashboardRoute } from "./routes/dashboard/index.tsx";
import { expensiveRoute } from "./routes/expensive/index.tsx";
import { authenticatedRoute } from "./routes/authenticated/index.tsx";
import { layoutRoute } from "./routes/layout/index.tsx";
import { dashboardIndexRoute } from "./routes/dashboard/dashboard.tsx";
import { invoicesRoute } from "./routes/dashboard/invoices/index.tsx";
import { usersRoute } from "./routes/dashboard/users/index.tsx";
import { invoicesIndexRoute } from "./routes/dashboard/invoices/invoices.tsx";
import { invoiceRoute } from "./routes/dashboard/invoices/invoice.tsx";
import { usersIndexRoute } from "./routes/dashboard/users/users.tsx";
import { userRoute } from "./routes/dashboard/users/user.tsx";
import { layoutRouteA } from "./routes/layout/layout-a.tsx";
import { layoutRouteB } from "./routes/layout/layout-b.tsx";
import { bookingsRoute } from "./routes/bookings/index.tsx";
import { bookingsIndexRoute } from "./routes/bookings/bookings.tsx";
import { landingRoute } from "./routes/bookings/landing/index.tsx";

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
  authenticatedRoute,
  layoutRoute.addChildren([layoutRouteA, layoutRouteB]),
]);

export const router = createReactRouter({
  routeConfig,
});
