import { shouldPolyfill } from "@formatjs/intl-getcanonicallocales/should-polyfill";
async function polyfill() {
	// This platform already supports Intl.getCanonicalLocales
	if (shouldPolyfill()) {
		await import("@formatjs/intl-getcanonicallocales/polyfill");
	}
}
