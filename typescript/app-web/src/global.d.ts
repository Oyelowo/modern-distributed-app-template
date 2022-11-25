import {
	Temporal as TemporalType,
	toTemporalInstant,
	Intl,
} from "@js-temporal/polyfill";

export {}
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
}
