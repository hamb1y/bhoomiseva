import copy from "../../content/copy.json";

/**
 * UI strings — English + Kannada — live in content/copy.json so editors can
 * change them in the CMS ("Interface text"). Keys are dotted paths into that
 * file, e.g. "home.title". A field named `self` is the label for its group,
 * so "nav.work.self" is read as "nav.work".
 *
 * Long-form page content lives in src/data/*, where each field can carry
 * `{ en, kn }`; a missing `kn` falls back to `en`.
 */

export const languages = {
  en: "English",
  kn: "ಕನ್ನಡ",
} as const;

export const defaultLang = "en" as const;

export type Lang = keyof typeof languages;

type Paths<T, Prefix extends string = ""> = {
  [K in keyof T & string]: T[K] extends string
    ? K extends "self"
      ? Prefix extends `${infer Parent}.`
        ? Parent
        : never
      : `${Prefix}${K}`
    : Paths<T[K], `${Prefix}${K}.`>;
}[keyof T & string];

export type UIKey = Paths<(typeof copy)[typeof defaultLang]>;

function flatten(node: unknown, prefix = "", out: Record<string, string> = {}): Record<string, string> {
  if (typeof node === "string") out[prefix] = node;
  else if (node && typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      flatten(value, key === "self" ? prefix : prefix ? `${prefix}.${key}` : key, out);
    }
  }
  return out;
}

export const ui: Record<Lang, Record<string, string>> = {
  en: flatten(copy.en),
  kn: flatten(copy.kn),
};
