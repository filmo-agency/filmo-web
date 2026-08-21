# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Local Content

The portfolio is managed with Astro Content Collections:

- `src/content/schools`: school metadata and promotion order
- `src/content/proms`: promotion metadata and its media directory
- `public/media`: original media files, organized by school and promotion

The site builds entirely from these local files and does not require Strapi or a
content API.

Promotion galleries are discovered automatically from each entry's `mediaPath`.
Gallery files must start with their numeric order (`01.webp`, `02.webp`,
`27-cover.webp`, etc.). A standalone `cover.webp` remains available as a cover
but is not added to the gallery automatically.

## Local Content Admin

The local dashboard now lives in the sibling project `../filmo-admin`. This
keeps its React, shadcn/Radix and server dependencies out of the public site.

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
