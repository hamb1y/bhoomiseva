import type { Blog } from "../types";

/**
 * Blogs, split by audience. Both kinds share the same shape and layout; only the
 * `kind` differs, which the site uses for routing, labelling and filtering.
 *
 * Intentionally empty until the organisation writes some through the CMS. Do not
 * invent donor or beneficiary posts.
 */
export const blogs: Blog[] = [];
