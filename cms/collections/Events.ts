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

export const Events: CollectionConfig = {
  slug: "events",
  labels: { singular: "Event", plural: "Events" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "program", "date", "_status"],
    defaultSort: "-date",
    group: "Content",
    description:
      "Short dated records of things that happened — training, distributions, donations. For longer narratives use Stories instead.",
    preview: (doc) => (doc?.slug ? `${SITE_URL()}/events/${doc.slug}` : null),
  },
  versions: { drafts: true },
  access: { read: () => true },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Event",
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
            {
              name: "people",
              type: "array",
              fields: [{ name: "name", type: "text", required: true }],
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
    {
      name: "program",
      type: "select",
      required: true,
      defaultValue: "education",
      admin: { position: "sidebar" },
      options: [
        { label: "Education", value: "education" },
        { label: "Farmers & Environment", value: "farmers" },
        { label: "Children & Community", value: "children" },
      ],
    },
    {
      name: "date",
      type: "text",
      admin: { position: "sidebar", description: "YYYY-MM or YYYY-MM-DD." },
    },
    {
      name: "period",
      type: "text",
      localized: true,
      admin: { position: "sidebar", description: "Used when there is no exact date." },
    },
    {
      name: "location",
      type: "text",
      localized: true,
      required: true,
      admin: { position: "sidebar" },
    },
  ],
};
