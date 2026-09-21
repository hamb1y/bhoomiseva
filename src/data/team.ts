import type { Person } from "./types";
import { team as seed } from "./seed/team";
import { team as generated } from "./generated/team";

export const team: Person[] = generated.length > 0 ? generated : seed;
