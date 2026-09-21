import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: { read: () => true },
  admin: {
    useAsTitle: "filename",
    description:
      "Upload any image. After uploading, drag the focal point on the preview to choose what stays visible when the site crops the image to 3:2 or 4:3.",
  },
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*"],
    // Interactive editing in the admin: crop + focal point.
    focalPoint: true,
    crop: true,
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "card", width: 800, height: 600, position: "centre" },
      { name: "wide", width: 1600 },
    ],
    adminThumbnail: "card",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      localized: true,
      admin: {
        description:
          "Describe the image for screen readers and for anyone whose image fails to load.",
      },
    },
    {
      name: "caption",
      type: "text",
      localized: true,
      admin: { description: "Shown under the image on the site. Optional." },
    },
    {
      name: "credit",
      type: "text",
      admin: { description: "Photographer or source. Optional." },
    },
  ],
};
