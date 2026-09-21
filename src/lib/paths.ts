import type { ProgramId } from "../data/types";

/** Canonical path for a programme page (farmers uses a longer slug). */
export function programHref(id: ProgramId): string {
  return id === "farmers" ? "/work/farmers-environment" : `/work/${id}`;
}
