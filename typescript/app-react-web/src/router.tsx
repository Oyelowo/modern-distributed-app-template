import { createReactRouter } from "@tanstack/react-router";
import { createRouteConfig } from "@tanstack/router-core";

import { indexRoute } from "./routes/index.jsx";
import { dashboardRoute } from "./routes/dashboard/index.jsx";
import { expensiveRoute } from "./routes/expensive/index.jsx";
import { authenticatedRoute } from "./routes/authenticated/index.jsx";
import { layoutRoute } from "./routes/layout/index.jsx";
import { dashboardIndexRoute } from "./routes/dashboard/dashboard.jsx";
import { invoicesRoute } from "./routes/dashboard/invoices/index.jsx";
import { usersRoute } from "./routes/dashboard/users/index.jsx";
import { invoicesIndexRoute } from "./routes/dashboard/invoices/invoices.jsx";
import { invoiceRoute } from "./routes/dashboard/invoices/invoice.jsx";
import { usersIndexRoute } from "./routes/dashboard/users/users.jsx";
import { userRoute } from "./routes/dashboard/users/user.jsx";
import { layoutRouteA } from "./routes/layout/layout-a.jsx";
import { layoutRouteB } from "./routes/layout/layout-b.jsx";
import { bookingsRoute } from "./routes/bookings/index.jsx";
import { bookingsIndexRoute } from "./routes/bookings/bookings.jsx";
import { landingRoute } from "./routes/bookings/landing/index.jsx";

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
