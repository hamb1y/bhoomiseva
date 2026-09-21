import type { CollectionConfig } from "payload";

const SITE_URL = () => process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:4321";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);

/**
 * Donor and donee blogs are the same thing with a `kind` flag. The site splits
 * them by the Blogs dropdown, and both share one layout.
 */
export const Blogs: CollectionConfig = {
  slug: "blogs",
  labels: { singular: "Blog post", plural: "Blog posts" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "kind", "author", "date", "_status"],
    defaultSort: "-date",
    group: "Content",
    description:
      "Writing from people involved in the work. Choose whether it is a donor blog or a donee blog.",
    preview: (doc) =>
      doc?.slug && doc?.kind
        ? `${SITE_URL()}/blogs/${doc.kind === "donor" ? "donors" : "donees"}/${doc.slug}`
        : null,
  },
  versions: { drafts: true },
  access: { read: () => true },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Post",
          fields: [
            { name: "title", type: "text", localized: true, required: true },
            { name: "summary", type: "textarea", localized: true, required: true },
            {
              name: "body",
              type: "array",
              localized: true,
              labels: { singular: "Paragraph", plural: "Paragraphs" },
              fields: [{ name: "paragraph", type: "textarea", required: true }],
            },
          ],
        },
        {
          label: "Photo",
          fields: [
            { name: "image", type: "upload", relationTo: "media" },
            { name: "imageAlt", type: "text", localized: true },
          ],
        },
      ],
    },
    {
      name: "kind",
      type: "select",
      required: true,
      defaultValue: "donor",
      admin: {
        position: "sidebar",
        description:
          "Donor blog = written by a supporter. Donee blog = written by someone we work with.",
      },
      options: [
        { label: "Donor blog", value: "donor" },
        { label: "Donee blog", value: "donee" },
      ],
    },
    { name: "author", type: "text", required: true, admin: { position: "sidebar" } },
    {
      name: "authorRole",
      type: "text",
      localized: true,
      admin: { position: "sidebar", description: "Optional, e.g. “Volunteer teacher”." },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { position: "sidebar", description: "Left blank, it is generated from the title." },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (typeof value === "string" && value.trim()) return value.trim();
            const title = typeof data?.title === "string" ? data.title : data?.title?.en;
            return title ? slugify(title) : value;
          },
        ],
      },
    },
    { name: "date", type: "text", admin: { position: "sidebar", description: "YYYY-MM-DD" } },
    { name: "location", type: "text", localized: true, admin: { position: "sidebar" } },
    { name: "featured", type: "checkbox", defaultValue: false, admin: { position: "sidebar" } },
  ],
};
