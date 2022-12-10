import { shouldPolyfill } from "@formatjs/intl-numberformat/should-polyfill";
async function polyfill(locale: string) {
	const unsupportedLocale = shouldPolyfill(locale);
	// This locale is supported
	if (!unsupportedLocale) {
		return;
	}
	// Load the polyfill 1st BEFORE loading data
	await import("@formatjs/intl-numberformat/polyfill-force");
	await import(`@formatjs/intl-numberformat/locale-data/${unsupportedLocale}`);
}

type Unit =
	| "acre"
	| "bit"
	| "byte"
	| "celsius"
	| "centimeter"
	| "day"
	| "degree"
	| "fahrenheit"
	| "fluid-ounce"
	| "foot"
	| "gallon"
	| "gigabit"
	| "gigabyte"
	| "gram"
	| "hectare"
	| "hour"
	| "inch"
	| "kilobit"
	| "kilobyte"
	| "kilogram"
	| "kilometer"
	| "liter"
	| "megabit"
	| "megabyte"
	| "meter"
	| "mile"
	| "mile-scandinavian"
	| "millimeter"
	| "milliliter"
	| "millisecond"
	| "minute"
	| "month"
	| "ounce"
	| "percent"
	| "petabyte"
	| "pound"
	| "second"
	| "stone"
	| "terabit"
	| "terabyte"
	| "week"
	| "yard"
	| "year";
