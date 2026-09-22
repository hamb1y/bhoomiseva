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
  imageCaption?: Localized;
  imageFocal?: ImageFocal;
  gallery?: string[];
}

/** Payload focal point, as percentages (0–100). */
export interface ImageFocal {
  x: number;
  y: number;
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
  imageCaption?: Localized;
  imageFocal?: ImageFocal;
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
  photoFocal?: ImageFocal;
  /** Sort order on the About page; lower first. */
  order?: number;
}

/**
 * A generic dated entry, used by events and blogs.
 * Stories keep their own richer shape (programme narrative + testimonial).
 */
export interface Entry {
  slug: string;
  title: Localized;
  summary: Localized;
  body: Localized[];
  date?: string;
  period?: Localized;
  location?: Localized;
  program?: ProgramId;
  author?: string;
  authorRole?: Localized;
  image?: string;
  imageAlt?: Localized;
  imageFocal?: ImageFocal;
  quote?: {
    text: Localized;
    attribution: Localized;
  };
  people?: string[];
  featured?: boolean;
}

export type BlogKind = "donor" | "donee";
export type Blog = Entry & { kind: BlogKind };

export interface Site {
  name: string;
  email: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  socials: { facebook: string; instagram: string; whatsappGroup: string };
  payment: { upi: string; paytm: string; gpay: string; verified: boolean };
  mission: Localized;
  vision: Localized;
  shortDescription: Localized;
  about: Localized[];
  credit: string;
  creditUrl?: string;
}
