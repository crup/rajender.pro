import { opensourceProjects } from "../data/site";
import type { APIContext } from "astro";

type MarkdownPost = {
  frontmatter: {
    slug: string;
    date: string;
    updated?: string;
  };
};

const posts = Object.values(
  import.meta.glob("../content/blog/*.md", { eager: true }),
) as MarkdownPost[];

const xmlEscape = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

export function GET({ site }: APIContext) {
  const siteUrl = site ?? new URL("https://rajender.pro");
  const staticRoutes = ["", "about/", "blog/", "contact/", "opensource/"].map((path) => ({
    path,
    lastmod: "2026-05-16",
  }));
  const blogRoutes = posts.map((post) => ({
    path: `blog/${post.frontmatter.slug}/`,
    lastmod: post.frontmatter.updated ?? post.frontmatter.date,
  }));
  const opensourceRoutes = opensourceProjects.map((project) => ({
    path: `opensource/${project.slug}/`,
    lastmod: "2026-05-16",
  }));
  const urls = [...staticRoutes, ...blogRoutes, ...opensourceRoutes]
    .map(
      ({ path, lastmod }) => `  <url>
    <loc>${xmlEscape(new URL(path, siteUrl).toString())}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
  </url>`,
    )
    .join("\n");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
    },
  });
}
