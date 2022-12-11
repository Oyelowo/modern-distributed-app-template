import { createRoot } from "react-dom/client";
import { Outlet, RouterProvider } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { router } from "./router.js";
import {
	Avatar,
	Divider,
	Grid,
	MantineProvider,
	Select,
	SimpleGrid,
} from "@mantine/core";
import { atom, useAtom } from "jotai";
import { DoubleNavbar } from "./NavbarMain/Nav.js";
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from "@tanstack/react-query";
import React, { FC, lazy, useEffect } from "react";
import {
	defineMessage,
	FormattedMessage,
	FormattedNumber,
	IntlProvider,
	useIntl,
} from "react-intl";
import { Locale, LOCALES } from "./hooks/locales/languages.js";
import { match } from "ts-pattern";
import {
	LocaleMessages,
	useLocaleMessages,
} from "./hooks/locales/useLocale.js";
import { Container } from "tabler-icons-react";
// import 'mapbox-gl/dist/mapbox-gl.css';
// import { Map } from "react-map-gl";
// import maplibregl from "maplibre-gl";

// function Appe() {
// 	return <Map mapLib={maplibregl} />;
// }

if (!window.Temporal) {
	await import("@js-temporal/polyfill").then((polyfill) => {
		Date.prototype.toTemporalInstant = polyfill.toTemporalInstant;
		window.Temporal = polyfill.Temporal;
		if (!(window as any).Intl) {
			(window as any).Intl = polyfill.Intl;
		}
	});
}

const colorSchemeAtom = atom<"light" | "dark">("dark");
const queryClient = new QueryClient();

function App() {
	const [colorScheme, setColorScheme] = useAtom(colorSchemeAtom);
	const { messages, locale, setLocale } = useLocaleMessages();

	return (
		<>
			<IntlProvider
				messages={messages as LocaleMessages}
				locale={locale as any}
				defaultLocale="en"
			>
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

					<div style={{ width: 90 }}>
						<Select
							value={locale}
							onChange={setLocale}
							data={LOCALES}
							searchable
						/>
					</div>
					<RouterProvider router={router} defaultPreload="intent" />
					<QueryClientProvider client={queryClient} />
				</MantineProvider>
			</IntlProvider>
		</>
	);
}

const rootElement = document.getElementById("app");

if (rootElement && !rootElement?.innerHTML) {
	const root = createRoot(rootElement);
	root.render(<App />);
}
