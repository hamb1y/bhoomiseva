/**
 * Content loading for Sveltia CMS.
 *
 * Sveltia is Git-based: every entry is a JSON file under `content/`, written in
 * its `single_file` i18n shape — `{ en: {...}, kn: {...} }`. Translatable fields
 * appear under both locale keys; everything else (slug, programme, image, order)
 * is stored once under the default locale.
 *
 * These helpers convert that on-disk shape into the site's `Localized` model
 * (`{ en, kn }` per field), so no view or component needs to know about it.
 *
 * Never edit `content/` by hand expecting the site to ignore it — it is the
 * source of truth.
 */
import type { Blog, Entry, ImageFocal, Person, Program, Site, Story } from "./types";
import type { Localized } from "../i18n/utils";

export interface ContentFile {
  en?: Record<string, any>;
  kn?: Record<string, any>;
}

/** Slug from the filename: content/stories/my-story.json -> my-story */
const slugFromPath = (path: string) =>
  path
    .split("/")
    .pop()!
    .replace(/\.json$/, "");

/** A translatable field -> `{ en, kn }`. */
function text(file: ContentFile, key: string): Localized | undefined {
  const en = file.en?.[key];
  const kn = file.kn?.[key];
  if (en == null && kn == null) return undefined;
  return typeof en === "string" ? { en, ...(kn == null ? {} : { kn }) } : (en as Localized);
}

/** A field shared across locales (slug, programme, image, order, …). */
function shared<T = any>(file: ContentFile, key: string): T | undefined {
  const value = file.en?.[key] ?? file.kn?.[key];
  return (value ?? undefined) as T | undefined;
}

/** A translatable array of strings -> `Localized[]`. */
function textList(file: ContentFile, key: string): Localized[] {
  const en = (file.en?.[key] ?? []) as any[];
  const kn = (file.kn?.[key] ?? []) as any[];
  return Array.from({ length: Math.max(en.length, kn.length) }, (_, i) => ({
    en: en[i] ?? "",
    ...(kn[i] == null ? {} : { kn: kn[i] }),
  }));
}

/** A translatable array of objects -> zipped pairs of `{ en, kn }` subtrees. */
function objectList<T>(file: ContentFile, key: string, make: (en: any, kn: any) => T): T[] {
  const en = (file.en?.[key] ?? []) as any[];
  const kn = (file.kn?.[key] ?? []) as any[];
  return Array.from({ length: Math.max(en.length, kn.length) }, (_, i) =>
    make(en[i] ?? {}, kn[i] ?? {}),
  );
}

const FOCAL: Record<string, ImageFocal | undefined> = {
  center: undefined,
  top: { x: 50, y: 0 },
  bottom: { x: 50, y: 100 },
  left: { x: 0, y: 50 },
  right: { x: 100, y: 50 },
};

const focal = (file: ContentFile, key = "image_position") =>
  FOCAL[shared<string>(file, key) ?? "center"];

const entriesOf = <T>(
  mods: Record<string, ContentFile>,
  make: (slug: string, file: ContentFile) => T,
): T[] =>
  Object.entries(mods)
    .map(([path, file]) => make(slugFromPath(path), file ?? {}))
    .filter(Boolean);

/** The quote object is a nested pair, so it needs its own reader. */
function quoteOf(file: ContentFile): { text: Localized; attribution: Localized } | undefined {
  const en = file.en?.quote;
  const kn = file.kn?.quote;
  if (!en?.text) return undefined;
  return {
    text: { en: en.text, ...(kn?.text == null ? {} : { kn: kn.text }) },
    attribution: {
      en: en.attribution ?? "",
      ...(kn?.attribution == null ? {} : { kn: kn.attribution }),
    },
  };
}

// ------------------------------------------------------------------ mappers ---

export function toStory(slug: string, file: ContentFile): Story {
  return {
    slug,
    program: shared(file, "program") ?? "education",
    ...(shared(file, "date") ? { date: shared<string>(file, "date") } : {}),
    ...(text(file, "period") ? { period: text(file, "period") } : {}),
    location: text(file, "location") ?? { en: "" },
    title: text(file, "title") ?? { en: "" },
    summary: text(file, "summary") ?? { en: "" },
    body: textList(file, "body"),
    ...(shared(file, "image") ? { image: shared<string>(file, "image") } : {}),
    ...(focal(file) ? { imageFocal: focal(file) } : {}),
    ...(text(file, "image_alt") ? { imageAlt: text(file, "image_alt") } : {}),
    ...(quoteOf(file) ? { quote: quoteOf(file) } : {}),
    ...(shared<any[]>(file, "people")?.length
      ? { people: shared<any[]>(file, "people")!.map((p) => p.name) }
      : {}),
    ...(shared(file, "featured") ? { featured: true } : {}),
  } as Story;
}

export function toEntry(slug: string, file: ContentFile): Entry {
  return {
    slug,
    ...(shared(file, "date") ? { date: shared<string>(file, "date") } : {}),
    ...(text(file, "period") ? { period: text(file, "period") } : {}),
    ...(text(file, "location") ? { location: text(file, "location") } : {}),
    ...(shared(file, "program") ? { program: shared(file, "program") } : {}),
    ...(shared(file, "author") ? { author: shared<string>(file, "author") } : {}),
    ...(text(file, "author_role") ? { authorRole: text(file, "author_role") } : {}),
    title: text(file, "title") ?? { en: "" },
    summary: text(file, "summary") ?? { en: "" },
    body: textList(file, "body"),
    ...(shared(file, "image") ? { image: shared<string>(file, "image") } : {}),
    ...(focal(file) ? { imageFocal: focal(file) } : {}),
    ...(text(file, "image_alt") ? { imageAlt: text(file, "image_alt") } : {}),
    ...(quoteOf(file) ? { quote: quoteOf(file) } : {}),
    ...(shared<any[]>(file, "people")?.length
      ? { people: shared<any[]>(file, "people")!.map((p) => p.name) }
      : {}),
    ...(shared(file, "featured") ? { featured: true } : {}),
  } as unknown as Entry;
}

export function toBlog(slug: string, file: ContentFile): Blog {
  return { ...toEntry(slug, file), kind: shared(file, "kind") ?? "donor" } as Blog;
}

export function toProgram(slug: string, file: ContentFile): Program {
  return {
    id: shared(file, "key") ?? slug,
    accent: shared(file, "accent") ?? "brand",
    kicker: text(file, "kicker") ?? { en: "" },
    title: text(file, "title") ?? { en: "" },
    summary: text(file, "summary") ?? { en: "" },
    lede: text(file, "lede") ?? { en: "" },
    activities: objectList(file, "activities", (en, kn) => ({
      title: { en: en.title ?? "", ...(kn.title == null ? {} : { kn: kn.title }) },
      body: { en: en.body ?? "", ...(kn.body == null ? {} : { kn: kn.body }) },
    })),
    ...(shared(file, "image") ? { image: shared<string>(file, "image") } : {}),
    ...(focal(file) ? { imageFocal: focal(file) } : {}),
    ...(text(file, "image_alt") ? { imageAlt: text(file, "image_alt") } : {}),
    ...(shared<any[]>(file, "gallery")?.length
      ? {
          gallery: shared<any[]>(file, "gallery")!
            .map((g) => g.image)
            .filter(Boolean),
        }
      : {}),
  } as unknown as Program;
}

export function toPerson(slug: string, file: ContentFile): Person {
  return {
    name: shared(file, "name") ?? slug,
    role: text(file, "role") ?? { en: "" },
    bio: text(file, "bio") ?? { en: "" },
    ...(shared(file, "photo") ? { photo: shared<string>(file, "photo") } : {}),
    ...(focal(file, "photo_position") ? { photoFocal: focal(file, "photo_position") } : {}),
  } as Person;
}

export function toSite(file: ContentFile): Site {
  const socials = shared<any>(file, "socials") ?? {};
  const payment = shared<any>(file, "payment") ?? {};
  return {
    name: shared(file, "name") ?? "Bhoomi Seva",
    email: shared<string>(file, "email") ?? "",
    phone: shared<string>(file, "phone") ?? "",
    phoneHref: shared<string>(file, "phone_href") ?? "",
    whatsapp: shared<string>(file, "whatsapp") ?? "",
    socials: {
      facebook: socials.facebook ?? "",
      instagram: socials.instagram ?? "",
      whatsappGroup: socials.whatsapp_group ?? "",
    },
    payment: {
      upi: payment.upi ?? "",
      paytm: payment.paytm ?? "",
      gpay: payment.gpay ?? "",
      verified: Boolean(payment.verified),
    },
    mission: text(file, "mission") ?? { en: "" },
    vision: text(file, "vision") ?? { en: "" },
    shortDescription: text(file, "short_description") ?? { en: "" },
    about: textList(file, "about"),
    credit: shared<string>(file, "credit") ?? "",
  } as Site;
}

export { entriesOf };
