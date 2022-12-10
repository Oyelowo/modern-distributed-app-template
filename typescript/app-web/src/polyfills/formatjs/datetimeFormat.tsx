import { shouldPolyfill } from "@formatjs/intl-datetimeformat/should-polyfill";
async function polyfill(locale: string) {
	const unsupportedLocale = shouldPolyfill(locale);
	// This locale is supported
	if (!unsupportedLocale) {
		return;
	}
	// Load the polyfill 1st BEFORE loading data
	await import("@formatjs/intl-datetimeformat/polyfill-force");

	// Parallelize CLDR data loading
	const dataPolyfills = [
		// Golden: contains popular set of timezones from IANA database
		// import '@formatjs/intl-datetimeformat/add-golden-tz'
		// Full: contains ALL Timezone from IANA database
		import("@formatjs/intl-datetimeformat/add-all-tz"),
		import(`@formatjs/intl-datetimeformat/locale-data/${unsupportedLocale}`),
	];
	await Promise.all(dataPolyfills);

	/*

Polyfills
Intl.DateTimeFormat (ESNext)
Intl.DisplayNames
Intl.getCanonicalLocales
Intl.ListFormat
Intl.Locale
Intl.LocaleMatcher
Intl.NumberFormat (ESNext)
Intl.PluralRules
Intl.RelativeTimeFormat
Intl.DateTimeFormat (ESNext)
A spec-compliant polyfill for Intl.DateTimeFormat fully tested by the official ECMAScript Conformance test suite

npm Version size

CAUTION
Right now we only support Gregorian calendar in this polyfill. Therefore we recommend setting calendar: 'gregory' in your options to be safe.

CAUTION
Right now this polyfill supports daylight transition until 2100 to reduce the dataset size

Features
dateStyle/timeStyle
formatRange
Installation
npm
yarn
npm i @formatjs/intl-datetimeformat
Requirements
This package requires the following capabilities:

Intl.getCanonicalLocales or polyfill
Intl.Locale or polyfill.
Intl.NumberFormat or polyfill.
Usage
Via polyfill.io
You can use polyfill.io URL Builder to create a polyfill script tag for Intl.DateTimeFormat. By default the created URL does not come with any locale data. In order to add locale data, append Intl.DateTimeFormat.~locale.<locale>, as well as locale data for any required polyfills, to your list of features. For example:

<!-- Polyfill Intl.DateTimeFormat, its dependencies & `en` locale data -->
<script src="https://polyfill.io/v3/polyfill.min.js?features=Intl.DateTimeFormat,Intl.DateTimeFormat.~locale.en,Intl.NumberFormat.~locale.en"></script>
Simple
import '@formatjs/intl-datetimeformat/polyfill'
import '@formatjs/intl-datetimeformat/locale-data/en' // locale-data for en
import '@formatjs/intl-datetimeformat/add-all-tz' // Add ALL tz data
Dynamic import + capability detection
import {shouldPolyfill} from '@formatjs/intl-datetimeformat/should-polyfill'
async function polyfill(locale: string) {
  const unsupportedLocale = shouldPolyfill(locale)
  // This locale is supported
  if (!unsupportedLocale) {
    return
  }
  // Load the polyfill 1st BEFORE loading data
  await import('@formatjs/intl-datetimeformat/polyfill-force')

  // Parallelize CLDR data loading
  const dataPolyfills = [
    import('@formatjs/intl-datetimeformat/add-all-tz'),
    import(`@formatjs/intl-datetimeformat/locale-data/${unsupportedLocale}`),
  ]
  await Promise.all(dataPolyfills)
}
Adding IANA Timezone Database
We provide 2 pre-processed IANA Timezone:

Full: contains ALL Timezone from IANA database
import '@formatjs/intl-datetimeformat/polyfill'
import '@formatjs/intl-datetimeformat/add-all-tz'
Golden: contains popular set of timezones from IANA database
import '@formatjs/intl-datetimeformat/polyfill'
import '@formatjs/intl-datetimeformat/add-golden-tz'
Default Timezone
Since JS Engines do not expose default timezone, there's currently no way for us to detect local timezone that a browser is in. Therefore, the default timezone in this polyfill is UTC.

You can change this by either calling __setDefaultTimeZone or always explicitly pass in timeZone option for accurate date time calculation.

Since __setDefaultTimeZone is not in the spec, you should make sure to check for its existence before calling it & after tz data has been loaded, e.g:

import '@formatjs/intl-datetimeformat/polyfill'
import '@formatjs/intl-datetimeformat/add-all-tz.js'

if ('__setDefaultTimeZone' in Intl.DateTimeFormat) {
  Intl.DateTimeFormat.__setDefaultTimeZone('America/Los_Angeles')
}
  */
}
