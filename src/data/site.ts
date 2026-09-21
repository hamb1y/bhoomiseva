import type { Site } from "./types";
import type { Localized } from "../i18n/utils";
import { toSite, type ContentFile } from "./load";
import settings from "../../content/settings.json";

export const site: Site = toSite(settings as ContentFile);

export function pick(field: Localized, lang: "en" | "kn"): string {
  return typeof field === "string" ? field : ((lang === "kn" ? field.kn : field.en) ?? field.en);
}
