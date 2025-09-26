# Repository Guidelines

## Project Structure & Module Organization
BhoomiSeva runs on Astro 5. Source lives in `src/`. Shared UI sits in `src/components` (PascalCase `.astro` files with paired CSS islands when needed). Route-driven pages live under `src/pages`; each folder creates a route, so prefer `pages/about/index.astro` for nested paths. Static assets, Decap CMS bundle, and primary stylesheet stay in `public/` (`public/main.css`, fonts, logos, and `/admin` for CMS). Configuration files such as `astro.config.mjs` and `tsconfig.json` are at the root; keep infrastructure tweaks there rather than inline overrides.

## Build, Test, and Development Commands
- `npm install` to sync dependencies (pnpm works, but npm is guaranteed in CI).
- `npm run dev` launches Astro at `http://localhost:4321` with hot reload.
- `npm run build` produces the static output in `dist/`; run before publishing.
- `npm run preview` serves the production build for smoke tests.

## Coding Style & Naming Conventions
Indent Astro templates with four spaces; align HTML attributes and front-matter blocks as in existing components. Use PascalCase for component filenames, kebab-case for CSS classes, and double quotes for imports/strings. Centralize global styles in `public/main.css`; scope component styles with `<style>` blocks when the selector only applies locally. When adding configuration, prefer ESM modules and keep comments terse.

## Testing Guidelines
The project currently relies on manual verification. Whenever you add significant behavior, document the manual test steps in your PR and run `npm run build` to catch Astro compiler errors. If you introduce automated tests, use the Astro testing tools (`@astrojs/test-runner`) and place specs adjacent to the feature (e.g., `Component.test.mjs`), keeping descriptive `should...` names.

## Commit & Pull Request Guidelines
Write commits in the imperative mood (`feat: add alumni gallery filter`). Group related work together; avoid large “misc fixes” commits. Pull requests should include: a concise summary, screenshots or URLs for visual changes, manual test notes, and linked Netlify/issue references. Flag CMS or Identity impacts, especially changes beneath `public/admin/`. Ensure the branch rebases cleanly before requesting review.

## CMS & Identity Notes
Decap CMS lives at `public/admin/`; update `config.yml` when changing content structure and validate it with `npm run build`. Netlify Identity settings are remote; never commit secrets. Use placeholder keys in config files and document any required environment variables in the PR.
