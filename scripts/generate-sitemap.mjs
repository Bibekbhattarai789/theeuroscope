
import fs from "node:fs";
import path from "node:path";

const articlesFile = path.resolve("src/data/articles.js");
const outputFile = path.resolve("public/sitemap.xml");

const source = fs.readFileSync(articlesFile, "utf8");

const slugs = [
  ...source.matchAll(/\bslug\s*:\s*["']([^"']+)["']/g),
].map((match) => match[1]);

const uniqueSlugs = [...new Set(slugs)];

const baseUrl = "https://www.euroscope.site";

const staticPages = [
  "/",
  "/about",
  "/contact",
  "/privacy",
  "/editorial-policy",
];

const urls = [
  ...staticPages,
  ...uniqueSlugs.map((slug) => `/article/${slug}`),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((url) => `  <url><loc>${baseUrl}${url}</loc></url>`)
  .join("\n")}
</urlset>
`;

fs.writeFileSync(outputFile, xml, "utf8");

console.log(`Sitemap generated successfully!`);
console.log(`Articles included: ${uniqueSlugs.length}`);
console.log(`Total URLs: ${urls.length}`);
