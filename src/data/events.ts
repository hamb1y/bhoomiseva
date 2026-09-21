import type { Entry } from "./types";
import { events as seed } from "./seed/events";
import { events as generated } from "./generated/events";

export const events: Entry[] = generated.length > 0 ? generated : seed;

export const eventBySlug = (slug: string) => events.find((e) => e.slug === slug);
