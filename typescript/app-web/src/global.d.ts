import {
	Intl,
	Temporal as TemporalType,
	toTemporalInstant,
} from "@js-temporal/polyfill";

export {};
declare global {
	interface Window {
		Temporal: typeof TemporalType;
		Intl: typeof Intl;
	}

	// interface globalThis {
	// 	Temporal: typeof TemporalType;
	// 	Intl: typeof Intl;
	// }

	interface Date {
		toTemporalInstant: typeof toTemporalInstant;
	}
	const Temporal: typeof TemporalType;

	namespace FormatjsIntl {
		interface Message {
			// ids: keyof typeof messages
		}
		interface IntlConfig {
			locale: "en" | "fr";
		}
	}
}
