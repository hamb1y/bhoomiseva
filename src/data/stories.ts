import type { Story } from "./types";
import { toStory, entriesOf, type ContentFile } from "./load";

/** Content files are the source of truth — see public/admin/config.yml. */
const modules = import.meta.glob<ContentFile>("../../content/stories/*.json", {
  eager: true,
  import: "default",
});

export const stories: Story[] = entriesOf(modules, toStory);

export const featuredStory = stories.find((s) => s.featured) ?? stories[0];

export const storyBySlug = (slug: string) => stories.find((s) => s.slug === slug);

export const storiesByProgram = (program: string) => stories.filter((s) => s.program === program);
