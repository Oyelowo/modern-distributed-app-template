import sh from "shelljs";
import path from "node:path";
import fs from "node:fs";
import { z } from "zod";
import * as R from "ramda";
import { Locale, LOCALES } from "../src/config/Locale.js";

const outDir = path.resolve("./locales");
const LOCALE_JSON_SCHEMA = z.record(
	z.string(),
	z.object({
		defaultMessage: z.string(),
		description: z.string().optional(),
	}),
);

// EXTRACT
// SYNC
// COMPILE
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

function extractLocaleMessagesFromCodebase(): LocaleObject {
	// This is the initially extracted file with default messages including
	// descriptions usually meant for the translator to do the other languages.
	// The codebase/app itself, uses the compiled ast and not this. This is more
	// for informational sake and to do translation for other languages or send to
	// a localisation tool
	const extract = `pnpm formatjs extract 'src/**/*.{ts,tsx}' \
	    --additional-function-names='t,$t' --ignore='**/*.d.ts' \
	    --flatten --id-interpolation-pattern '[sha512:contenthash:base64:6]'`;
	return JSON.parse(sh.exec(extract).stdout);
}

function compileLocale({
	localeMessagePath,
	locale,
	asAst: asAst,
}: {
	localeMessagePath: string;
	locale: Locale;
	asAst: boolean;
}) {
	//  This compiles directly to AST using the `--ast` flag rather than the intermediate simple key/value pair.
	// so that we dont have to do this at runtime which it would have to do if it were
	// merely simple key-value translation. Reference: https://formatjs.io/docs/guides/advanced-usage/#pre-compiling-messages
	// NOTE: While this may be more efficient for serverside rendering
	// since you can precompile and cache the AST, it's generally bigger and can make
	// your app bigger. So may be less optimal for CSR. Consider removing the ast flag if it becomes a problem

	sh.exec(
		`pnpm formatjs compile '${localeMessagePath}' --out-file ${outDir}/lang/${locale}.json ${asAst && "--ast"
		} \
     --out-file ${outDir}/compiled-lang/${locale}.json`,
	);
}

function getLocaleMessagesPath(locale: Locale) {
	return `${outDir}/for-translator/${locale}.json`;
}

const getLocaleExistingFromPath = ({
	localePath,
}: { localePath: string }): LocaleObject => {
	try {
		return LOCALE_JSON_SCHEMA.parse(
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
				compileLocale({ localeMessagePath: localePath, locale, asAst: true });
			}
		});
	};

	LOCALES.forEach((locale) => syncLocaleMessages(locale));
};

syncAllLocales();
