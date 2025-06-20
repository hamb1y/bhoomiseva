# Bhoomi Seva Website v2

This is the second version of the website for Bhoomi Seva, a charity organization. This website aims to be modern, performant on any device, and easy to deploy and manage. 

## Structure and information
This website uses only Astro.js, minimal javascript and libs, and plain CSS to keep the file sizes low and to keep this site performant for all devices, including phones. This site in it's current state is only semi-dynamic, as to change it, while it is easier, you will have to add/edit files and push to GitHub. This issue is being worked on to make this site fully dynamic. 
```
.
├── astro.config.mjs
├── node_modules
│   └── astro -> .pnpm/astro@5.9.4_@types+node@24.0.3_rollup@4.43.0_typescript@5.8.3/node_modules/astro
├── package.json
├── pnpm-lock.yaml
├── public
│   ├── favicon.svg
│   ├── images
│   │   └── test.jpg
│   └── main.css
├── README.md
├── src
│   ├── components
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── IconCard.astro
│   │   ├── ImageCard.astro
│   │   ├── Layout.astro
│   │   └── ThemeSwitcher.astro
│   └── pages
│       ├── gallery.astro
│       └── index.astro
└── tsconfig.json

8 directories, 16 files

```
## How to run it:
While you can run and edit it on your local system, you can also go to https://bhoomisevaTesting.vercel.app to preview the latest version.

 - Step 1: Download and install pnpm and git on your device.

 - Step 2: Execute to download this on your local system:<hr>
 `git clone https://github.com/hamb1y/bhoomiseva.git && cd bhoomiseva && pnpm i`

 - Step 3: Execute this to test/run:<hr>
 `pnpm dev`

 That's it! The site should be up and running now, and should be accessible on https://localhost:4321