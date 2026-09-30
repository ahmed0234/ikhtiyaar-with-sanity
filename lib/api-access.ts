import { isBlogOwner, sameOrigin } from "./blog";
import { getDb, schema } from "@/db";
import { eq, and, gt, isNull } from "drizzle-orm";

export async function hashKey(value: string) {
  const bytes = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );
  return [...new Uint8Array(bytes)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function access(
  req: Request,
  scope: "read" | "draft" | "publish",
  browserMutation = false,
): Promise<string | null> {
  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) {
    const token = auth.slice(7);
    if (!/^ikh_[a-f0-9]{64}$/.test(token)) return null;

    try {
      const db = getDb();
      const hashed = await hashKey(token);
      const nowIso = new Date().toISOString();

      const [row] = await db
        .select({ id: schema.apiKeys.id, scope: schema.apiKeys.scope })
        .from(schema.apiKeys)
        .where(
          and(
            eq(schema.apiKeys.hash, hashed),
            isNull(schema.apiKeys.revokedAt),
            gt(schema.apiKeys.expiresAt, nowIso),
          ),
        )
        .limit(1);

      if (
        !row ||
        ({ read: 0, draft: 1, publish: 2 }[
          row.scope as "read" | "draft" | "publish"
        ] ?? -1) < { read: 0, draft: 1, publish: 2 }[scope]
      ) {
        return null;
      }

      await db
        .update(schema.apiKeys)
        .set({ lastUsedAt: nowIso })
        .where(eq(schema.apiKeys.id, row.id));

      return "key:" + row.id;
    } catch (err) {
      console.error("API key validation error:", err);
      return null;
    }
  }

  if (await isBlogOwner()) {
    if (browserMutation && !sameOrigin(req)) return null;
    return "owner";
  }

  return null;
}
