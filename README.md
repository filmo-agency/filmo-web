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
| `npm run strapi:cache`    | Download Strapi API responses to local JSON      |

## Strapi Local Cache

This project can run against a local JSON snapshot to reduce Strapi Cloud API usage.

1. Generate the snapshot:

```sh
npm run strapi:cache
```

2. Start dev mode using local data only:

```powershell
$env:STRAPI_DATA_MODE='local'
npm run dev
```

Available modes:

- `STRAPI_DATA_MODE=remote` (default): always request Strapi API
- `STRAPI_DATA_MODE=local`: only use `src/data/strapi-cache.json`
- `STRAPI_DATA_MODE=hybrid`: local first, then fallback to Strapi API

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
