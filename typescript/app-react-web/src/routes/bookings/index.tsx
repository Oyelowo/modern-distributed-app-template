import { createRouteConfig, Outlet } from "@tanstack/react-router";
import { router } from "../../router.jsx";
import { fetchInvoices } from "../../mockTodos.js";

export const bookingsRoute = createRouteConfig().createRoute({
  path: "bookings",
  component: Bookings,
  loader: async () => {
    console.log("Fetching all invoices...");
    return {
      invoices: await fetchInvoices(),
    };
  },
});

function Bookings() {
  const route = router.useMatch(bookingsRoute.id);

  return (
    <>
      <div className="flex flex-wrap divide-x">
        {(
          [
            [".", "Bookings"],
            ["/dashboard/invoices", "Invoices"],
            ["/dashboard/users", "Users", true],
            ["/landing", "Landing", true],
          ] as const
        ).map(([to, label, search]) => {
          return (
            <route.Link
              key={to}
              to={to}
              search={search}
              activeOptions={{ exact: to === "." }}
              activeProps={{ className: "font-bold" }}
              className="p-2"
            >
              {label}
            </route.Link>
          );
        })}
      </div>
      <hr />
      <Outlet />
    </>
  );
}
