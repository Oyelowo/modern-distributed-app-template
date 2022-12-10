import { shouldPolyfill } from "@formatjs/intl-displaynames/should-polyfill";
async function polyfill(locale: string) {
	const unsupportedLocale = shouldPolyfill(locale);
	// This locale is supported
	if (!unsupportedLocale) {
		return;
	}
	// Load the polyfill 1st BEFORE loading data
	await import("@formatjs/intl-displaynames/polyfill-force");
	await import(`@formatjs/intl-displaynames/locale-data/${unsupportedLocale}`);
}
