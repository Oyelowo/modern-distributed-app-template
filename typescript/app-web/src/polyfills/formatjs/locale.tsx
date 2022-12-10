import { shouldPolyfill } from "@formatjs/intl-locale/should-polyfill";
async function polyfill() {
	// This platform already supports Intl.Locale
	if (shouldPolyfill()) {
		await import("@formatjs/intl-locale/polyfill");
	}
}
