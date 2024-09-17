"use client";

import i18n from "@components/i18n/page";
import { TFunction } from "i18next";

interface I18nProvider {
  translate: (key: string, params?: Record<string, any>) => string;
  changeLocale: (lang: string) => Promise<void>;
  getLocale: () => string;
}

const i18nProvider: I18nProvider = {
  // Translation function, using i18next's `t` function
  translate: (key: string, params?: Record<string, any>) => i18n.t(key, params),

  // Function to change the language/locale
  changeLocale: (lang: string) => {
    return new Promise<void>((resolve, reject) => {
      i18n.changeLanguage(lang, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },

  // Function to get the current language
  getLocale: () => i18n.language,
};

export default i18nProvider;
