import { z } from "zod";
import { getDb, schema } from "@/db";
import { getPosts } from "./blog";
import { slugify } from "./blog-types";
import { eq, and } from "drizzle-orm";

const media = z.string().refine(
  (val) => {
    if (!val) return true;
    return (
      val.startsWith("https://") ||
      val.startsWith("http://") ||
      val.startsWith("/media/")
    );
  },
  { message: "Invalid image URL" },
);

const block = z
  .object({
    id: z.string().max(100).optional(),
    type: z.enum(["paragraph", "heading", "list", "image"]),
    text: z.string().max(10000).default(""),
    src: z.union([z.string(), media]).optional(),
    alt: z.string().max(300).optional(),
    caption: z.string().max(500).optional(),
  })
  .superRefine((b, ctx) => {
    if (b.type === "image" && (!b.src || !b.alt?.trim())) {
      ctx.addIssue({
        code: "custom",
        message: "Upload each article image and add its description.",
      });
    }
  });

const postSchema = z.object({
  id: z.string().max(100).optional(),
  slug: z.string().max(100).default(""),
  title: z.string().trim().min(1).max(200),
  excerpt: z.string().max(600).default(""),
  seo_title: z.string().max(200).default(""),
  seo_description: z.string().max(400).default(""),
  cover: z.union([z.literal(""), media, z.string()]).default(""),
  cover_alt: z.string().max(300).default(""),
  blocks: z.array(block).max(100),
  status: z.enum(["draft", "published"]).default("draft"),
  revision: z.number().int().nonnegative().default(0),
});

export class BlogError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}

export async function savePost(input: unknown, actor: string) {
  const parsed = postSchema.safeParse(input);
  if (!parsed.success) {
    throw new BlogError(
      parsed.error.issues[0]?.message || "Check your article fields.",
    );
  }

  const p = parsed.data;
  const id = p.id || crypto.randomUUID();
  const slug = slugify(p.slug || p.title);
  if (!slug) throw new BlogError("Add a page address.");
  if (p.cover && !p.cover_alt.trim())
    throw new BlogError("Describe the cover image.");
  if (
    p.status === "published" &&
    (!p.excerpt.trim() ||
      !p.blocks.some((b) => b.type !== "image" && b.text.trim()))
  ) {
    throw new BlogError(
      "Add an introduction and article text before publishing.",
    );
  }

  const db = getDb();

  const [existing] = await db
    .select({
      id: schema.posts.id,
      slug: schema.posts.slug,
      revision: schema.posts.revision,
      publishedAt: schema.posts.publishedAt,
    })
    .from(schema.posts)
    .where(eq(schema.posts.id, id))
    .limit(1);

  if (existing && existing.slug !== slug) {
    throw new BlogError(
      "The saved page address cannot change because other pages may already link to it.",
    );
  }

  const now = new Date().toISOString();
  const blocksJson = JSON.stringify(
    p.blocks.map((b) => ({ ...b, id: b.id || crypto.randomUUID() })),
  );

  try {
    if (existing) {
      if (existing.revision !== p.revision) {
        throw new BlogError(
          "A newer version was saved elsewhere. Reload this article before making more changes.",
          409,
        );
      }

      const publishedAt =
        p.status === "published"
          ? existing.publishedAt || now
          : existing.publishedAt;

      await db
        .update(schema.posts)
        .set({
          slug,
          title: p.title,
          excerpt: p.excerpt,
          seoTitle: p.seo_title,
          seoDescription: p.seo_description,
          cover: p.cover,
          coverAlt: p.cover_alt,
          blocks: blocksJson,
          status: p.status,
          updatedAt: now,
          publishedAt,
          revision: p.revision + 1,
        })
        .where(
          and(eq(schema.posts.id, id), eq(schema.posts.revision, p.revision)),
        );
    } else {
      await db.insert(schema.posts).values({
        id,
        slug,
        title: p.title,
        excerpt: p.excerpt,
        seoTitle: p.seo_title,
        seoDescription: p.seo_description,
        cover: p.cover,
        coverAlt: p.cover_alt,
        blocks: blocksJson,
        status: p.status,
        createdAt: now,
        updatedAt: now,
        publishedAt: p.status === "published" ? now : null,
        revision: 1,
      });
    }
  } catch (e: any) {
    if (
      String(e).includes("unique") ||
      String(e).includes("UNIQUE") ||
      e.code === "23505"
    ) {
      throw new BlogError("That page address is already in use.", 409);
    }
    throw e;
  }

  try {
    await db.insert(schema.auditLog).values({
      id: crypto.randomUUID(),
      actor,
      action: p.status === "published" ? "publish" : "save_draft",
      postId: id,
      createdAt: now,
    });
  } catch (err) {
    console.error("Audit log error:", err);
  }

  return { id, posts: await getPosts(true) };
}
