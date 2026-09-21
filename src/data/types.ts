import type { Localized } from "../i18n/utils";

export type ProgramId = "education" | "farmers" | "children";
export type Accent = "education" | "farmers" | "children" | "brand";

export interface Activity {
  title: Localized;
  body: Localized;
}

export interface Program {
  id: ProgramId;
  accent: Accent;
  kicker: Localized;
  title: Localized;
  summary: Localized;
  lede: Localized;
  activities: Activity[];
  image?: string;
  imageAlt?: Localized;
  gallery?: string[];
}

export interface Story {
  slug: string;
  /** ISO date where the source documents one. */
  date?: string;
  /** Human period label when only an academic year / season is known. */
  period?: Localized;
  location: Localized;
  program: ProgramId;
  title: Localized;
  summary: Localized;
  body: Localized[];
  image?: string;
  imageAlt?: Localized;
  /** A first-person testimonial or letter reproduced from the source. */
  quote?: {
    text: Localized;
    attribution: Localized;
  };
  people?: string[];
  featured?: boolean;
}

export interface Person {
  name: string;
  role: Localized;
  bio: Localized;
  photo?: string;
}

export interface Update {
  /** ISO date where documented; omit when only a period is known. */
  date?: string;
  period?: Localized;
  title: Localized;
  program: ProgramId;
  location: Localized;
  kind: "event" | "donation" | "milestone" | "initiative";
}
