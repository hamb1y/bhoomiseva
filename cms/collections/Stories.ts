import type { CollectionConfig } from "payload";

export const Stories: CollectionConfig = {
  slug: "stories",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "program", "date", "featured", "slug"],
  },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", localized: true, required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { description: "URL segment, e.g. sunita-kurubarahalli-doddi" },
    },
    {
      name: "program",
      type: "select",
      required: true,
      options: [
        { label: "Education", value: "education" },
        { label: "Farmers & Environment", value: "farmers" },
        { label: "Children & Community", value: "children" },
      ],
    },
    {
      name: "date",
      type: "text",
      admin: { description: "YYYY-MM or YYYY-MM-DD. Leave blank if the date is unknown." },
    },
    {
      name: "period",
      type: "text",
      localized: true,
      admin: { description: "Used when no exact date is known, e.g. “2021–22 academic year”." },
    },
    { name: "location", type: "text", localized: true, required: true },
    { name: "summary", type: "textarea", localized: true, required: true },
    {
      name: "body",
      type: "array",
      localized: true,
      labels: { singular: "Paragraph", plural: "Paragraphs" },
      fields: [{ name: "paragraph", type: "textarea", required: true }],
    },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "imageAlt", type: "text", localized: true },
    {
      name: "quote",
      type: "group",
      admin: { description: "A testimonial or letter reproduced from the source." },
      fields: [
        { name: "text", type: "textarea", localized: true },
        { name: "attribution", type: "text", localized: true },
      ],
    },
    {
      name: "people",
      type: "array",
      fields: [{ name: "name", type: "text", required: true }],
    },
    { name: "featured", type: "checkbox", defaultValue: false },
  ],
};
