// in-source test suites
import { expect, it } from "vitest";
import { LocaleObject, updateRightLocale } from "./syncLocales.js";

it("SYNC new locale object/JSON with new values from primary locales and remove stale locales in the new locale", () => {
	const left: LocaleObject = {
		GKi1lp: {
			defaultMessage: "xxnawao {xawa}",
		},

		UIQBVc: {
			defaultMessage: "Anotherx ddfay in me is {name}",
		},
		e1DTmD: {
			defaultMessage: "Today is {ts, date, ::yyyyMMdd}",
		},
	};

	const right: LocaleObject = {
		GKi1lp: {
			defaultMessage: "another language {xawa}",
		},

		e1DTmD: {
			defaultMessage: "another language {ts, date, ::yyyyMMdd}",
		},
		stale: {
			defaultMessage: "another language {ts, date, ::yyyyMMdd}",
		},
	};

	const expectedUpdatedRight: LocaleObject = {
		GKi1lp: {
			defaultMessage: "another language {xawa}",
		},

		UIQBVc: {
			defaultMessage: "Anotherx ddfay in me is {name}",
		},
		e1DTmD: {
			defaultMessage: "another language {ts, date, ::yyyyMMdd}",
		},
	};

	expect(updateRightLocale(left, right)).toStrictEqual(expectedUpdatedRight);
});
