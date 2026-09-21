import type { CollectionConfig } from "payload";

const SITE_URL = () => process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:4321";

export const Updates: CollectionConfig = {
  slug: "updates",
  labels: { singular: "Update", plural: "Updates" },
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["title", "date", "period", "program", "kind"],
    description: "Short dated events, shown as a timeline on the Stories page.",
    preview: () => `${SITE_URL()}/stories`,
  },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", localized: true, required: true },
    {
      name: "date",
      type: "text",
      admin: { description: "YYYY-MM or YYYY-MM-DD, if known." },
    },
    {
      name: "period",
      type: "text",
      localized: true,
      admin: { description: "Used when there is no date, e.g. “Balipadyami”." },
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
    { name: "location", type: "text", localized: true, required: true },
    {
      name: "kind",
      type: "select",
      required: true,
      defaultValue: "event",
      options: [
        { label: "Event", value: "event" },
        { label: "Donation", value: "donation" },
        { label: "Milestone", value: "milestone" },
        { label: "Initiative", value: "initiative" },
      ],
    },
  ],
};
