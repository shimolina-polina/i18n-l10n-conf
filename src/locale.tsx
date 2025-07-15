import type { ReactNode } from "react";
import { IntlProvider } from "react-intl";

import translations from "../translations.json";
import { baseLocale, currentLocale } from "./locale-constants";

const messages = Object.fromEntries(
  Object.entries(translations).map(([key, value]) => [key, value[baseLocale]])
);

export const LocaleProvider = ({ children }: { children: ReactNode }) => (
  <IntlProvider locale={currentLocale} messages={messages}>
    {children}
  </IntlProvider>
); 
