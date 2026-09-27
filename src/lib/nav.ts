import type { UIKey } from "../i18n/ui";

export interface NavItem {
  key: UIKey;
  href: string;
  /** Programme colour, for the dot beside a programme link. */
  accent?: "education" | "farmers" | "children";
  children?: NavItem[];
}

export const nav: NavItem[] = [
  {
    key: "nav.work",
    href: "/work",
    children: [
      { key: "nav.work.education", href: "/work/education", accent: "education" },
      { key: "nav.work.farmers", href: "/work/farmers-environment", accent: "farmers" },
      { key: "nav.work.children", href: "/work/children", accent: "children" },
    ],
  },
  { key: "nav.stories", href: "/stories" },
  { key: "nav.events", href: "/events" },
  {
    key: "nav.blogs",
    href: "/blogs",
    children: [
      { key: "nav.blogs.donors", href: "/blogs/donors" },
      { key: "nav.blogs.donees", href: "/blogs/donees" },
    ],
  },
  { key: "nav.about", href: "/about" },
  { key: "nav.involved", href: "/get-involved" },
];

/**
 * The footer carries the full set, plus Contact.
 */
export const footerNav: NavItem[] = [
  { key: "nav.work", href: "/work" },
  { key: "nav.stories", href: "/stories" },
  { key: "nav.events", href: "/events" },
  { key: "nav.blogs", href: "/blogs" },
  { key: "nav.about", href: "/about" },
  { key: "nav.involved", href: "/get-involved" },
  { key: "nav.contact", href: "/contact" },
];

/** Strip a locale prefix to get the locale-independent path. */
export function barePath(pathname: string): string {
  const stripped = pathname.replace(/^\/kn(?=\/|$)/, "");
  return stripped === "" ? "/" : stripped;
}
