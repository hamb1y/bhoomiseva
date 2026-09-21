import type { Story } from "./types";
import { stories as seed } from "./seed/stories";
import { stories as generated } from "./generated/stories";

/**
 * Content resolution: Payload-synced content wins; otherwise the hand-written
 * seed is used so the site always builds, even with no CMS running.
 */
export const stories: Story[] = generated.length > 0 ? generated : seed;

export const featuredStory = stories.find((s) => s.featured) ?? stories[0];

export const storyBySlug = (slug: string) => stories.find((s) => s.slug === slug);

export const storiesByProgram = (program: string) => stories.filter((s) => s.program === program);
