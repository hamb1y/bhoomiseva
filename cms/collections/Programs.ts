import type { CollectionConfig } from "payload";

const SITE_URL = () => process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:4321";

export const Programs: CollectionConfig = {
  slug: "programs",
  labels: { singular: "Programme", plural: "Programmes" },
  admin: {
    useAsTitle: "title",
    group: "Content",
    description: "The three programme pages. There are normally exactly three.",
    preview: (doc) => {
      const path = doc?.key === "farmers" ? "farmers-environment" : doc?.key;
      return path ? `${SITE_URL()}/work/${path}` : null;
    },
  },
  access: { read: () => true },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            { name: "kicker", type: "text", localized: true, required: true },
            { name: "title", type: "text", localized: true, required: true },
            { name: "summary", type: "textarea", localized: true, required: true },
            { name: "lede", type: "textarea", localized: true, required: true },
          ],
        },
        {
          label: "Activities",
          fields: [
            {
              name: "activities",
              type: "array",
              localized: true,
              labels: { singular: "Activity", plural: "Activities" },
              fields: [
                { name: "title", type: "text", localized: true, required: true },
                { name: "body", type: "textarea", localized: true, required: true },
              ],
            },
          ],
        },
        {
          label: "Photos",
          fields: [
            { name: "image", type: "upload", relationTo: "media" },
            {
              name: "imageAlt",
              type: "text",
              localized: true,
              admin: { description: "Falls back to the media alt text." },
            },
            {
              name: "gallery",
              type: "array",
              admin: { description: "Extra photos shown at the bottom of the programme page." },
              fields: [{ name: "image", type: "upload", relationTo: "media", required: true }],
            },
          ],
        },
      ],
    },
    {
      name: "key",
      type: "select",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
        description: "Stable identifier used by the site. Do not change once set.",
      },
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
      admin: { position: "sidebar" },
      options: [
        { label: "Brand (clay)", value: "brand" },
        { label: "Education (turmeric)", value: "education" },
        { label: "Farmers (leaf)", value: "farmers" },
        { label: "Children (indigo)", value: "children" },
      ],
    },
  ],
};
