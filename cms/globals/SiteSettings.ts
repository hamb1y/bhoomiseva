import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", defaultValue: "Bhoomi Seva" },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text", required: true },
    { name: "phoneHref", type: "text", admin: { description: "Digits only, e.g. +919900103178" } },
    { name: "whatsapp", type: "text" },
    {
      name: "socials",
      type: "group",
      fields: [
        { name: "facebook", type: "text" },
        { name: "instagram", type: "text" },
        { name: "whatsappGroup", type: "text" },
      ],
    },
    {
      name: "payment",
      type: "group",
      fields: [
        { name: "upi", type: "text" },
        { name: "paytm", type: "text" },
        { name: "gpay", type: "text" },
        {
          name: "verified",
          type: "checkbox",
          defaultValue: false,
          admin: { description: "Tick only once the payment details have been confirmed current." },
        },
      ],
    },
    { name: "mission", type: "textarea", localized: true },
    { name: "vision", type: "textarea", localized: true },
    { name: "shortDescription", type: "textarea", localized: true },
    {
      name: "about",
      type: "array",
      localized: true,
      fields: [{ name: "paragraph", type: "textarea", required: true }],
    },
    { name: "credit", type: "text" },
  ],
};
