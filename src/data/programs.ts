import type { Program } from "./types";
import { toProgram, entriesOf, type ContentFile } from "./load";

const modules = import.meta.glob<ContentFile>("../../content/programs/*.json", {
  eager: true,
  import: "default",
});

export const programs: Program[] = entriesOf(modules, toProgram);

export const programById = (id: string) => programs.find((p) => p.id === id);
