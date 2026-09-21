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

export const Stories: CollectionConfig = {
  slug: "stories",
  labels: { singular: "Story", plural: "Stories" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "program", "date", "_status"],
    defaultSort: "-date",
    group: "Content",
    description:
      "Add a story, attach a photo, and publish. Saved stories appear on the site after the next content sync.",
    preview: (doc) => (doc?.slug ? `${SITE_URL()}/stories/${doc.slug}` : null),
  },
  versions: { drafts: true },
  access: { read: () => true },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Story",
          fields: [
            {
              name: "title",
              type: "text",
              localized: true,
              required: true,
              admin: { description: "One clear sentence. Avoid slogans." },
            },
            { name: "summary", type: "textarea", localized: true, required: true },
            {
              name: "body",
              type: "array",
              localized: true,
              labels: { singular: "Paragraph", plural: "Paragraphs" },
              admin: { description: "One paragraph per row. Four to six reads well." },
              fields: [{ name: "paragraph", type: "textarea", required: true }],
            },
            {
              name: "quote",
              type: "group",
              admin: {
                description: "A testimonial or letter reproduced from the source. Optional.",
              },
              fields: [
                { name: "text", type: "textarea", localized: true },
                { name: "attribution", type: "text", localized: true },
              ],
            },
            {
              name: "people",
              type: "array",
              admin: { description: "Names mentioned in the story. Optional." },
              fields: [{ name: "name", type: "text", required: true }],
            },
          ],
        },
        {
          label: "Photo",
          fields: [
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              admin: {
                description:
                  "Upload any image or pick one already in the library. Set the focal point on the image itself.",
              },
            },
            {
              name: "imageAlt",
              type: "text",
              localized: true,
              admin: { description: "What is in the photo. Falls back to the media alt text." },
            },
          ],
        },
      ],
    },
    // Sidebar
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "URL address. Left blank, it is generated from the title.",
      },
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
      admin: {
        position: "sidebar",
        description: "YYYY-MM or YYYY-MM-DD. Leave blank if the date is unknown.",
      },
    },
    {
      name: "period",
      type: "text",
      localized: true,
      admin: {
        position: "sidebar",
        description: "Used when there is no exact date, e.g. “2021–22 academic year”.",
      },
    },
    {
      name: "location",
      type: "text",
      localized: true,
      required: true,
      admin: { position: "sidebar", description: "Village, school or district." },
    },
    { name: "featured", type: "checkbox", defaultValue: false, admin: { position: "sidebar" } },
  ],
};
