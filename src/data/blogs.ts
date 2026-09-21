import type { Blog, BlogKind } from "./types";
import { blogs as seed } from "./seed/blogs";
import { blogs as generated } from "./generated/blogs";

export const blogs: Blog[] = generated.length > 0 ? generated : seed;

export const blogsByKind = (kind: BlogKind) => blogs.filter((b) => b.kind === kind);

export const blogBySlug = (slug: string) => blogs.find((b) => b.slug === slug);
