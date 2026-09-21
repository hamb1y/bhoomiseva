import type { Blog, BlogKind } from "./types";
import { toBlog, entriesOf, type ContentFile } from "./load";

const modules = import.meta.glob<ContentFile>("../../content/blogs/*.json", {
  eager: true,
  import: "default",
});

export const blogs: Blog[] = entriesOf(modules, toBlog);

export const blogsByKind = (kind: BlogKind) => blogs.filter((b) => b.kind === kind);

export const blogBySlug = (slug: string) => blogs.find((b) => b.slug === slug);
