import { pgTable, text, integer, index } from "drizzle-orm/pg-core";

export const posts = pgTable(
  "posts",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    excerpt: text("excerpt").notNull(),
    seoTitle: text("seo_title").notNull(),
    seoDescription: text("seo_description").notNull(),
    cover: text("cover").notNull(),
    coverAlt: text("cover_alt").notNull(),
    blocks: text("blocks").notNull(), // JSON string representation of content blocks
    status: text("status").notNull().default("draft"),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
    publishedAt: text("published_at"),
    revision: integer("revision").notNull().default(1),
  },
  (t) => [index("posts_status_published").on(t.status, t.publishedAt)],
);

export const settings = pgTable("blog_settings", {
  id: text("id").primaryKey(),
  value: text("value").notNull(),
});

export const apiKeys = pgTable("api_keys", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  hash: text("hash").notNull().unique(),
  scope: text("scope").notNull(),
  createdAt: text("created_at").notNull(),
  expiresAt: text("expires_at").notNull(),
  revokedAt: text("revoked_at"),
  lastUsedAt: text("last_used_at"),
});

export const auditLog = pgTable("audit_log", {
  id: text("id").primaryKey(),
  actor: text("actor").notNull(),
  action: text("action").notNull(),
  postId: text("post_id"),
  createdAt: text("created_at").notNull(),
});

export type PostRow = typeof posts.$inferSelect;
export type PostInsert = typeof posts.$inferInsert;
export type SettingRow = typeof settings.$inferSelect;
export type ApiKeyRow = typeof apiKeys.$inferSelect;
export type AuditLogRow = typeof auditLog.$inferSelect;
