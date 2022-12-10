import { shouldPolyfill } from "@formatjs/intl-listformat/should-polyfill";
async function polyfill(locale: string) {
	const unsupportedLocale = shouldPolyfill(locale);
	// This locale is supported
	if (!unsupportedLocale) {
		return;
	}
	// Load the polyfill 1st BEFORE loading data
	await import("@formatjs/intl-listformat/polyfill-force");
	await import(`@formatjs/intl-listformat/locale-data/${unsupportedLocale}`);
}
