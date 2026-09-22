import type { Person } from "./types";
import { toPerson, entriesOf, type ContentFile } from "./load";

const modules = import.meta.glob<ContentFile>("../../content/team/*.json", {
  eager: true,
  import: "default",
});

export const team: Person[] = entriesOf(modules, toPerson).sort(
  (a, b) => (a.order ?? 0) - (b.order ?? 0),
);
