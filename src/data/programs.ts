import type { Program } from "./types";
import { programs as seed } from "./seed/programs";
import { programs as generated } from "./generated/programs";

export const programs: Program[] = generated.length > 0 ? generated : seed;

export const programById = (id: string) => programs.find((p) => p.id === id);
