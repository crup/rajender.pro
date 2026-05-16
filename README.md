# rajender.pro

Static personal site for `https://rajender.pro`.

## Stack

- Bun
- Astro static site generation
- UnoCSS utilities
- Markdown for blog posts
- GitHub Pages deployment

The site is intentionally built without client-side JavaScript, remote fonts, analytics, or forms. Syntax highlighting is build-time only through `rehype-highlight`, with a tiny local CSS token style.

## Commands

```sh
bun install
bun run dev
bun run build
```

## Deployment

GitHub Actions builds the Astro site and deploys `dist/` to GitHub Pages. The `public/CNAME` file sets the custom domain to `rajender.pro`.
