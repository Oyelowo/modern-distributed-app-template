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
import React, { lazy, useEffect } from "react";
import {
	defineMessage,
	FormattedMessage,
	FormattedNumber,
	IntlProvider,
	useIntl,
} from "react-intl";
import { Locale } from "./config/Locale.js";
import { match } from "ts-pattern";

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

async function importMessages(locale: Locale) {
	return import("./locales/compiled-lang/en.json");
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

				<QueryClientProvider client={queryClient}>
					<LocaleProv>
						{/* <IntlProvider
					messages={localeData}
					locale="fr"
					defaultLocale="en"
				> */}
						{/* Normally <Router /> acts as it's own outlet,
            but if we pass it children, route matching is
		deferred until the first <Outlet /> is found. */}
						{/* {Temporal.Now.zonedDateTimeISO().toString()} */}
						<Root />
					</LocaleProv>
					{/* </IntlProvider> */}
					<RouterProvider router={router} />
				</QueryClientProvider>

				<TanStackRouterDevtools router={router} position="bottom-right" />
			</MantineProvider>
		</>
	);
}

function LocaleProv({ children }: { children: React.ReactElement }) {
	const locale = "en";
	type LocaleMessages = any;
	const [messages, setMessages] = React.useState<LocaleMessages | null>(null);
	useEffect(() => {
		importMessages(locale).then((locale) => {
			console.log("mppmp", locale);
			setMessages(locale);
		});
	}, []);

	// 	const locale: Locale = "fr";
	// 	const { data: localeData } = useQuery(["locale", locale], () =>
	// 		loadLocaleData(locale),
	// 	);

	// 	const messagesInFrench = {
	//   myMessage: "Aujourd'hui, c'est le {ts, date, ::yyyyMMdd}",
	// };
	return (
		<IntlProvider messages={messages} key="en" locale="en" defaultLocale="en">
			{children}
		</IntlProvider>
	);
}

function Root() {
	const routerState = router.useState();
	const { formatMessage } = useIntl();
	const intl = useIntl();

	return (
		<Grid>
			<Grid.Col span={1}>
				<DoubleNavbar />
			</Grid.Col>
			<Grid.Col span={11}>
				<h1>Testing</h1>
				<p>
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
				</p>

				{/* Render our first route match */}
				<Outlet />
			</Grid.Col>
		</Grid>
	);
}

if (document) {
	const rootElement = document.getElementById("app");
	if (rootElement && !rootElement?.innerHTML) {
		const root = createRoot(rootElement);
		root.render(<App />);
	}
}

// export async function bootstrapApplication(locale: Locale) {
//   const messages = await loadLocaleData(locale)
//   return <App locale={locale} messages={messages.default} />
// }
