import type { UIKey } from "../i18n/ui";

export interface NavItem {
  key: UIKey;
  href: string;
  children?: NavItem[];
}

export const nav: NavItem[] = [
  { key: "nav.home", href: "/" },
  {
    key: "nav.work",
    href: "/work",
    children: [
      { key: "nav.work.education", href: "/work/education" },
      { key: "nav.work.farmers", href: "/work/farmers-environment" },
      { key: "nav.work.children", href: "/work/children" },
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
  { key: "nav.contact", href: "/contact" },
];

/** Strip a locale prefix to get the locale-independent path. */
export function barePath(pathname: string): string {
  const stripped = pathname.replace(/^\/kn(?=\/|$)/, "");
  return stripped === "" ? "/" : stripped;
}
