import { type ReactNode,useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import { useLocation } from "react-router-dom";

import { DEFAULT_LOCALE, SUPPORTED_LANGS,SUPPORTED_LOCALES } from "./constants";

function isSupportedLocale(locale: string): locale is typeof SUPPORTED_LOCALES[number] {
  return (SUPPORTED_LOCALES as readonly string[]).includes(locale);
}

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const pathLocale = location.pathname.split("/")[1];

  const pathLang = pathLocale?.split("-")[0];
  const isSupportedLang = (SUPPORTED_LANGS as readonly string[]).includes(pathLang);

  let currentLocale: string;
  if (isSupportedLocale(pathLocale)) {
    currentLocale = pathLocale;
  } else if (isSupportedLang) {
    currentLocale = pathLang;
  } else {
    currentLocale = DEFAULT_LOCALE;
  }
  const baseLocale = currentLocale.split("-")[0] as "ru" | "en" | "ar";

  const [messages, setMessages] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadMessages() {
      let loaded;
      const path = location.pathname;
      const ruPageMap = [
        { pattern: /^\/ru(-[A-Z]{2})?\/?$/, file: () => import("../translations.homePage.ru.json") },
        { pattern: /article\/ui-by/, file: () => import("../translations.articleUiBy.ru.json") },
        { pattern: /article\/l10n-ru/, file: () => import("../translations.articleL10nRu.ru.json") },
        { pattern: /article\/i18n-kz/, file: () => import("../translations.articleI18nKz.ru.json") },
        { pattern: /article\/en/, file: () => import("../translations.articleEn.ru.json") },
        { pattern: /article\/css/, file: () => import("../translations.articleCss.ru.json") },
        { pattern: /article\/ar/, file: () => import("../translations.articleAr.ru.json") },
        { pattern: /article\/rtl-icons/, file: () => import("../translations.articleRtlIcons.ru.json") },
      ];
      const enPageMap = [
        { pattern: /^\/en(-[A-Z]{2})?\/?$/, file: () => import("../translations.homePage.en.json") },
        { pattern: /article\/ui-by/, file: () => import("../translations.articleUiBy.en.json") },
        { pattern: /article\/l10n-ru/, file: () => import("../translations.articleL10nRu.en.json") },
        { pattern: /article\/i18n-kz/, file: () => import("../translations.articleI18nKz.en.json") },
        { pattern: /article\/en/, file: () => import("../translations.articleEn.en.json") },
        { pattern: /article\/css/, file: () => import("../translations.articleCss.en.json") },
        { pattern: /article\/ar/, file: () => import("../translations.articleAr.en.json") },
        { pattern: /article\/rtl-icons/, file: () => import("../translations.articleRtlIcons.en.json") },
      ];
      const arPageMap = [
        { pattern: /^\/ar(-[A-Z]{2})?\/?$/, file: () => import("../translations.homePage.ar.json") },
        { pattern: /article\/ui-by/, file: () => import("../translations.articleUiBy.ar.json") },
        { pattern: /article\/l10n-ru/, file: () => import("../translations.articleL10nRu.ar.json") },
        { pattern: /article\/i18n-kz/, file: () => import("../translations.articleI18nKz.ar.json") },
        { pattern: /article\/en/, file: () => import("../translations.articleEn.ar.json") },
        { pattern: /article\/css/, file: () => import("../translations.articleCss.ar.json") },
        { pattern: /article\/ar/, file: () => import("../translations.articleAr.ar.json") },
        { pattern: /article\/rtl-icons/, file: () => import("../translations.articleRtlIcons.ar.json") },
      ];
      if (baseLocale === "ru") {
        const match = ruPageMap.find(({ pattern }) => pattern.test(path));
        if (match) {
          loaded = (await match.file()).default;
        } else {
          loaded = (await import("../translations.homePage.ru.json")).default;
        }
      } else if (baseLocale === "en") {
        const match = enPageMap.find(({ pattern }) => pattern.test(path));
        if (match) {
          loaded = (await match.file()).default;
        } else {
          loaded = (await import("../translations.homePage.en.json")).default;
        }
      } else if (baseLocale === "ar") {
        const match = arPageMap.find(({ pattern }) => pattern.test(path));
        if (match) {
          loaded = (await match.file()).default;
        } else {
          loaded = (await import("../translations.homePage.ar.json")).default;
        }
      } else {
        loaded = (await import("../translations.homePage.en.json")).default;
      }
      if (isMounted) setMessages(loaded ?? null);
    }
    loadMessages();
    return () => {
      isMounted = false;
    };
  }, [baseLocale, location.pathname]);

  useEffect(() => {
    if (!messages) return;
    document.title = messages["app.title"];
    document.documentElement.lang = baseLocale;
    document.documentElement.dir = baseLocale === "ar" ? "rtl" : "ltr";
  }, [messages, baseLocale]);

  if (!messages) return null;

  return (
    <IntlProvider locale={currentLocale} messages={messages}>
      {children}
    </IntlProvider>
  );
}; 
