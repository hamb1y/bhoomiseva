import type { CollectionConfig } from "payload";

const SITE_URL = () => process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:4321";

export const Team: CollectionConfig = {
  slug: "team",
  labels: { singular: "Person", plural: "People" },
  admin: {
    useAsTitle: "name",
    group: "About",
    defaultColumns: ["name", "role", "order"],
    defaultSort: "order",
    description: "The people listed on the About page.",
    preview: () => `${SITE_URL()}/about`,
  },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", localized: true, required: true },
    { name: "bio", type: "textarea", localized: true, required: true },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      admin: { description: "A square portrait works best. Set the focal point on the image." },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar", description: "Lower numbers appear first." },
    },
  ],
};
