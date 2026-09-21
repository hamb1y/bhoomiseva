import type { CollectionConfig } from "payload";

export const Updates: CollectionConfig = {
  slug: "updates",
  admin: { useAsTitle: "title", defaultColumns: ["title", "date", "period", "program", "kind"] },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", localized: true, required: true },
    { name: "date", type: "text", admin: { description: "YYYY-MM or YYYY-MM-DD, if known." } },
    { name: "period", type: "text", localized: true },
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
