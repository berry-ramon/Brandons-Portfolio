// src/seo/sitemapGenerator.ts
export const generateSitemap = () => {
  const baseUrl = "https://brandonkimathi.vercel.app";
  const today = new Date().toISOString().split("T")[0];

  const pages = [
    { path: "", priority: 1.0, changefreq: "daily" },
    { path: "about", priority: 0.8, changefreq: "weekly" },
    { path: "how-i-think", priority: 0.8, changefreq: "weekly" },
    { path: "contact", priority: 0.7, changefreq: "monthly" },
    { path: "kodees", priority: 0.9, changefreq: "weekly" },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}/${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return sitemap;
};
