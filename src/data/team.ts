import type { Person } from "./types";
import { toPerson, entriesOf, type ContentFile } from "./load";

const modules = import.meta.glob<ContentFile>("../../content/team/*.json", {
  eager: true,
  import: "default",
});

export const team: Person[] = entriesOf(modules, toPerson).sort((a, b) => {
  const order = (p: Person) => (typeof (p as any).order === "number" ? (p as any).order : 0);
  return order(a) - order(b);
});
