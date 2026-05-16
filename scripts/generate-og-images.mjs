import { mkdir, readdir, readFile, rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outDir = path.join(root, "public", "og");
const blogDir = path.join(root, "src", "content", "blog");
const siteData = await readFile(path.join(root, "src", "data", "site.ts"), "utf8");

const sizes = {
  og: { width: 1200, height: 630, suffix: "" },
  twitter: { width: 1200, height: 675, suffix: "-twitter" },
  square: { width: 1080, height: 1080, suffix: "-square" },
};

const staticPages = [
  {
    slug: "home",
    section: "rajender.pro",
    title: "Rajender Joshi",
    subtitle: "AI-native founder-engineer building practical AI systems, durable software, and sharper workflows.",
  },
  {
    slug: "about",
    section: "about",
    title: "Built close to the problem",
    subtitle: "Engineering leadership, AI systems, product architecture, and operating judgment.",
  },
  {
    slug: "blog",
    section: "blog",
    title: "Deep dives from the build bench",
    subtitle: "Opensource notes on iframe protocols, timer lifecycles, and AI-agent telemetry.",
  },
  {
    slug: "opensource",
    section: "opensource",
    title: "Small tools for recurring engineering problems",
    subtitle: "Port, react-timer-hook, and runrate: narrow packages built from real workflow friction.",
  },
  {
    slug: "contact",
    section: "contact",
    title: "Reach me directly",
    subtitle: "Practical AI, durable software, sharper workflows. Built with engineering judgment.",
  },
];

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const extractFrontmatter = (source) => {
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  return Object.fromEntries(
    match[1]
      .split("\n")
      .map((line) => line.match(/^([a-zA-Z0-9_-]+):\s*"?([^"]*)"?$/))
      .filter(Boolean)
      .map(([, key, value]) => [key, value.trim()]),
  );
};

const extractOssProjects = () => {
  const block = siteData.match(/export const ossProjects = \[([\s\S]*?)\n\];/);
  if (!block) return [];
  return [...block[1].matchAll(/{\n\s+slug: "([^"]+)",\n\s+name: "([^"]+)",[\s\S]*?summary:\n\s+"([^"]+)"/g)].map(
    ([, slug, name, summary]) => ({
      slug,
      section: "opensource",
      title: name,
      subtitle: summary,
    }),
  );
};

const wrapText = (text, maxChars, maxLines) => {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
    if (lines.length === maxLines) break;
  }
  if (line && lines.length < maxLines) lines.push(line);
  if (words.join(" ").length > lines.join(" ").length) {
    lines[lines.length - 1] = `${lines.at(-1).replace(/[.,;:!?-]*$/, "")}...`;
  }
  return lines;
};

const renderSvg = ({ width, height, section, title, subtitle }) => {
  const isSquare = width === height;
  const margin = isSquare ? 82 : 86;
  const titleSize = isSquare ? 78 : 74;
  const subtitleSize = isSquare ? 33 : 31;
  const maxTitleChars = isSquare ? 18 : 28;
  const maxSubtitleChars = isSquare ? 38 : 58;
  const titleLines = wrapText(title, maxTitleChars, 4);
  const subtitleLines = wrapText(subtitle, maxSubtitleChars, isSquare ? 5 : 3);
  const titleY = isSquare ? 315 : 245;
  const titleGap = titleSize * 1.08;
  const subtitleY = titleY + titleLines.length * titleGap + 42;
  const subtitleGap = subtitleSize * 1.45;
  const footerY = height - margin + (isSquare ? 0 : 24);
  const dividerY = footerY - 44;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#0a0a0a"/>
  <circle cx="${width - margin - 34}" cy="${margin + 26}" r="28" fill="#ffffff"/>
  <text x="${width - margin - 44}" y="${margin + 39}" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="700" fill="#0a0a0a">r</text>
  <text x="${margin}" y="${margin + 10}" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" letter-spacing="4" fill="#c9c9c9">${escapeHtml(section.toUpperCase())}</text>
  ${titleLines
    .map(
      (line, index) =>
        `<text x="${margin}" y="${titleY + index * titleGap}" font-family="Arial, Helvetica, sans-serif" font-size="${titleSize}" font-weight="700" fill="#ffffff">${escapeHtml(line)}</text>`,
    )
    .join("\n  ")}
  ${subtitleLines
    .map(
      (line, index) =>
        `<text x="${margin}" y="${subtitleY + index * subtitleGap}" font-family="Arial, Helvetica, sans-serif" font-size="${subtitleSize}" font-weight="400" fill="#d7d7d7">${escapeHtml(line)}</text>`,
    )
    .join("\n  ")}
  <line x1="${margin}" y1="${dividerY}" x2="${width - margin}" y2="${dividerY}" stroke="#2b2b2b" stroke-width="2"/>
  <text x="${margin}" y="${footerY}" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#b8b8b8">Rajender Joshi</text>
  <text x="${width - margin}" y="${footerY}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#b8b8b8">rajender.pro</text>
</svg>`;
};

const renderImageSet = async (folder, slug, data) => {
  const targetDir = path.join(outDir, folder);
  await mkdir(targetDir, { recursive: true });
  for (const { width, height, suffix } of Object.values(sizes)) {
    const svg = renderSvg({ width, height, ...data });
    await sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: true }).toFile(path.join(targetDir, `${slug}${suffix}.png`));
  }
};

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

for (const page of staticPages) {
  await renderImageSet("static", page.slug, page);
}

for (const file of await readdir(blogDir)) {
  if (!file.endsWith(".md")) continue;
  const frontmatter = extractFrontmatter(await readFile(path.join(blogDir, file), "utf8"));
  if (!frontmatter.slug) continue;
  await renderImageSet("blog", frontmatter.slug, {
    section: frontmatter.category || "blog",
    title: frontmatter.title,
    subtitle: frontmatter.excerpt,
  });
}

for (const project of extractOssProjects()) {
  await renderImageSet("opensource", project.slug, project);
}

console.log("generated OG images");
