import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "./constants";

const pathLocale = window.location.pathname.split("/")[1] as typeof SUPPORTED_LOCALES[number];
export const currentLocale = SUPPORTED_LOCALES.includes(pathLocale) ? pathLocale : DEFAULT_LOCALE;
export const baseLocale = currentLocale.split("-")[0] as "ru" | "en" | "ar";