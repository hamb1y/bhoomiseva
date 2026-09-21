import type { Update } from "./types";
import { updates as seed } from "./seed/updates";
import { updates as generated } from "./generated/updates";

export const updates: Update[] = generated.length > 0 ? generated : seed;
