const LOCALE_DEFAULT = "en";
export const LOCALES = [
	LOCALE_DEFAULT,
	"fr",
	"zh-CN",
	"es",
	"hi",
	"ar",
	"bn",
	"pt",
	"ru",
	"ja",
	"de", // German
] as const;
export type Locale = typeof LOCALES[number];
