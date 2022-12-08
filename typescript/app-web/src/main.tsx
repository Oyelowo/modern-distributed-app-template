import { createRoot } from "react-dom/client";
import { Outlet, RouterProvider } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { router } from "./router.js";
import { Avatar, Grid, MantineProvider } from "@mantine/core";
import { atom, useAtom } from "jotai";
import { DoubleNavbar } from "./NavbarMain/Nav.js";
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from "@tanstack/react-query";
import { lazy } from "react";
import {
	IntlProvider,
	FormattedMessage,
	FormattedNumber,
	useIntl,
	defineMessage,
} from "react-intl";

// Translated messages in French with matching IDs to what you declared
const messagesInFrench = {
	myMessage: "Aujourd'hui, c'est le {ts, date, ::yyyyMMdd}",
};

if (!window.Temporal) {
	await import("@js-temporal/polyfill").then((polyfill) => {
		Date.prototype.toTemporalInstant = polyfill.toTemporalInstant;
		window.Temporal = polyfill.Temporal;
		(window as any).Intl = polyfill.Intl;
	});
}

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

const colorSchemeAtom = atom<"light" | "dark">("dark");
const queryClient = new QueryClient();

async function loadLocaleData(locale: string) {
	switch (locale) {
		case "fr":
			return import("../compiled-lang/fr.json");
		default:
			return import("../compiled-lang/fr.json");
	}
}

function App() {
	const [colorScheme, setColorScheme] = useAtom(colorSchemeAtom);

	return (
		<>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{ colorScheme }}
			>
				<Avatar
					color="cyan"
					radius="xl"
					onClick={() =>
						setColorScheme((prev) => (prev === "light" ? "dark" : "light"))
					}
				>
					OO
				</Avatar>

				<RouterProvider router={router}>
					<QueryClientProvider client={queryClient}>
						{/* <IntlProvider
					messages={localeData}
					locale="fr"
					defaultLocale="en"
				> */}
						<LocaleProv>
							{/* Normally <Router /> acts as it's own outlet,
            but if we pass it children, route matching is
		deferred until the first <Outlet /> is found. */}
							{Temporal.Now.zonedDateTimeISO().toString()}
							<Root />
						</LocaleProv>
						{/* </IntlProvider> */}
					</QueryClientProvider>
				</RouterProvider>

				<TanStackRouterDevtools router={router} position="bottom-right" />
			</MantineProvider>
		</>
	);
}

function useIt() {
	const { formatMessage } = useIntl();

	return {
		t: (defaultMessage: string, values: Record<string, string>) => {
			const message = defineMessage({
				defaultMessage, // Message should be a string literal
			});
			return formatMessage(message, values);
		},
	};
}

function LocaleProv({ children }: { children: any }) {
	// const localeData = loadLocaleData('fr');
	const { data: localeData } = useQuery(["xx"], () => loadLocaleData("fr"));

	return (
		<IntlProvider messages={localeData} locale="fr" defaultLocale="en">
			{children}
		</IntlProvider>
	);
}

function Root() {
	const routerState = router.useState();
	const { t } = useIt();

	// function formatMessage(a:any, b:any) {

	// }
	return (
		<Grid>
			<Grid.Col span={1}>
				<DoubleNavbar />
			</Grid.Col>
			<Grid.Col span={11}>
				{/* 		{t({defaultMessage:"Another day in me is {name}"}, {
					name: "lowo"
				})} */}
				<h1>Testing</h1>
				<p>
					<FormattedMessage
						id="myMessage"
						defaultMessage="Today is {ts, date, ::yyyyMMdd}"
						values={{ ts: Date.now() }}
					/>
					<br />
					<FormattedNumber value={19} style="currency" currency="EUR" />
				</p>
				<FormattedMessage
					// id="df"
					defaultMessage="Anotherx ddfay in me is {name}"
					values={{ name: "lowo" }}
				/>
				{/* Render our first route match */}
				<Outlet />
			</Grid.Col>
		</Grid>
	);
}

if (document) {
	const rootElement = document.getElementById("app")!;
	if (!rootElement.innerHTML) {
		const root = createRoot(rootElement);
		root.render(<App />);
	}
}
