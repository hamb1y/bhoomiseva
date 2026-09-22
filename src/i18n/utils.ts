import { ui, defaultLang, type Lang, type UIKey } from "./ui";
import { base } from "../utils/url";

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return (
      (ui[lang] as Record<string, string>)[key] ??
      (ui[defaultLang] as Record<string, string>)[key] ??
      key
    );
  };
}

/** A content field that may be localised; missing translations fall back to English. */
export type Localized = string | { en: string; kn?: string };

export function lx(value: Localized, lang: Lang): string {
  if (typeof value === "string") return value;
  return (lang === "kn" ? value.kn : value.en) ?? value.en;
}

/** Build a path for the given locale (English is unprefixed), including the deployment base. */
export function localePath(path: string, lang: Lang): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const localized = lang === defaultLang ? clean : clean === "/" ? `/${lang}` : `/${lang}${clean}`;
  return `${base}${localized}`;
}
