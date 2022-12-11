import { Divider, Grid } from "@mantine/core";
import { createRouteConfig, Outlet } from "@tanstack/react-router";
import { lazy } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { DoubleNavbar } from "../NavbarMain/Nav.js";
import { router } from "../router.js";

const TanStackRouterDevtools =
	process.env.NODE_ENV === "production"
		? () => null // Render nothing in production
		: lazy(() =>
				// Lazy load in development
				import("@tanstack/react-router-devtools").then((res) => ({
					default: res.TanStackRouterDevtools,
					// For Embedded Mode
					// default: res.TanStackRouterDevtoolsPanel
				})),
		  );

export const rootRoute = createRouteConfig({
	component: Root,
});

function Root() {
	const routerState = router.useState();
	const { formatMessage } = useIntl();

	return (
		<>
			<Grid>
				<Grid.Col span={1}>
					<DoubleNavbar />
				</Grid.Col>
				<Grid.Col span={11}>
					<h1>Testing</h1>
					{Temporal.Now.zonedDateTimeISO().toString()}
					<Divider />

					{formatMessage(
						{ defaultMessage: "My name is {name}" },
						{ name: "lowo" },
					)}
					<Divider />
					{formatMessage(
						{ defaultMessage: "They know the place another {place}" },
						{ place: "lowo" },
					)}
					<Divider />
					{formatMessage(
						{ defaultMessage: "Something from this country {country}" },
						{ country: "Canada" },
					)}
					<Divider />

					<FormattedMessage
						defaultMessage="They know the place another {place}"
						values={{ place: "lowo" }}
					/>
					<Divider />

					{/* Render our first route match */}
					<Outlet />
				</Grid.Col>
			</Grid>
			<TanStackRouterDevtools />
		</>
	);
}
