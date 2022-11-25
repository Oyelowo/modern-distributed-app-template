import {
	Temporal as TemporalType,
	toTemporalInstant,
	Intl,
} from "@js-temporal/polyfill";
import React from "react";
// export {}
declare global {
	interface Window {
		Temporal: typeof TemporalType;
		Intl: typeof Intl;
	}

	interface globalThis {
		Temporal: typeof TemporalType;
		Intl: typeof Intl;
	}

	interface Date {
		toTemporalInstant: typeof toTemporalInstant;
	}
	var Temporal: typeof TemporalType;
}

declare var __INITIAL_DATA__: string;
