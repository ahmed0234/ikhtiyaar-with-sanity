import { readFileSync } from "node:fs";
import { getDb, schema } from "../db/index.js";

const source = process.argv[2];
if (!source) {
  console.error("Usage: node scripts/restore.mjs /path/to/backup.json");
  process.exit(1);
}

const data = JSON.parse(readFileSync(source, "utf8"));
if (data.format !== "ikhtiyaar-blog-v1" || !Array.isArray(data.posts)) {
  console.error("Invalid backup format.");
  process.exit(1);
}

async function restore() {
  const db = getDb();
  console.log(`Restoring ${data.posts.length} posts to Neon PostgreSQL...`);

  for (const p of data.posts) {
    await db
      .insert(schema.posts)
      .values({
        id: p.id,
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        seoTitle: p.seo_title || p.seoTitle || "",
        seoDescription: p.seo_description || p.seoDescription || "",
        cover: p.cover || "",
        coverAlt: p.cover_alt || p.coverAlt || "",
        blocks: typeof p.blocks === "string" ? p.blocks : JSON.stringify(p.blocks),
        status: p.status || "draft",
        createdAt: p.created_at || p.createdAt || new Date().toISOString(),
        updatedAt: p.updated_at || p.updatedAt || new Date().toISOString(),
        publishedAt: p.published_at || p.publishedAt || null,
        revision: p.revision || 1,
      })
      .onConflictDoUpdate({
        target: schema.posts.id,
        set: {
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
          seoTitle: p.seo_title || p.seoTitle || "",
          seoDescription: p.seo_description || p.seoDescription || "",
          cover: p.cover || "",
          coverAlt: p.cover_alt || p.coverAlt || "",
          blocks: typeof p.blocks === "string" ? p.blocks : JSON.stringify(p.blocks),
          status: p.status || "draft",
          updatedAt: p.updated_at || p.updatedAt || new Date().toISOString(),
          publishedAt: p.published_at || p.publishedAt || null,
          revision: p.revision || 1,
        },
      });
  }

  if (data.template) {
    await db
      .insert(schema.settings)
      .values({ id: "template", value: JSON.stringify(data.template) })
      .onConflictDoUpdate({
        target: schema.settings.id,
        set: { value: JSON.stringify(data.template) },
      });
  }

  console.log("Blog restoration completed successfully.");
}

restore().catch(console.error);
