import { SITE_URL } from "./seo";
import { isAuthenticated } from "@/lib/auth";
import { defaultTemplate, type Post, type BlogTemplate } from "./blog-types";
import { getDb, schema } from "@/db";
import { desc, eq, and } from "drizzle-orm";

function decode(row: schema.PostRow): Post {
  let blocks = [];
  try {
    blocks = typeof row.blocks === "string" ? JSON.parse(row.blocks) : (row.blocks || []);
  } catch (err) {
    console.error("Failed to parse blocks for post:", row.id, err);
  }
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    seo_title: row.seoTitle,
    seo_description: row.seoDescription,
    cover: row.cover,
    cover_alt: row.coverAlt,
    blocks,
    status: (row.status as "draft" | "published") || "draft",
    created_at: row.createdAt,
    updated_at: row.updatedAt,
    published_at: row.publishedAt,
    revision: row.revision,
  };
}

export async function getPosts(all = false): Promise<Post[]> {
  try {
    const db = getDb();
    if (all) {
      const rows = await db
        .select()
        .from(schema.posts)
        .orderBy(desc(schema.posts.updatedAt))
        .limit(500);
      return rows.map(decode);
    }

    const rows = await db
      .select()
      .from(schema.posts)
      .where(eq(schema.posts.status, "published"))
      .orderBy(desc(schema.posts.publishedAt))
      .limit(500);
    return rows.map(decode);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const db = getDb();
    const [row] = await db
      .select()
      .from(schema.posts)
      .where(and(eq(schema.posts.slug, slug), eq(schema.posts.status, "published")))
      .limit(1);
    return row ? decode(row) : null;
  } catch (error) {
    console.error("Error fetching post by slug:", slug, error);
    return null;
  }
}

export async function getTemplate(): Promise<BlogTemplate> {
  try {
    const db = getDb();
    const [row] = await db
      .select()
      .from(schema.settings)
      .where(eq(schema.settings.id, "template"))
      .limit(1);
    return row ? { ...defaultTemplate, ...JSON.parse(row.value) } : defaultTemplate;
  } catch (error) {
    console.error("Failed to load template, using default:", error);
    return defaultTemplate;
  }
}

export async function isBlogOwner() {
  return await isAuthenticated();
}

export function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  return origin === new URL(req.url).origin || origin === SITE_URL;
}
