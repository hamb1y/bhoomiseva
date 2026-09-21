import type { CollectionConfig } from "payload";

export const Programs: CollectionConfig = {
  slug: "programs",
  admin: { useAsTitle: "title" },
  access: { read: () => true },
  fields: [
    {
      name: "key",
      type: "select",
      required: true,
      unique: true,
      admin: { description: "Stable identifier used by the site: education | farmers | children." },
      options: [
        { label: "Education", value: "education" },
        { label: "Farmers & Environment", value: "farmers" },
        { label: "Children & Community", value: "children" },
      ],
    },
    {
      name: "accent",
      type: "select",
      required: true,
      defaultValue: "brand",
      options: [
        { label: "Brand (clay)", value: "brand" },
        { label: "Education (turmeric)", value: "education" },
        { label: "Farmers (leaf)", value: "farmers" },
        { label: "Children (indigo)", value: "children" },
      ],
    },
    { name: "kicker", type: "text", localized: true, required: true },
    { name: "title", type: "text", localized: true, required: true },
    { name: "summary", type: "textarea", localized: true, required: true },
    { name: "lede", type: "textarea", localized: true, required: true },
    {
      name: "activities",
      type: "array",
      localized: true,
      fields: [
        { name: "title", type: "text", localized: true, required: true },
        { name: "body", type: "textarea", localized: true, required: true },
      ],
    },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "imageAlt", type: "text", localized: true },
    {
      name: "gallery",
      type: "array",
      fields: [{ name: "image", type: "upload", relationTo: "media", required: true }],
    },
  ],
};
