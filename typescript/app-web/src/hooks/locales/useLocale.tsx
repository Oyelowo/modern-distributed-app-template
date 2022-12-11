import { atom, useAtom } from "jotai";
import * as React from "react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Locale, LOCALES } from "./languages.js";

function getUserLang(): Locale {
	if (LOCALES.includes(navigator.language as Locale)) {
		return navigator.language as Locale;
	}
	return "en";
}

const lang = getUserLang();
const localeAtom = atom<Locale>(lang);

type LocaleMessagesValues = {
	locale: Locale;
	messages: LocaleMessages | null;
	setLocale: (locale: Locale) => void;
};

const localeSchema = z.record(z.any());
export function useLocaleMessages(): LocaleMessagesValues {
	const [locale, setLocale] = useAtom(localeAtom);
	async function importMessages(locale: Locale) {
		return import(`../../locales/compiled-lang/${locale}.json`);
	}
	const [messages, setMessages] = React.useState<LocaleMessages | null>(null);
	useEffect(() => {
		importMessages(locale).then((locale) => {
			const messages = localeSchema.parse(locale.default) as LocaleMessages;
			setMessages(messages);
		});
	}, [locale]);

	const changeLocale = (locale: Locale) => {
		setLocale(locale);
	};
	return {
		locale,
		messages,
		setLocale: changeLocale,
	};
}

async function messagesUtil() {
	return (await import("../../locales/compiled-lang/en.json")).default;
}
export type LocaleMessages = Awaited<ReturnType<typeof messagesUtil>>;
