import { Grid } from "@mantine/core";
import { createRouteConfig, Outlet } from "@tanstack/react-router";
import { lazy } from "react";
import { useIntl } from "react-intl";
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
	// const { formatMessage } = useIntl();
	// const intl = useIntl();

	return (
		<>
			<Grid>
				<Grid.Col span={1}>
					<DoubleNavbar />
				</Grid.Col>
				<Grid.Col span={11}>
					<h1>Testing</h1>
					{Temporal.Now.zonedDateTimeISO().toString()}
					<p>
						{/* {formatMessage(
                            { defaultMessage: "My name is {name}" },
                            { name: "lowo" },
                        )} */}
						{/*
                            {formatMessage(
                                { defaultMessage: "My name is {name}" },
                                { name: "lowo" },
                                )}
                                {formatMessage(
                                    { defaultMessage: "My name is {name}" },
                                    { name: "lowo" },
                                    )}
                                    {formatMessage(
                                        { defaultMessage: "My name is {name}" },
                                        { name: "xx" },
                                        )}
                                        {formatMessage(
                                            { defaultMessage: "Let's go to space {space}" },
                                            { space: "xx" },
                                            )}
                                            {formatMessage(
                                                { defaultMessage: "Another thing to check from {place}" },
                                                { place: "Ohio" },
                                                )}
                                                {formatMessage(
                                                    { defaultMessage: "Tangering on the mountain {nation}" },
                                                    { nation: "Ohio" },
                                                    )}
                                                    <FormattedNumber value={19} style="currency" currency="EUR" />
                                                    */}
					</p>

					{/* Render our first route match */}
					<Outlet />
				</Grid.Col>
			</Grid>
			<TanStackRouterDevtools />
		</>
	);
}
