/**
 * Mapping from Payload documents to the site's content types.
 *
 * Shared by `scripts/pull-content.mjs` (build-time sync) and any future
 * preview/preview route, so there is exactly one definition of the shape.
 *
 * Raw documents are typed loosely on purpose: this module must not depend on
 * Payload's generated types, so the Astro build stays independent of the CMS.
 */
import type { Activity, Story, Program, Person, Update, Site, ImageFocal } from "../data/types";
import type { Localized } from "../i18n/utils";

export type RawDoc = Record<string, any>;
export type ResolveMedia = (media: any) => string | undefined;

/** A text field: `{ en, kn }` (locale=all) or a plain string. */
export function loc(value: any): Localized | undefined {
  if (value == null) return undefined;
  return value;
}

/** Pull the focal point off a Payload upload relationship. */
export function focal(media: any): ImageFocal | undefined {
  if (!media || typeof media !== "object") return undefined;
  const x = Number(media.focalX);
  const y = Number(media.focalY);
  if (Number.isNaN(x) || Number.isNaN(y)) return undefined;
  // Payload defaults to 50/50; only keep a deliberate crop.
  if (x === 50 && y === 50) return undefined;
  return { x, y };
}

/** Localized array `{ en: [...], kn: [...] }` -> `[T, ...]`. */
function zipLocalizedArray<T>(value: any, read: (item: any) => T): T[] {
  if (!value) return [];
  const en = value.en ?? [];
  const kn = value.kn ?? [];
  const len = Math.max(en.length, kn.length);
  return Array.from({ length: len }, (_, i) => read({ en: en[i] ?? {}, kn: kn[i] ?? {} }));
}

export function mapStory(d: RawDoc, resolveMedia: ResolveMedia): Story {
  const image = resolveMedia(d.image);
  const f = focal(d.image);
  return {
    slug: d.slug,
    program: d.program,
    ...(d.date ? { date: d.date } : {}),
    ...(d.period ? { period: loc(d.period) } : {}),
    location: loc(d.location),
    title: loc(d.title),
    summary: loc(d.summary),
    body: zipLocalizedArray<Localized>(d.body, (it) => ({
      en: it.en?.paragraph ?? "",
      kn: it.kn?.paragraph ?? it.en?.paragraph ?? "",
    })),
    ...(image ? { image } : {}),
    ...(f ? { imageFocal: f } : {}),
    ...(d.imageAlt ? { imageAlt: loc(d.imageAlt) } : {}),
    ...(d.image?.caption ? { imageCaption: loc(d.image.caption) } : {}),
    ...(d.quote?.text
      ? { quote: { text: loc(d.quote.text), attribution: loc(d.quote.attribution) } }
      : {}),
    ...(d.people?.length ? { people: d.people.map((p: any) => p.name) } : {}),
    ...(d.featured ? { featured: true } : {}),
  } as unknown as Story;
}

export function mapProgram(d: RawDoc, resolveMedia: ResolveMedia): Program {
  const image = resolveMedia(d.image);
  const f = focal(d.image);
  const gallery = (d.gallery ?? []).map((g: any) => resolveMedia(g.image)).filter(Boolean);
  return {
    id: d.key,
    accent: d.accent,
    kicker: loc(d.kicker),
    title: loc(d.title),
    summary: loc(d.summary),
    lede: loc(d.lede),
    activities: zipLocalizedArray<Activity>(d.activities, (it) => ({
      title: { en: it.en?.title ?? "", kn: it.kn?.title ?? it.en?.title ?? "" },
      body: { en: it.en?.body ?? "", kn: it.kn?.body ?? it.en?.body ?? "" },
    })),
    ...(image ? { image } : {}),
    ...(f ? { imageFocal: f } : {}),
    ...(d.imageAlt ? { imageAlt: loc(d.imageAlt) } : {}),
    ...(gallery.length ? { gallery } : {}),
  } as unknown as Program;
}

export function mapPerson(d: RawDoc, resolveMedia: ResolveMedia): Person {
  const photo = resolveMedia(d.photo);
  const f = focal(d.photo);
  return {
    name: d.name,
    role: loc(d.role),
    bio: loc(d.bio),
    ...(photo ? { photo } : {}),
    ...(f ? { photoFocal: f } : {}),
  } as unknown as Person;
}

export function mapUpdate(d: RawDoc): Update {
  return {
    ...(d.date ? { date: d.date } : {}),
    ...(d.period ? { period: loc(d.period) } : {}),
    title: loc(d.title),
    program: d.program,
    location: loc(d.location),
    kind: d.kind,
  } as Update;
}

export function mapSite(s: RawDoc): Site {
  const about = zipLocalizedArray<Localized>(s.about, (it) => ({
    en: it.en?.paragraph ?? "",
    kn: it.kn?.paragraph ?? it.en?.paragraph ?? "",
  }));
  return {
    name: s.name || "Bhoomi Seva",
    email: s.email,
    phone: s.phone,
    phoneHref: s.phoneHref || String(s.phone || "").replace(/\s/g, ""),
    whatsapp: s.whatsapp || "",
    socials: {
      facebook: s.socials?.facebook || "",
      instagram: s.socials?.instagram || "",
      whatsappGroup: s.socials?.whatsappGroup || "",
    },
    payment: {
      upi: s.payment?.upi || "",
      paytm: s.payment?.paytm || "",
      gpay: s.payment?.gpay || "",
      verified: Boolean(s.payment?.verified),
    },
    mission: loc(s.mission),
    vision: loc(s.vision),
    shortDescription: loc(s.shortDescription),
    about,
    credit: s.credit || "",
  } as unknown as Site;
}

/**
 * Fetch helpers for server-side use (preview, scripts). Returns raw docs.
 * `locale: all` yields `{ en, kn }` fields.
 */
export function payloadClient(baseUrl: string, apiKey?: string) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (apiKey) headers.Authorization = `users API-Key ${apiKey}`;

  const get = async (path: string) => {
    const res = await fetch(`${baseUrl}${path}`, { headers });
    if (!res.ok) throw new Error(`${path}: ${res.status} ${res.statusText}`);
    return res.json();
  };

  return {
    collections: async (slug: string, extra = "") =>
      (await get(`/api/${slug}?limit=500&depth=1&locale=all&draft=true${extra}`)).docs ?? [],
    global: (slug: string) => get(`/api/globals/${slug}?depth=1&locale=all&draft=true`),
    get,
  };
}
