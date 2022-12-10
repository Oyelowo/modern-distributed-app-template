import sh from "shelljs";
import path from "node:path";

// "compile": "formatjs extract 'src/**/*.{ts,tsx}' --additional-function-names='t,$t' --ignore='**/*.d.ts' --out-file temp.json --flatten --id-interpolation-pattern '[sha512:contenthash:base64:6]' && formatjs compile 'temp.json' --out-file lang/en.json --ast --out-file compiled-lang/en.json && rm temp.json",
//
const LOCALE_DEFAULT = "en";

const LOCALES = [
	LOCALE_DEFAULT, // English
	"zh-CN", // Mandarin (Chinese)
	"es", // Spanish
	"hi", // Hindi
	"ar", // Arabic
	"bn", // Bengali
	"pt", // Portuguese
	"ru", // Russian
	"ja", // Japanese
	"de", // German
] as const;
export type Locale = typeof LOCALES[number];

const outDir = path.resolve("./locales");
// EXTRACT
// SYNC
// COMPILE
function extractCompile() {
	console.log("xxx", outDir);
	// sh.rm(`-`)
	// This is the initially extracted file with default messages including
	// descriptions usually meant for the translator to do the other languages.
	// The codebase/app itself, uses the compiled ast and not this. This is more
	// for informational sake and to do translation for other languages or send to
	// a localisation tool
	const messagePath = `${outDir}/for-translator/${LOCALE_DEFAULT}.json`;
	const extract = `pnpm formatjs extract 'src/**/*.{ts,tsx}' \
    --additional-function-names='t,$t' --ignore='**/*.d.ts' \
     --out-file ${messagePath} --flatten --id-interpolation-pattern '[sha512:contenthash:base64:6]'`;

	//  This compiles directly to AST using the `--ast` flag rather than the intermediate simple key/value pair.
	// so that we dont have to do this at runtime which it would have to do if it were
	// merely simple key-value translation. Reference: https://formatjs.io/docs/guides/advanced-usage/#pre-compiling-messages
	// NOTE: While this may be more efficient for serverside rendering
	// since you can precompile and cache the AST, it's generally bigger and can make
	// your app bigger. So may be less optimal for CSR. Consider removing the ast flag if it becomes a problem
	const compile = ({
		withAst,
		removeExtractedMessages = false,
	}: { withAst: boolean; removeExtractedMessages: boolean }) => {
		const removeExtracted = removeExtractedMessages && `rm ${messagePath}`;
		const withAstFlag = withAst && "--ast";
		return `pnpm formatjs compile '${messagePath}' --out-file ${outDir}/lang/${LOCALE_DEFAULT}.json ${withAstFlag} \
     --out-file ${outDir}/compiled-lang/${LOCALE_DEFAULT}.json && ${removeExtracted}`;
	};

	sh.exec(
		`${extract} && ${compile({
			withAst: false,
			removeExtractedMessages: false,
		})}`,
	);
}

// extractCompile();

import * as R from "ramda";
export type LocaleObject = JSON | Record<string, Object>;
export function updateRightLocale(
	leftObject: LocaleObject,
	rightObject: LocaleObject,
): LocaleObject {
	/*
		Before merging the two objects together, the R.pick() function is
		used to create a new object from right that only contains the keys
		that exist in left. This ensures that only the keys that exist
		in left are merged from right into left
		*/
	const rightObjectWithoutStaleKeys = R.pick(
		R.keys(leftObject),
		rightObject ?? {},
	);
	const expectedUpdatedRight: LocaleObject = R.mergeWith(
		(left, right) => (left && right ? right : left),
		leftObject,
		rightObjectWithoutStaleKeys,
	);

	return expectedUpdatedRight;
}

const extract = `pnpm formatjs extract 'src/**/*.{ts,tsx}' \
    --additional-function-names='t,$t' --ignore='**/*.d.ts' \
    --flatten --id-interpolation-pattern '[sha512:contenthash:base64:6]'`;

function extractLocaleMessagesFromCodebase(): LocaleObject {
	return JSON.parse(sh.exec(extract).stdout);
}

import fs from "node:fs";
import { z } from "zod";
function getLocaleMessagesPath(locale: Locale) {
	return `${outDir}/for-translator/${locale}.json`;
}
const localObjectSchema = z.record(
	z.string(),
	z.object({
		defaultMessage: z.string(),
		description: z.string().optional(),
	}),
);
const getLocaleExistingFromPath = ({
	localePath,
}: { localePath: string }): LocaleObject => {
	// TODO: probably use zod
	try {
		return localObjectSchema.parse(
			JSON.parse(sh.cat(localePath).stdout.trim()),
		);
	} catch (error) {
		return {};
	}
};

const syncAllLocales = () => {
	const defaultLocaleMessage = extractLocaleMessagesFromCodebase();

	const syncLocaleMessages = (locale: Locale): void => {
		const localePath = getLocaleMessagesPath(locale);
		const existingLocale = getLocaleExistingFromPath({ localePath });
		const jsonx = updateRightLocale(defaultLocaleMessage, existingLocale);

		fs.writeFile(localePath, JSON.stringify(jsonx, null, 2), (error) => {
			if (error) {
				console.error(error);
			} else {
				console.log("Data was successfully written to the file");
			}
		});
	};

	LOCALES.forEach((locale) => syncLocaleMessages(locale));
};

syncAllLocales();
