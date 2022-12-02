import { createRouteConfig, Outlet, useMatch } from "@tanstack/react-router";

export const landingRoute = createRouteConfig().createRoute({
	path: "landing",
	component: LandingHome,
	loader: async () => {
		console.log("Fetching all invoices...");
		return {
			invoices: "await fetchInvoices()",
		};
	},
});

function LandingHome() {
	const route = useMatch(landingRoute.id);
	return (
		<div>
			<route.Link to="/landing">landing</route.Link>
			<Outlet />
		</div>
	);
}
