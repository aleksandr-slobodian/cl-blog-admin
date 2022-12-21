import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ICU from "i18next-icu";
import LanguageDetector from "i18next-browser-languagedetector";

import Backend from "i18next-chained-backend";
import LocalStorageBackend from "i18next-localstorage-backend"; // primary use cache
import HttpApi from "i18next-http-backend"; // fallback http load
const translationsversion = "0.0.12";
export const supportedLngs = ["en", "uk"];
i18n
  .use(Backend)
  .use(ICU)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    load: "languageOnly",
    fallbackLng: "en",
    ns: ["main"],
    supportedLngs: supportedLngs,
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false,
    },
    backend: {
      backends:
        process.env.NODE_ENV === "production"
          ? [LocalStorageBackend, HttpApi]
          : [HttpApi],
      backendOptions:
        process.env.NODE_ENV === "production"
          ? [
              {
                defaultVersion: translationsversion,
              },
              {
                queryStringParams: { v: translationsversion },
              },
            ]
          : undefined,
    },
  });

export default i18n;
