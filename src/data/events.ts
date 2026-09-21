import type { Entry } from "./types";
import { toEntry, entriesOf, type ContentFile } from "./load";

const modules = import.meta.glob<ContentFile>("../../content/events/*.json", {
  eager: true,
  import: "default",
});

export const events: Entry[] = entriesOf(modules, toEntry);

export const eventBySlug = (slug: string) => events.find((e) => e.slug === slug);
