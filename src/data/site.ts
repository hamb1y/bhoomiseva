import type { Site } from "./types";
import type { Localized } from "../i18n/utils";
import { site as seed } from "./seed/site";
import { site as generated } from "./generated/site";

/** The Payload `site-settings` global overrides the seed when it has been synced. */
export const site: Site = generated ?? seed;

export function pick(field: Localized, lang: "en" | "kn"): string {
  return typeof field === "string" ? field : ((lang === "kn" ? field.kn : field.en) ?? field.en);
}
